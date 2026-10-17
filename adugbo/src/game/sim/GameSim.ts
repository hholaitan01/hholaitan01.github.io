import { PhysicsWorld, type HitKind } from "../../physics/PhysicsWorld";
import { BALL_R, ROLL_DECEL, SIM_DT } from "../../physics/constants";
import type { ActionName } from "../anim/locomotion";
import type { PitchSpec } from "../pitch";
import { groundPassSpeed, jitter, loftSpeed, rng, shotLift } from "./kick";
import { fwd, len, norm, sub, v2, yawOf, type SimPlayer, type V2 } from "./SimPlayer";

/** Seconds from the start of each kick animation to ball contact (measured from the clips at load). */
export interface ContactTimes {
  pass: number;
  shoot: number;
  kick: number;
  header: number;
}
export const DEFAULT_CONTACTS: ContactTimes = { pass: 0.11, shoot: 0.4, kick: 0.32, header: 0.3 };

export type SimEvent =
  | { type: "action"; player: number; action: ActionName }
  | { type: "kick"; player: number; kind: "pass" | "lob" | "shot" | "header" | "clear"; speed: number }
  | { type: "miss"; player: number }
  | { type: "touch"; player: number; quality: "clean" | "heavy" | "deflect" }
  | { type: "possession"; player: number | null }
  | { type: "hit"; kind: HitKind; speed: number }
  | { type: "goal"; side: number; scorer: number | null };

const REACH = 0.85; // metres from the player's feet within which the ball can be played
const CONTROL_HEIGHT = 1.0;
const HEAD_MIN = 1.35, HEAD_MAX = 2.25;

/**
 * Gameplay core shared by practice and match modes: players, ball possession, dribbling, first touch,
 * interceptions and kicks timed to the animation contact frames. Rendering-free so it can be unit-tested.
 */
export class GameSim {
  readonly physics: PhysicsWorld;
  readonly players: SimPlayer[] = [];
  owner: SimPlayer | null = null;
  lastTouch: SimPlayer | null = null;
  time = 0;
  events: SimEvent[] = [];
  readonly rand: () => number;
  private acc = 0;
  /** Expected receiver of the last pass (gets priority to control it). */
  passTarget: SimPlayer | null = null;

  constructor(
    readonly pitch: PitchSpec,
    readonly contacts: ContactTimes = DEFAULT_CONTACTS,
    seed = 1,
  ) {
    this.physics = new PhysicsWorld(pitch);
    this.rand = rng(seed);
  }

  addPlayer(p: SimPlayer) {
    this.players.push(p);
    this.physics.addPlayer(p.id);
    return p;
  }

  get rollDecel() {
    return ROLL_DECEL[this.pitch.surface];
  }

  ball2(): V2 {
    const b = this.physics.ballPos;
    return { x: b.x, z: b.z };
  }

  /** Point on the ground in front of the player where the ball sits when under control. */
  footPoint(p: SimPlayer, ahead = 0.42): V2 {
    const f = fwd(p.yaw);
    return { x: p.pos.x + f.x * ahead, z: p.pos.z + f.z * ahead };
  }

  /** Advances the simulation by real time `dt`, in fixed steps. */
  update(dt: number) {
    this.acc += Math.min(dt, 0.25);
    while (this.acc >= SIM_DT) {
      this.acc -= SIM_DT;
      this.fixedStep(SIM_DT);
    }
  }

  protected beforeStep(_dt: number) {}
  protected afterStep(_dt: number) {}

  fixedStep(dt: number) {
    this.time += dt;
    this.beforeStep(dt);
    for (const p of this.players) {
      p.touchLock = Math.max(0, p.touchLock - dt);
      p.touchCd = Math.max(0, p.touchCd - dt);
      if (p.pending) {
        p.pending.delay -= dt;
        if (p.pending.delay <= 0) {
          const k = p.pending;
          p.pending = null;
          k.exec();
        }
      }
      p.move(dt, this.owner === p, !!p.pending);
      this.physics.movePlayer(p.id, p.pos.x, p.pos.z);
    }
    this.updatePossession(dt);
    this.physics.step();
    for (const h of this.physics.takeHits()) this.events.push({ type: "hit", kind: h.kind, speed: h.speed });
    this.afterStep(dt);
  }

