import { BALL_R, SIM_DT } from "../../physics/constants";
import { PRACTICE_PITCH } from "../pitch";
import { TEAMS, type Team } from "../teams";
import type { Difficulty } from "../match/rules";
import { DEFAULT_CONTACTS, GameSim, type ContactTimes } from "./GameSim";
import { jitter, shotLift } from "./kick";
import { len, SimPlayer, sub, v2, yawOf, type V2 } from "./SimPlayer";

export type PenaltyMode = "shootout" | "practice";
export type KickResult = "goal" | "saved" | "miss";
export type PenaltyPhase = "aim" | "runup" | "flight" | "result" | "over";

/** Input for one frame: the stick (screen right/up), a shoot release with its power, a dive. */
export interface PenaltyInput {
  stick: { x: number; y: number };
  shoot?: number;
  dive?: boolean;
}

const SPOT_DIST = 8;
/** How far a diving keeper reaches sideways (m) and how long the dive takes to get there (s). */
const DIVE_REACH = 2.3, DIVE_TIME = 0.42, STAND_REACH = 0.75;
/** CPU keeper: chance of guessing the right way, by difficulty. */
const GUESS: Record<Difficulty, number> = { easy: 0.3, normal: 0.42, hard: 0.55 };
/** CPU kicker: shooting skill by difficulty. */
const CPU_SKILL: Record<Difficulty, number> = { easy: 0.62, normal: 0.75, hard: 0.86 };

/**
 * Penalties against the CPU. Shootout: five kicks each, taken in turn, then sudden death; the match ends as soon as
 * one side can't be caught. Practice: you take every kick against the CPU keeper and keep a streak.
 *
 * Aiming: move the aim point across the goal (and up) with the stick, hold shoot for power and release. More power is
 * faster but less accurate and rises, so a full-power shot can fly over. Keeping: dive with the stick held left or
 * right (or hold it centre to stand), at the right moment.
 */
export class PenaltySim extends GameSim {
  readonly teams: [Team, Team];
  readonly kickers: [SimPlayer, SimPlayer];
  readonly keepers: [SimPlayer, SimPlayer];
  readonly kicks: { team: 0 | 1; result: KickResult }[] = [];
  phase: PenaltyPhase = "aim";
  phaseT = 0;
  turn: 0 | 1;
  /** Aim point: z across the goal (−1..1, screen left to right), y height (0 low .. 1 high). */
  aim = { z: 0, y: 0.35 };
  winner: 0 | 1 | null = null;
  message = "";
  streak = 0;
  best = 0;
  private cpuPlan: { z: number; y: number; power: number } | null = null;
  private dive: { dir: -1 | 0 | 1; t: number; from: number } | null = null;
  private keeperDecided = false;
  private shotAt = 0;
  private crossed = false;
  private result: KickResult | null = null;

  constructor(
    readonly mode: PenaltyMode,
    readonly difficulty: Difficulty = "normal",
    home = "onipanu",
    away = "mushin",
    readonly userTeam: 0 | 1 = 0,
    contacts: ContactTimes = DEFAULT_CONTACTS,
    seed = 3,
  ) {
    super(PRACTICE_PITCH, contacts, seed);
    this.teams = [TEAMS.find((t) => t.id === home) ?? TEAMS[0], TEAMS.find((t) => t.id === away) ?? TEAMS[1]];
    const attrs = (t: Team, skill: number) => ({ pace: t.attrs.pace / 100, control: 0.8, passing: t.attrs.passing / 100, shooting: Math.min(0.95, skill), defending: 0.6, keeping: t.attrs.keeping / 100 });
    const k0 = this.addPlayer(new SimPlayer(0, 0, v2(), attrs(this.teams[0], 0.8), "Kicker"));
    const k1 = this.addPlayer(new SimPlayer(1, 1, v2(), attrs(this.teams[1], CPU_SKILL[difficulty]), "Kicker"));
    const g0 = this.addPlayer(new SimPlayer(2, 0, v2(), attrs(this.teams[0], 0.5), "Keeper"));
    const g1 = this.addPlayer(new SimPlayer(3, 1, v2(), attrs(this.teams[1], 0.5), "Keeper"));
    g0.role = g1.role = "gk";
    this.kickers = [k0, k1];
    this.keepers = [g0, g1];
    for (const p of this.players) p.touchLock = 1e9; // nobody dribbles: the kick is applied directly
    this.turn = mode === "practice" ? userTeam : 0;
    this.setUp();
  }

