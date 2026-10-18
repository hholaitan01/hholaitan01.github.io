// Mixamo clips supplied by the player (Jog Forward, Throw In) -> compact in-place clips added to mocap.json
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import fs from "fs";
globalThis.window = globalThis; globalThis.self = globalThis;
const OUT = "../kerbside/assets/mocap.json", data = JSON.parse(fs.readFileSync(OUT, "utf8"));
const SKIP = /Hand(Thumb|Index|Middle|Ring|Pinky)|_end$|HeadTop|Eye/;
const r4 = (v) => Math.round(v * 1e4) / 1e4, r2 = (v) => Math.round(v * 100) / 100;
const JOBS = [
  { name: "mx_jog", file: "jog_forward", loop: true },
  { name: "mx_throw", file: "throw_in", loop: false, from: 1.0, to: 2.35 },
  { name: "mx_jogB", file: "jog_backward", loop: true },
  { name: "mx_jogFR", file: "jog_fwd_diag", loop: true, mirror: "mx_jogFL" },
  { name: "mx_jogBL", file: "jog_back_diag", loop: true },
  { name: "mx_jogBR", file: "jog_back_diag2", loop: true },
  { name: "mx_dribble", file: "dribble", loop: true },
  { name: "mx_pass", file: "kick", loop: false },
  { name: "mx_strike", file: "strike", loop: false },
  { name: "mx_header", file: "header", loop: false },
  { name: "mx_jogSL", file: "jog_strafe_left", loop: true },
  { name: "mx_jogSR", file: "jog_strafe_right", loop: true },
  { name: "mx_gkSideR", file: "gk_side_fixed", loop: true, mirror: "mx_gkSideL" },
  { name: "mx_gkDiveR", file: "gk_dive", loop: false, from: 0.4, to: 2.7, still: true, mirror: "mx_gkDiveL" },
  { name: "mx_gkBlockR", file: "gk_block2_fixed", loop: false, from: 0.1, to: 2.3, still: true, mirror: "mx_gkBlockL" },
  { name: "mx_gkScoop", file: "gk_scoop_fixed", loop: false, from: 0.35, to: 1.45, still: true },
  { name: "mx_gkPass", file: "gk_pass", loop: false, still: true },
  { name: "mx_gkPlace", file: "gk_place", loop: false, from: 0.1, to: 1.7, still: true },
  { name: "mx_trip", file: "trip", loop: false, from: 0.1, to: 1.6, still: true },
  { name: "mx_slide", file: "tackle2_fixed", loop: false, from: 0.8, to: 2.73, still: true },
  { name: "mx_slide2", file: "tackle_fixed", loop: false, from: 0.3, to: 2.3, still: true },
  { name: "mx_header2", file: "header2", loop: false, from: 0.15, to: 1.05, still: true },
];
// Mirror a clip left<->right: each bone takes the reflected world-space motion of its opposite number
const opp = (n) => n.replace(/Left/, "\u0000").replace(/Right/, "Left").replace("\u0000", "Right");
function mirrorFrames(bones, frames) {
  const byName = Object.fromEntries(bones.map((b) => [b.name, b])), M = (q) => new THREE.Quaternion(q.x, -q.y, -q.z, q.w);
  for (const b of bones) b.quaternion.copy(b.userData.restQ); bones[0].position.copy(bones[0].userData.rest); bones[0].parent.updateMatrixWorld(true);
  const R = Object.fromEntries(bones.map((b) => [b.name, b.getWorldQuaternion(new THREE.Quaternion())]));
  return frames.map((fr) => {
    for (const b of bones) b.quaternion.fromArray(fr.q[b.name]); bones[0].parent.updateMatrixWorld(true);
    const W = Object.fromEntries(bones.map((b) => [b.name, b.getWorldQuaternion(new THREE.Quaternion())])), Wm = {}, q = {};
    for (const b of bones) { const a = byName[opp(b.name)] ? opp(b.name) : b.name, d = W[a].clone().multiply(R[a].clone().invert()); Wm[b.name] = M(d).multiply(R[b.name]); }
    for (const b of bones) { const pw = b.parent && b.parent.isBone ? Wm[b.parent.name] : b.parent.getWorldQuaternion(new THREE.Quaternion()); q[b.name] = pw.clone().invert().multiply(Wm[b.name]).toArray().map(r4); }
    const rest = bones[0].userData.rest; return { q, hp: new THREE.Vector3(2 * rest.x - fr.hp.x, fr.hp.y, fr.hp.z) };
  });
}
for (const j of JOBS) {
  const b = fs.readFileSync(`../useranim/${j.file}.fbx`), obj = new FBXLoader().parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength), "");
  const clip = obj.animations.find((a) => a.tracks.length > 10);
  const bones = [], seen = new Set(); obj.traverse((o) => { if (o.isBone && !SKIP.test(o.name) && !seen.has(o.name)) { seen.add(o.name); bones.push(o); } });
  data.skeletons.mixamo = data.skeletons.mixamo && j !== JOBS[0] ? data.skeletons.mixamo : null; if (!data.skeletons.mixamo) data.skeletons.mixamo = bones.map((o) => ({ n: o.name, p: o.parent && o.parent.isBone ? o.parent.name : null, o: o.position.toArray().map(r2), r: o.quaternion.toArray().map(r4) }));
  bones[0].userData.rest = bones[0].position.clone(); for (const o of bones) o.userData.restQ = o.quaternion.clone();
  const mixer = new THREE.AnimationMixer(obj); mixer.clipAction(clip).play();
  const FPS = 30, t0 = j.from ?? 0, t1 = j.to ?? clip.duration, n = Math.round((t1 - t0) * FPS) + (j.loop ? 0 : 1), frames = [];
  const hips = bones[0], rf = bones.find((o) => o.name === "mixamorigRightFoot"), v = new THREE.Vector3();
  for (let f = 0; f < n; f++) { mixer.setTime(Math.min(t0 + f / FPS, clip.duration - 1e-3)); obj.updateMatrixWorld(true); frames.push({ q: Object.fromEntries(bones.map((o) => [o.name, o.quaternion.toArray().map(r4)])), hp: hips.position.clone(), rfy: rf.getWorldPosition(v).y }); }
  // In place: remove straight-line travel of the hips
  const N = frames.length, a = frames[0].hp.clone(), e = j.loop ? frames[N - 1].hp.clone().add(frames[N - 1].hp.clone().sub(frames[N - 2].hp)) : frames[N - 1].hp.clone();
  const rest = bones[0].userData.rest; if (j.still) frames.forEach((fr) => { fr.hp.x = rest.x; fr.hp.z = rest.z; }); else frames.forEach((fr, i) => { const t = i / (j.loop ? N : N - 1); fr.hp.x += rest.x - (a.x + (e.x - a.x) * t); fr.hp.z += rest.z - (a.z + (e.z - a.z) * t); });
  // Loops start where the right foot is at the top of its swing (the walk and sprint already do)
  if (j.loop) { let k = 0; frames.forEach((fr, i) => { if (fr.rfy > frames[k].rfy) k = i; }); frames.push(...frames.splice(0, k)); }
  const save = (name, frs) => { const q = {}; for (const o of bones) q[o.name] = frs.flatMap((fr) => fr.q[o.name]); data.clips[name] = { sk: "mixamo", fps: FPS, loop: j.loop, n: frs.length, q, hp: frs.flatMap((fr) => fr.hp.toArray().map(r2)) }; console.log(name, frs.length, "frames", (frs.length / FPS).toFixed(2) + "s"); };
  save(j.name, frames);
  if (j.mirror) { mixer.stopAllAction(); const m = mirrorFrames(bones, frames); if (j.loop) m.push(...m.splice(0, Math.round(m.length / 2))); save(j.mirror, m); }
}
fs.writeFileSync(OUT, JSON.stringify(data));
console.log("mocap.json", (fs.statSync(OUT).size / 1024).toFixed(0), "KB; mixamo bones", data.skeletons.mixamo.length, data.skeletons.mixamo.slice(0, 4).map((b) => b.n).join(","));
