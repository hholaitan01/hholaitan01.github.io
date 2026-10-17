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
  surface: "concrete" | "turf" | "sand";
  /** Goals at both ends ("full") or only at +x ("single", used by practice). */
  goals: "full" | "single" | "none";
}

export const PRACTICE_PITCH: PitchSpec = {
  length: 40, width: 26, goalWidth: 5, goalHeight: 2, goalDepth: 1.4, walls: true, wallHeight: 1.2, surface: "concrete", goals: "single",
};

export const FIVES_PITCH: PitchSpec = {
  length: 36, width: 22, goalWidth: 4.8, goalHeight: 1.8, goalDepth: 1.2, walls: true, wallHeight: 1.2, surface: "concrete", goals: "full",
};

export const SEVENS_PITCH: PitchSpec = {
  length: 52, width: 32, goalWidth: 6, goalHeight: 2.1, goalDepth: 1.5, walls: false, wallHeight: 0, surface: "turf", goals: "full",
};