  private setOwner(p: SimPlayer | null) {
    if (this.owner === p) return;
    this.owner = p;
    if (p) {
      p.heldFor = 0;
      p.touchCd = 0.12;
      this.lastTouch = p;
      if (this.passTarget === p) this.passTarget = null;
    }
    this.events.push({ type: "possession", player: p?.id ?? null });
  }

  private updatePossession(dt: number) {
    const b = this.physics.ballPos, bv = this.physics.ballVel, ball = { x: b.x, z: b.z };
    const o = this.owner;
    if (o) {
      o.heldFor += dt;
      const d = len(sub(ball, o.pos));
      if (d > 1.8 || b.y > CONTROL_HEIGHT + 0.3) this.setOwner(null);
      else if (!o.pending) this.dribble(o);
      else {
        // setting up a kick: the ball is steadied in front of the planted foot
        const t = this.footPoint(o, 0.45);
        this.physics.kick({ x: (t.x - ball.x) * 5 + o.vel.x, y: Math.min(bv.y, 0), z: (t.z - ball.z) * 5 + o.vel.z });
      }
    }
    // contest: an opponent (or anyone, when the ball is loose) within reach can take or deflect it
    for (const p of this.players) {
      if (p === this.owner || p.touchLock > 0 || p.pending) continue;
      const foot = this.footPoint(p, 0.3);
      const d = len(sub(ball, foot));
      if (d > REACH || b.y > CONTROL_HEIGHT) continue;
      if (this.owner) {
        if (this.owner.team === p.team) continue;
        // a tackle-free steal: only when the ball is not tight to the carrier's feet
        const ownerGap = len(sub(ball, this.owner.pos));
        if (ownerGap < 1.0 && this.rand() > 0.02) continue;
      }
      if (this.passTarget && this.passTarget !== p && this.passTarget.team !== p.team && d > REACH * 0.7) continue;
      this.firstTouch(p, { x: bv.x, y: bv.y, z: bv.z });
      break;
    }
  }

  /** Receiving the ball: the faster it arrives relative to the player and the worse his control, the looser the touch. */
  private firstTouch(p: SimPlayer, bv: { x: number; y: number; z: number }) {
    const rel = Math.hypot(bv.x - p.vel.x, bv.z - p.vel.z) + Math.abs(bv.y) * 0.5;
    const limit = 10 + 14 * p.attrs.control;
    if (rel > limit) {
      // too hot to handle: the ball ricochets off the player
      const away = norm(sub(this.ball2(), p.pos));
      const k = 0.35;
      this.physics.kick({ x: -bv.x * k + away.x * 2, y: Math.abs(bv.y) * 0.3, z: -bv.z * k + away.z * 2 });
      p.touchLock = 0.4;
      this.lastTouch = p;
      this.events.push({ type: "touch", player: p.id, quality: "deflect" });
      return;
    }
    const heavy = rel / limit;
    const err = heavy * (1.2 - p.attrs.control) * 2.2;
    const f = fwd(p.yaw);
    const dir = len(p.intent.move) > 0.1 ? norm(p.intent.move) : f;
    // cushion: ball ends up moving with the player, nudged into the direction he wants to go
    const push = 0.8 + heavy * 2.5;
    const vx = p.vel.x + dir.x * push + jitter(this.rand) * err;
    const vz = p.vel.z + dir.z * push + jitter(this.rand) * err;
    this.physics.kick({ x: vx, y: Math.min(0, bv.y) * 0.1, z: vz });
    if (heavy > 0.75) {
      p.touchLock = 0.25;
      this.lastTouch = p;
      this.events.push({ type: "touch", player: p.id, quality: "heavy" });
    } else {
      this.setOwner(p);
      this.events.push({ type: "touch", player: p.id, quality: "clean" });
    }
  }

