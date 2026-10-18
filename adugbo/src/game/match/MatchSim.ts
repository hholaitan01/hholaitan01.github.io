import { BALL_R, GRAVITY } from "../../physics/constants";
import { DIFFICULTY, type DifficultyParams } from "../../ai/difficulty";
import { TeamAI } from "../../ai/TeamAI";
import { TEAMS, type Team } from "../teams";
import { DEFAULT_CONTACTS, GameSim, type ContactTimes } from "../sim/GameSim";
import { SimPlayer, fwd, len, norm, sub, v2, yawOf, type V2 } from "../sim/SimPlayer";
import { FOURPOST_MAX_HEIGHT, pitchFor, type Difficulty, type MatchConfig } from "./rules";

export type Phase = "kickoff" | "play" | "restart" | "goal" | "halftime" | "fulltime";
export type RestartType = "kickoff" | "kickin" | "corner" | "goalkick";

export interface Restart {
  type: RestartType;
  team: number;
  spot: V2;
  taker: SimPlayer | null;
}

export interface TeamStats {
  goals: number;
  shots: number;
  onTarget: number;
  passes: number;
  passesCompleted: number;
  tackles: number;
  tacklesWon: number;
  saves: number;
  possession: number;
}

const emptyStats = (): TeamStats => ({ goals: 0, shots: 0, onTarget: 0, passes: 0, passesCompleted: 0, tackles: 0, tacklesWon: 0, saves: 0, possession: 0 });

/** Formation slots as fractions (x: own goal −1 … +1 opponent goal; z: −1 … +1 across), outfield only. */
const SHAPES: Record<number, [number, number][]> = {
  2: [[-0.4, 0], [0.25, 0]],
  3: [[-0.45, 0], [0.0, 0.45], [0.3, -0.35]],
  4: [[-0.5, 0], [-0.05, 0.5], [-0.05, -0.5], [0.35, 0]],
  5: [[-0.5, 0.3], [-0.5, -0.3], [0.0, 0], [0.35, 0.45], [0.35, -0.45]],
  6: [[-0.55, 0.35], [-0.55, -0.35], [-0.1, 0.55], [-0.1, 0], [-0.1, -0.55], [0.4, 0]],
};

export interface UserInput {
  move: V2;
  sprint: boolean;
  /** Released this frame, with hold power 0..1. */
  pass?: number;
  shoot?: number;
  lob?: number;
  /** Pressed this frame. */
  switchPlayer?: boolean;
}

/** A full match: two teams, keepers, rules, restarts, clock, stats, user control and CPU AI. */
export class MatchSim extends GameSim {
  readonly cfg: MatchConfig;
  readonly teams: [Team, Team];
  readonly squads: [SimPlayer[], SimPlayer[]] = [[], []];
  readonly keepers: [SimPlayer | null, SimPlayer | null] = [null, null];
  readonly ai: [TeamAI, TeamAI];
  /** CPU difficulty (the opponent's). */
  readonly diff: DifficultyParams;
  /** Behaviour parameters per team: the CPU side uses the chosen difficulty, the user's AI team-mates play at normal. */
  readonly teamDiff: [DifficultyParams, DifficultyParams];
  phase: Phase = "kickoff";
  restart: Restart | null = null;
  half = 1;
  clock = 0;
  readonly halfLength: number;
  score: [number, number] = [0, 0];
  stats: [TeamStats, TeamStats] = [emptyStats(), emptyStats()];
  phaseTime = 0;
  controlled: SimPlayer | null = null;
  firstKickoff: number;
  /** +1 if team attacks +x. Teams keep their ends for the whole match. */
  readonly dir: [number, number] = [1, -1];
  private keeperReacting: SimPlayer | null = null;
  private lastBallX = 0;
  winner: number | null = null;
  message = "";

