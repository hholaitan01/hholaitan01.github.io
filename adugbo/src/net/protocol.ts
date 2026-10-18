// Messages between the game and the ADUGBO server (adugbo/server). Shared by both sides.
//
// How online play works: the server runs no football. One player's browser (the host, seat 0, home side) runs the
// match simulation with both sides' inputs; the other player (seat 1) sends its inputs and draws the host's snapshots,
// as do spectators. The server's Room relays these and keeps the score it is told for the live list; the Lobby keeps
// guest identities, the rankings table (Elo), matchmaking queues and the list of matches that can be watched.

export type OnlineMode = "friendly" | "quick" | "ranked";

/** A player's public card, as rooms and the live list show it. */
export interface PlayerCard {
  id: string;
  name: string;
  team: string;
  rating?: number;
}

/** Ball look, carried into online matches so both players and spectators see the host's ball (see game/ball.ts). */
export interface BallDesignWire {
  pattern: string;
  base: string;
  a: string;
  b: string;
}

export interface RoomPlayer extends PlayerCard {
  seat: 0 | 1;
  ready: boolean;
  connected: boolean;
}

/** Settings the host's simulation is built from; both players build the same MatchSim from it. */
export interface MatchStart {
  mode: OnlineMode;
  home: string;
  away: string;
  halfMinutes: number;
  seed: number;
  ball: BallDesignWire | null;
  timeOfDay: "day" | "evening";
}

// ---- client -> room ----
export type ClientMsg =
  | { t: "hello"; name: string; team: string; ball: BallDesignWire | null }
  | { t: "team"; team: string }
  | { t: "ready"; ready: boolean }
  /** Host only: a state snapshot (opaque to the server, relayed as-is) plus the score for the live list. */
  | { t: "snap"; d: string; score: [number, number]; half: number; clock: number }
  /** Guest only: input, relayed to the host. */
  | { t: "in"; d: string }
  | { t: "react"; e: string }
  /** Each player reports the final score; a ranked result counts when both reports agree. */
  | { t: "end"; score: [number, number] };

// ---- room -> client ----
export type ServerMsg =
  | { t: "joined"; role: "player" | "spectator"; seat: 0 | 1 | null; mode: OnlineMode; code: string }
  | { t: "lobby"; players: RoomPlayer[]; spectators: number; watchable: boolean }
  | { t: "start"; start: MatchStart }
  | { t: "snap"; d: string }
  | { t: "in"; d: string }
  | { t: "react"; e: string; from: string }
  | { t: "spectators"; count: number }
  | { t: "peer"; seat: 0 | 1; connected: boolean }
  | { t: "result"; score: [number, number]; ranked?: { delta: [number, number]; rating: [number, number] }; forfeit?: 0 | 1 }
  | { t: "error"; code: string; message: string };

// ---- matchmaking (client <-> lobby queue socket) ----
export type QueueMsg =
  | { t: "queued"; mode: OnlineMode; band: "tight" | "expanded" | "open"; waiting: number }
  | { t: "matched"; code: string; seat: 0 | 1; opponent: PlayerCard }
  | { t: "error"; code: string; message: string };

/** A match on the live list. */
export interface LiveMatch {
  code: string;
  mode: OnlineMode;
  home: PlayerCard;
  away: PlayerCard;
  score: [number, number];
  half: number;
  clock: number;
  spectators: number;
  startedAt: number;
}

export interface RankRow {
  rank: number;
  id: string;
  name: string;
  rating: number;
  wins: number;
  draws: number;
  losses: number;
}

/** Elo with K = 32. `score` is 1 for a win, 0.5 for a draw, 0 for a loss, from A's point of view. */
export function elo(ra: number, rb: number, score: number, k = 32): [number, number] {
  const ea = 1 / (1 + 10 ** ((rb - ra) / 400));
  const d = Math.round(k * (score - ea));
  return [d, -d];
}

/**
 * Matchmaking bands, like a widening search: within ±100 rating for the first 10 s, ±250 until 25 s, then anyone.
 * Quick matches ignore rating.
 */
export function bandFor(mode: OnlineMode, waitedMs: number): { band: "tight" | "expanded" | "open"; range: number } {
  if (mode !== "ranked" || waitedMs >= 25_000) return { band: "open", range: Infinity };
  return waitedMs >= 10_000 ? { band: "expanded", range: 250 } : { band: "tight", range: 100 };
}

/** Room codes: 5 characters, no look-alikes (0/O, 1/I/L). */
export const CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export function isRoomCode(s: string) {
  return /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{5}$/.test(s);
}