  /** Close control: a series of touches that keep the ball a little ahead of the carrier. */
  private dribble(p: SimPlayer) {
    const b = this.physics.ballPos, bv = this.physics.ballVel;
    const ball = { x: b.x, z: b.z };
    const sp = p.speed;
    if (sp < 0.6) {
      // under the sole: settle it at the feet
      const t = this.footPoint(p, 0.38);
      this.physics.kick({ x: (t.x - ball.x) * 4, y: Math.min(bv.y, 0), z: (t.z - ball.z) * 4 });
      return;
    }
    const lead = this.owner === p && p.intent.sprint ? 0.42 : 0.3; // seconds ahead the touch aims for
    const target = {
      x: p.pos.x + p.vel.x * lead + fwd(p.yaw).x * (0.45 + 0.05 * sp),
      z: p.pos.z + p.vel.z * lead + fwd(p.yaw).z * (0.45 + 0.05 * sp),
    };
    const off = len(sub(ball, target));
    const ahead = (ball.x - p.pos.x) * fwd(p.yaw).x + (ball.z - p.pos.z) * fwd(p.yaw).z;
    if (p.touchCd <= 0 && (off > 0.32 || ahead < 0.25)) {
      const t = lead;
      const err = (1 - p.attrs.control) * 0.25 * (p.intent.sprint ? 1.6 : 1);
      this.physics.kick({
        x: (target.x - ball.x) / t + jitter(this.rand) * err,
        y: 0,
        z: (target.z - ball.z) / t + jitter(this.rand) * err,
      });
      p.touchCd = p.intent.sprint ? 0.42 : 0.26;
      this.events.push({ type: "touch", player: p.id, quality: "clean" });
    }
  }

  /** True if the ball is where this player's kick can reach it right now. */
  canPlay(p: SimPlayer): "foot" | "head" | null {
    const b = this.physics.ballPos;
    const d = len(sub({ x: b.x, z: b.z }, p.pos));
    if (d < REACH + 0.35 && b.y < CONTROL_HEIGHT + 0.2) return "foot";
    if (d < 1.0 && b.y > HEAD_MIN && b.y < HEAD_MAX) return "head";
    return null;
  }

  private schedule(p: SimPlayer, action: ActionName, delay: number, exec: () => void) {
    p.pending = { action, delay, exec };
    this.events.push({ type: "action", player: p.id, action });
  }

  /** Executes at contact: the ball must still be at the foot, otherwise it is an air kick. */
  private strike(p: SimPlayer, kind: "pass" | "lob" | "shot" | "header" | "clear", vel: { x: number; y: number; z: number }, spinY = 0) {
    const where = this.canPlay(p);
    if (!where || (kind === "header") !== (where === "head")) {
      this.events.push({ type: "miss", player: p.id });
      return;
    }
    if (this.owner === p) this.setOwner(null);
    this.lastTouch = p;
    p.touchLock = 0.35;
    // the strike starts from the ball's current spot; lift it clear of the ground for lofted kicks
    const b = this.physics.ballPos;
    if (vel.y > 0.5 && b.y < BALL_R + 0.02) this.physics.setBall({ x: b.x, y: BALL_R + 0.02, z: b.z }, vel, { x: 0, y: spinY, z: 0 });
    else this.physics.kick(vel, { x: 0, y: spinY, z: 0 });
    this.events.push({ type: "kick", player: p.id, kind, speed: Math.hypot(vel.x, vel.y, vel.z) });
  }

  /** Best receiver in the aim direction (within ±50°), preferring nearer and more open players. */
  pickReceiver(p: SimPlayer, aim: V2): SimPlayer | null {
    let best: SimPlayer | null = null, bestScore = -Infinity;
    const a = norm(aim);
    for (const m of this.players) {
      if (m === p || m.team !== p.team) continue;
      const d = sub(m.pos, p.pos), dist = len(d);
      if (dist < 2 || dist > 40) continue;
      const cos = (d.x * a.x + d.z * a.z) / dist;
      if (cos < Math.cos((50 * Math.PI) / 180)) continue;
      const score = cos * 2 - dist / 25;
      if (score > bestScore) {
        bestScore = score;
        best = m;
      }
    }
    return best;
  }

