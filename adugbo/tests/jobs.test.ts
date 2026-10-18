import { beforeEach, describe, expect, it } from "vitest";
import { dayKey, jobDone, jobFor, JOBS, recordJob, weekStrip, type JobEvent } from "../src/game/jobs";

// a tiny localStorage for Node
const mem = new Map<string, string>();
(globalThis as unknown as { localStorage: Storage }).localStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => void mem.set(k, v),
  removeItem: (k: string) => void mem.delete(k),
  clear: () => mem.clear(),
  key: () => null,
  length: 0,
};

/** An event that completes a given job. */
const completes: Record<string, JobEvent> = {
  "win-hard": { kind: "match", mode: "fives", difficulty: "hard", won: true, goalsFor: 2, goalsAgainst: 1 },
  "win-normal": { kind: "match", mode: "fives", difficulty: "normal", won: true, goalsFor: 2, goalsAgainst: 1 },
  "three-goals": { kind: "match", mode: "fives", difficulty: "easy", won: false, goalsFor: 3, goalsAgainst: 4 },
  "clean-sheet": { kind: "match", mode: "sevens", difficulty: "easy", won: true, goalsFor: 1, goalsAgainst: 0 },
  shootout: { kind: "shootout", won: true, difficulty: "easy" },
  "pen-streak": { kind: "penaltyStreak", streak: 5 },
  "win-sevens": { kind: "match", mode: "sevens", difficulty: "easy", won: true, goalsFor: 1, goalsAgainst: 0 },
  "win-fourpost": { kind: "match", mode: "fourpost", difficulty: "easy", won: true, goalsFor: 5, goalsAgainst: 0 },
  online: { kind: "online" },
  ball: { kind: "ball" },
};

describe("today's job", () => {
  beforeEach(() => mem.clear());

  it("is the same all day and changes between days, covering several jobs over a month", () => {
    const d = new Date(2026, 9, 18, 8);
    expect(jobFor(dayKey(d)).id).toBe(jobFor(dayKey(new Date(2026, 9, 18, 23))).id);
    const seen = new Set<string>();
    for (let i = 0; i < 31; i++) seen.add(jobFor(dayKey(new Date(2026, 9, i + 1))).id);
    expect(seen.size).toBeGreaterThanOrEqual(6);
  });

  it("every job has an event that completes it and one that doesn't", () => {
    for (const j of JOBS) {
      expect(j.done(completes[j.id]), j.id).toBe(true);
      expect(j.done({ kind: "match", mode: "fives", difficulty: "easy", won: false, goalsFor: 0, goalsAgainst: 2 }), j.id).toBe(false);
    }
  });

  it("recording the right thing marks today done (once); the wrong thing doesn't; the week strip shows it", () => {
    const now = new Date(2026, 9, 18, 12); // a Sunday
    const job = jobFor(dayKey(now));
    expect(recordJob({ kind: "penaltyStreak", streak: 0 }, now)).toBe(false);
    expect(jobDone(dayKey(now))).toBe(false);
    expect(recordJob(completes[job.id], now)).toBe(true);
    expect(recordJob(completes[job.id], now)).toBe(false);
    expect(jobDone(dayKey(now))).toBe(true);
    const w = weekStrip(now);
    expect(w).toHaveLength(7);
    expect(w[6]).toEqual({ label: "S", done: true, today: true });
    expect(w.slice(0, 6).every((d) => !d.done && !d.today)).toBe(true);
  });
});
