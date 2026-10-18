import type { Difficulty } from "../game/match/rules";

export interface DifficultyParams {
  /** Seconds between noticing a situation and acting on it. */
  reaction: number;
  /** Seconds between decisions for the ball carrier. */
  decisionInterval: number;
  /** Noise added to decision scores (higher = more mistakes). */
  noise: number;
  /** Multiplier on CPU players' passing/shooting/control/defending ratings. */
  skill: number;
  /** Multiplier on CPU players' pace. */
  pace: number;
  /** Distance at which the nearest defender starts pressing the carrier. */
  pressDistance: number;
  /** Tackle attempts per second when in range. */
  tackleRate: number;
  /** Chance a tackle attempt is a slide when the carrier is moving away. */
  slideChance: number;
  /** Only tackle when the ball is at least this far from the carrier's feet (0 = lunge at anything). */
  tackleTiming: number;
  /** Shooting range in metres. */
  shootRange: number;
  /** Keeper: base chance to save a reachable shot. */
  keeperSave: number;
  keeperReaction: number;
}

/**
 * Tuned from CPU-vs-CPU ablations (tests/difficulty.test.ts): what wins matches is clean decisions (low noise),
 * patient shooting from good positions, a sharp keeper and well-timed rather than frequent tackles. Easy CPUs dive
 * into tackles, shoot from distance and misread situations; hard CPUs do the opposite.
 */
export const DIFFICULTY: Record<Difficulty, DifficultyParams> = {
  easy: { reaction: 0.5, decisionInterval: 0.6, noise: 0.5, skill: 0.78, pace: 0.9, pressDistance: 6, tackleRate: 1.4, slideChance: 0.15, tackleTiming: 0, shootRange: 13, keeperSave: 0.4, keeperReaction: 0.3 },
  normal: { reaction: 0.28, decisionInterval: 0.32, noise: 0.12, skill: 1, pace: 1, pressDistance: 8, tackleRate: 0.7, slideChance: 0.12, tackleTiming: 0.6, shootRange: 10, keeperSave: 0.62, keeperReaction: 0.2 },
  hard: { reaction: 0.15, decisionInterval: 0.2, noise: 0.04, skill: 1.2, pace: 1.08, pressDistance: 9, tackleRate: 0.5, slideChance: 0.08, tackleTiming: 0.7, shootRange: 9, keeperSave: 0.8, keeperReaction: 0.1 },
};
