import { DurableObject } from "cloudflare:workers";
import type { BallDesignWire, ClientMsg, LiveMatch, MatchStart, OnlineMode, RoomPlayer, ServerMsg } from "../../src/net/protocol";
import { lobbyOf, type Env } from "./index";

/** A player who drops out of a started match has this long to come back before the match is given to the other side. */
export const FORFEIT_MS = 30_000;
const MAX_SPECTATORS = 50;
const REACTIONS = ["👏", "🔥", "😂", "😮", "⚽", "💪"];

interface Seat extends RoomPlayer {
  ball: BallDesignWire | null;
  allowWatch: boolean;
  leftAt: number | null;
}

interface Meta {
  code: string;
  mode: OnlineMode;
  /** Matchmade rooms: the two guests who may sit (host first). Friendly rooms: anyone with the code. */
  seats: [string, string] | null;
  players: [Seat | null, Seat | null];
  start: MatchStart | null;
  startedAt: number;
  ends: [[number, number] | null, [number, number] | null];
  score: [number, number];
  half: number;
  clock: number;
  ended: boolean;
}

interface Tag {
  role: "player" | "spectator";
  seat: 0 | 1 | null;
  id: string;
  name: string;
}

/**
 * One match. Sockets are hibernatable (each carries who it is as an attachment); the match state is a small record in
 * storage. The host's snapshots are relayed untouched to the other player and spectators, the guest's inputs to the
 * host. The score the host reports feeds the live list; the final score counts for the rankings when both players
 * report the same one.
 */
export class Room extends DurableObject<Env> {
  private meta: Meta | null = null;
  private lastLive = 0;

