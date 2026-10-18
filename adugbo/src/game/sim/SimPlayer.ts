import type { ActionName } from "../anim/locomotion";

export type V2 = { x: number; z: number };
export const v2 = (x = 0, z = 0): V2 => ({ x, z });
export const len = (a: V2) => Math.hypot(a.x, a.z);
export const sub = (a: V2, b: V2): V2 => ({ x: a.x - b.x, z: a.z - b.z });
export const norm = (a: V2): V2 => {
  const l = len(a);
  return l > 1e-6 ? { x: a.x / l, z: a.z / l } : { x: 0, z: 0 };
};
/** Facing vector for a yaw (model faces +z at yaw 0, three.js convention). */
export const fwd = (yaw: number): V2 => ({ x: Math.sin(yaw), z: Math.cos(yaw) });
export const yawOf = (d: V2) => Math.atan2(d.x, d.z);
export function wrapAngle(a: number) {
  while (a > Math.PI) a -= 2 * Math.PI;
  while (a < -Math.PI) a += 2 * Math.PI;
  return a;
}

export interface Attributes {
  /** 0..1 */
  pace: number;
  control: number;
  passing: number;
  shooting: number;
  /** Tackling and positioning; defaults to 0.6 when absent. */
  defending?: number;
  /** Goalkeeping (reach, reactions, handling); only used for keepers. */
  keeping?: number;
}

export interface PlayerIntent {
  /** Desired movement, world space, length 0..1. */
  move: V2;
  sprint: boolean;
}

export interface PendingKick {
  action: ActionName;
  /** Seconds until the foot meets the ball (taken from the animation's contact frame). */
  delay: number;
  exec: () => void;
}

export class SimPlayer {
  pos: V2;
  vel = v2();
  yaw = 0;
  yawRate = 0;
  intent: PlayerIntent = { move: v2(), sprint: false };
  pending: PendingKick | null = null;
  /** Time left before this player may touch the ball again (after kicking, or after a heavy touch). */
  touchLock = 0;
  touchCd = 0;
  /** Seconds the player has been in possession. */
  heldFor = 0;
  /** Seconds left knocked off balance (after a failed tackle or being tackled). */
  stun = 0;
  /** Seconds of committed movement (dive, slide) during which velocity is kept rather than steered. */
  lunge = 0;
  role: "gk" | "field" = "field";
  /** Human-controlled right now. */
  controlled = false;

  constructor(
    readonly id: number,
    readonly team: number,
    start: V2,
    readonly attrs: Attributes,
    readonly name: string,
  ) {
    this.pos = { ...start };
  }

  maxSpeed(withBall: boolean) {
    const base = this.intent.sprint ? 6.4 + 1.4 * this.attrs.pace : 4.6 + 0.6 * this.attrs.pace;
    return withBall ? base * 0.88 : base;
  }

  get speed() {
    return len(this.vel);
  }

  /** Integrates movement: acceleration-limited velocity and turn-rate-limited facing. */
  move(dt: number, withBall: boolean, kicking: boolean) {
    if (this.lunge > 0) {
      this.lunge = Math.max(0, this.lunge - dt);
      this.pos.x += this.vel.x * dt;
      this.pos.z += this.vel.z * dt;
      this.yawRate = 0;
      if (this.lunge === 0) this.vel = { x: this.vel.x * 0.3, z: this.vel.z * 0.3 };
      return;
    }
    if (this.stun > 0) {
      this.stun = Math.max(0, this.stun - dt);
      kicking = true; // no control while off balance: decelerate in place
    }
    const target = kicking ? v2() : { x: this.intent.move.x * this.maxSpeed(withBall), z: this.intent.move.z * this.maxSpeed(withBall) };
    const dv = sub(target, this.vel), dl = len(dv);
    const accel = (len(target) > this.speed ? 13 + 5 * this.attrs.pace : 20) * dt;
    if (dl > accel) {
      this.vel.x += (dv.x / dl) * accel;
      this.vel.z += (dv.z / dl) * accel;
    } else this.vel = target;
    // braking while kicking keeps the plant foot honest
    if (kicking) this.vel = { x: this.vel.x * (1 - 6 * dt), z: this.vel.z * (1 - 6 * dt) };
    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;
    const want = len(this.intent.move) > 0.1 ? yawOf(this.intent.move) : this.speed > 0.3 ? yawOf(this.vel) : this.yaw;
    // turning is quick when slow (receive-and-turn), slower at a sprint, slower again with the ball
    const rate = (this.speed < 1.5 ? 13 : this.intent.sprint ? 5.5 : 8.5) * (withBall ? 0.8 : 1);
    const d = wrapAngle(want - this.yaw), step = Math.max(-rate * dt, Math.min(rate * dt, d));
    this.yaw = wrapAngle(this.yaw + step);
    this.yawRate = step / dt;
  }
}