  constructor(
    cfg: MatchConfig,
    contacts: ContactTimes = DEFAULT_CONTACTS,
    seed = 11,
    opts: { userControlled?: boolean; teamDifficulty?: [Difficulty, Difficulty] } = {},
  ) {
    super(pitchFor(cfg), contacts, seed);
    this.cfg = cfg;
    this.diff = DIFFICULTY[cfg.difficulty];
    const td = opts.teamDifficulty ?? (cfg.userTeam === 0 ? ["normal", cfg.difficulty] : [cfg.difficulty, "normal"]);
    this.teamDiff = [DIFFICULTY[td[0]], DIFFICULTY[td[1]]];
    this.teams = [TEAMS.find((t) => t.id === cfg.home) ?? TEAMS[0], TEAMS.find((t) => t.id === cfg.away) ?? TEAMS[1]];
    this.halfLength = cfg.halfMinutes * 60;
    let id = 0;
    for (const t of [0, 1] as const) {
      const team = this.teams[t], a = team.attrs;
      const sk = this.teamDiff[t].skill, pc = this.teamDiff[t].pace;
      const n = cfg.playersPerSide;
      for (let i = 0; i < n; i++) {
        const gk = cfg.keepers && i === 0;
        const vary = (k: number) => Math.min(0.99, Math.max(0.3, (k / 100) * (0.92 + this.rand() * 0.16)));
        const attrs = {
          pace: vary(a.pace) * pc,
          control: Math.min(0.99, vary((a.passing + a.shooting) / 2) * sk),
          passing: Math.min(0.99, vary(a.passing) * sk),
          shooting: Math.min(0.99, vary(a.shooting) * sk),
          defending: Math.min(0.99, vary(a.defending) * sk),
          keeping: vary(a.keeping),
        };
        const p = this.addPlayer(new SimPlayer(id++, t, v2(), attrs, `${team.name.split(" ")[0]} ${i + 1}`));
        if (gk) {
          p.role = "gk";
          this.keepers[t] = p;
        }
        this.squads[t].push(p);
      }
    }
    this.ai = [new TeamAI(this, 0), new TeamAI(this, 1)];
    this.firstKickoff = this.rand() < 0.5 ? 0 : 1;
    // control must exist before the kick-off so the user is handed the taker when it is his side's kick-off
    if (opts.userControlled !== false) this.setControlled(this.squads[cfg.userTeam].find((p) => p.role === "field") ?? null);
    this.startKickoff(this.firstKickoff);
  }

  get userTeam() {
    return this.cfg.userTeam;
  }
  get L() {
    return this.pitch.length / 2;
  }
  get W() {
    return this.pitch.width / 2;
  }

  /** Centre of the goal a team attacks. */
  attackGoal(team: number): V2 {
    return { x: this.dir[team] * this.L, z: 0 };
  }
  ownGoal(team: number): V2 {
    return { x: -this.dir[team] * this.L, z: 0 };
  }

  /** Formation slot for a player, shifted with the ball and the phase of play. */
  slot(p: SimPlayer): V2 {
    const t = p.team, d = this.dir[t];
    const field = this.squads[t].filter((q) => q.role === "field");
    const shape = SHAPES[Math.min(6, Math.max(2, field.length))] ?? SHAPES[4];
    const i = field.indexOf(p);
    const [fx, fz] = shape[i % shape.length];
    const ball = this.ball2();
    const attacking = this.owner?.team === t;
    const push = attacking ? 0.22 : this.owner ? -0.12 : 0;
    const x = d * (fx + push) * this.L * 0.9 + ball.x * 0.35;
    const z = fz * this.W * 0.8 + ball.z * 0.25;
    return { x: Math.max(-this.L + 1.5, Math.min(this.L - 1.5, x)), z: Math.max(-this.W + 1.2, Math.min(this.W - 1.2, z)) };
  }

  setControlled(p: SimPlayer | null) {
    if (this.controlled) this.controlled.controlled = false;
    this.controlled = p;
    if (p) {
      p.controlled = true;
      p.face = null;
    }
  }

