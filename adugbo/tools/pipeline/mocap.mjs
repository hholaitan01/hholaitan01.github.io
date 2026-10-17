// CMU motion capture (mocap.cs.cmu.edu, Bruce Hahne BVH conversion) -> compact in-place clips at 30 fps.
import * as THREE from "three";
import { BVHLoader } from "three/examples/jsm/loaders/BVHLoader.js";
import fs from "fs";
const DIR = "../mocap/bvh", FPS_IN = 120, FPS = 30;
const CLIPS = [
  { name: "mc_walk", file: "35_01", s: 124, e: 259, loop: true },
  { name: "mc_jog", file: "16_35", s: 38, e: 135, loop: true },
  { name: "mc_run", file: "09_01", s: 13, e: 100, loop: true },
  { name: "mc_idle", file: "139_02", s: 449, e: 877, loop: true },
  { name: "mc_kick", file: "10_03", s: 100, e: 196, loop: false },
  { name: "mc_cheer", file: "79_69", s: 70, e: 430, loop: false },
  { name: "mc_hop", file: "49_02", s: 560, e: 850, loop: false },
  { name: "mc_shuffleL", file: "141_33", s: 772, e: 842, loop: true },
  { name: "mc_shuffleR", file: "141_33", s: 182, e: 258, loop: true },
];
const SKIP = /Finger|Index|Thumb/;
const out = { skeletons: {}, clips: {} };
const r3 = (v) => Math.round(v * 1000) / 1000;
for (const c of CLIPS) {
  const res = new BVHLoader().parse(fs.readFileSync(`${DIR}/${c.file}.bvh`, "utf8"));
  const bones = res.skeleton.bones, root = new THREE.Group(); root.add(bones[0]);
  if (!out.skeletons[c.file]) out.skeletons[c.file] = bones.filter((b) => !SKIP.test(b.name)).map((b) => ({ n: b.name, p: b.parent && b.parent.isBone ? b.parent.name : null, o: b.position.toArray().map(r3) }));
  const rest = new Map(bones.map((b) => [b.name, { q: b.quaternion.clone(), p: b.position.clone() }]));
  const mixer = new THREE.AnimationMixer(root); mixer.clipAction(res.clip).play();
  const n = Math.round(((c.e - c.s) / FPS_IN) * FPS) + (c.loop ? 0 : 1), frames = [];
  const hips = bones[0], lf = bones.find((b) => b.name === "LeftFoot"), rf = bones.find((b) => b.name === "RightFoot"), v = new THREE.Vector3();
  for (let f = 0; f < n; f++) {
    mixer.setTime((c.s + (f * FPS_IN) / FPS) / FPS_IN); root.updateMatrixWorld(true);
    frames.push({ q: Object.fromEntries(bones.filter((b) => !SKIP.test(b.name)).map((b) => [b.name, b.quaternion.clone()])), hp: hips.position.clone(), lfy: lf.getWorldPosition(v).y, rfy: rf.getWorldPosition(new THREE.Vector3()).y });
  }
  // Loops start at the same phase: right foot at the top of its swing
  if (c.loop) { let k = 0; frames.forEach((fr, i) => { if (fr.rfy > frames[k].rfy) k = i; }); frames.push(...frames.splice(0, k)); }
  // Face +Z: undo the clip's average heading (from the hips' forward direction)
  let sx = 0, sz = 0; for (const fr of frames) { v.set(0, 0, 1).applyQuaternion(fr.q.Hips); sx += v.x; sz += v.z; }
  const yaw = Math.atan2(sx, sz), fix = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -yaw);
  for (const fr of frames) { fr.q.Hips.premultiply(fix); fr.hp.applyQuaternion(fix); }
  // In place: remove the straight-line travel, keep bob and sway
  const N = frames.length, x0 = frames[0].hp.x, z0 = frames[0].hp.z;
  const end = c.loop ? frames[N - 1].hp.clone().add(frames[N - 1].hp.clone().sub(frames[N - 2].hp)) : frames[N - 1].hp;
  frames.forEach((fr, i) => { const t = i / (c.loop ? N : N - 1); fr.hp.x -= x0 + (end.x - x0) * t; fr.hp.z -= z0 + (end.z - z0) * t; });
  const q = {}; for (const b of Object.keys(frames[0].q)) q[b] = frames.flatMap((fr) => fr.q[b].toArray().map(r3));
  out.clips[c.name] = { sk: c.file, fps: FPS, loop: c.loop, n: N, q, hp: frames.flatMap((fr) => fr.hp.toArray().map(r3)) };
  console.log(c.name, N, "frames", (N / FPS).toFixed(2) + "s", "heading fix", (yaw * 57.3).toFixed(0) + "°");
}
fs.writeFileSync("../kerbside/assets/mocap.json", JSON.stringify(out));
console.log("mocap.json", (fs.statSync("../kerbside/assets/mocap.json").size / 1024).toFixed(0), "KB");
