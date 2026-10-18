import * as THREE from "three";
import { canvasTex, pbr } from "./materials";

/** Generic yellow commuter minibus (Lagos "danfo" style): yellow body, two black bands. No makes or logos. */
export function minibus(): THREE.Group {
  const g = new THREE.Group();
  const body = canvasTex(256, 128, (c, w, h) => {
    c.fillStyle = "#f2c300";
    c.fillRect(0, 0, w, h);
    c.fillStyle = "#151515";
    c.fillRect(0, h * 0.62, w, h * 0.07);
    c.fillRect(0, h * 0.75, w, h * 0.07);
    c.fillStyle = "#2a3136";
    for (let i = 0; i < 5; i++) c.fillRect(10 + i * 48, h * 0.12, 40, h * 0.34);
    c.fillStyle = "rgba(0,0,0,.25)";
    for (let i = 0; i < 300; i++) c.fillRect(Math.random() * w, Math.random() * h, 2, 1);
  });
  const mat = new THREE.MeshStandardMaterial({ map: body, roughness: 0.55, metalness: 0.15 });
  const plain = new THREE.MeshStandardMaterial({ color: 0xf2c300, roughness: 0.55, metalness: 0.15 });
  const shell = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.9, 1.95), [plain, plain, plain, new THREE.MeshStandardMaterial({ color: 0x222222 }), mat, mat]);
  shell.position.y = 1.35;
  shell.castShadow = shell.receiveShadow = true;
  g.add(shell);
  const glass = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.8, 1.7), new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.1, metalness: 0.4 }));
  glass.position.set(2.31, 1.75, 0);
  g.add(glass);
  const wheel = new THREE.CylinderGeometry(0.38, 0.38, 0.25, 16);
  const tyre = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.9 });
  for (const x of [-1.55, 1.5]) for (const z of [-0.9, 0.9]) {
    const w = new THREE.Mesh(wheel, tyre);
    w.rotation.x = Math.PI / 2;
    w.position.set(x, 0.38, z);
    w.castShadow = true;
    g.add(w);
  }
  return g;
}

/** Market umbrella over a small table. */
export function umbrella(colors: [string, string]): THREE.Group {
  const g = new THREE.Group();
  const t = canvasTex(128, 16, (c, w, h) => {
    for (let i = 0; i < 8; i++) {
      c.fillStyle = colors[i % 2];
      c.fillRect((i * w) / 8, 0, w / 8 + 1, h);
    }
  });
  const canopy = new THREE.Mesh(new THREE.ConeGeometry(1.5, 0.6, 8, 1, true), new THREE.MeshStandardMaterial({ map: t, side: THREE.DoubleSide, roughness: 0.8 }));
  canopy.position.y = 2.3;
  canopy.castShadow = true;
  g.add(canopy);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.3, 6), new THREE.MeshStandardMaterial({ color: 0xdddddd }));
  pole.position.y = 1.15;
  g.add(pole);
  const table = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.75, 0.7), new THREE.MeshStandardMaterial({ color: 0x8a5a33, roughness: 0.9 }));
  table.position.set(0, 0.375, 0);
  table.castShadow = table.receiveShadow = true;
  g.add(table);
  return g;
}

/** Low-poly monobloc plastic chair. */
export function chairGeometry(): THREE.BufferGeometry {
  const parts = [
    new THREE.BoxGeometry(0.46, 0.05, 0.44).translate(0, 0.44, 0),
    new THREE.BoxGeometry(0.46, 0.45, 0.04).translate(0, 0.68, -0.21).rotateX(-0.12),
    ...[-0.2, 0.2].flatMap((x) => [-0.18, 0.18].map((z) => new THREE.BoxGeometry(0.04, 0.44, 0.04).translate(x, 0.22, z))),
  ];
  const merged = mergeBoxes(parts);
  return merged;
}

function mergeBoxes(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const pos: number[] = [], nor: number[] = [], idx: number[] = [];
  let off = 0;
  for (const g of geos) {
    const p = g.attributes.position, n = g.attributes.normal;
    for (let i = 0; i < p.count; i++) {
      pos.push(p.getX(i), p.getY(i), p.getZ(i));
      nor.push(n.getX(i), n.getY(i), n.getZ(i));
    }
    for (const i of g.index!.array) idx.push(i + off);
    off += p.count;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  out.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
  out.setIndex(idx);
  return out;
}

/** Wooden electricity pole with a cross-arm. */
export function powerPole(): THREE.Group {
  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color: 0x4a3a2c, roughness: 0.95 });
  const p = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.15, 9, 8), wood);
  p.position.y = 4.5;
  p.castShadow = true;
  g.add(p);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 1.8), wood);
  arm.position.y = 8.4;
  g.add(arm);
  return g;
}

/** Sagging cable between two points. */
export function cable(a: THREE.Vector3, b: THREE.Vector3, sag = 0.6): THREE.Mesh {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  mid.y -= sag;
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  return new THREE.Mesh(new THREE.TubeGeometry(curve, 16, 0.012, 4), new THREE.MeshBasicMaterial({ color: 0x111111 }));
}

/** Floodlight mast with a bank of lamps aimed at `target`. Returns the lamp head (emissive) for evening. */
export function floodMast(height: number): { group: THREE.Group; head: THREE.Mesh; lampMat: THREE.MeshStandardMaterial } {
  const g = new THREE.Group();
  const steel = pbr("rustmetal", { repeat: 1, color: 0x9aa3a8, metalness: 0.6, normals: false });
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.2, height, 10), steel);
  mast.position.y = height / 2;
  mast.castShadow = true;
  g.add(mast);
  const lampMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, emissive: 0x000000, roughness: 0.3 });
  const head = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 0.25), [steel, steel, steel, steel, lampMat, steel]);
  head.position.y = height + 0.3;
  g.add(head);
  return { group: g, head, lampMat };
}

/** Street lamp: pole with an arm and a sodium lamp. */
export function streetLamp(): { group: THREE.Group; lampMat: THREE.MeshStandardMaterial; lampPos: THREE.Vector3 } {
  const g = new THREE.Group();
  const m = new THREE.MeshStandardMaterial({ color: 0x55595c, roughness: 0.6, metalness: 0.5 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 6, 8), m);
  pole.position.y = 3;
  g.add(pole);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 1.2), m);
  arm.position.set(0, 5.9, 0.55);
  g.add(arm);
  const lampMat = new THREE.MeshStandardMaterial({ color: 0xffe0b0, emissive: 0x000000 });
  const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.5), lampMat);
  lamp.position.set(0, 5.82, 1.05);
  g.add(lamp);
  return { group: g, lampMat, lampPos: new THREE.Vector3(0, 5.7, 1.05) };
}

/** Chain-link fence panel texture (alpha-tested diamond mesh). */
export function chainLink(): THREE.Texture {
  const t = canvasTex(64, 64, (c, w, h) => {
    c.clearRect(0, 0, w, h);
    c.strokeStyle = "rgba(190,196,198,1)";
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(0, h / 2);
    c.lineTo(w / 2, 0);
    c.lineTo(w, h / 2);
    c.lineTo(w / 2, h);
    c.closePath();
    c.stroke();
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}
