import type { Difficulty, ModeId } from "./match/rules";

// Today's job: one small challenge a day, the same for everyone on the same date, tracked on this device. Finishing
// it lights up today's dot in the week strip on the home screen.

export type JobEvent =
  | { kind: "match"; mode: ModeId; difficulty: Difficulty; won: boolean; goalsFor: number; goalsAgainst: number }
  | { kind: "shootout"; won: boolean; difficulty: Difficulty }
  | { kind: "penaltyStreak"; streak: number }
  | { kind: "online" }
  | { kind: "ball" };

export interface Job {
  id: string;
  text: string;
  /** Where the home screen sends you to do it. */
  route: string;
  done: (e: JobEvent) => boolean;
}

export const JOBS: Job[] = [
  { id: "win-hard", text: "Win a match on Hard", route: "play", done: (e) => e.kind === "match" && e.won && e.difficulty === "hard" },
  { id: "win-normal", text: "Win a match on Normal or Hard", route: "play", done: (e) => e.kind === "match" && e.won && e.difficulty !== "easy" },
  { id: "three-goals", text: "Score 3 goals in one match", route: "play", done: (e) => e.kind === "match" && e.goalsFor >= 3 },
  { id: "clean-sheet", text: "Win without conceding", route: "play", done: (e) => e.kind === "match" && e.won && e.goalsAgainst === 0 },
  { id: "shootout", text: "Win a penalty shootout", route: "penalties", done: (e) => e.kind === "shootout" && e.won },
  { id: "pen-streak", text: "Score 5 penalties in a row in practice", route: "training/penalties", done: (e) => e.kind === "penaltyStreak" && e.streak >= 5 },
  { id: "win-sevens", text: "Win a 7-a-side match", route: "play", done: (e) => e.kind === "match" && e.won && e.mode === "sevens" },
  { id: "win-fourpost", text: "Win a Four posts game", route: "play", done: (e) => e.kind === "match" && e.won && e.mode === "fourpost" },
  { id: "online", text: "Finish an online match", route: "online", done: (e) => e.kind === "online" },
  { id: "ball", text: "Design a new match ball", route: "ball", done: (e) => e.kind === "ball" },
];

const KEY = "adugbo.jobs.v1";

export function dayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** The job for a date: picked by a hash of the date, so it changes daily and is the same for everyone. */
export function jobFor(day = dayKey()): Job {
  let h = 2166136261;
  for (const c of day) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return JOBS[(h >>> 0) % JOBS.length];
}

function load(): Record<string, true> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Record<string, true>;
  } catch {
    return {};
  }
}

export function jobDone(day = dayKey()) {
  return !!load()[day];
}

/** Report something that happened; marks today's job done if it counts. Returns true when it just got done. */
export function recordJob(e: JobEvent, now = new Date()): boolean {
  const day = dayKey(now);
  const done = load();
  if (done[day] || !jobFor(day).done(e)) return false;
  done[day] = true;
  try {
    localStorage.setItem(KEY, JSON.stringify(done));
  } catch {
    /* not saved */
  }
  return true;
}

/** Monday-to-Sunday of the current week: whether each day's job was done. */
export function weekStrip(now = new Date()): { label: string; done: boolean; today: boolean }[] {
  const done = load();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  return ["M", "T", "W", "T", "F", "S", "S"].map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return { label, done: !!done[dayKey(d)], today: dayKey(d) === dayKey(now) };
  });
}
