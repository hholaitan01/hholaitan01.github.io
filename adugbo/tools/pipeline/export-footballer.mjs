import { open, browser, errs } from "./t2.mjs";
import fs from "fs";
const { page: P } = await open("exp", { width: 400, height: 300 }, false); P.setDefaultTimeout(300000);
await P.waitForFunction(() => document.querySelector("#loadMsg")?.textContent === "" && window.__k5, null, { timeout: 300000 });
const b64 = await P.evaluate(async () => {
  const { GLTFExporter } = await import("three/addons/exporters/GLTFExporter.js");
  const THREE = window.__k5.THREE;
  const deq = (root) => root.traverse((o) => { if (!o.geometry) return; o.geometry = o.geometry.clone(); for (const [k, a] of Object.entries(o.geometry.attributes)) { if (a.array instanceof Float32Array && !a.normalized && !a.isInterleavedBufferAttribute) continue; if (k === "skinIndex") { const u = new Uint16Array(a.count * a.itemSize); for (let i = 0; i < a.count; i++) for (let c = 0; c < a.itemSize; c++) u[i * a.itemSize + c] = [a.getX, a.getY, a.getZ, a.getW][c].call(a, i); o.geometry.setAttribute(k, new THREE.BufferAttribute(u, a.itemSize)); continue; } const f = new Float32Array(a.count * a.itemSize); for (let i = 0; i < a.count; i++) for (let c = 0; c < a.itemSize; c++) f[i * a.itemSize + c] = [a.getX, a.getY, a.getZ, a.getW][c].call(a, i); o.geometry.setAttribute(k, new THREE.BufferAttribute(f, a.itemSize)); } });

  const { ASSETS, FB_CLIPS, SkeletonUtils } = window.__k5;
  const src = ASSETS.footballer.scene, root = SkeletonUtils.clone(src);
  root.name = "Footballer";
  root.traverse((o) => {
    if (o.isSkinnedMesh) {
      o.geometry = o.geometry.clone();
      const kr = o.geometry.attributes.kitRegion;
      if (kr) { const c = new Float32Array(kr.count * 4); for (let i = 0; i < kr.count; i++) { c[i * 4] = kr.getX(i) / 8; c[i * 4 + 1] = 0; c[i * 4 + 2] = 0; c[i * 4 + 3] = 1; } o.geometry.setAttribute("color", new THREE.BufferAttribute(c, 4)); o.geometry.deleteAttribute("kitRegion"); }
      o.name = o.material.name || o.name;
    }
  });
  deq(root);
  const clips = [], seen = new Set();
  for (const [k, n] of Object.entries(FB_CLIPS)) { const c = ASSETS.fbClips[n] || ASSETS.clips[n]; if (!c || seen.has(k)) continue; seen.add(k); const cc = c.clone(); cc.name = k; cc.tracks = cc.tracks.filter((t) => root.getObjectByName(t.name.split(".")[0])); clips.push(cc); }
  const glb = await new GLTFExporter().parseAsync(root, { binary: true, animations: clips, onlyVisible: false });
  const u = new Uint8Array(glb); let s = ""; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
  return [btoa(s), clips.map((c) => `${c.name}:${c.duration.toFixed(2)}`).join(" ")];
});
fs.writeFileSync("../godot/footballer.glb", Buffer.from(b64[0], "base64"));
console.log("clips:", b64[1]); console.log("size", fs.statSync("../godot/footballer.glb").size);
await browser.close(); console.log([...new Set(errs)].join("\n") || "no errors");