  /**
   * Ground pass. `power` 0..1 only matters when there is no receiver (pass into space).
   * Returns the chosen receiver, if any.
   */
  pass(p: SimPlayer, aim: V2, power: number, lofted = false): SimPlayer | null {
    if (p.pending || !this.canPlay(p)) return null;
    const head = this.canPlay(p) === "head";
    const recv = this.pickReceiver(p, len(aim) > 0.1 ? aim : fwd(p.yaw));
    let target: V2;
    if (recv) {
      // lead the runner by his velocity over the estimated travel time
      const d0 = len(sub(recv.pos, p.pos)), tEst = d0 / (lofted ? 14 : 12);
      target = { x: recv.pos.x + recv.vel.x * tEst, z: recv.pos.z + recv.vel.z * tEst };
    } else {
      const a = norm(len(aim) > 0.1 ? aim : fwd(p.yaw)), dist = 6 + power * 20;
      target = { x: p.pos.x + a.x * dist, z: p.pos.z + a.z * dist };
    }
    if (len(aim) > 0.1 || recv) p.yaw = yawOf(sub(target, p.pos));
    const action: ActionName = head ? "header" : lofted ? "kick" : "pass";
    const delay = head ? this.contacts.header : lofted ? this.contacts.kick : this.contacts.pass;
    this.passTarget = recv;
    this.schedule(p, action, delay, () => {
      const b = this.ball2(), d = sub(target, b), dist = Math.max(1, len(d)), dir = norm(d);
      const err = (1.1 - p.attrs.passing) * 0.06 * (lofted ? 1.6 : 1);
      const ang = jitter(this.rand) * err;
      const ex = dir.x * Math.cos(ang) - dir.z * Math.sin(ang), ez = dir.x * Math.sin(ang) + dir.z * Math.cos(ang);
      if (head) {
        const s = Math.min(14, 6 + dist * 0.4);
        this.strike(p, "header", { x: ex * s, y: 1.5, z: ez * s });
      } else if (lofted) {
        const angle = (38 * Math.PI) / 180, s = Math.min(26, loftSpeed(dist * 0.85, angle));
        this.strike(p, "lob", { x: ex * s * Math.cos(angle), y: s * Math.sin(angle), z: ez * s * Math.cos(angle) });
      } else {
        const s = Math.min(24, groundPassSpeed(dist, recv ? 3.5 + dist * 0.25 : 1.5, this.rollDecel));
        this.strike(p, "pass", { x: ex * s, y: 0, z: ez * s });
      }
    });
    return recv;
  }

  /**
   * Shot at the goal at end `side` (+1 = +x). `aimZ` −1..1 picks the corner, `power` 0..1 trades pace
   * for accuracy and height. Returns false if the ball is not playable.
   */
  shoot(p: SimPlayer, side: number, aimZ: number, power: number, curl = 0): boolean {
    if (p.pending || !this.canPlay(p)) return false;
    const head = this.canPlay(p) === "head";
    const gx = side * (this.pitch.length / 2);
    const tz = Math.max(-1, Math.min(1, aimZ)) * (this.pitch.goalWidth / 2 - 0.35);
    p.yaw = yawOf({ x: gx - p.pos.x, z: tz - p.pos.z });
    this.schedule(p, head ? "header" : "shoot", head ? this.contacts.header : this.contacts.shoot, () => {
      const b = this.ball2();
      const dist = Math.hypot(gx - b.x, tz - b.z);
      const skill = p.attrs.shooting;
      // error grows with power and distance and shrinks with skill
      const spread = (0.15 + power * 0.7) * (1.3 - skill) * Math.max(0.5, dist / 12);
      const tzE = tz + jitter(this.rand) * spread * 2.2;
      const tyE = Math.max(0.15, 0.35 + power * 1.25 + jitter(this.rand) * spread * 1.2);
      const vh = head ? 9 + 6 * power : 13 + power * (12 + 8 * skill);
      const dir = norm({ x: gx - b.x, z: tzE - b.z });
      const by = this.physics.ballPos.y;
      const vy = shotLift(vh, dist, Math.min(tyE, this.pitch.goalHeight + 0.6), by) ?? vh * 0.25;
      this.strike(p, head ? "header" : "shot", { x: dir.x * vh, y: vy, z: dir.z * vh }, curl * 10);
    });
    return true;
  }

  takeEvents() {
    const e = this.events;
    this.events = [];
    return e;
  }

  dispose() {
    this.physics.free();
  }
}

export { v2 };