  private async load() {
    this.meta ??= (await this.ctx.storage.get<Meta>("meta")) ?? null;
    return this.meta;
  }
  private async save() {
    if (this.meta) await this.ctx.storage.put("meta", this.meta);
  }

  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname === "/internal/init") {
      const b = (await req.json()) as { mode: OnlineMode; seats: [string, string] | null; code: string };
      if (!(await this.load())) {
        this.meta = { code: b.code, mode: b.mode, seats: b.seats, players: [null, null], start: null, startedAt: 0, ends: [null, null], score: [0, 0], half: 1, clock: 0, ended: false };
        await this.save();
      }
      return Response.json({ ok: true });
    }
    // a socket, already authenticated by the Worker
    const who = JSON.parse(req.headers.get("x-player") ?? "{}") as { id: string; name: string; rating: number; allowWatch: boolean };
    const pair = new WebSocketPair(), ws = pair[1];
    const role = url.searchParams.get("role") === "spectator" ? "spectator" : "player";
    const meta = await this.load();
    const reject = (code: string, message: string) => {
      ws.accept();
      this.send(ws, { t: "error", code, message });
      ws.close(4004, code);
      return new Response(null, { status: 101, webSocket: pair[0] });
    };
    if (!meta) return reject("room_not_found", "No room with that code. Check it with your friend.");
    if (meta.ended) return reject("match_ended", "That match has finished.");

    if (role === "spectator") {
      if (!this.watchable()) return reject("not_watchable", "These players have turned watching off.");
      if (this.ctx.getWebSockets("spectator").length >= MAX_SPECTATORS) return reject("spectators_full", "This match is full of watchers. Try another.");
      this.ctx.acceptWebSocket(ws, ["spectator"]);
      ws.serializeAttachment({ role, seat: null, id: who.id, name: who.name } satisfies Tag);
      this.send(ws, { t: "joined", role, seat: null, mode: meta.mode, code: meta.code });
      this.send(ws, this.lobbyMsg());
      if (meta.start) this.send(ws, { t: "start", start: meta.start });
      this.broadcast({ t: "spectators", count: this.spectators() });
      return new Response(null, { status: 101, webSocket: pair[0] });
    }

    let seat: 0 | 1;
    if (meta.seats) {
      const i = meta.seats.indexOf(who.id);
      if (i < 0) return reject("not_your_room", "This match is for two other players.");
      seat = i as 0 | 1;
    } else if (meta.players[0]?.id === who.id) seat = 0;
    else if (meta.players[1]?.id === who.id) seat = 1;
    else if (!meta.players[0]) seat = 0;
    else if (!meta.players[1]) seat = 1;
    else return reject("room_full", "Two players are already in this room. You can watch instead.");
    // the same player in a second tab takes over the seat
    for (const old of this.ctx.getWebSockets("player")) if ((old.deserializeAttachment() as Tag).seat === seat) old.close(4001, "replaced");
    this.ctx.acceptWebSocket(ws, ["player"]);
    ws.serializeAttachment({ role, seat, id: who.id, name: who.name } satisfies Tag);
    const prev = meta.players[seat];
    meta.players[seat] = {
      id: who.id, name: prev?.name ?? who.name, team: prev?.team ?? "onipanu", rating: who.rating, seat, ready: prev?.ready ?? false,
      connected: true, ball: prev?.ball ?? null, allowWatch: who.allowWatch, leftAt: null,
    };
    await this.save();
    this.send(ws, { t: "joined", role, seat, mode: meta.mode, code: meta.code });
    if (meta.start) this.send(ws, { t: "start", start: meta.start });
    this.broadcast(this.lobbyMsg());
    if (prev && !prev.connected) this.broadcast({ t: "peer", seat, connected: true });
    return new Response(null, { status: 101, webSocket: pair[0] });
  }

  async webSocketMessage(ws: WebSocket, raw: string | ArrayBuffer) {
    const meta = await this.load();
    const tag = ws.deserializeAttachment() as Tag;
    if (!meta || typeof raw !== "string" || raw.length > 64_000) return;
    let m: ClientMsg;
    try {
      m = JSON.parse(raw);
    } catch {
      return;
    }
    if (m.t === "react" && REACTIONS.includes(m.e)) {
      this.broadcast({ t: "react", e: m.e, from: tag.name });
      return;
    }
    if (tag.role !== "player" || tag.seat === null) return;
    const me = meta.players[tag.seat];
    if (!me) return;
    switch (m.t) {
      case "hello":
        me.name = String(m.name).slice(0, 16) || me.name;
        if (!meta.start) me.team = String(m.team).slice(0, 20);
        me.ball = m.ball ?? null;
        await this.save();
        this.broadcast(this.lobbyMsg());
        break;
      case "team":
        if (!meta.start) {
          me.team = String(m.team).slice(0, 20);
          me.ready = false;
          await this.save();
          this.broadcast(this.lobbyMsg());
        }
        break;
      case "ready":
        if (meta.start) break;
        me.ready = !!m.ready;
        await this.save();
        this.broadcast(this.lobbyMsg());
        await this.maybeStart();
        break;
      case "snap":
        // the host's state: straight on to the guest and spectators
        if (tag.seat !== 0 || !meta.start || meta.ended) break;
        this.relay(raw.length < 40 ? raw : JSON.stringify({ t: "snap", d: m.d }), (t) => t.seat !== 0);
        meta.score = m.score;
        meta.half = m.half;
        meta.clock = m.clock;
        if (Date.now() - this.lastLive > 3000) {
          this.lastLive = Date.now();
          await this.save();
          await this.reportLive();
        }
        break;
      case "in":
        if (tag.seat !== 1 || !meta.start) break;
        this.relay(JSON.stringify({ t: "in", d: m.d }), (t) => t.seat === 0);
        break;
      case "end":
        if (!meta.start || meta.ended) break;
        meta.ends[tag.seat] = [Number(m.score[0]) | 0, Number(m.score[1]) | 0];
        await this.save();
        await this.maybeFinish();
        break;
    }
  }

  async webSocketClose(ws: WebSocket) {
    const meta = await this.load();
    const tag = ws.deserializeAttachment() as Tag | null;
    if (!meta || !tag) return;
    if (tag.role === "spectator") {
      this.broadcast({ t: "spectators", count: this.spectators() });
      return;
    }
    const seat = tag.seat!;
    // a replaced socket (same player, new tab) is not a departure
    if (this.ctx.getWebSockets("player").some((o) => o !== ws && (o.deserializeAttachment() as Tag).seat === seat)) return;
    const p = meta.players[seat];
    if (!p) return;
    if (!meta.start && !meta.seats) meta.players[seat] = null; // friendly lobby: free the seat
    else {
      p.connected = false;
      p.leftAt = Date.now();
      p.ready = false;
      if (meta.start && !meta.ended) await this.ctx.storage.setAlarm(Date.now() + FORFEIT_MS);
    }
    await this.save();
    this.broadcast({ t: "peer", seat, connected: false });
    this.broadcast(this.lobbyMsg());
    if (meta.ended || !meta.start) await this.clearLive();
  }

  async webSocketError(ws: WebSocket) {
    await this.webSocketClose(ws);
  }

  /** A player gone for FORFEIT_MS loses the match (and, ranked, the points). */
  async alarm() {
    const meta = await this.load();
    if (!meta || meta.ended || !meta.start) return;
    for (const s of [0, 1] as const) {
      const p = meta.players[s];
      if (p && !p.connected && p.leftAt !== null && Date.now() - p.leftAt >= FORFEIT_MS - 50) {
        await this.finish(meta.score, s);
        return;
      }
    }
  }

  private async maybeStart() {
    const meta = this.meta!;
    const [a, b] = meta.players;
    if (!a || !b || !a.ready || !b.ready || !a.connected || !b.connected || meta.start) return;
    meta.start = {
      mode: meta.mode,
      home: a.team,
      away: b.team,
      // quick matches are short (90-second halves), friendlies and ranked play two 3-minute halves
      halfMinutes: meta.mode === "quick" ? 1.5 : 3,
      seed: Math.floor(Math.random() * 1e9),
      ball: a.ball,
      timeOfDay: "day",
    };
    meta.startedAt = Date.now();
    await this.save();
    this.broadcast({ t: "start", start: meta.start });
    await this.reportLive();
  }

  private async maybeFinish() {
    const meta = this.meta!;
    const [e0, e1] = meta.ends;
    const other = (s: 0 | 1) => meta.players[s === 0 ? 1 : 0];
    if (e0 && e1) await this.finish(e0, null, e0[0] !== e1[0] || e0[1] !== e1[1]);
    else if (e0 && !other(0)?.connected) await this.finish(e0, null);
    else if (e1 && !other(1)?.connected) await this.finish(e1, null);
  }

  /** Ends the match. `forfeit` is the seat that left; a disputed score is not ranked. */
  private async finish(score: [number, number], forfeit: 0 | 1 | null, disputed = false) {
    const meta = this.meta!;
    if (meta.ended) return;
    meta.ended = true;
    await this.save();
    let ranked: { delta: [number, number]; rating: [number, number] } | undefined;
    if (meta.mode === "ranked" && meta.seats && !disputed) {
      const r = await lobbyOf(this.env).fetch("https://lobby/internal/result", {
        method: "POST",
        body: JSON.stringify({ code: meta.code, home: meta.seats[0], away: meta.seats[1], score, forfeit: forfeit ?? undefined }),
      });
      const j = (await r.json()) as { delta?: [number, number]; rating?: [number, number] };
      if (j.delta && j.rating) ranked = { delta: j.delta, rating: j.rating };
    }
    this.broadcast({ t: "result", score, ranked, forfeit: forfeit ?? undefined });
    await this.clearLive();
  }

  private watchable() {
    const [a, b] = this.meta!.players;
    return (a?.allowWatch ?? true) && (b?.allowWatch ?? true);
  }
  private spectators() {
    return this.ctx.getWebSockets("spectator").length;
  }

  private lobbyMsg(): ServerMsg {
    const ps = this.meta!.players.filter((p): p is Seat => !!p).map(({ id, name, team, rating, seat, ready, connected }) => ({ id, name, team, rating, seat, ready, connected }));
    return { t: "lobby", players: ps, spectators: this.spectators(), watchable: this.watchable() };
  }

  private async reportLive() {
    const meta = this.meta!;
    const [a, b] = meta.players;
    if (!meta.start || meta.ended || !a || !b || !this.watchable()) return this.clearLive();
    const m: LiveMatch = {
      code: meta.code, mode: meta.mode, score: meta.score, half: meta.half, clock: meta.clock, spectators: this.spectators(), startedAt: meta.startedAt,
      home: { id: a.id, name: a.name, team: meta.start.home, rating: a.rating }, away: { id: b.id, name: b.name, team: meta.start.away, rating: b.rating },
    };
    await lobbyOf(this.env).fetch("https://lobby/internal/live", { method: "POST", body: JSON.stringify(m) });
  }
  private async clearLive() {
    await lobbyOf(this.env).fetch(`https://lobby/internal/live?code=${this.meta!.code}`, { method: "DELETE" });
  }

  private send(ws: WebSocket, m: ServerMsg) {
    try {
      ws.send(JSON.stringify(m));
    } catch {
      /* closed */
    }
  }
  private broadcast(m: ServerMsg) {
    const s = JSON.stringify(m);
    for (const ws of this.ctx.getWebSockets())
      try {
        ws.send(s);
      } catch {
        /* closed */
      }
  }
  private relay(s: string, to: (t: Tag) => boolean) {
    for (const ws of this.ctx.getWebSockets())
      if (to(ws.deserializeAttachment() as Tag))
        try {
          ws.send(s);
        } catch {
          /* closed */
        }
  }
}