  get L() {
    return this.pitch.length / 2;
  }
  get spot(): V2 {
    return { x: this.L - SPOT_DIST, z: 0 };
  }
  get kicker() {
    return this.kickers[this.turn];
  }
  /** The keeper facing this kick (the other side's). */
  get keeper() {
    return this.keepers[(1 - this.turn) as 0 | 1];
  }
  get userKicking() {
    return this.turn === this.userTeam;
  }
  goals(team: 0 | 1) {
    return this.kicks.filter((k) => k.team === team && k.result === "goal").length;
  }
  taken(team: 0 | 1) {
    return this.kicks.filter((k) => k.team === team).length;
  }

  private setUp() {
    const s = this.spot, L = this.L;
    this.physics.setBall({ x: s.x, y: BALL_R, z: 0 });
    const k = this.kicker, g = this.keeper;
    k.pos = { x: s.x - 2.6, z: -0.9 };
    k.yaw = yawOf(sub(s, k.pos));
    g.pos = { x: L - 0.45, z: 0 };
    g.yaw = yawOf({ x: -1, z: 0 });
    // the two waiting players stand at the side
    const others = this.players.filter((p) => p !== k && p !== g);
    others.forEach((p, i) => {
      p.pos = { x: s.x - 7, z: 6 + i * 1.5 };
      p.yaw = yawOf({ x: 1, z: -0.5 });
    });
    for (const p of this.players) {
      p.vel = v2();
      p.intent = { move: v2(), sprint: false };
      p.pending = null;
    }
    this.phase = "aim";
    this.phaseT = 0;
    this.aim = { z: 0, y: 0.35 };
    this.cpuPlan = null;
    this.dive = null;
    this.keeperDecided = false;
    this.crossed = false;
    this.result = null;
    const n = this.kicks.length + 1;
    this.message =
      this.mode === "practice"
        ? "Aim with the stick, hold shoot for power, release"
        : this.userKicking
          ? `Kick ${Math.ceil(n / 2)} — your shot: aim, hold shoot, release`
          : `Kick ${Math.ceil(n / 2)} — you're in goal: dive left or right as they shoot`;
  }

  applyInput(inp: PenaltyInput, dt: number) {
    if (this.userKicking) {
      if (this.phase !== "aim") return;
      this.aim.z = Math.max(-1, Math.min(1, this.aim.z + inp.stick.x * dt * 1.6));
      this.aim.y = Math.max(0, Math.min(1, this.aim.y + inp.stick.y * dt * 1.2));
      if (inp.shoot !== undefined) this.startRunup(this.aim.z, this.aim.y, inp.shoot);
    } else if (inp.dive && !this.dive && (this.phase === "runup" || this.phase === "flight")) {
      // screen right is +z from behind the kicker
      this.startDive(Math.abs(inp.stick.x) < 0.3 ? 0 : (Math.sign(inp.stick.x) as -1 | 1));
    }
  }

  private startRunup(z: number, y: number, power: number) {
    this.phase = "runup";
    this.phaseT = 0;
    this.cpuPlan = { z, y, power: Math.max(0.15, Math.min(1, power)) };
  }

  private startDive(dir: -1 | 0 | 1) {
    const g = this.keeper;
    this.dive = { dir, t: this.time, from: g.pos.z };
    // keeper faces −x, so his left is +z
    this.events.push({ type: "action", player: g.id, action: dir === 0 ? "save" : dir > 0 ? "diveL" : "diveR" });
  }