  /** Teammate nearest the ball (excluding the current one and, unless holding, the keeper). */
  nearestToBall(team: number, exclude: SimPlayer | null = null): SimPlayer | null {
    const b = this.ball2();
    let best: SimPlayer | null = null, bd = Infinity;
    for (const p of this.squads[team]) {
      if (p === exclude || (p.role === "gk" && this.holder !== p)) continue;
      const d = len(sub(p.pos, b));
      if (d < bd) {
        bd = d;
        best = p;
      }
    }
    return best;
  }

  // ---- phases -------------------------------------------------------------------------------------------------

  private placeForKickoff(kicking: number) {
    for (const t of [0, 1] as const)
      for (const p of this.squads[t]) {
        const d = this.dir[t];
        if (p.role === "gk") p.pos = { x: -d * (this.L - 0.8), z: 0 };
        else {
          const s = this.slot(p);
          // everyone in their own half; the non-kicking team outside the centre circle
          let x = -d * Math.max(1.5, Math.abs(s.x) * 0.7);
          if (t !== kicking && Math.hypot(x, s.z) < 3.4) x = -d * 3.6;
          p.pos = { x, z: s.z * 0.8 };
        }
        p.vel = v2();
        p.yaw = yawOf({ x: d, z: 0 });
        p.pending = null;
        p.stun = 0;
      }
    const taker = this.squads[kicking].filter((p) => p.role === "field").sort((a, b) => len(a.pos) - len(b.pos))[0];
    taker.pos = { x: -this.dir[kicking] * 0.6, z: 0 };
    taker.yaw = yawOf({ x: this.dir[kicking], z: 0 });
    return taker;
  }

  startKickoff(team: number) {
    this.holder = null;
    this.setOwner(null);
    this.passTarget = null;
    this.physics.setBall({ x: 0, y: BALL_R, z: 0 });
    const taker = this.placeForKickoff(team);
    this.phase = "kickoff";
    this.phaseTime = 0;
    this.restart = { type: "kickoff", team, spot: v2(), taker };
    if (team === this.cfg.userTeam && this.controlled) this.setControlled(taker);
    this.message = `Kick-off: ${this.teams[team].name}` + (team === this.cfg.userTeam && this.controlled ? " — pass to start" : "");
  }

  private startRestart(type: RestartType, team: number, spot: V2) {
    this.holder = null;
    this.setOwner(null);
    this.passTarget = null;
    // a kick or tackle still winding up when the ball went out must not hit the restart ball
    for (const p of this.players) p.pending = null;
    this.physics.setBall({ x: spot.x, y: BALL_R, z: spot.z });
    const k = this.keepers[team];
    const taker = type === "goalkick" && k ? k : this.squads[team].filter((p) => p.role === "field").sort((a, b) => len(sub(a.pos, spot)) - len(sub(b.pos, spot)))[0];
    // the taker walks up to the ball; place him just behind it
    const toward = norm(sub({ x: 0, z: 0 }, spot));
    taker.pos = { x: spot.x - toward.x * 0.6, z: spot.z - toward.z * 0.6 };
    taker.vel = v2();
    taker.yaw = yawOf(toward);
    this.restart = { type, team, spot, taker };
    this.phase = "restart";
    this.phaseTime = 0;
    if (team === this.cfg.userTeam && this.controlled) this.setControlled(taker);
    this.message =
      { kickoff: "Kick-off", kickin: "Kick-in", corner: "Corner", goalkick: "Goal kick" }[type] +
      `: ${this.teams[team].name}` +
      (team === this.cfg.userTeam && this.controlled === taker ? " — pass or shoot to take it" : "");
  }

  /** Opponents must keep 4 m from a dead ball (and stay out of the centre circle / their half at kick-off). */
  private enforceDistance() {
    const r = this.restart;
    if (!r) return;
    const ball = this.ball2();
    for (const p of this.players) {
      if (p.team === r.team) continue;
      const d = sub(p.pos, ball), l = len(d);
      const min = r.type === "kickoff" ? 3.2 : 4;
      if (l < min) {
        const n = l > 0.01 ? norm(d) : norm({ x: -this.dir[r.team], z: 0.3 });
        p.pos = { x: ball.x + n.x * min, z: ball.z + n.z * min };
      }
      if (r.type === "kickoff" && Math.sign(p.pos.x) === this.dir[p.team] && Math.abs(p.pos.x) > 0.01) p.pos.x = -this.dir[p.team] * 0.3;
    }
  }

