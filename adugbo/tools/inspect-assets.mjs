// Inspect every GLB under public/assets and write docs/asset-inspection.json:
// triangles, materials, texture resolutions, skeleton joints and animation clips.
import { NodeIO } from "@gltf-transform/core";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dir = path.join(root, "public/assets");
const io = new NodeIO();

function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith(".glb") ? [p] : [];
  });
}

function imageSize(buf) {
  if (!buf) return null;
  if (buf[0] === 0x89 && buf[1] === 0x50) return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      const m = buf[i + 1], len = buf.readUInt16BE(i + 2);
      if (m >= 0xc0 && m <= 0xc3) return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
      i += 2 + len;
    }
  }
  return null;
}

const report = {};
for (const file of walk(dir)) {
  const doc = await io.read(file);
  const r = doc.getRoot();
  let tris = 0;
  for (const mesh of r.listMeshes())
    for (const prim of mesh.listPrimitives()) {
      const idx = prim.getIndices();
      tris += (idx ? idx.getCount() : prim.getAttribute("POSITION").getCount()) / 3;
    }
  const rel = path.relative(root, file);
  report[rel] = {
    bytes: fs.statSync(file).size,
    triangles: Math.round(tris),
    meshes: r.listMeshes().map((m) => m.getName()),
    materials: r.listMaterials().map((m) => m.getName()),
    textures: r.listTextures().map((t) => ({ name: t.getName(), mime: t.getMimeType(), size: imageSize(Buffer.from(t.getImage() ?? [])) })),
    skins: r.listSkins().map((s) => ({ joints: s.listJoints().length, names: s.listJoints().map((j) => j.getName()) })),
    animations: r.listAnimations().map((a) => {
      let dur = 0;
      for (const s of a.listSamplers()) dur = Math.max(dur, s.getInput().getMax([])[0]);
      return { name: a.getName(), duration: +dur.toFixed(3), channels: a.listChannels().length };
    }),
  };
}
fs.writeFileSync(path.join(root, "docs/asset-inspection.json"), JSON.stringify(report, null, 1));
for (const [f, v] of Object.entries(report))
  console.log(`${f}: ${(v.bytes / 1e6).toFixed(2)}MB, ${v.triangles} tris, ${v.materials.length} materials, ${v.textures.length} textures ${v.textures.map((t) => t.size?.join("x")).join(",")}, ${v.skins[0]?.joints ?? 0} joints, ${v.animations.length} clips`);
