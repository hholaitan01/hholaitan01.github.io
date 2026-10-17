import * as THREE from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

const cache = new Map<string, Promise<GLTF>>();
const loader = new GLTFLoader();

/** Loads a GLB from public/assets once; every caller shares the parsed result. */
export function loadGLB(path: string, onProgress?: (fraction: number) => void): Promise<GLTF> {
  let p = cache.get(path);
  if (!p) {
    const url = `${import.meta.env.BASE_URL}assets/${path}`;
    p = loader.loadAsync(url, (e) => {
      if (onProgress && e.total) onProgress(e.loaded / e.total);
    });
    cache.set(path, p);
  }
  return p;
}

export function disposeTree(root: THREE.Object3D) {
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    m.geometry?.dispose?.();
  });
}
