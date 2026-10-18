import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * Collapses static meshes that share a material (and shadow flags) into one mesh each, cutting draw calls.
 * Meshes with multi-material arrays, skinned meshes and anything named are left alone.
 */
export function mergeStatic(root: THREE.Object3D): { before: number; after: number } {
  root.updateMatrixWorld(true);
  const groups = new Map<string, THREE.Mesh[]>();
  let before = 0;
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh || (m as THREE.SkinnedMesh).isSkinnedMesh || Array.isArray(m.material) || m.name || !m.visible) return;
    before++;
    const key = `${(m.material as THREE.Material).uuid}|${m.castShadow}|${m.receiveShadow}|${Object.keys(m.geometry.attributes).sort().join(",")}|${m.geometry.index ? 1 : 0}`;
    const list = groups.get(key) ?? [];
    list.push(m);
    groups.set(key, list);
  });
  let after = before;
  for (const list of groups.values()) {
    if (list.length < 2) continue;
    const geos = list.map((m) => m.geometry.clone().applyMatrix4(m.matrixWorld));
    const merged = mergeGeometries(geos, false);
    geos.forEach((g) => g.dispose());
    if (!merged) continue;
    const first = list[0];
    const mesh = new THREE.Mesh(merged, first.material);
    mesh.castShadow = first.castShadow;
    mesh.receiveShadow = first.receiveShadow;
    for (const m of list) m.removeFromParent();
    // merged vertices are already in world space; the venue root sits at the origin
    root.add(mesh);
    after -= list.length - 1;
  }
  return { before, after };
}