  /** Where the keeper's centre is now, given his dive. */
  private keeperZ() {
    const d = this.dive;
    if (!d || d.dir === 0) return this.keeper.pos.z;
    const k = Math.min(1, (this.time - d.t) / DIVE_TIME);
    return d.from + d.dir * DIVE_REACH * Math.sin((k * Math.PI) / 2);
  }

  protected beforeStep(dt: number) {
    this.phaseT += dt;
    const k = this.kicker;
    if (this.phase === "aim" && !this.userKicking && this.phaseT > 1.3 && !this.cpuPlan) {
      // CPU kicker: mostly corners, sometimes down the middle
      const r = this.rand();
      const z = r < 0.15 ? jitter(this.rand) * 0.2 : (this.rand() < 0.5 ? -1 : 1) * (0.55 + this.rand() * 0.4);
      this.startRunup(z, this.rand() * 0.75, 0.45 + this.rand() * 0.4);
    }
    if (this.phase === "runup" && this.cpuPlan && !k.pending) {
      // walk up to where the striking foot meets the ball, then strike
      const ball = this.ball2(), cp = this.contactPoint(k, "shoot");
      const stand = { x: k.pos.x + (ball.x - cp.x), z: k.pos.z + (ball.z - cp.z) };
      const d = sub(stand, k.pos), l = len(d);
      k.yaw = yawOf({ x: this.L - ball.x, z: this.cpuPlan.z * 1.5 - ball.z });
      if (l > 0.08 && this.phaseT < 3) k.intent = { move: { x: (d.x / l) * Math.min(1, l / 0.8 + 0.3), z: (d.z / l) * Math.min(1, l / 0.8 + 0.3) }, sprint: false };
      else {
        k.intent = { move: v2(), sprint: false };
        const plan = this.cpuPlan;
        this.schedule(k, "shoot", this.contacts.shoot, () => this.strikeBall(plan));
        // CPU keeper commits around the moment of contact, guessing right with a chance set by difficulty
        if (this.userKicking && !this.keeperDecided) {
          this.keeperDecided = true;
          const right = this.rand() < GUESS[this.difficulty];
          const shotSide = Math.abs(plan.z) < 0.25 ? 0 : (Math.sign(plan.z) as -1 | 1);
          const dir = right ? shotSide : ([-1, 0, 1].filter((x) => x !== shotSide)[Math.floor(this.rand() * 2)] as -1 | 0 | 1);
          setTimeout0(this, this.contacts.shoot - 0.05 + this.rand() * 0.12, () => !this.dive && this.startDive(dir));
        }
      }
    }
    this.runTimers(dt);
    // the diving keeper's body follows the dive
    if (this.dive && this.dive.dir !== 0) this.keeper.pos = { x: this.keeper.pos.x, z: this.keeperZ() };
  }

  private strikeBall(plan: { z: number; y: number; power: number }) {
    const k = this.kicker, b = this.physics.ballPos;
    const gw = this.pitch.goalWidth / 2, gh = this.pitch.goalHeight;
    const skill = k.attrs.shooting, p = plan.power;
    // error grows with power and shrinks with skill; power also lifts the shot
    const err = (0.12 + p * p * 0.9) * (1.25 - skill);
    const tz = plan.z * (gw - 0.25) + jitter(this.rand) * err;
    const ty = Math.max(0.12, 0.2 + plan.y * (gh - 0.45) + p * p * 0.7 + jitter(this.rand) * err * 0.6);
    const vh = 15 + p * 13;
    const tx = this.L + 0.2, dist = Math.hypot(tx - b.x, tz - b.z);
    const vy = shotLift(vh, dist, ty, b.y) ?? vh * 0.2;
    const dir = { x: (tx - b.x) / dist, z: (tz - b.z) / dist };
    this.physics.kick({ x: dir.x * vh, y: vy, z: dir.z * vh });
    this.events.push({ type: "kick", player: k.id, kind: "shot", speed: Math.hypot(vh, vy) });
    this.phase = "flight";
    this.phaseT = 0;
    this.shotAt = this.time;
  }

