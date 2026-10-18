import type { MatchSim, UserInput } from "../game/match/MatchSim";
import type { SimEvent } from "../game/sim/GameSim";
import type { Phase } from "../game/match/MatchSim";

// Host -> guest/spectators: the match state about 20 times a second. Guest -> host: input.
// Kept as compact JSON (about 0.5 kB per snapshot for 5-a-side).

/** Snapshot of everything the other player's screen needs to draw the match and play its sounds. */
export interface Snap {
  /** Host simulation time (s). */
  t: number;
  ph: Phase;
  sc: [number, number];
  hf: number;
  cl: number;
  msg: string;
  own: number;
  hold: number;
  ctrl: [number, number];
  win: number | null;
  goal: number;
  /** Ball: position and spin. */
  b: number[];
  /** Per player: x, z, yaw, vx, vz, yaw rate, gait phase. */
  p: number[];
  /** Sound and animation events since the previous snapshot. */
  ev: SimEvent[];
  /** Stats for the full-time screen: per team [shots, onTarget, passes, passesCompleted, tackles, tacklesWon, saves, possession, goals]. */
  st: number[][];
}

const r3 = (x: number) => Math.round(x * 1000) / 1000;
const KEEP: SimEvent["type"][] = ["action", "kick", "touch", "hit", "tackle", "save", "goal"];

export function encodeSnap(sim: MatchSim, events: SimEvent[]): string {
  const b = sim.physics.ballPos, w = sim.physics.ball.angvel();
  const p: number[] = [];
  for (const q of sim.players) p.push(r3(q.pos.x), r3(q.pos.z), r3(q.yaw), r3(q.vel.x), r3(q.vel.z), r3(q.yawRate), r3(q.gait));
  const s: Snap = {
    t: r3(sim.time), ph: sim.phase, sc: [...sim.score] as [number, number], hf: sim.half, cl: r3(sim.clock), msg: sim.message,
    own: sim.owner?.id ?? -1, hold: sim.holder?.id ?? -1, ctrl: [sim.ctrl[0]?.id ?? -1, sim.ctrl[1]?.id ?? -1], win: sim.winner, goal: sim.lastGoalBy,
    b: [r3(b.x), r3(b.y), r3(b.z), r3(w.x), r3(w.y), r3(w.z)], p,
    ev: events.filter((e) => KEEP.includes(e.type)).map((e) => (e.type === "kick" ? { ...e, gap: undefined } : e)),
    st: sim.stats.map((x) => [x.shots, x.onTarget, x.passes, x.passesCompleted, x.tackles, x.tacklesWon, x.saves, x.possession, x.goals]),
  };
  return JSON.stringify(s);
}

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
function lerpAngle(a: number, b: number, k: number) {
  let d = b - a;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  return a + d * k;
}
function lerpPhase(a: number, b: number, k: number) {
  let d = b - a;
  if (d < -0.5) d += 1;
  if (d > 0.5) d -= 1;
  return (((a + d * k) % 1) + 1) % 1;
}

/**
 * Plays the host's snapshots on a MatchSim that is never stepped locally. It draws the match a little behind the
 * newest snapshot (DELAY) and interpolates between the two around that moment, so 20 updates a second look smooth
 * and a late packet does not make players jump.
 */
export class SnapPlayer {
  static readonly DELAY = 0.12;
  private buf: Snap[] = [];
  private playT = -1;
  private evApplied = -1;
  /** Seconds since the last snapshot arrived (connection health). */
  quietFor = 0;

  push(raw: string) {
    const s = JSON.parse(raw) as Snap;
    if (this.buf.length && s.t <= this.buf[this.buf.length - 1].t) return;
    this.buf.push(s);
    if (this.buf.length > 40) this.buf.shift();
    this.quietFor = 0;
  }

  get latest() {
    return this.buf[this.buf.length - 1] ?? null;
  }

