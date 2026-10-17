import * as THREE from "three";
import type { PitchSpec } from "../game/pitch";

function canvasTexture(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void, srgb = true) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Ground with painted markings for a pitch spec; markings are drawn into one texture covering the pitch. */
function ground(p: PitchSpec): THREE.Object3D {
  const g = new THREE.Group();
  const base = p.surface === "turf" ? "#3f7a3a" : p.surface === "sand" ? "#c9a46b" : "#7b7d76";
  const noise = canvasTexture(256, 256, (c) => {
    c.fillStyle = base;
    c.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 4000; i++) {
      c.fillStyle = `rgba(${Math.random() < 0.5 ? "0,0,0" : "255,255,255"},${Math.random() * 0.07})`;
      c.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
  });
  noise.wrapS = noise.wrapT = THREE.RepeatWrapping;
  noise.repeat.set(30, 30);
  const apron = new THREE.Mesh(new THREE.PlaneGeometry(p.length + 60, p.width + 60), new THREE.MeshStandardMaterial({ map: noise, roughness: 0.95 }));
  apron.rotation.x = -Math.PI / 2;
  apron.receiveShadow = true;
  g.add(apron);
  // markings: 20 px per metre
  const S = 20, W = Math.round(p.length * S), H = Math.round(p.width * S);
  const lines = canvasTexture(W, H, (c) => {
    c.clearRect(0, 0, W, H);
    c.strokeStyle = "rgba(245,245,235,0.9)";
    c.lineWidth = 0.1 * S;
    const o = 0.06 * S;
    c.strokeRect(o, o, W - 2 * o, H - 2 * o);
    c.beginPath();
    c.moveTo(W / 2, 0);
    c.lineTo(W / 2, H);
    c.stroke();
    c.beginPath();
    c.arc(W / 2, H / 2, 3 * S, 0, Math.PI * 2);
    c.stroke();
    c.fillStyle = c.strokeStyle;
    c.beginPath();
    c.arc(W / 2, H / 2, 0.15 * S, 0, Math.PI * 2);
    c.fill();
    // goal areas: semicircle of 6 m (futsal style)
    for (const s of [0, 1]) {
      const x = s ? W - o : o;
      c.beginPath();
      c.arc(x, H / 2, 6 * S, s ? Math.PI / 2 : -Math.PI / 2, s ? (3 * Math.PI) / 2 : Math.PI / 2);
      c.stroke();
      c.beginPath();
      c.arc(s ? W - 6 * S : 6 * S, H / 2, 0.12 * S, 0, Math.PI * 2);
      c.fill();
    }
  });
  const mk = new THREE.Mesh(
    new THREE.PlaneGeometry(p.length, p.width),
    new THREE.MeshStandardMaterial({ map: lines, transparent: true, roughness: 0.8, polygonOffset: true, polygonOffsetFactor: -1 }),
  );
  mk.rotation.x = -Math.PI / 2;
  mk.position.y = 0.003;
  mk.receiveShadow = true;
  g.add(mk);
  return g;
}

function goal(p: PitchSpec, side: number): THREE.Object3D {
  const g = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: 0xf2f2f0, roughness: 0.35, metalness: 0.2 });
  const gw = p.goalWidth / 2, gh = p.goalHeight, d = p.goalDepth, r = 0.06;
  const post = new THREE.CylinderGeometry(r, r, gh + r, 16);
  for (const z of [gw + r, -gw - r]) {
    const m = new THREE.Mesh(post, white);
    m.position.set(0, (gh + r) / 2, z);
    m.castShadow = true;
    g.add(m);
  }
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 2 * gw + 4 * r, 16), white);
  bar.rotation.x = Math.PI / 2;
  bar.position.set(0, gh + r, 0);
  bar.castShadow = true;
  g.add(bar);
  // net: a fine grid on the back, sides and roof
  const net = canvasTexture(64, 64, (c) => {
    c.clearRect(0, 0, 64, 64);
    c.strokeStyle = "rgba(255,255,255,0.75)";
    c.lineWidth = 3;
    c.strokeRect(0, 0, 64, 64);
  });
  net.wrapS = net.wrapT = THREE.RepeatWrapping;
  const netMat = (rx: number, ry: number) => {
    const t = net.clone();
    t.repeat.set(rx, ry);
    t.needsUpdate = true;
    return new THREE.MeshStandardMaterial({ map: t, transparent: true, alphaTest: 0.2, side: THREE.DoubleSide, roughness: 1 });
  };
  const q = 0.12; // mesh size
  const back = new THREE.Mesh(new THREE.PlaneGeometry(2 * gw, gh), netMat((2 * gw) / q, gh / q));
  back.position.set(d, gh / 2, 0);
  back.rotation.y = Math.PI / 2;
  g.add(back);
  for (const z of [gw + 2 * r, -gw - 2 * r]) {
    const s = new THREE.Mesh(new THREE.PlaneGeometry(d, gh), netMat(d / q, gh / q));
    s.position.set(d / 2, gh / 2, z);
    g.add(s);
  }
  const roof = new THREE.Mesh(new THREE.PlaneGeometry(d, 2 * gw), netMat(d / q, (2 * gw) / q));
  roof.rotation.x = -Math.PI / 2;
  roof.position.set(d / 2, gh, 0);
  g.add(roof);
  g.position.x = side * (p.length / 2);
  if (side < 0) g.rotation.y = Math.PI;
  return g;
}

function boards(p: PitchSpec): THREE.Object3D {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x23384d, roughness: 0.6 });
  const cap = new THREE.MeshStandardMaterial({ color: 0xf6c90e, roughness: 0.5 });
  const L = p.length / 2, W = p.width / 2, h = p.wallHeight, t = 0.12;
  const add = (w: number, x: number, z: number, rotY: number) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, t), mat);
    b.position.set(x, h / 2, z);
    b.rotation.y = rotY;
    b.castShadow = b.receiveShadow = true;
    const c = new THREE.Mesh(new THREE.BoxGeometry(w, 0.06, t + 0.04), cap);
    c.position.y = h / 2;
    b.add(c);
    g.add(b);
  };
  add(p.length + 2 * t, 0, W + t / 2, 0);
  add(p.length + 2 * t, 0, -W - t / 2, 0);
  const seg = W - p.goalWidth / 2 - 0.12;
  for (const s of [1, -1]) for (const zs of [1, -1]) add(seg, s * (L + t / 2), zs * (p.goalWidth / 2 + 0.12 + seg / 2), Math.PI / 2);
  return g;
}

export function buildPitch(p: PitchSpec, opts: { ground?: boolean } = {}): THREE.Group {
  const g = new THREE.Group();
  const gr = ground(p);
  // without its own ground (venue supplies one) only the painted markings are kept
  if (opts.ground === false) gr.remove(gr.children[0]);
  g.add(gr);
  if (p.walls) g.add(boards(p));
  if (p.goals !== "none") for (const s of p.goals === "full" ? [1, -1] : [1]) g.add(goal(p, s));
  return g;
}