  protected beforeStep(dt: number) {
    this.phaseTime += dt;
    if (this.phase === "play" || this.phase === "restart" || this.phase === "kickoff") {
      this.clock += dt;
      if (this.owner) this.stats[this.owner.team].possession += dt;
    }
    if (this.phase === "goal" && this.phaseTime > 2.5) {
      if (this.isOver()) return this.finish();
      const conceded = this.lastGoalBy === 0 ? 1 : 0;
      this.startKickoff(conceded);
    }
    if (this.phase === "halftime" && this.phaseTime > 3) {
      this.half = 2;
      this.clock = 0;
      this.startKickoff(this.firstKickoff === 0 ? 1 : 0);
    }
    if ((this.phase === "play" || this.phase === "restart" || this.phase === "kickoff") && this.clock >= this.halfLength) {
      if (this.cfg.mode === "fourpost" || this.half === 2) return this.finish();
      this.phase = "halftime";
      this.phaseTime = 0;
      this.holder = null;
      this.setOwner(null);
      this.message = "Half-time";
    }
    if (this.phase === "fulltime" || this.phase === "halftime" || this.phase === "goal") {
      for (const p of this.players) p.intent = { move: v2(), sprint: false };
      if (this.phase === "goal") for (const p of this.players) p.pending = null;
      return;
    }
    this.ai[0].update(dt);
    this.ai[1].update(dt);
    if (this.phase === "kickoff" || this.phase === "restart") this.enforceDistance();
    this.keeperSaves();
  }

  lastGoalBy = 0;

  private isOver() {
    const t = this.cfg.targetScore;
    return (t !== null && Math.max(...this.score) >= t) || (this.clock >= this.halfLength && (this.half === 2 || this.cfg.mode === "fourpost"));
  }

  private finish() {
    this.phase = "fulltime";
    this.phaseTime = 0;
    this.holder = null;
    this.setOwner(null);
    this.winner = this.score[0] === this.score[1] ? null : this.score[0] > this.score[1] ? 0 : 1;
    this.message = this.winner === null ? "Full-time: draw" : `Full-time: ${this.teams[this.winner].name} win`;
  }

  protected afterStep() {
    const b = this.physics.ballPos;
    this.trackShot();
    // a restart ends when the taker plays the ball
    if ((this.phase === "kickoff" || this.phase === "restart") && this.restart?.taker) {
      const kicked = this.events.some((e) => e.type === "kick" && e.player === this.restart!.taker!.id);
      if (kicked) {
        this.phase = "play";
        this.restart = null;
      }
    }
    if (this.phase !== "play") {
      this.lastBallX = b.x;
      return;
    }
    // goals (four-post: the ball must cross below the height limit between the posts)
    let g = this.physics.goalCheck();
    if (this.pitch.goalStyle === "posts") {
      const crossed = Math.sign(b.x) * this.lastBallX <= this.L && Math.abs(b.x) > this.L;
      g = crossed && Math.abs(b.z) < this.pitch.goalWidth / 2 && b.y < FOURPOST_MAX_HEIGHT ? Math.sign(b.x) : 0;
    }
    this.lastBallX = b.x;
    if (g) {
      const team = this.dir[0] === g ? 0 : 1;
      this.score[team]++;
      this.stats[team].goals++;
      this.lastGoalBy = team;
      this.phase = "goal";
      this.phaseTime = 0;
      this.holder = null;
      this.setOwner(null);
      this.message = `GOAL! ${this.teams[team].name}`;
      this.events.push({ type: "goal", side: g, scorer: this.lastTouch?.id ?? null });
      return;
    }
    this.checkOutOfPlay();
  }