  protected afterStep() {
    if (this.phase !== "flight") return;
    const b = this.physics.ballPos, v = this.physics.ballVel, g = this.keeper;
    // the keeper's plane: within reach, it's saved
    if (!this.crossed && b.x >= g.pos.x - 0.1) {
      this.crossed = true;
      const reach = this.dive && this.dive.dir !== 0 ? 0.75 : STAND_REACH + (this.dive ? 0.25 : 0);
      const dz = Math.abs(b.z - this.keeperZ()), high = b.y < 2.25;
      if (dz < reach && high) {
        this.physics.kick({ x: -Math.abs(v.x) * 0.25, y: 2.5, z: Math.sign(b.z - this.keeperZ() || 1) * 3.5 });
        this.events.push({ type: "save", player: g.id, kind: "parry" });
        return this.finishKick("saved");
      }
    }
    if (this.physics.goalCheck()) return this.finishKick("goal");
    if (b.x > this.L + 0.4 || this.time - this.shotAt > 2.5 || (len({ x: v.x, z: v.z }) < 0.4 && this.time - this.shotAt > 0.6)) this.finishKick("miss");
  }

  private finishKick(r: KickResult) {
    if (this.result) return;
    this.result = r;
    this.kicks.push({ team: this.turn, result: r });
    if (r === "goal") this.events.push({ type: "goal", side: 1, scorer: this.kicker.id });
    if (this.mode === "practice") {
      this.streak = r === "goal" ? this.streak + 1 : 0;
      this.best = Math.max(this.best, this.streak);
    }
    this.message = r === "goal" ? "Goal!" : r === "saved" ? "Saved!" : "Missed!";
    this.phase = "result";
    this.phaseT = 0;
    setTimeout0(this, 2.2, () => this.nextKick());
  }

  private nextKick() {
    if (this.mode === "practice") return this.setUp();
    const w = this.decided();
    if (w !== null) {
      this.winner = w;
      this.phase = "over";
      this.message = `${this.teams[w].name} win the shootout ${this.goals(0)}–${this.goals(1)}`;
      return;
    }
    this.turn = (1 - this.turn) as 0 | 1;
    this.setUp();
  }

  /** The winner once it can't change: during the first five each, or after an even number of sudden-death kicks. */
  decided(): 0 | 1 | null {
    const g = [this.goals(0), this.goals(1)], t = [this.taken(0), this.taken(1)];
    if (t[0] <= 5 && t[1] <= 5) {
      const left = [5 - t[0], 5 - t[1]];
      if (g[0] > g[1] + left[1]) return 0;
      if (g[1] > g[0] + left[0]) return 1;
      if (t[0] === 5 && t[1] === 5 && g[0] !== g[1]) return g[0] > g[1] ? 0 : 1;
      return null;
    }
    if (t[0] === t[1] && g[0] !== g[1]) return g[0] > g[1] ? 0 : 1;
    return null;
  }

  // small timer list in simulation time (no real setTimeout, so tests and replays stay deterministic)
  private timers: { at: number; f: () => void }[] = [];
  /** @internal */
  addTimer(after: number, f: () => void) {
    this.timers.push({ at: this.time + after, f });
  }
  private runTimers(_dt: number) {
    const due = this.timers.filter((t) => t.at <= this.time);
    this.timers = this.timers.filter((t) => t.at > this.time);
    for (const t of due) t.f();
  }

  /** Steps until the current kick is resolved (tests). */
  runFor(seconds: number) {
    for (let i = 0; i < Math.round(seconds / SIM_DT); i++) this.fixedStep(SIM_DT);
  }
}

function setTimeout0(sim: PenaltySim, after: number, f: () => void) {
  sim.addTimer(after, f);
}
