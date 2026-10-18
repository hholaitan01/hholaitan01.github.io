import type { ClientMsg, LiveMatch, OnlineMode, QueueMsg, RankRow, ServerMsg } from "./protocol";

// Talking to the ADUGBO server (adugbo/server). The address comes from, in order: a `?server=` link (remembered), a
// value saved earlier, or the build's VITE_ADUGBO_SERVER. With none of them there is no online play, and the game
// says so instead of pretending.

const SERVER_KEY = "adugbo.server";
const GUEST_KEY = "adugbo.guest";

function store(): Storage | null {
  try {
    return localStorage;
  } catch {
    return null;
  }
}

export function serverUrl(): string | null {
  const q = new URLSearchParams(location.search).get("server");
  if (q && /^https?:\/\//.test(q)) store()?.setItem(SERVER_KEY, q.replace(/\/$/, ""));
  return store()?.getItem(SERVER_KEY) ?? (import.meta.env.VITE_ADUGBO_SERVER as string | undefined)?.replace(/\/$/, "") ?? null;
}

export interface Profile {
  id: string;
  name: string;
  rating: number;
  wins: number;
  draws: number;
  losses: number;
  ranked: number;
  rank: number | null;
  allowWatch: boolean;
}

interface Guest {
  id: string;
  token: string;
}

export class OfflineError extends Error {
  constructor(message = "Online play isn't connected yet.") {
    super(message);
  }
}

function base() {
  const s = serverUrl();
  if (!s) throw new OfflineError();
  return s;
}

async function call<T>(path: string, init: RequestInit = {}, auth = false): Promise<T> {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (auth) {
    const g = await ensureGuest();
    headers.authorization = `Bearer ${g.id}:${g.token}`;
  }
  let r: Response;
  try {
    r = await fetch(base() + path, { ...init, headers: { ...headers, ...(init.headers as Record<string, string>) }, signal: init.signal ?? AbortSignal.timeout(10_000) });
  } catch (e) {
    if (e instanceof OfflineError) throw e;
    throw new Error("Can't reach the ADUGBO server. Check your connection and try again.", { cause: e });
  }
  const body = await r.json().catch(() => ({}));
  if (r.status === 401 && auth) {
    // the server no longer knows this pass (for example a reset test server): get a new one, once
    store()?.removeItem(GUEST_KEY);
    if (!(init as { retried?: boolean }).retried) return call<T>(path, { ...init, retried: true } as RequestInit, auth);
  }
  if (!r.ok) throw new Error((body as { message?: string }).message ?? `Server error ${r.status}`);
  return body as T;
}

let guestP: Promise<Guest> | null = null;
/** This device's guest pass (made on first use and kept in localStorage). */
export function ensureGuest(): Promise<Guest> {
  const saved = store()?.getItem(GUEST_KEY);
  if (saved) {
    try {
      const g = JSON.parse(saved) as Guest;
      if (g.id && g.token) return Promise.resolve(g);
    } catch {
      /* fall through */
    }
  }
  guestP ??= call<{ id: string; token: string; profile: Profile }>("/api/guest", { method: "POST", body: JSON.stringify({}) })
    .then(({ id, token }) => {
      store()?.setItem(GUEST_KEY, JSON.stringify({ id, token }));
      return { id, token };
    })
    .finally(() => (guestP = null));
  return guestP;
}

export const api = {
  health: () => call<{ ok: boolean }>("/api/health", { signal: AbortSignal.timeout(5000) }),
  me: () => call<{ profile: Profile }>("/api/me", {}, true).then((r) => r.profile),
  updateMe: (p: { name?: string; allowWatch?: boolean }) => call<{ profile: Profile }>("/api/me", { method: "PUT", body: JSON.stringify(p) }, true).then((r) => r.profile),
  leaderboard: (limit = 50) => call<{ rows: RankRow[]; total: number }>(`/api/leaderboard?limit=${limit}`),
  live: (limit = 24) => call<{ matches: LiveMatch[]; total: number }>(`/api/live?limit=${limit}`),
  liveCount: () => call<{ count: number }>("/api/live/count").then((r) => r.count),
  createRoom: () => call<{ code: string }>("/api/rooms", { method: "POST", body: "{}" }, true).then((r) => r.code),
};

/** Measures round trips to the server (the "check my connection" screen). */
export async function pingServer(n = 5): Promise<{ median: number; ok: number }> {
  const times: number[] = [];
  for (let i = 0; i < n; i++) {
    const t0 = performance.now();
    try {
      await api.health();
      times.push(performance.now() - t0);
    } catch {
      /* counted as a failure */
    }
  }
  times.sort((a, b) => a - b);
  return { median: times.length ? Math.round(times[Math.floor(times.length / 2)]) : -1, ok: times.length };
}

async function socketUrl(path: string, params: Record<string, string>) {
  const g = await ensureGuest();
  const q = new URLSearchParams({ ...params, id: g.id, token: g.token });
  return `${base().replace(/^http/, "ws")}${path}?${q}`;
}

/**
 * A room socket. Reconnects (up to 5 times, backing off) if the connection drops mid-match; the server keeps the seat
 * for 30 seconds.
 */
export class RoomLink {
  private ws: WebSocket | null = null;
  private tries = 0;
  private closedByUs = false;
  private retry: ReturnType<typeof setTimeout> | null = null;
  onMessage: (m: ServerMsg) => void = () => {};
  onState: (s: "connecting" | "open" | "reconnecting" | "closed") => void = () => {};

  constructor(
    readonly code: string,
    readonly role: "player" | "spectator",
  ) {}

  async connect() {
    this.closedByUs = false;
    await this.open();
  }

  private async open() {
    this.onState(this.tries ? "reconnecting" : "connecting");
    const url = await socketUrl(`/api/room/${this.code}`, { role: this.role });
    // left while the address was being prepared (or during a retry's backoff): don't take the seat back
    if (this.closedByUs) return;
    const ws = new WebSocket(url);
    this.ws = ws;
    ws.onopen = () => {
      this.tries = 0;
      this.onState("open");
    };
    ws.onmessage = (e) => {
      try {
        this.onMessage(JSON.parse(String(e.data)) as ServerMsg);
      } catch {
        /* ignore malformed */
      }
    };
    ws.onclose = (e) => {
      if (this.closedByUs || e.code === 4004 || e.code === 4001) return this.onState("closed");
      if (this.tries++ < 5)
        this.retry = setTimeout(() => {
          this.retry = null;
          if (!this.closedByUs) void this.open();
        }, 500 * 2 ** this.tries);
      else this.onState("closed");
    };
  }

  send(m: ClientMsg) {
    if (this.ws?.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify(m));
  }

  get buffered() {
    return this.ws?.bufferedAmount ?? 0;
  }

  close() {
    this.closedByUs = true;
    if (this.retry) clearTimeout(this.retry);
    this.retry = null;
    this.ws?.close(1000, "bye");
  }
}

/** A matchmaking search (quick or ranked). */
export class QueueLink {
  private ws: WebSocket | null = null;
  onMessage: (m: QueueMsg) => void = () => {};
  onClose: () => void = () => {};

  async start(mode: Exclude<OnlineMode, "friendly">, team: string) {
    const ws = new WebSocket(await socketUrl("/api/queue", { mode, team }));
    this.ws = ws;
    ws.onmessage = (e) => this.onMessage(JSON.parse(String(e.data)) as QueueMsg);
    ws.onclose = () => this.onClose();
    ws.onerror = () => this.onMessage({ t: "error", code: "connection", message: "Lost the connection to the server." });
  }

  cancel() {
    this.ws?.close(1000, "cancel");
  }
}