  private checkOutOfPlay() {
    const b = this.physics.ballPos, L = this.L, W = this.W;
    const last = this.lastTouch?.team ?? 0;
    if (this.pitch.walls) {
      // in the cage the only dead ball is one that escapes past the end boards beside a goal
      if (Math.abs(b.x) > L + 0.3 && Math.abs(b.z) > this.pitch.goalWidth / 2 + 0.2) this.goalLineOut(b.x > 0 ? 1 : -1, last);
      else if (Math.abs(b.z) > W + 1 || Math.abs(b.x) > L + 3) this.startRestart("kickin", 1 - last, { x: Math.max(-L + 1, Math.min(L - 1, b.x)), z: Math.sign(b.z) * (W - 0.5) });
      return;
    }
    if (Math.abs(b.z) > W + BALL_R) {
      this.startRestart("kickin", 1 - last, { x: Math.max(-L + 0.5, Math.min(L - 0.5, b.x)), z: Math.sign(b.z) * W });
    } else if (Math.abs(b.x) > L + BALL_R) this.goalLineOut(b.x > 0 ? 1 : -1, last);
  }

  /** Ball over the goal line at end `side`: corner if the defenders touched it last, otherwise a goal kick. */
  private goalLineOut(side: number, last: number) {
    const defending = this.dir[0] === side ? 1 : 0;
    const b = this.physics.ballPos;
    if (last === defending) this.startRestart("corner", 1 - defending, { x: side * (this.L - 0.3), z: Math.sign(b.z || 1) * (this.W - 0.3) });
    else this.startRestart("goalkick", defending, { x: side * (this.L - 2.5), z: 0 });
  }

  /** The shot currently in flight; the next thing that happens to it decides whether it was saved. */
  private liveShot: { team: number; at: number } | null = null;

  /**
   * Save accounting: a shot is saved if the opposing keeper is the next player to deal with it — a scripted save,
   * the ball striking his body, or him taking it with a first touch or in his hands.
   */
  private scanArr: unknown[] | null = null;
  private scanIdx = 0;

  private trackShot() {
    // only look at events added since the last step (the array is replaced when the view consumes it)
    if (this.scanArr !== this.events) {
      this.scanArr = this.events;
      this.scanIdx = 0;
    }
    const fresh = this.events.slice(this.scanIdx);
    this.scanIdx = this.events.length;
    for (const e of fresh) {
      if (e.type === "kick") {
        const p = this.players[e.player];
        this.liveShot = e.kind === "shot" || (e.kind === "header" && len(sub(p.pos, this.attackGoal(p.team))) < 12) ? { team: p.team, at: this.time } : null;
        continue;
      }
      const ls = this.liveShot;
      if (!ls) continue;
      let keeper: SimPlayer | null = null, other = false, kind: "block" | null = null;
      if (e.type === "save" && e.kind !== "miss") keeper = this.players[e.player];
      else if (e.type === "hit" && e.kind === "player" && e.player !== undefined) {
        const p = this.players[e.player];
        if (p.role === "gk" && p.team !== ls.team && e.speed > 4) {
          keeper = p;
          kind = "block";
        } else other = true;
      } else if (e.type === "touch" || (e.type === "possession" && e.player !== null)) {
        const p = this.players[e.player as number];
        if (p.role === "gk" && p.team !== ls.team) keeper = p;
        else other = true;
      } else if (e.type === "goal") other = true;
      if (keeper && keeper.team !== ls.team) {
        this.stats[keeper.team].saves++;
        this.stats[ls.team].onTarget++;
        if (kind) {
          this.events.push({ type: "save", player: keeper.id, kind });
          this.scanIdx = this.events.length;
        }
        this.lastTouch = keeper;
        this.liveShot = null;
      } else if (other) this.liveShot = null;
    }
    if (this.liveShot && this.time - this.liveShot.at > 3) this.liveShot = null;
  }

  // ---- goalkeeping -------------------------------------------------------------------------------------------

