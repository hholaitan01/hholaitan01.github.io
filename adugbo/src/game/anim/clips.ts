/** Clip names inside characters/footballer.glb and where each one came from (see public/assets/manifest.json). */
export const CLIP_SOURCE: Record<string, "mixamo" | "quaternius-ual" | "cmu-mocap"> = {
  idle: "quaternius-ual", walk: "quaternius-ual", sprint: "quaternius-ual", jump: "quaternius-ual", dance: "quaternius-ual",
  hit: "quaternius-ual", talk: "quaternius-ual", sit: "quaternius-ual", crouch: "quaternius-ual",
  cheer: "cmu-mocap", hop: "cmu-mocap", kick: "cmu-mocap",
  jog: "mixamo", jogB: "mixamo", jogFL: "mixamo", jogFR: "mixamo", jogSL: "mixamo", jogSR: "mixamo", jogBL: "mixamo", jogBR: "mixamo",
  dribble: "mixamo", pass: "mixamo", strike: "mixamo", header: "mixamo", header2: "mixamo", throwIn: "mixamo",
  shufL: "mixamo", shufR: "mixamo", diveL: "mixamo", diveR: "mixamo", blockL: "mixamo", blockR: "mixamo",
  gkScoop: "mixamo", gkPass: "mixamo", gkPlace: "mixamo", trip: "mixamo", slide: "mixamo", slide2: "mixamo",
};

/** Ground speed (m/s) each in-place locomotion clip was authored for; playback rate = speed / this. */
export const STRIDE_SPEED: Record<string, number> = { walk: 1.5, jog: 3.6, dribble: 3.2, sprint: 6.6, jogSL: 2.4, jogSR: 2.4 };
