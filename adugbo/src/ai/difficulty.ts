import type { Difficulty } from "../game/match/rules";

export interface DifficultyParams {
  /** Seconds between noticing a situation and acting on it. */
  reaction: number;
  /** Seconds between decisions for the ball carrier. */
  decisionInterval: number;
  /** Noise added to decision scores (higher = more mistakes). */
  noise: number;
  /** Multiplier on CPU players' passing/shooting/control ratings. */
  skill: number;
  /** Multiplier on CPU players' pace. */
  pace: number;
  /** Distance at which the nearest defender starts pressing the carrier. */
  pressDistance: number;
  /** Tackle attempts per second when in range. */
  tackleRate: number;
  /** Chance a tackle attempt is a slide when the carrier is moving away. */
  slideChance: number;
  /** Shooting range in metres. */
  shootRange: number;
  /** Keeper: base chance to save a reachable shot. */
  keeperSave: number;
  keeperReaction: number;
}

export const DIFFICULTY: Record<Difficulty, DifficultyParams> = {
  easy: { reaction: 0.45, decisionInterval: 0.5, noise: 0.35, skill: 0.82, pace: 0.9, pressDistance: 5, tackleRate: 0.35, slideChance: 0.05, shootRange: 9, keeperSave: 0.45, keeperReaction: 0.3 },
  normal: { reaction: 0.28, decisionInterval: 0.32, noise: 0.18, skill: 1, pace: 1, pressDistance: 8, tackleRate: 0.7, slideChance: 0.12, shootRange: 11, keeperSave: 0.62, keeperReaction: 0.2 },
  hard: { reaction: 0.15, decisionInterval: 0.2, noise: 0.07, skill: 1.12, pace: 1.06, pressDistance: 11, tackleRate: 1.1, slideChance: 0.2, shootRange: 13, keeperSave: 0.75, keeperReaction: 0.12 },
};