  /** Inside the keeper's handling area (6 m semicircle in front of his goal). */
  inKeeperArea(k: SimPlayer, at: V2 = this.ball2()) {
    return len(sub(at, this.ownGoal(k.team))) < 6.2;
  }

  /** Watches for shots on goal and makes keepers react: step across, dive, catch or parry. */
  private keeperSaves() {
    const b = this.physics.ballPos, v = this.physics.ballVel;
    for (const t of [0, 1] as const) {
      const k = this.keepers[t];
      if (!k || k.pending || k.stun > 0 || this.holder) continue;
      const goal = this.ownGoal(t), gx = goal.x;
      const towards = Math.sign(gx) * v.x;
      if (towards < 4 || this.owner) continue;
      const tLine = (gx - b.x) / v.x;
      if (tLine <= 0 || tLine > 1.1) continue;
      const zAt = b.z + v.z * tLine, yAt = b.y + v.y * tLine - 0.5 * GRAVITY * tLine * tLine;
      if (Math.abs(zAt) > this.pitch.goalWidth / 2 + 0.6 || yAt > this.pitch.goalHeight + 0.4) continue;
      // reaction: the keeper commits once the shot is close enough given his reaction time
      const kd = this.teamDiff[t];
      if (tLine > 0.25 + kd.keeperReaction + (1 - (k.attrs.keeping ?? 0.6)) * 0.2 && this.keeperReacting !== k) {
        this.keeperReacting = k;
        continue;
      }
      // where the ball will be when it reaches the keeper's plane (he stands off his line)
      const tK = Math.max(0.05, Math.min(tLine, (k.pos.x - b.x) / v.x));
      const zK = b.z + v.z * tK, yK = b.y + v.y * tK - 0.5 * GRAVITY * tK * tK;
      const dz = zK - k.pos.z, speed = Math.hypot(v.x, v.y, v.z);
      const dive = Math.abs(dz) > 0.6 || yK > 1.9;
      const reach = dive ? 2.3 : 0.9;
      const skill = (k.attrs.keeping ?? 0.6) * (kd.keeperSave / 0.62);
      // straight at him: almost always; pace, distance to cover and the top corners make it harder
      const reachFrac = Math.abs(dz) / (dive ? 2.3 : 0.9), high = yK > 1.5 ? (yK - 1.5) * 0.25 : 0;
      const chance = Math.max(0.05, Math.min(0.97, 0.7 + 0.3 * skill - Math.max(0, speed - 14) / 40 - reachFrac * 0.45 - high));
      const willSave = Math.abs(dz) < reach && this.rand() < chance;
      this.events.push({ type: "action", player: k.id, action: dive ? (dz * this.dir[t] > 0 ? "diveL" : "diveR") : "save" });
      k.vel = { x: 0, z: Math.max(-7, Math.min(7, dz / Math.max(0.2, tK))) };
      k.lunge = Math.max(0.1, tK);
      this.keeperReacting = null;
      this.schedule(k, dive ? (dz * this.dir[t] > 0 ? "diveL" : "diveR") : "save", Math.max(0.02, tK - 0.04), () => {
        const bb = this.physics.ballPos;
        const near = Math.abs(bb.z - k.pos.z) < reach + 0.3 && Math.abs(bb.x - k.pos.x) < 1.2 && bb.y < 2.5;
        if (!willSave || !near) {
          this.events.push({ type: "save", player: k.id, kind: "miss" });
          if (dive) k.stun = 0.7;
          return;
        }
        const bv = this.physics.ballVel, sp = Math.hypot(bv.x, bv.y, bv.z);
        if (sp < 17 && !dive && this.inKeeperArea(k)) {
          this.keeperCatch(k);
          this.events.push({ type: "save", player: k.id, kind: "catch" });
        } else {
          // parry: push it wide and back out
          const out = Math.sign(bb.z - k.pos.z || 1);
          this.physics.kick({ x: -bv.x * 0.25, y: Math.abs(bv.y) * 0.3 + 1, z: out * (3 + sp * 0.15) });
          this.lastTouch = k;
          this.events.push({ type: "save", player: k.id, kind: "parry" });
        }
        if (dive) k.stun = 0.8;
      });
    }
  }

