import * as THREE from "three";

const loader = new THREE.TextureLoader();
const cache = new Map<string, THREE.Texture>();

/** CC0 ambientCG texture from public/assets/textures (see manifest). */
export function tex(name: string, srgb: boolean, repeat = 1): THREE.Texture {
  const key = `${name}|${repeat}`;
  let t = cache.get(key);
  if (!t) {
    t = loader.load(`${import.meta.env.BASE_URL}assets/textures/${name}.jpg`);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat, repeat);
    t.anisotropy = 8;
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    cache.set(key, t);
  }
  return t;
}

/** PBR material from one of the shipped sets: concrete, asphalt, plaster, zinc, rustmetal. */
export function pbr(set: string, opts: { repeat?: number; color?: THREE.ColorRepresentation; normals?: boolean; metalness?: number } = {}) {
  const r = opts.repeat ?? 1;
  return new THREE.MeshStandardMaterial({
    map: tex(`${set}_color`, true, r),
    normalMap: opts.normals === false ? null : tex(`${set}_normal`, false, r),
    roughnessMap: tex(`${set}_rough`, false, r),
    color: opts.color ?? 0xffffff,
    metalness: opts.metalness ?? 0,
    roughness: 1,
  });
}

export function canvasTex(w: number, h: number, draw: (g: CanvasRenderingContext2D, w: number, h: number) => void, srgb = true) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d")!, w, h);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Seeded random so the venue is the same every load. */
export function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), a | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
