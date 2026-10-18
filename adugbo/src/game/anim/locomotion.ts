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
/** Playback rate per action (keeper clips are long and include the recovery). */
export const ACTION_RATE: Partial<Record<ActionName, number>> = { tackle: 1.4, diveL: 1.3, diveR: 1.3, throw: 1.8, save: 1.2, fall: 1.1 };