  /** Advances playback by dt and writes the interpolated state into `sim`. Returns the events that became due. */
  apply(sim: MatchSim, dt: number): SimEvent[] {
    this.quietFor += dt;
    if (!this.buf.length) return [];
    const newest = this.buf[this.buf.length - 1].t;
    if (this.playT < 0) this.playT = newest - SnapPlayer.DELAY;
    this.playT += dt;
    // stay near the target delay: catch up if far behind, wait if we ran ahead of the data
    const lag = newest - this.playT;
    if (lag > SnapPlayer.DELAY * 4) this.playT = newest - SnapPlayer.DELAY;
    if (lag < 0) this.playT = newest;
    let i = this.buf.findIndex((s) => s.t >= this.playT);
    if (i < 0) i = this.buf.length - 1;
    const b = this.buf[i], a = this.buf[Math.max(0, i - 1)];
    const k = b.t > a.t ? Math.min(1, Math.max(0, (this.playT - a.t) / (b.t - a.t))) : 1;
    sim.players.forEach((q, j) => {
      const o = j * 7;
      q.pos = { x: lerp(a.p[o], b.p[o], k), z: lerp(a.p[o + 1], b.p[o + 1], k) };
      q.yaw = lerpAngle(a.p[o + 2], b.p[o + 2], k);
      q.vel = { x: lerp(a.p[o + 3], b.p[o + 3], k), z: lerp(a.p[o + 4], b.p[o + 4], k) };
      q.yawRate = b.p[o + 5];
      q.gaitPrev = q.gait;
      q.gait = lerpPhase(a.p[o + 6], b.p[o + 6], k);
    });
    sim.physics.setBall(
      { x: lerp(a.b[0], b.b[0], k), y: lerp(a.b[1], b.b[1], k), z: lerp(a.b[2], b.b[2], k) },
      { x: 0, y: 0, z: 0 },
      { x: b.b[3], y: b.b[4], z: b.b[5] },
    );
    // discrete state from the snapshot being shown
    const s = k < 0.5 ? a : b;
    sim.phase = s.ph;
    sim.score = [...s.sc] as [number, number];
    sim.half = s.hf;
    sim.clock = s.cl;
    sim.message = s.msg;
    sim.winner = s.win;
    sim.lastGoalBy = s.goal;
    sim.owner = s.own >= 0 ? sim.players[s.own] : null;
    sim.holder = s.hold >= 0 ? sim.players[s.hold] : null;
    for (const t of [0, 1] as const) {
      const id = s.ctrl[t];
      if ((sim.ctrl[t]?.id ?? -1) !== id) sim.setControlled(id >= 0 ? sim.players[id] : null, t);
    }
    s.st.forEach((x, t) => {
      const d = sim.stats[t];
      [d.shots, d.onTarget, d.passes, d.passesCompleted, d.tackles, d.tacklesWon, d.saves, d.possession, d.goals] = x;
    });
    // events of every snapshot the playback has now passed, once each
    const due: SimEvent[] = [];
    for (const x of this.buf) if (x.t > this.evApplied && x.t <= this.playT) due.push(...x.ev);
    if (this.playT > this.evApplied) this.evApplied = Math.max(this.evApplied, ...this.buf.filter((x) => x.t <= this.playT).map((x) => x.t));
    return due;
  }
}

// ---- guest input ----

/** Input as sent to the host: the stick and sprint every time, the button releases once. */
export function encodeInput(inp: UserInput, seq: number): string {
  return JSON.stringify({ q: seq, ...inp, move: [r3(inp.move.x), r3(inp.move.z)] });
}

export function decodeInput(raw: string): { seq: number; inp: UserInput } {
  const o = JSON.parse(raw) as Omit<UserInput, "move"> & { q: number; move: [number, number] };
  const m = { x: Number(o.move?.[0]) || 0, z: Number(o.move?.[1]) || 0 };
  const l = Math.hypot(m.x, m.z);
  const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : undefined);
  return {
    seq: Number(o.q) || 0,
    inp: {
      move: l > 1 ? { x: m.x / l, z: m.z / l } : m,
      sprint: !!o.sprint,
      pass: num(o.pass), shoot: num(o.shoot), lob: num(o.lob), through: num(o.through), throughLofted: !!o.throughLofted,
      switchPlayer: !!o.switchPlayer,
    },
  };
}
