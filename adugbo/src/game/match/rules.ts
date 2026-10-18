import { FIVES_PITCH, SEVENS_PITCH, type PitchSpec } from "../pitch";
import type { TimeOfDay } from "../../settings/settings";

export type ModeId = "fives" | "sevens" | "fourpost";
export type Difficulty = "easy" | "normal" | "hard";

export interface MatchConfig {
  mode: ModeId;
  /** Team ids from TEAMS. */
  home: string;
  away: string;
  /** Which side the human controls (0 = home, 1 = away). */
  userTeam: 0 | 1;
  difficulty: Difficulty;
  /** Real-time minutes per half (four-post plays one period). */
  halfMinutes: number;
  playersPerSide: number;
  keepers: boolean;
  /** First to this many goals wins (null = play the clock out). */
  targetScore: number | null;
  goalWidth: number;
  walls: boolean;
  timeOfDay: TimeOfDay;
}

export const MODES: Record<ModeId, { title: string; blurb: string; defaults: Omit<MatchConfig, "home" | "away" | "userTeam" | "difficulty" | "timeOfDay"> }> = {
  fives: {
    title: "Street 5s",
    blurb: "Five-a-side in the cage. Boards keep the ball in play; goalkeepers in nets.",
    defaults: { mode: "fives", halfMinutes: 3, playersPerSide: 5, keepers: true, targetScore: null, goalWidth: FIVES_PITCH.goalWidth, walls: true },
  },
  sevens: {
    title: "7-a-side",
    blurb: "Bigger open pitch on worn turf with kick-ins, corners and goal kicks.",
    defaults: { mode: "sevens", halfMinutes: 4, playersPerSide: 7, keepers: true, targetScore: null, goalWidth: SEVENS_PITCH.goalWidth, walls: false },
  },
  fourpost: {
    title: "Four posts",
    blurb: "No keepers, two small goals made of posts. House rules are set before kickoff.",
    defaults: { mode: "fourpost", halfMinutes: 5, playersPerSide: 4, keepers: false, targetScore: 5, goalWidth: 1.6, walls: true },
  },
};

/** Four-post goals only count below this height (no crossbar). */
export const FOURPOST_MAX_HEIGHT = 1.0;

export function pitchFor(c: MatchConfig): PitchSpec {
  if (c.mode === "sevens") return { ...SEVENS_PITCH, goalWidth: c.goalWidth };
  if (c.mode === "fourpost") {
    // the pitch scales with the number of players
    const length = 24 + c.playersPerSide * 3, width = 16 + c.playersPerSide * 2;
    return {
      length, width, goalWidth: c.goalWidth, goalHeight: FOURPOST_MAX_HEIGHT, goalDepth: 0.6, walls: c.walls, wallHeight: 1.2,
      fenceHeight: c.walls ? 4 : 0, surface: "concrete", goals: "full", goalStyle: "posts",
    };
  }
  return { ...FIVES_PITCH, goalWidth: c.goalWidth, walls: c.walls, fenceHeight: c.walls ? 4 : 0 };
}

/** Plain-language rules shown before kickoff. Every line describes behaviour the match engine actually enforces. */
export function rulesText(c: MatchConfig): string[] {
  const r: string[] = [];
  r.push(`${c.playersPerSide} v ${c.playersPerSide}${c.keepers ? ", including goalkeepers" : ", no goalkeepers"}.`);
  if (c.mode === "fourpost") {
    r.push(`Goals are ${c.goalWidth.toFixed(1)} m wide between two posts, with no crossbar: the ball must cross below ${FOURPOST_MAX_HEIGHT.toFixed(1)} m.`);
    r.push(c.targetScore ? `First to ${c.targetScore} wins, or the leader after ${c.halfMinutes} minutes.` : `One period of ${c.halfMinutes} minutes.`);
  } else {
    r.push(`Two halves of ${c.halfMinutes} minutes (real time). Teams keep the same ends.`);
  }
  r.push(c.walls ? "Boards and fence around the pitch: the ball stays in play off the walls." : "Open pitch: kick-ins from the touchline, corners and goal kicks.");
  r.push("The kicking team takes kick-offs and restarts; opponents must stay 4 m away until the ball is played.");
  r.push("No offside. Tackles are allowed; fouls, cards and penalties are not implemented in this build.");
  if (c.targetScore && c.mode !== "fourpost") r.push(`First to ${c.targetScore} goals wins.`);
  return r;
}

export function defaultConfig(mode: ModeId, home = "yab", away = "msh"): MatchConfig {
  return { ...MODES[mode].defaults, home, away, userTeam: 0, difficulty: "normal", timeOfDay: "day" };
}