  // ---- user control ------------------------------------------------------------------------------------------

  applyUser(inp: UserInput) {
    if (this.phase === "fulltime" || this.phase === "halftime" || this.phase === "goal") return;
    const team = this.cfg.userTeam;
    // auto-switch: the carrier, or the intended receiver of our pass
    if (this.owner && this.owner.team === team && this.owner !== this.controlled) this.setControlled(this.owner);
    else if (this.passTarget && this.passTarget.team === team && this.passTarget !== this.controlled && this.lastTouch?.team === team) this.setControlled(this.passTarget);
    const u = this.controlled;
    if (!u) return;
    const restartTaker = this.restart?.taker;
    const lockedTaker = (this.phase === "kickoff" || this.phase === "restart") && restartTaker === u;
    u.intent = { move: lockedTaker ? v2() : inp.move, sprint: inp.sprint };
    const aim = len(inp.move) > 0.1 ? inp.move : fwd(u.yaw);
    const hasBall = this.owner === u || this.canPlay(u) !== null;
    if (this.holder === u) {
      if (inp.pass !== undefined || inp.lob !== undefined) {
        const recv = this.pickReceiver(u, aim);
        const target = recv ? recv.pos : { x: u.pos.x + aim.x * 15, z: u.pos.z + aim.z * 15 };
        this.keeperDistribute(u, target, inp.lob !== undefined || len(sub(target, u.pos)) > 20);
      }
      return;
    }
    if (hasBall) {
      if (inp.shoot !== undefined) {
        const goal = this.attackGoal(team);
        const aimZ = Math.abs(inp.move.z) > 0.2 ? Math.sign(inp.move.z) * 0.8 : u.pos.z > 0 ? -0.6 : 0.6;
        this.shoot(u, Math.sign(goal.x), aimZ, inp.shoot);
      } else if (inp.pass !== undefined) {
        this.pass(u, aim, inp.pass);
      } else if (inp.lob !== undefined) {
        this.pass(u, aim, inp.lob, true);
      }
    } else {
      // defending: shoot = tackle, lob = slide tackle, pass = switch player
      if (inp.shoot !== undefined) this.tackle(u);
      if (inp.lob !== undefined) this.tackle(u, true);
      if (inp.pass !== undefined || inp.switchPlayer) {
        const n = this.nearestToBall(team, u);
        if (n) this.setControlled(n);
      }
    }
  }

  /** Pass/shot bookkeeping from the event stream (call once per frame). */
  consume() {
    const ev = this.takeEvents();
    for (const e of ev) {
      if (e.type === "possession" && e.player !== null) {
        const p = this.players[e.player];
        if (this.lastKick && (this.lastKick.kind === "pass" || this.lastKick.kind === "lob") && this.players[this.lastKick.player].team === p.team && this.lastKick.player !== p.id) this.stats[p.team].passesCompleted++;
        this.lastKick = null;
      }
      if (e.type === "kick") {
        this.lastKick = { player: e.player, kind: e.kind };
        const p = this.players[e.player];
        if (e.kind === "shot" || (e.kind === "header" && p.role === "field" && len(sub(p.pos, this.attackGoal(p.team))) < 12)) this.stats[p.team].shots++;
        if (e.kind === "pass" || e.kind === "lob") this.stats[p.team].passes++;
      }
      if (e.type === "goal") {
        const t = this.dir[0] === e.side ? 0 : 1;
        this.stats[t].onTarget++;
      }
      if (e.type === "tackle") {
        const p = this.players[e.player];
        this.stats[p.team].tackles++;
        if (e.success) this.stats[p.team].tacklesWon++;
      }
    }
    return ev;
  }
  private lastKick: { player: number; kind: string } | null = null;

  possessionShare(): [number, number] {
    const a = this.stats[0].possession, b = this.stats[1].possession, t = a + b || 1;
    return [Math.round((a / t) * 100), Math.round((b / t) * 100)];
  }
}

