// Pure animation state selection for a footballer, so it can be unit-tested without WebGL.

export type LocoState = "idle" | "walk" | "jog" | "sprint" | "turnL" | "turnR";
export type ActionName = "pass" | "shoot" | "kick" | "header" | "cheer" | "tackle" | "fall" | "diveL" | "diveR" | "save" | "throw";

export interface LocoInput {
  /** Planar speed in m/s. */
  speed: number;
  /** Yaw rate in rad/s, positive = turning left (counter-clockwise seen from above). */
  yawRate: number;
  /** True while the player has the ball at his feet. */
  dribbling?: boolean;
  /** Direction of travel relative to facing, radians: 0 forward, +π/2 to his left, ±π backwards. */
  heading?: number;
  /** Goalkeepers side-step with the shuffle clips. */
  keeper?: boolean;
}

// Thresholds with hysteresis so the state does not flicker at a boundary.
const UP = { walk: 0.35, jog: 2.2, sprint: 5.0 };
const DOWN = { walk: 0.2, jog: 1.9, sprint: 4.6 };
const TURN_RATE = 1.6;
const TURN_MAX_SPEED = 1.0;

export function selectLocomotion(prev: LocoState, inp: LocoInput): LocoState {
  const s = inp.speed;
  if (s < TURN_MAX_SPEED && Math.abs(inp.yawRate) > TURN_RATE) return inp.yawRate > 0 ? "turnL" : "turnR";
  const rank = { idle: 0, walk: 1, jog: 2, sprint: 3, turnL: 0, turnR: 0 }[prev];
  const above = (k: keyof typeof UP, r: number) => s > (rank >= r ? DOWN[k] : UP[k]);
  if (above("sprint", 3)) return "sprint";
  if (above("jog", 2)) return "jog";
  if (above("walk", 1)) return "walk";
  return "idle";
}

/** Which clip plays for a locomotion state, and its playback rate. */
export function locoClip(state: LocoState, inp: LocoInput, stride: Record<string, number>): { clip: string; rate: number } {
  const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
  switch (state) {
    case "idle":
      return { clip: "idle", rate: 1 };
    case "walk":
      return { clip: "walk", rate: clamp(inp.speed / stride.walk, 0.6, 1.4) };
    case "jog": {
      const clip = inp.dribbling ? "dribble" : "jog";
      return { clip, rate: clamp(inp.speed / stride[clip], 0.7, 1.35) };
    }
    case "sprint":
      return { clip: "sprint", rate: clamp(inp.speed / stride.sprint, 0.75, 1.25) };
    case "turnL":
      return { clip: "jogSL", rate: 0.8 };
    case "turnR":
      return { clip: "jogSR", rate: 0.8 };
  }
}

export const ACTION_CLIP: Record<ActionName, string> = {
  pass: "pass", shoot: "strike", kick: "kick", header: "header", cheer: "cheer",
  // a standing poke tackle reuses the short pass swing; "fall" is the Mixamo trip (the tackled player)
  tackle: "pass", fall: "trip", diveL: "diveL", diveR: "diveR", save: "gkScoop", throw: "gkPass",
};
/** Alternative clips picked at random for variety (the first entry is ACTION_CLIP's). */
export const ACTION_VARIANTS: Partial<Record<ActionName, string[]>> = {
  cheer: ["cheer", "dance", "hop", "jump"],
  fall: ["trip", "slide", "slide2"],
};
/** Playback rate per action (keeper clips are long and include the recovery). */
export const ACTION_RATE: Partial<Record<ActionName, number>> = { tackle: 1.4, diveL: 1.3, diveR: 1.3, throw: 1.8, save: 1.2, fall: 1.1 };

/** Clip for each of the eight travel directions (forward is the walk/jog/sprint speed blend). */
const DIRS = ["F", "jogFL", "jogSL", "jogBL", "jogB", "jogBR", "jogSR", "jogFR"] as const;

export interface LocoBlend {
  /** Weight per clip, summing to 1. */
  weights: Record<string, number>;
  /** Metres covered per gait cycle of the blend (drives the shared phase); 0 when standing. */
  cycle: number;
}

/**
 * Locomotion blend space: idle → walk → jog → sprint by speed (anchored at each clip's measured stride speed),
 * and eight-way direction blending by heading. All moving clips share one normalised phase so feet stay planted.
 * `stride` is the ground speed each loop was authored for and `dur` its length in seconds.
 */
export function locoBlend(inp: LocoInput, stride: Record<string, number>, dur: Record<string, number>, idleClip = "idle"): LocoBlend {
  let s = inp.speed;
  let heading = inp.heading ?? 0;
  // turning on the spot: a slow side-step in the turn direction
  if (s < TURN_MAX_SPEED && Math.abs(inp.yawRate) > TURN_RATE) {
    s = 1.1;
    heading = inp.yawRate > 0 ? Math.PI / 2 : -Math.PI / 2;
  }
  const w: Record<string, number> = {};
  const add = (k: string, v: number) => v > 1e-4 && (w[k] = (w[k] ?? 0) + v);
  const STAND = 0.25;
  if (s < STAND) {
    add(idleClip, 1);
    return { weights: w, cycle: 0 };
  }
  // direction: interpolate between the two nearest of eight 45° sectors
  const a = ((heading % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const sector = a / (Math.PI / 4), i0 = Math.floor(sector) % 8, i1 = (i0 + 1) % 8, f = sector - Math.floor(sector);
  const dirs: [string, number][] = [[DIRS[i0], 1 - f], [DIRS[i1], f]];
  // ramp in from idle at low speed
  const walkS = stride.walk ?? 1;
  const move = Math.min(1, (s - STAND) / Math.max(0.1, walkS * 0.8 - STAND));
  add(idleClip, 1 - move);
  for (const [d, dw] of dirs) {
    if (dw <= 0) continue;
    if (d === "F") {
      const jog = inp.dribbling ? "dribble" : "jog";
      const pts: [string, number][] = [["walk", stride.walk ?? 1], [jog, stride[jog] ?? 2.4], ["sprint", stride.sprint ?? 7]];
      if (s <= pts[0][1]) add("walk", dw * move);
      else if (s >= pts[2][1]) add("sprint", dw * move);
      else {
        const k = s <= pts[1][1] ? 0 : 1;
        const t = (s - pts[k][1]) / (pts[k + 1][1] - pts[k][1]);
        add(pts[k][0], dw * move * (1 - t));
        add(pts[k + 1][0], dw * move * t);
      }
    } else {
      const clip = inp.keeper && s < 3.5 ? (d === "jogSL" ? "shufL" : d === "jogSR" ? "shufR" : d) : d;
      add(clip, dw * move);
    }
  }
  // gait cycle length of the moving part of the blend
  let cyc = 0, mw = 0;
  for (const [k, v] of Object.entries(w)) {
    if (k === idleClip) continue;
    cyc += v * (stride[k] ?? 2.4) * (dur[k] ?? 0.8);
    mw += v;
  }
  return { weights: w, cycle: mw > 0 ? cyc / mw : 0 };
}
