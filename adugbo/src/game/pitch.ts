/** Playing area layout. x runs along the length (goals at ±length/2), z across, y up. */
export interface PitchSpec {
  length: number;
  width: number;
  goalWidth: number;
  goalHeight: number;
  goalDepth: number;
  /** Boards/walls around the pitch keep the ball in play (cage football). */
  walls: boolean;
  wallHeight: number;
  /** Chain-link fence height above the ground (0 = none); keeps the ball inside the cage. */
  fenceHeight: number;
  surface: "concrete" | "turf" | "sand";
  /** Goals at both ends ("full") or only at +x ("single", used by practice). */
  goals: "full" | "single" | "none";
  /** "net": framed goal with crossbar and net. "posts": two bollards, no bar; goals only count below goalHeight. */
  goalStyle?: "net" | "posts";
}

export const PRACTICE_PITCH: PitchSpec = {
  length: 40, width: 26, goalWidth: 5, goalHeight: 2, goalDepth: 1.4, walls: true, wallHeight: 1.2, fenceHeight: 4, surface: "concrete", goals: "single",
};

/** Street 5s plays to monkey posts: small framed goals, about knee high, and no goalkeepers. */
export const FIVES_PITCH: PitchSpec = {
  length: 36, width: 22, goalWidth: 1.5, goalHeight: 0.75, goalDepth: 0.6, walls: true, wallHeight: 1.2, fenceHeight: 4, surface: "concrete", goals: "full",
};

export const SEVENS_PITCH: PitchSpec = {
  length: 52, width: 32, goalWidth: 6, goalHeight: 2.1, goalDepth: 1.5, walls: false, wallHeight: 0, fenceHeight: 0, surface: "turf", goals: "full",
};
