import { PhysicsWorld, type HitKind } from "../../physics/PhysicsWorld";
import { AIR_K, BALL_R, ROLL_DECEL, SIM_DT } from "../../physics/constants";
import { STRIDE_SPEED } from "../anim/clips";
import { gaitSpeed, locoBlend, type ActionName } from "../anim/locomotion";
import type { PitchSpec } from "../pitch";
import { groundPassSpeed, jitter, loftSpeed, rng, shotLift } from "./kick";
import { fwd, len, norm, sub, v2, yawOf, type SimPlayer, type V2 } from "./SimPlayer";

/** Seconds from the start of each kick animation to ball contact (measured from the clips at load). */
export interface ContactTimes {
  pass: number;
  shoot: number;
  kick: number;
  header: number;
  /** Where the striking foot is at contact, in the kicker's frame (x = his left, z = forward), per kick clip. */
  pos?: Partial<Record<"pass" | "shoot" | "kick", { x: number; z: number }>>;
  /** Locomotion clips' stride speeds and lengths, and the dribble touch phase, so the sim's gait matches the animation. */
  gait?: Gait;
}

export interface Gait {
  stride: Record<string, number>;
  dur: Record<string, number>;
  /** Phases at which the dribbling (right) foot reaches forward in the dribble loop (left-foot mid-stance = 0). */
  touch: number[];
  /** The same for the sprint loop, where both feet push the ball on. */
  sprintTouch: number[];
}

/** Measured from footballer.glb in the browser (FootballerAsset); used by headless tests. The view passes the live values. */
export const DEFAULT_GAIT: Gait = {
  stride: { ...STRIDE_SPEED, walk: 0.95, jog: 2.36, dribble: 2.47, sprint: 8.52, jogSL: 2.62, jogSR: 2.1, jogB: 2.11, jogFL: 2.53, jogFR: 2.54, jogBL: 2.22, jogBR: 2.05, shufL: 2.81, shufR: 2.79 },
  dur: { walk: 1.333, jog: 0.8, dribble: 1.733, sprint: 0.667, jogB: 0.8, jogSL: 0.7, jogSR: 0.733, jogFL: 0.8, jogFR: 0.8, jogBL: 0.833, jogBR: 0.733, shufL: 0.5, shufR: 0.5 },
  touch: [0.067, 0.6],
  sprintTouch: [0.2, 0.8],
};
/** Measured from footballer.glb (see FootballerAsset.findContact); the view passes the live values. */
export const DEFAULT_CONTACTS: ContactTimes = {
  pass: 0.11, shoot: 0.4, kick: 0.32, header: 0.3,
  pos: { pass: { x: -0.06, z: 0.23 }, shoot: { x: -0.13, z: 0.33 }, kick: { x: -0.69, z: 0.47 } },
};

