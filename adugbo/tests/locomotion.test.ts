import { describe, expect, it } from "vitest";
import { locoBlend, locoClip, selectLocomotion, type LocoState } from "../src/game/anim/locomotion";
import { STRIDE_SPEED } from "../src/game/anim/clips";

describe("locomotion state selection", () => {
  it("maps speed to idle / walk / jog / sprint", () => {
    expect(selectLocomotion("idle", { speed: 0, yawRate: 0 })).toBe("idle");
    expect(selectLocomotion("idle", { speed: 1.2, yawRate: 0 })).toBe("walk");
    expect(selectLocomotion("idle", { speed: 3.5, yawRate: 0 })).toBe("jog");
    expect(selectLocomotion("idle", { speed: 7, yawRate: 0 })).toBe("sprint");
  });

  it("has hysteresis so a speed near a threshold does not flicker", () => {
    let s: LocoState = "jog";
    for (const v of [4.8, 4.9, 4.7, 4.8]) s = selectLocomotion(s, { speed: v, yawRate: 0 });
    expect(s).toBe("jog");
    s = selectLocomotion(s, { speed: 5.1, yawRate: 0 });
    expect(s).toBe("sprint");
    for (const v of [4.8, 4.7, 4.9]) s = selectLocomotion(s, { speed: v, yawRate: 0 });
    expect(s).toBe("sprint");
    expect(selectLocomotion(s, { speed: 4.4, yawRate: 0 })).toBe("jog");
  });

  it("turns on the spot only when slow", () => {
    expect(selectLocomotion("idle", { speed: 0.2, yawRate: 3 })).toBe("turnL");
    expect(selectLocomotion("idle", { speed: 0.2, yawRate: -3 })).toBe("turnR");
    expect(selectLocomotion("jog", { speed: 3.5, yawRate: 3 })).toBe("jog");
  });

  it("uses the dribble clip with the ball and scales playback to speed", () => {
    expect(locoClip("jog", { speed: 3.2, yawRate: 0, dribbling: true }, STRIDE_SPEED)).toEqual({ clip: "dribble", rate: 1 });
    const r = locoClip("sprint", { speed: 20, yawRate: 0 }, STRIDE_SPEED).rate;
    expect(r).toBeLessThanOrEqual(1.25);
  });
});

describe("locomotion blend space", () => {
  const stride = { walk: 0.95, jog: 2.36, dribble: 2.47, sprint: 8.5, jogB: 2.1, jogSL: 2.6, jogSR: 2.1, jogFL: 2.5, jogFR: 2.5, jogBL: 2.2, jogBR: 2.05, shufL: 2.8, shufR: 2.8 };
  const dur = { walk: 1.33, jog: 0.8, dribble: 1.73, sprint: 0.67, jogB: 0.8, jogSL: 0.7, jogSR: 0.73, jogFL: 0.8, jogFR: 0.8, jogBL: 0.83, jogBR: 0.73, shufL: 0.5, shufR: 0.5 };
  const sum = (w: Record<string, number>) => Object.values(w).reduce((a, b) => a + b, 0);

  it("weights always sum to 1", () => {
    for (const speed of [0, 0.3, 1, 2.4, 5, 9])
      for (const heading of [0, 0.4, Math.PI / 2, 2.5, Math.PI, -1.2]) expect(sum(locoBlend({ speed, yawRate: 0, heading }, stride, dur).weights)).toBeCloseTo(1, 5);
  });

  it("forward speed blends walk → jog → sprint at the measured stride speeds", () => {
    expect(locoBlend({ speed: 2.36, yawRate: 0 }, stride, dur).weights).toEqual({ jog: 1 });
    const mid = locoBlend({ speed: 5.43, yawRate: 0 }, stride, dur).weights;
    expect(mid.jog).toBeCloseTo(0.5, 2);
    expect(mid.sprint).toBeCloseTo(0.5, 2);
    expect(locoBlend({ speed: 2.4, yawRate: 0, dribbling: true }, stride, dur).weights.dribble).toBeGreaterThan(0.9);
  });

  it("moving backwards and sideways uses the directional clips", () => {
    expect(locoBlend({ speed: 2.1, yawRate: 0, heading: Math.PI }, stride, dur).weights).toEqual({ jogB: 1 });
    const left = locoBlend({ speed: 2.5, yawRate: 0, heading: Math.PI / 2 }, stride, dur).weights;
    expect(left.jogSL).toBeCloseTo(1, 5);
    const diag = locoBlend({ speed: 2.36, yawRate: 0, heading: Math.PI / 8 }, stride, dur).weights;
    expect(Object.keys(diag).sort()).toEqual(["jog", "jogFL"]);
    expect(locoBlend({ speed: 2, yawRate: 0, heading: -Math.PI / 2, keeper: true }, stride, dur).weights).toEqual({ shufR: 1 });
  });

  it("cycle length matches the clip at pure weights, so phase speed = speed / cycle keeps feet planted", () => {
    const b = locoBlend({ speed: 2.36, yawRate: 0 }, stride, dur);
    expect(b.cycle).toBeCloseTo(2.36 * 0.8, 5);
    expect(locoBlend({ speed: 0, yawRate: 0 }, stride, dur).cycle).toBe(0);
  });

  it("turning on the spot steps sideways", () => {
    expect(Object.keys(locoBlend({ speed: 0, yawRate: 3, heading: 0 }, stride, dur).weights)).toContain("jogSL");
  });
});
