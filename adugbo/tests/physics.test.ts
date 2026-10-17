import { beforeAll, describe, expect, it } from "vitest";
import { initPhysics, PhysicsWorld } from "../src/physics/PhysicsWorld";
import { PRACTICE_PITCH, SEVENS_PITCH } from "../src/game/pitch";
import { BALL_R, SIM_DT } from "../src/physics/constants";

beforeAll(() => initPhysics());

function run(w: PhysicsWorld, seconds: number, each?: () => boolean | void) {
  for (let i = 0; i < seconds / SIM_DT; i++) {
    w.step();
    if (each?.()) return i * SIM_DT;
  }
  return seconds;
}

describe("ball physics (Rapier)", () => {
  it("a dropped ball bounces lower each time and settles", () => {
    const w = new PhysicsWorld({ ...PRACTICE_PITCH, walls: false });
    w.setBall({ x: 0, y: 2, z: 0 });
    let peak = 0, rising = false, peaks: number[] = [], lastY = 2;
    run(w, 4, () => {
      const y = w.ballPos.y;
      if (y > lastY) rising = true;
      else if (rising) {
        peaks.push(peak);
        rising = false;
        peak = 0;
      }
      if (rising) peak = Math.max(peak, y);
      lastY = y;
    });
    peaks = peaks.filter((p) => p > BALL_R + 0.02);
    expect(peaks.length).toBeGreaterThanOrEqual(2);
    // first rebound from 2 m with e≈0.68 → about 2*0.46 ≈ 0.9 m
    expect(peaks[0]).toBeGreaterThan(0.7);
    expect(peaks[0]).toBeLessThan(1.15);
    expect(peaks[1]).toBeLessThan(peaks[0]);
    expect(w.ballPos.y).toBeLessThan(BALL_R + 0.02);
    w.free();
  });

  it("a ground pass decelerates and stops (concrete)", () => {
    const w = new PhysicsWorld({ ...PRACTICE_PITCH, walls: false, length: 200, width: 200 });
    w.setBall({ x: -60, y: BALL_R, z: 0 }, { x: 10, y: 0, z: 0 });
    run(w, 30, () => Math.hypot(w.ballVel.x, w.ballVel.z) < 0.01);
    const d = w.ballPos.x + 60;
    // dv/dx = -(a + k v²)/v  →  d = ln(1 + k v0²/a) / (2k) = 46.7 m for a=0.55, k=0.013, v0=10
    const expected = Math.log(1 + (0.013 * 100) / 0.55) / (2 * 0.013);
    expect(Math.abs(d - expected) / expected).toBeLessThan(0.06);
    expect(Math.abs(w.ballPos.z)).toBeLessThan(0.05);
    w.free();
  });

  it("turf slows the ball more than concrete", () => {
    const dist = (surface: "concrete" | "turf") => {
      const w = new PhysicsWorld({ ...SEVENS_PITCH, surface, length: 200, width: 200 });
      w.setBall({ x: -60, y: BALL_R, z: 0 }, { x: 8, y: 0, z: 0 });
      run(w, 30, () => Math.hypot(w.ballVel.x, w.ballVel.z) < 0.01);
      const d = w.ballPos.x + 60;
      w.free();
      return d;
    };
    expect(dist("turf")).toBeLessThan(dist("concrete") * 0.75);
  });

  it("a shot into the corner is a goal and the net stops the ball", () => {
    const w = new PhysicsWorld(PRACTICE_PITCH);
    w.setBall({ x: 8, y: BALL_R, z: 0 }, { x: 22, y: 2, z: 1.2 });
    let goalAt = -1;
    run(w, 3, () => {
      if (w.goalCheck() === 1 && goalAt < 0) goalAt = 1;
    });
    expect(goalAt).toBe(1);
    expect(w.ballPos.x).toBeLessThan(PRACTICE_PITCH.length / 2 + PRACTICE_PITCH.goalDepth + 0.2);
    expect(Math.hypot(w.ballVel.x, w.ballVel.z)).toBeLessThan(1.5);
    w.free();
  });

  it("a shot at the post rebounds back into play and is not a goal", () => {
    const w = new PhysicsWorld(PRACTICE_PITCH);
    const postZ = PRACTICE_PITCH.goalWidth / 2 + 0.06;
    w.setBall({ x: 12, y: 0.8, z: postZ }, { x: 20, y: 0.6, z: 0 });
    let goal = false, hitPost = false;
    run(w, 1.5, () => {
      if (w.goalCheck()) goal = true;
      if (w.takeHits().some((h) => h.kind === "post")) hitPost = true;
    });
    expect(hitPost).toBe(true);
    expect(goal).toBe(false);
    expect(w.ballPos.x).toBeLessThan(PRACTICE_PITCH.length / 2);
    w.free();
  });

  it("over the bar is not a goal", () => {
    const w = new PhysicsWorld(PRACTICE_PITCH);
    w.setBall({ x: 12, y: BALL_R, z: 0 }, { x: 20, y: 8, z: 0 });
    let goal = false;
    run(w, 2, () => {
      if (w.goalCheck()) goal = true;
    });
    expect(goal).toBe(false);
    w.free();
  });

  it("side spin curves the ball (Magnus)", () => {
    const lateral = (spinY: number) => {
      const w = new PhysicsWorld({ ...SEVENS_PITCH, goals: "none", walls: false, length: 200, width: 200 });
      w.setBall({ x: 0, y: 0.5, z: 0 }, { x: 25, y: 4, z: 0 }, { x: 0, y: spinY, z: 0 });
      run(w, 0.8);
      const z = w.ballPos.z;
      w.free();
      return z;
    };
    expect(Math.abs(lateral(0))).toBeLessThan(0.01);
    expect(lateral(12)).toBeLessThan(-0.5); // ω×v: +y spin moving +x curves to -z
    expect(lateral(-12)).toBeGreaterThan(0.5);
  });

  it("the ball rebounds off the side boards", () => {
    const w = new PhysicsWorld(PRACTICE_PITCH);
    w.setBall({ x: 0, y: BALL_R, z: 10 }, { x: 0, y: 0, z: 12 });
    run(w, 1.2);
    expect(w.ballVel.z).toBeLessThan(0);
    expect(w.ballPos.z).toBeLessThan(PRACTICE_PITCH.width / 2);
    w.free();
  });
});
