import { describe, expect, it } from "vitest";
import { locoClip, selectLocomotion, type LocoState } from "../src/game/anim/locomotion";
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
