import { DurableObject } from "cloudflare:workers";
import { bandFor, CODE_CHARS, elo, type LiveMatch, type OnlineMode, type PlayerCard, type QueueMsg, type RankRow } from "../../src/net/protocol";
import { json, roomOf, type Env } from "./index";

const START_RATING = 1000;
/** A live-list entry not refreshed for this long is gone (the host stopped sending). */
const LIVE_TTL = 20_000;

interface QueueEntry {
  id: string;
  name: string;
  team: string;
  rating: number;
  mode: OnlineMode;
  since: number;
}

const randomHex = (bytes: number) => [...crypto.getRandomValues(new Uint8Array(bytes))].map((b) => b.toString(16).padStart(2, "0")).join("");
async function sha256(s: string) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
const NAME_A = ["Eko", "Gutter", "Kerbside", "Backstreet", "Danfo", "Mama Put", "Okada", "Agbero", "Molue", "Junction"];
const NAME_B = ["Dribbler", "Rocket", "Wall", "Magician", "Captain", "Engine", "Sweeper", "Finisher", "Maestro", "Spinner"];
export function cleanName(s: unknown): string | null {
  if (typeof s !== "string") return null;
  const t = s.replace(/[^A-Za-z0-9 _.\-']/g, "").replace(/\s+/g, " ").trim().slice(0, 16);
  return t.length >= 2 ? t : null;
}

/**
 * The single lobby. SQLite tables: players (guest id, hashed token, name, rating, record, watch setting), ranked
 * results (one row per room, so a result is never counted twice) and the live list. Matchmaking sockets are hibernatable;
 * each carries its queue entry as an attachment and an alarm re-runs pairing while anyone is waiting.
 */
export class Lobby extends DurableObject<Env> {
  private sql: SqlStorage;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec(`CREATE TABLE IF NOT EXISTS players (
      id TEXT PRIMARY KEY, token_hash TEXT NOT NULL, name TEXT NOT NULL, rating INTEGER NOT NULL,
      wins INTEGER NOT NULL DEFAULT 0, draws INTEGER NOT NULL DEFAULT 0, losses INTEGER NOT NULL DEFAULT 0,
      ranked INTEGER NOT NULL DEFAULT 0, allow_watch INTEGER NOT NULL DEFAULT 1, created INTEGER NOT NULL, seen INTEGER NOT NULL)`);
    this.sql.exec(`CREATE TABLE IF NOT EXISTS results (
      code TEXT PRIMARY KEY, home TEXT NOT NULL, away TEXT NOT NULL, home_score INTEGER NOT NULL, away_score INTEGER NOT NULL,
      delta_home INTEGER NOT NULL, delta_away INTEGER NOT NULL, forfeit INTEGER, at INTEGER NOT NULL)`);
    this.sql.exec(`CREATE TABLE IF NOT EXISTS live (code TEXT PRIMARY KEY, data TEXT NOT NULL, updated INTEGER NOT NULL)`);
  }

  private player(id: string) {
    return this.sql.exec("SELECT * FROM players WHERE id = ?", id).toArray()[0] as Record<string, number | string> | undefined;
  }

  private async authed(id: string | null, token: string | null) {
    if (!id || !token) return null;
    const p = this.player(id);
    if (!p || p.token_hash !== (await sha256(token))) return null;
    this.sql.exec("UPDATE players SET seen = ? WHERE id = ?", Date.now(), id);
    return p;
  }

  private bearer(req: Request) {
    const h = req.headers.get("authorization") ?? "";
    const m = h.match(/^Bearer ([a-z0-9_]+):([a-f0-9]+)$/);
    return m ? { id: m[1], token: m[2] } : { id: null, token: null };
  }

  private profile(p: Record<string, number | string>) {
    const ranked = Number(p.ranked) > 0;
    const rank = ranked ? (this.sql.exec("SELECT COUNT(*) AS n FROM players WHERE ranked > 0 AND rating > ?", p.rating).one().n as number) + 1 : null;
    return { id: p.id, name: p.name, rating: p.rating, wins: p.wins, draws: p.draws, losses: p.losses, ranked: p.ranked, rank, allowWatch: !!p.allow_watch };
  }

  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url), path = url.pathname;
    try {
      // ---- public ----
      if (path === "/api/guest" && req.method === "POST") {
        const body = (await req.json().catch(() => ({}))) as { name?: string };
        const id = `g_${randomHex(8)}`, token = randomHex(24);
        const name = cleanName(body.name) ?? `${NAME_A[Math.floor(Math.random() * NAME_A.length)]} ${NAME_B[Math.floor(Math.random() * NAME_B.length)]} ${Math.floor(100 + Math.random() * 900)}`;
        const now = Date.now();
        this.sql.exec("INSERT INTO players (id, token_hash, name, rating, created, seen) VALUES (?, ?, ?, ?, ?, ?)", id, await sha256(token), name, START_RATING, now, now);
        return json({ id, token, profile: this.profile(this.player(id)!) });
      }
      if (path === "/api/me") {
        const { id, token } = this.bearer(req);
        const p = await this.authed(id, token);
        if (!p) return json({ error: "unauthorised", message: "Guest pass not recognised." }, 401);
        if (req.method === "PUT") {
          const body = (await req.json().catch(() => ({}))) as { name?: string; allowWatch?: boolean };
          const name = body.name === undefined ? p.name : cleanName(body.name);
          if (!name) return json({ error: "bad_name", message: "Names are 2–16 letters, numbers or spaces." }, 400);
          const allow = body.allowWatch === undefined ? p.allow_watch : body.allowWatch ? 1 : 0;
          this.sql.exec("UPDATE players SET name = ?, allow_watch = ? WHERE id = ?", name, allow, p.id);
        }
        return json({ profile: this.profile(this.player(String(p.id))!) });
      }
      if (path === "/api/leaderboard") {
        const limit = Math.max(1, Math.min(100, Number(url.searchParams.get("limit")) || 20));
        const rows = this.sql.exec("SELECT id, name, rating, wins, draws, losses FROM players WHERE ranked > 0 ORDER BY rating DESC, wins DESC LIMIT ?", limit).toArray();
        const out: RankRow[] = rows.map((r, i) => ({ rank: i + 1, id: String(r.id), name: String(r.name), rating: Number(r.rating), wins: Number(r.wins), draws: Number(r.draws), losses: Number(r.losses) }));
        const total = this.sql.exec("SELECT COUNT(*) AS n FROM players WHERE ranked > 0").one().n;
        return json({ rows: out, total });
      }
      if (path === "/api/live" || path === "/api/live/count") {
        this.sql.exec("DELETE FROM live WHERE updated < ?", Date.now() - LIVE_TTL);
        const all = this.sql.exec("SELECT data FROM live ORDER BY updated DESC").toArray().map((r) => JSON.parse(String(r.data)) as LiveMatch);
        if (path === "/api/live/count") return json({ count: all.length });
        const limit = Math.max(1, Math.min(50, Number(url.searchParams.get("limit")) || 12));
        all.sort((a, b) => b.spectators - a.spectators || b.startedAt - a.startedAt);
        return json({ matches: all.slice(0, limit), total: all.length });
      }
      if (path === "/api/rooms" && req.method === "POST") {
        const { id, token } = this.bearer(req);
        if (!(await this.authed(id, token))) return json({ error: "unauthorised", message: "Guest pass not recognised." }, 401);
        const code = await this.newRoom("friendly", null);
        return json({ code });
      }
      if (path === "/api/queue") return this.joinQueue(req, url);

      // ---- internal (from the Worker and rooms) ----
      if (path === "/internal/auth") {
        const p = await this.authed(url.searchParams.get("id"), url.searchParams.get("token"));
        if (!p) return new Response("no", { status: 401 });
        return Response.json({ id: p.id, name: p.name, rating: p.rating, ranked: p.ranked, allowWatch: !!p.allow_watch });
      }
      if (path === "/internal/live" && req.method === "POST") {
        const m = (await req.json()) as LiveMatch;
        this.sql.exec("INSERT INTO live (code, data, updated) VALUES (?, ?, ?) ON CONFLICT(code) DO UPDATE SET data = excluded.data, updated = excluded.updated", m.code, JSON.stringify(m), Date.now());
        return json({ ok: true });
      }
      if (path === "/internal/live" && req.method === "DELETE") {
        this.sql.exec("DELETE FROM live WHERE code = ?", url.searchParams.get("code"));
        return json({ ok: true });
      }
      if (path === "/internal/result" && req.method === "POST") return json(this.recordResult((await req.json()) as ResultIn));
    } catch (e) {
      return json({ error: "server_error", message: String(e) }, 500);
    }
    return json({ error: "not_found" }, 404);
  }

  /** Makes a fresh room code and tells the room its mode (and, for matchmade rooms, who may sit). */
  private async newRoom(mode: OnlineMode, seats: [string, string] | null) {
    let code = "";
    for (let i = 0; i < 5; i++) code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
    await roomOf(this.env, code).fetch("https://room/internal/init", { method: "POST", body: JSON.stringify({ mode, seats, code }) });
    return code;
  }

  /** Ranked result: Elo for both players, once per room (a repeat report returns the stored outcome). */
  private recordResult(r: ResultIn) {
    const prev = this.sql.exec("SELECT * FROM results WHERE code = ?", r.code).toArray()[0];
    const home = this.player(r.home), away = this.player(r.away);
    if (!home || !away) return { error: "unknown_player" };
    if (prev) return { delta: [Number(prev.delta_home), Number(prev.delta_away)], rating: [Number(home.rating), Number(away.rating)] };
    const [h, a] = r.score;
    const s = r.forfeit === 1 ? 1 : r.forfeit === 0 ? 0 : h > a ? 1 : h < a ? 0 : 0.5;
    const [dh, da] = elo(Number(home.rating), Number(away.rating), s);
    const col = (x: number) => (x === 1 ? "wins" : x === 0 ? "losses" : "draws");
    this.sql.exec(`UPDATE players SET rating = MAX(100, rating + ?), ranked = ranked + 1, ${col(s)} = ${col(s)} + 1 WHERE id = ?`, dh, r.home);
    this.sql.exec(`UPDATE players SET rating = MAX(100, rating + ?), ranked = ranked + 1, ${col(1 - s)} = ${col(1 - s)} + 1 WHERE id = ?`, da, r.away);
    this.sql.exec("INSERT INTO results VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", r.code, r.home, r.away, h, a, dh, da, r.forfeit ?? null, Date.now());
    return { delta: [dh, da], rating: [Number(this.player(r.home)!.rating), Number(this.player(r.away)!.rating)] };
  }

  // ---- matchmaking ----

  private async joinQueue(req: Request, url: URL) {
    if (req.headers.get("upgrade") !== "websocket") return json({ error: "expected_websocket" }, 426);
    const p = await this.authed(url.searchParams.get("id"), url.searchParams.get("token"));
    if (!p) return json({ error: "unauthorised", message: "Guest pass not recognised." }, 401);
    const mode = url.searchParams.get("mode") === "ranked" ? "ranked" : "quick";
    // one search per player: a second tab replaces the first
    for (const ws of this.ctx.getWebSockets("queue")) if ((ws.deserializeAttachment() as QueueEntry).id === p.id) ws.close(4000, "replaced");
    const pair = new WebSocketPair();
    const entry: QueueEntry = { id: String(p.id), name: String(p.name), team: (url.searchParams.get("team") ?? "onipanu").slice(0, 20), rating: Number(p.rating), mode, since: Date.now() };
    this.ctx.acceptWebSocket(pair[1], ["queue"]);
    pair[1].serializeAttachment(entry);
    await this.pairUp();
    if ((await this.ctx.storage.getAlarm()) === null) await this.ctx.storage.setAlarm(Date.now() + 2000);
    return new Response(null, { status: 101, webSocket: pair[0] });
  }

  async alarm() {
    await this.pairUp();
    if (this.ctx.getWebSockets("queue").length) await this.ctx.storage.setAlarm(Date.now() + 2000);
  }

  /** Pairs waiting players: same mode, ratings within both players' current bands (which widen with waiting). */
  private async pairUp() {
    const now = Date.now();
    const waiting = this.ctx.getWebSockets("queue").map((ws) => ({ ws, e: ws.deserializeAttachment() as QueueEntry })).sort((a, b) => a.e.since - b.e.since);
    const taken = new Set<WebSocket>();
    for (let i = 0; i < waiting.length; i++) {
      const A = waiting[i];
      if (taken.has(A.ws)) continue;
      for (let j = i + 1; j < waiting.length; j++) {
        const B = waiting[j];
        if (taken.has(B.ws) || A.e.mode !== B.e.mode || A.e.id === B.e.id) continue;
        const gap = Math.abs(A.e.rating - B.e.rating);
        if (gap > bandFor(A.e.mode, now - A.e.since).range || gap > bandFor(B.e.mode, now - B.e.since).range) continue;
        taken.add(A.ws).add(B.ws);
        // the longer-waiting player hosts (seat 0, home)
        const code = await this.newRoom(A.e.mode, [A.e.id, B.e.id]);
        const card = (e: QueueEntry): PlayerCard => ({ id: e.id, name: e.name, team: e.team, rating: e.rating });
        send(A.ws, { t: "matched", code, seat: 0, opponent: card(B.e) });
        send(B.ws, { t: "matched", code, seat: 1, opponent: card(A.e) });
        A.ws.close(1000, "matched");
        B.ws.close(1000, "matched");
        break;
      }
    }
    for (const { ws, e } of waiting) if (!taken.has(ws)) send(ws, { t: "queued", mode: e.mode, band: bandFor(e.mode, now - e.since).band, waiting: waiting.filter((w) => w.e.mode === e.mode).length });
  }

  async webSocketMessage() {}
  async webSocketClose(ws: WebSocket) {
    try {
      ws.close(1000, "bye");
    } catch {
      /* already closed */
    }
  }
}

interface ResultIn {
  code: string;
  home: string;
  away: string;
  score: [number, number];
  forfeit?: 0 | 1;
}

function send(ws: WebSocket, m: QueueMsg) {
  try {
    ws.send(JSON.stringify(m));
  } catch {
    /* gone */
  }
}
