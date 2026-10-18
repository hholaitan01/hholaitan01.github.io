import * as THREE from "three";
import { loadBall, paintBall, type BallDesign } from "../game/ball";

/** The match ball, painted with a ball design (see game/ball.ts). */
export function makeBall(design: BallDesign = loadBall()): THREE.Mesh {
  // a faint self-light keeps the ball readable against the sun-bleached court, even in shadow
  const m = new THREE.Mesh(new THREE.SphereGeometry(0.11, 32, 20), new THREE.MeshStandardMaterial({ roughness: 0.45, emissive: 0xffffff, emissiveIntensity: 0.18 }));
  paintBallMesh(m, design);
  m.castShadow = true;
  return m;
}

export function paintBallMesh(m: THREE.Mesh, design: BallDesign) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  paintBall(c.getContext("2d")!, design);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const mat = m.material as THREE.MeshStandardMaterial;
  mat.map?.dispose();
  mat.map = t;
  mat.emissiveMap = t;
  mat.needsUpdate = true;
}
