import { AIR_K, BALL_R, GRAVITY, SIM_DT } from "../../physics/constants";

/**
 * Launch speed for a ground pass that should still be moving at `arrive` m/s after `dist` metres.
 * Rolling: d(v²)/dx = -2(a + k v²)  →  v0² = (arrive² + a/k)·e^(2k·dist) − a/k.
 */
export function groundPassSpeed(dist: number, arrive: number, rollDecel: number, k = AIR_K): number {
  const c = rollDecel / k;
  return Math.sqrt((arrive * arrive + c) * Math.exp(2 * k * dist) - c);
}

/** Flies a ball with drag (no spin) from height y0; returns where it is when it reaches horizontal distance `dist`. */
export function flight(vh: number, vy: number, y0: number, dist: number): { y: number; t: number; landed: boolean } {
  let x = 0, y = y0, t = 0;
  while (x < dist && t < 6) {
    const sp = Math.hypot(vh, vy);
    vh -= AIR_K * sp * vh * SIM_DT;
    vy -= (GRAVITY + AIR_K * sp * vy) * SIM_DT;
    x += vh * SIM_DT;
    y += vy * SIM_DT;
    t += SIM_DT;
    if (y < BALL_R) return { y: BALL_R, t, landed: true };
    if (vh < 0.2) break;
  }
  return { y, t, landed: false };
}

/** Horizontal distance at first landing for launch (vh, vy). */
export function carry(vh: number, vy: number, y0 = BALL_R): number {
  let x = 0, y = y0, t = 0;
  while (t < 8) {
    const sp = Math.hypot(vh, vy);
    vh -= AIR_K * sp * vh * SIM_DT;
    vy -= (GRAVITY + AIR_K * sp * vy) * SIM_DT;
    x += vh * SIM_DT;
    y += vy * SIM_DT;
    t += SIM_DT;
    if (y < BALL_R && vy < 0) return x;
  }
  return x;
}

/** Launch speed at a fixed elevation angle (rad) so the first bounce lands `dist` metres away. */
export function loftSpeed(dist: number, angle: number): number {
  let lo = 1, hi = 45;
  for (let i = 0; i < 30; i++) {
    const v = (lo + hi) / 2;
    if (carry(v * Math.cos(angle), v * Math.sin(angle)) < dist) lo = v;
    else hi = v;
  }
  return (lo + hi) / 2;
}

/**
 * Vertical launch speed for a shot of horizontal speed `vh` so that the ball is at height `targetY`
 * when it has travelled `dist`. Returns null if unreachable at that speed.
 */
export function shotLift(vh: number, dist: number, targetY: number, y0 = BALL_R): number | null {
  let lo = -2, hi = 16;
  const at = (vy: number) => flight(vh, vy, y0, dist);
  if (at(hi).y < targetY) return null;
  for (let i = 0; i < 28; i++) {
    const vy = (lo + hi) / 2;
    const r = at(vy);
    // a ball that lands short skips on; treat bounce-in as "below target"
    if (r.landed || r.y < targetY) lo = vy;
    else hi = vy;
  }
  return (lo + hi) / 2;
}

/** Deterministic PRNG (mulberry32) so simulations and tests are reproducible. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Normal-ish random in [-1, 1] (sum of uniforms). */
export function jitter(r: () => number): number {
  return (r() + r() + r() - 1.5) / 1.5;
}
