// Packs the Microsoft Rocketbox Sports_Male_03 footballer (MIT) with game-ready textures.
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { prune, dedup, quantize } from "@gltf-transform/functions";
import sharp from "sharp";
import fs from "fs";
const RB = "../rb", OUT = "../kerbside/assets";
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(`${RB}/sm03raw.glb`);
const root = doc.getRoot();
const tex = async (file, size, kind) => {
  let img = sharp(`${RB}/${file}`).resize(size, size);
  const buf = kind === "png" ? await img.png({ compressionLevel: 9, palette: false }).toBuffer() : await img.jpeg({ quality: kind === "normal" ? 86 : 84, mozjpeg: true }).toBuffer();
  return doc.createTexture(file).setImage(new Uint8Array(buf)).setMimeType(kind === "png" ? "image/png" : "image/jpeg");
};
for (const m of root.listMaterials()) {
  const n = m.getName();
  m.setMetallicFactor(0).setRoughnessFactor(0.7);
  if (n === "m300_body") { m.setBaseColorTexture(await tex("body_k5.png", 1024, "jpg")); m.setNormalTexture(await tex("body_n.png", 512, "normal")); m.setName("rb_body"); }
  if (n === "m300_head") { m.setBaseColorTexture(await tex("head_k5.png", 1024, "jpg")); m.setRoughnessFactor(0.55); m.setName("rb_head"); }
  if (n === "m300_opacity") { m.setBaseColorTexture(await tex("hair_k5.png", 512, "png")); m.setAlphaMode("MASK").setAlphaCutoff(0.42).setDoubleSided(true); m.setName("rb_hair"); }
}
// Extra faces from other Rocketbox avatars: same 80-bone skeleton and bind pose, so the head primitive is
// rebound to this skin by joint name (they differ only in joint order)
const HEADS = { m006: "Male_Adult_04", m007: "Male_Adult_12", m102: "Construction_Male_03", m130: "Fire_Male_06", sm005: "Military_Male_04", m016: "Business_Male_05", m108: "Construction_Male_08" };
const skin = root.listSkins()[0], jointIndex = new Map(skin.listJoints().map((j, i) => [j.getName(), i]));
const baseNode = root.listNodes().find((n) => n.getMesh() && n.getSkin());
const scene = root.listScenes()[0], parent = baseNode.getParentNode();
const copyAcc = (acc, name) => doc.createAccessor(name).setType(acc.getType()).setArray(acc.getArray().slice()).setNormalized(acc.getNormalized());
for (const [pre, avatar] of Object.entries(HEADS)) {
  const src = await io.read(`../heads/glb/${avatar}.glb`), sr = src.getRoot(), sskin = sr.listSkins()[0], sj = sskin.listJoints().map((j) => j.getName());
  const parts = [[`${pre}_head`, `rbh_${pre}`, await tex(`heads/${pre}_head.png`, 512, "jpg")]];
  if (pre === "m006") parts.push([`${pre}_opacity`, `rbx_${pre}`, await tex(`heads/m006_hair.png`, 512, "png")]);
  const mesh = doc.createMesh(`head_${pre}`);
  for (const [mname, newName, t] of parts) {
    const prim = sr.listMeshes().flatMap((m) => m.listPrimitives()).find((p) => p.getMaterial()?.getName() === mname);
    if (!prim) throw new Error("no primitive " + mname + " in " + avatar);
    const np = doc.createPrimitive();
    for (const sem of ["POSITION", "NORMAL", "TEXCOORD_0", "WEIGHTS_0"]) { const a = prim.getAttribute(sem); if (a) np.setAttribute(sem, copyAcc(a, sem)); }
    const J = prim.getAttribute("JOINTS_0"), arr = J.getArray().slice();
    for (let i = 0; i < arr.length; i++) { const nm = sj[arr[i]], ji = jointIndex.get(nm); if (ji == null) throw new Error("joint " + nm); arr[i] = ji; }
    np.setAttribute("JOINTS_0", doc.createAccessor("JOINTS_0").setType("VEC4").setArray(arr));
    np.setIndices(copyAcc(prim.getIndices(), "idx"));
    const mat = doc.createMaterial(newName).setBaseColorTexture(t).setMetallicFactor(0).setRoughnessFactor(0.55);
    if (newName.startsWith("rbx_")) mat.setAlphaMode("MASK").setAlphaCutoff(0.42).setDoubleSided(true);
    np.setMaterial(mat); mesh.addPrimitive(np);
  }
  const node = doc.createNode(`head_${pre}`).setMesh(mesh).setSkin(skin);
  if (parent) parent.addChild(node); else scene.addChild(node);
}
for (const b of root.listBuffers().slice(1)) { for (const a of root.listAccessors()) if (a.getBuffer() === b) a.setBuffer(root.listBuffers()[0]); b.dispose(); }
for (const a of root.listAccessors()) if (!a.getBuffer()) a.setBuffer(root.listBuffers()[0]);
await doc.transform(dedup(), prune({ keepLeaves: true }), quantize({ quantizePosition: 14, quantizeNormal: 10, quantizeTexcoord: 12, quantizeWeight: 8 }));
await io.write(`${OUT}/footballer.glb`, doc);
fs.copyFileSync(`${RB}/LICENSE.md`, `${OUT}/LICENSE-rocketbox.txt`);
console.log("footballer.glb", (fs.statSync(`${OUT}/footballer.glb`).size / 1024).toFixed(0), "KB");