export type SimEvent =
  | { type: "action"; player: number; action: ActionName }
  | { type: "kick"; player: number; kind: "pass" | "lob" | "shot" | "header" | "clear"; speed: number; gap?: number }
  | { type: "miss"; player: number }
  | { type: "touch"; player: number; quality: "clean" | "heavy" | "deflect" }
  | { type: "possession"; player: number | null }
  | { type: "hit"; kind: HitKind; speed: number; player?: number }
  | { type: "goal"; side: number; scorer: number | null }
  | { type: "tackle"; player: number; victim: number | null; success: boolean; slide: boolean }
  | { type: "save"; player: number; kind: "catch" | "parry" | "block" | "miss" | "claim" };

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
  /** Goalkeeper holding the ball in his hands (nobody can take it; it moves with him). */
  holder: SimPlayer | null = null;

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

  /** Ball position (centre) that the kick animation's foot meets at contact. */
  contactPoint(p: SimPlayer, action: ActionName): V2 {
    const key = action === "shoot" ? "shoot" : action === "kick" ? "kick" : "pass";
    const c = this.contacts.pos?.[key] ?? { x: 0, z: 0.33 };
    const f = fwd(p.yaw), left = { x: f.z, z: -f.x };
    // the ball's centre sits a ball-radius ahead of the toe
    const z = c.z + BALL_R;
    return { x: p.pos.x + f.x * z + left.x * c.x, z: p.pos.z + f.z * z + left.z * c.x };
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
      this.advanceGait(p, dt);
      this.physics.movePlayer(p.id, p.pos.x, p.pos.z);
    }
    if (this.passTarget && !this.pendingPass()) {
      // a pass that has died or run past its man is just a loose ball
      const bv = this.physics.ballVel;
      if (Math.hypot(bv.x, bv.z) < 1.2 || this.time - this.passAt > 3.5) this.passTarget = null;
    }
    if (this.holder) {
      const h = this.holder, f = fwd(h.yaw);
      h.heldFor += dt;
      this.physics.setBall({ x: h.pos.x + f.x * 0.3, y: 1.05, z: h.pos.z + f.z * 0.3 });
    } else this.updatePossession(dt);
    this.physics.step();
    for (const h of this.physics.takeHits()) this.events.push({ type: "hit", kind: h.kind, speed: h.speed, player: h.player });
    this.afterStep(dt);
  }

  /** Locomotion input the view's animation will see for this player (same blend, so the same gait cycle). */
  locoInput(p: SimPlayer) {
    const heading = p.speed > 0.1 ? Math.atan2(p.vel.x, p.vel.z) - p.yaw : 0;
    return { speed: p.speed, yawRate: p.yawRate, dribbling: this.owner === p && !this.holder, heading, keeper: p.role === "gk", phase: p.gait };
  }

  private gaitCycle(p: SimPlayer) {
    const g = this.contacts.gait ?? DEFAULT_GAIT;
    return locoBlend(this.locoInput(p), g.stride, g.dur).cycle;
  }

  private advanceGait(p: SimPlayer, dt: number) {
    p.gaitPrev = p.gait;
    const cyc = this.gaitCycle(p);
    if (cyc > 0) p.gait = (p.gait + (gaitSpeed(this.locoInput(p), cyc) / cyc) * dt) % 1;
  }

  /** Phases in the gait cycle where a foot meets the ball: the dribble loop's, or the sprint loop's when sprinting. */
  private touchPhases(p: SimPlayer) {
    const g = this.contacts.gait ?? DEFAULT_GAIT;
    const fast = p.speed > ((g.stride.dribble ?? 2.5) + (g.stride.sprint ?? 8)) / 2;
    const t = fast ? g.sprintTouch : g.touch;
    return t.length ? t : [0];
  }

  /** True on the step the gait passes a touch phase. */
  private touchFrame(p: SimPlayer) {
    const a = p.gaitPrev, b = p.gait;
    return this.touchPhases(p).some((t) => (a <= b ? a < t && t <= b : t > a || t <= b));
  }

  /** Seconds until the gait reaches its next touch phase after the current one. */
  private nextTouchIn(p: SimPlayer, cycle: number) {
    const ts = this.touchPhases(p), rate = gaitSpeed(this.locoInput(p), cycle) / Math.max(cycle, 1e-3);
    let gap = 1;
    for (const t of ts) {
      const d = (((t - p.gait) % 1) + 1) % 1;
      if (d > 0.02) gap = Math.min(gap, d);
    }
    return gap / Math.max(rate, 0.3);
  }

  /**
   * Sends the ball rolling so it arrives at `target`: in `time` seconds still moving if given, otherwise coming to
   * rest there. Uses the surface's rolling resistance plus air drag, so it is a real touch, not a tether.
   */
  private rollTo(target: V2, time?: number, err = 0) {
    const ball = this.ball2(), s = sub(target, ball), d = len(s);
    if (d < 1e-3) {
      this.physics.kick({ x: 0, y: Math.min(this.physics.ballVel.y, 0), z: 0 });
      return;
    }
    const dir = { x: s.x / d, z: s.z / d };
    let v = Math.sqrt(2 * this.rollDecel * d);
    if (time !== undefined) {
      const t = Math.max(time, 0.12);
      let a = this.rollDecel;
      for (let i = 0; i < 2; i++) {
        v = d / t + 0.5 * a * t;
        a = this.rollDecel + AIR_K * v * v;
      }
      // a ball that would stop short of the target in that time is played to stop on it instead
      if (v < a * t) v = Math.sqrt(2 * a * d);
    }
    v = Math.min(v, 14);
    this.physics.kick({ x: dir.x * v + jitter(this.rand) * err, y: Math.min(this.physics.ballVel.y, 0), z: dir.z * v + jitter(this.rand) * err });
  }

  protected setOwner(p: SimPlayer | null) {
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
        // setting up a kick: the ball keeps rolling on its own, and the kicker adjusts his steps so the striking foot
        // meets it on the contact frame (where the ball will be then, minus where the foot sits relative to him)
        const left = Math.max(o.pending.delay, 1 / 60), sp = Math.hypot(bv.x, bv.z);
        const a = this.rollDecel + AIR_K * sp * sp, run = sp > 1e-3 ? Math.min(sp * left - 0.5 * a * left * left, (sp * sp) / (2 * a)) : 0;
        const fut = sp > 1e-3 ? { x: ball.x + (bv.x / sp) * run, z: ball.z + (bv.z / sp) * run } : ball;
        const cp = this.contactPoint(o, o.pending.action), off = sub(cp, o.pos);
        // where his own momentum takes him before contact (he brakes while winding up, as in SimPlayer.move)
        const at = { ...o.pos }, v = { ...o.vel };
        for (let t = 0; t < left - 1e-6; t += dt) {
          const l = len(v), dec = Math.min(l, 20 * dt), k = l > 1e-6 ? (1 - dec / l) * (1 - 6 * dt) : 0;
          v.x *= k;
          v.z *= k;
          at.x += v.x * dt;
          at.z += v.z * dt;
        }
        const miss = sub({ x: fut.x - off.x, z: fut.z - off.z }, at);
        // capped at a sprinter's extra stride: at speed he simply carries on running onto it
        const need = len(miss) / left, cap = 8 * dt;
        const step = Math.min(need * dt, cap, len(miss));
        if (step > 1e-4) {
          o.pos.x += (miss.x / len(miss)) * step;
          o.pos.z += (miss.z / len(miss)) * step;
        }
      }
    }
    // contest: an opponent (or anyone, when the ball is loose) within reach can take or deflect it
    for (const p of this.players) {
      if (p === this.owner || p.touchLock > 0 || p.pending || p.stun > 0) continue;
      const foot = this.footPoint(p, 0.3);
      const d = len(sub(ball, foot));
      if (d > REACH || b.y > CONTROL_HEIGHT) continue;
      if (this.owner) {
        if (this.owner.team === p.team) continue;
        // a tackle-free steal (nicking it between touches): rare while the ball is tight to the carrier's feet, likelier
        // the further his last push sent it, certain once it is clear of him
        const ownerGap = len(sub(ball, this.owner.pos));
        const perSecond = 0.2 + 2.5 * Math.max(0, ownerGap - 0.55) * (1.2 - this.owner.attrs.control);
        if (ownerGap < 1.0 && this.rand() > perSecond * dt) continue;
      }
      if (this.passTarget && this.passTarget !== p && this.passTarget.team === p.team && !p.controlled) continue;
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

  /**
   * Close control as real touches. While moving, the ball is pushed on the frames where the right foot swings through
   * it (measured from the dribble clip), weighted so it rolls, and slows by rolling resistance, to just ahead of where
   * that foot will be at the next touch. Faster running means longer strides, so the ball is knocked further. Between
   * touches the ball rolls freely. A sharp change of direction gets an immediate cut or drag-back; stopping gets a sole trap.
   */
  private dribble(p: SimPlayer) {
    const b = this.physics.ballPos, bv = this.physics.ballVel;
    const ball = { x: b.x, z: b.z };
    const sp = p.speed, wants = len(p.intent.move) > 0.1;
    const err = (1 - p.attrs.control) * 0.35 * (p.intent.sprint ? 1.6 : 1);
    if (!wants || sp < 0.6) {
      // stopping or standing: trap it under the sole, then leave it be; if he has turned away from it, roll it back
      // in front of the new facing with one small touch
      const stopAt = sp > 0.05 ? { x: p.pos.x + (p.vel.x * sp) / 40, z: p.pos.z + (p.vel.z * sp) / 40 } : p.pos;
      const f = fwd(p.yaw), t = { x: stopAt.x + f.x * 0.4, z: stopAt.z + f.z * 0.4 };
      const off = len(sub(ball, t)), moving = Math.hypot(bv.x, bv.z);
      if (p.touchCd <= 0 && (off > 0.3 || (moving > 0.4 && off < 0.5 && moving > Math.sqrt(2 * this.rollDecel * off) + 0.3))) {
        this.rollTo(t, undefined, err * 0.3);
        p.touchCd = 0.35;
        this.events.push({ type: "touch", player: p.id, quality: "clean" });
      }
      return;
    }
    const dir = norm(p.intent.move);
    const rel = sub(ball, p.pos), ahead = rel.x * dir.x + rel.z * dir.z, side = Math.abs(rel.x * dir.z - rel.z * dir.x);
    const bsp = Math.hypot(bv.x, bv.z);
    const along = bsp > 0.3 ? (bv.x * dir.x + bv.z * dir.z) / bsp : 1;
    // the ball is going the wrong way, or is behind or wide of him: cut it now rather than wait for the stride
    const cut = p.touchCd <= 0 && (ahead < 0.15 || side > 0.55 || along < 0.6) && len(rel) < 1.3;
    const cyc = this.gaitCycle(p);
    if (!cut && !this.touchFrame(p)) return;
    // only touch a ball that is at his feet, not one still running ahead from the last push
    if (!cut && (ahead > 0.85 || len(rel) > 1.2)) return;
    const want = p.maxSpeed(true) * Math.min(1, len(p.intent.move));
    // next touch: the next touch frame of the gait; a cut waits until he has turned and got going again
    const turn = len(sub({ x: dir.x * want, z: dir.z * want }, p.vel)) / (13 + 5 * p.attrs.pace);
    const horizon = Math.max(0.25, Math.min(0.9, this.nextTouchIn(p, cyc)), cut ? turn + 0.15 : 0);
    const at = this.predictRun(p, horizon), lead = 0.42 + 0.03 * want;
    this.rollTo({ x: at.x + dir.x * lead, z: at.z + dir.z * lead }, horizon, err);
    p.touchCd = cut ? 0.3 : 0.15;
    this.events.push({ type: "touch", player: p.id, quality: "clean" });
  }

  /** Where the player will be after `time` seconds if he keeps his current intent (same model as SimPlayer.move). */
  private predictRun(p: SimPlayer, time: number): V2 {
    const want = p.maxSpeed(true), at = { ...p.pos }, v = { ...p.vel }, h = 1 / 60;
    const tv = { x: p.intent.move.x * want, z: p.intent.move.z * want };
    for (let t = 0; t < time; t += h) {
      const dv = sub(tv, v), dl = len(dv), acc = (len(tv) > len(v) ? 13 + 5 * p.attrs.pace : 20) * h;
      if (dl > acc) {
        v.x += (dv.x / dl) * acc;
        v.z += (dv.z / dl) * acc;
      } else Object.assign(v, tv);
      at.x += v.x * h;
      at.z += v.z * h;
    }
    return at;
  }

  /** True if the ball is where this player's kick can reach it right now. */
  canPlay(p: SimPlayer): "foot" | "head" | null {
    const b = this.physics.ballPos;
    const d = len(sub({ x: b.x, z: b.z }, p.pos));
    if (d < REACH + 0.35 && b.y < CONTROL_HEIGHT + 0.2) return "foot";
    if (d < 1.0 && b.y > HEAD_MIN && b.y < HEAD_MAX) return "head";
    return null;
  }

  protected schedule(p: SimPlayer, action: ActionName, delay: number, exec: () => void) {
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
    // how far the ball is from where the animation's foot meets it (contact alignment)
    const action = kind === "shot" ? "shoot" : kind === "lob" ? "kick" : "pass";
    const cp = this.contactPoint(p, action), gap = kind === "header" ? undefined : +Math.hypot(b.x - cp.x, b.z - cp.z).toFixed(3);
    if (vel.y > 0.5 && b.y < BALL_R + 0.02) this.physics.setBall({ x: b.x, y: BALL_R + 0.02, z: b.z }, vel, { x: 0, y: spinY, z: 0 });
    else this.physics.kick(vel, { x: 0, y: spinY, z: 0 });
    this.events.push({ type: "kick", player: p.id, kind, speed: Math.hypot(vel.x, vel.y, vel.z), gap });
  }

  private passAt = 0;
  private pendingPass() {
    return this.players.some((p) => p.pending && (p.pending.action === "pass" || p.pending.action === "kick" || p.pending.action === "header"));
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
        this.passAt = this.time;
        this.strike(p, "header", { x: ex * s, y: 1.5, z: ez * s });
      } else if (lofted) {
        const angle = (38 * Math.PI) / 180, s = Math.min(26, loftSpeed(dist * 0.85, angle));
        this.passAt = this.time;
        this.strike(p, "lob", { x: ex * s * Math.cos(angle), y: s * Math.sin(angle), z: ez * s * Math.cos(angle) });
      } else {
        const s = Math.min(24, groundPassSpeed(dist, recv ? 5 + dist * 0.3 : 1.5, this.rollDecel));
        this.strike(p, "pass", { x: ex * s, y: 0, z: ez * s });
        this.passAt = this.time;
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
      // aim height scales with the goal, so monkey posts get low drives rather than shots over the bar
      const hs = Math.min(1, this.pitch.goalHeight / 1.8);
      const tyE = Math.max(0.12, (0.35 + power * 1.25 + jitter(this.rand) * spread * 1.2) * hs);
      const vh = head ? 9 + 6 * power : 13 + power * (12 + 8 * skill);
      const dir = norm({ x: gx - b.x, z: tzE - b.z });
      const by = this.physics.ballPos.y;
      const vy = shotLift(vh, dist, Math.min(tyE, this.pitch.goalHeight + 0.6), by) ?? vh * 0.25;
      this.strike(p, head ? "header" : "shot", { x: dir.x * vh, y: vy, z: dir.z * vh }, curl * 10);
    });
    return true;
  }

  /**
   * Tackle attempt. A standing poke reaches 1.1 m, a slide 1.9 m (and commits the tackler to the ground).
   * Success depends on the tackler's defending against the carrier's control; failure leaves the tackler off balance.
   */
  tackle(p: SimPlayer, slide = false): boolean {
    if (p.pending || p.stun > 0 || this.owner === p || this.holder) return false;
    if (slide) {
      const f = fwd(p.yaw);
      p.vel = { x: f.x * Math.max(5, p.speed), z: f.z * Math.max(5, p.speed) };
      p.lunge = 0.35;
    }
    this.schedule(p, "tackle", slide ? 0.22 : 0.14, () => {
      const ball = this.ball2(), foot = this.footPoint(p, slide ? 0.9 : 0.45);
      const reach = slide ? 1.0 : 0.75, carrier = this.owner && this.owner.team !== p.team ? this.owner : null;
      const inReach = len(sub(ball, foot)) < reach && this.physics.ballPos.y < 0.8;
      let success = false;
      if (inReach) {
        const def = p.attrs.defending ?? 0.6, ctl = carrier ? carrier.attrs.control : 0;
        // a ball just pushed out of the carrier's stride is easier to nick than one tight at his feet
        const exposed = carrier ? Math.max(-0.15, Math.min(0.25, (len(sub(ball, carrier.pos)) - 0.55) * 0.6)) : 0;
        const chance = carrier ? Math.min(0.9, Math.max(0.15, 0.5 + 0.55 * (def - ctl) + exposed + (slide ? 0.12 : 0))) : 1;
        success = this.rand() < chance;
      }
      if (success) {
        const f = fwd(p.yaw), side = this.rand() < 0.5 ? 1 : -1;
        const sp = slide ? 7 : 4;
        this.physics.kick({ x: f.x * sp - f.z * side * 1.5, y: 0, z: f.z * sp + f.x * side * 1.5 });
        if (carrier) {
          this.setOwner(null);
          carrier.stun = slide ? 1.1 : 0.45;
          carrier.touchLock = 0.5;
          if (slide) this.events.push({ type: "action", player: carrier.id, action: "fall" });
        }
        this.lastTouch = p;
        p.touchLock = slide ? 0.5 : 0.1;
      }
      if (slide) p.stun = Math.max(p.stun, 0.9);
      else if (!success) p.stun = 0.5;
      this.events.push({ type: "tackle", player: p.id, victim: carrier?.id ?? null, success, slide });
    });
    return true;
  }

  /** Keeper takes the ball in his hands. */
  keeperCatch(k: SimPlayer) {
    this.holder = k;
    this.passTarget = null;
    this.setOwner(k);
    k.heldFor = 0;
  }

  /** Keeper throws (short) or kicks (long) the ball out to a point. */
  keeperDistribute(k: SimPlayer, target: V2, long: boolean) {
    if (this.holder !== k || k.pending) return;
    k.yaw = yawOf(sub(target, k.pos));
    this.schedule(k, long ? "kick" : "throw", long ? this.contacts.kick : 0.45, () => {
      this.holder = null;
      this.setOwner(null);
      k.touchLock = 0.5;
      this.lastTouch = k;
      const b = this.physics.ballPos, d = sub(target, { x: b.x, z: b.z }), dist = len(d), dir = norm(d);
      if (long) {
        const a = (32 * Math.PI) / 180, s = Math.min(26, loftSpeed(dist * 0.85, a));
        this.physics.setBall({ x: b.x, y: 0.4, z: b.z }, { x: dir.x * s * Math.cos(a), y: s * Math.sin(a), z: dir.z * s * Math.cos(a) });
      } else {
        const s = Math.min(18, groundPassSpeed(dist, 4, this.rollDecel));
        this.physics.setBall({ x: b.x + dir.x * 0.5, y: 0.35, z: b.z + dir.z * 0.5 }, { x: dir.x * s, y: 0.5, z: dir.z * s });
      }
      this.events.push({ type: "kick", player: k.id, kind: long ? "clear" : "pass", speed: 0 });
    });
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
