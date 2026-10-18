import * as THREE from "three";
import { canvasTex, seeded } from "./materials";

// Ground surfaces for a Lagos street court, all drawn in code (original artwork, no external images).

/** A crack: a jagged line that wanders and sometimes forks. */
function crack(c: CanvasRenderingContext2D, rand: () => number, x: number, y: number, len: number, ang: number, w: number) {
  c.lineWidth = w;
  c.beginPath();
  c.moveTo(x, y);
  for (let s = 0; s < len; s += 6 + rand() * 10) {
    ang += (rand() - 0.5) * 0.9;
    x += Math.cos(ang) * 10;
    y += Math.sin(ang) * 10;
    c.lineTo(x, y);
    if (rand() < 0.05 && w > 0.8) {
      c.stroke();
      crack(c, rand, x, y, len * 0.4, ang + (rand() < 0.5 ? 1 : -1) * (0.6 + rand() * 0.6), w * 0.6);
      c.lineWidth = w;
      c.beginPath();
      c.moveTo(x, y);
    }
  }
  c.stroke();
}

/** A worn paint splash: an irregular blob, speckled where the paint has flaked off. */
function splash(c: CanvasRenderingContext2D, rand: () => number, x: number, y: number, r: number, color: string, alpha: number) {
  c.save();
  c.globalAlpha = alpha;
  c.fillStyle = color;
  c.beginPath();
  const n = 14;
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2, rr = r * (0.75 + rand() * 0.4);
    const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr * 0.8;
    if (i === 0) c.moveTo(px, py);
    else c.lineTo(px, py);
  }
  c.fill();
  // worn paint: fine grit of concrete showing through, thicker toward the rim where shoes scuff it
  c.globalCompositeOperation = "destination-out";
  for (let i = 0; i < r * r * 0.35; i++) {
    const a = rand() * Math.PI * 2, d = Math.sqrt(rand()) * r * 1.1;
    c.globalAlpha = 0.25 + 0.6 * rand() * (d / r);
    c.fillRect(x + Math.cos(a) * d, y + Math.sin(a) * d * 0.8, 1 + rand() * 2, 1 + rand() * 1.5);
  }
  c.restore();
}

/**
 * Overlay for the court floor: hairline and open cracks, faded green-white-green and yellow paint splashes, a painted
 * centre roundel, scuffs from shoes and sand blown onto the edges. Transparent, laid over the concrete.
 */
export function courtDecal(w: number, d: number, seed = 7): THREE.MeshStandardMaterial {
  const S = 24, W = Math.min(2048, Math.round(w * S)), H = Math.min(2048, Math.round(d * S));
  const kx = W / w, ky = H / d;
  const rand = seeded(seed);
  const map = canvasTex(W, H, (c) => {
    c.clearRect(0, 0, W, H);
    // faded paint splashes: Nigerian green and white, sun yellow, with a few flaked patches
    const cols = ["#1d8a4e", "#1d8a4e", "#f2efe4", "#e9b922", "#e9b922"];
    for (let i = 0; i < 9; i++) {
      const x = (0.12 + rand() * 0.76) * W, y = (0.15 + rand() * 0.7) * H;
      if (Math.abs(x - W / 2) < 4 * kx && Math.abs(y - H / 2) < 4 * ky) continue;
      splash(c, rand, x, y, (1.2 + rand() * 2.2) * kx, cols[i % cols.length], 0.32 + rand() * 0.18);
    }
    // centre roundel: green-white-green rings, painted by hand and worn in the middle
    const cx = W / 2, cy = H / 2, r = 2.4 * kx;
    c.save();
    c.globalAlpha = 0.55;
    for (const [rr, col] of [[1, "#1d8a4e"], [0.66, "#f2efe4"], [0.33, "#1d8a4e"]] as const) {
      c.fillStyle = col;
      c.beginPath();
      c.ellipse(cx, cy, r * rr, r * rr * (ky / kx), 0, 0, Math.PI * 2);
      c.fill();
    }
    c.globalCompositeOperation = "destination-out";
    for (let i = 0; i < 5000; i++) {
      const a = rand() * Math.PI * 2, rr = Math.sqrt(rand()) * r;
      c.globalAlpha = 0.2 + rand() * 0.5 * (1 - rr / r);
      c.fillRect(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * (ky / kx), 1 + rand() * 2, 1 + rand() * 2);
    }
    c.restore();
    // fine grit and dust all over the slab
    for (let i = 0; i < (W * H) / 60; i++) {
      c.fillStyle = rand() < 0.6 ? `rgba(60,42,25,${rand() * 0.12})` : `rgba(235,215,180,${rand() * 0.12})`;
      c.fillRect(rand() * W, rand() * H, 1 + rand() * 2, 1 + rand() * 2);
    }
    // cracks: a few long ones across the slab, many short hairlines
    c.strokeStyle = "rgba(40,30,22,.55)";
    c.lineCap = "round";
    for (let i = 0; i < 7; i++) crack(c, rand, rand() * W, rand() * H, (6 + rand() * 10) * kx, rand() * Math.PI * 2, 1.6);
    c.strokeStyle = "rgba(40,30,22,.32)";
    for (let i = 0; i < 26; i++) crack(c, rand, rand() * W, rand() * H, (1 + rand() * 3) * kx, rand() * Math.PI * 2, 0.9);
    // scuffs and dark stains where play is heaviest
    for (let i = 0; i < 260; i++) {
      const x = rand() * W, y = rand() * H;
      c.fillStyle = `rgba(30,22,16,${0.04 + rand() * 0.06})`;
      c.beginPath();
      c.ellipse(x, y, 4 + rand() * 18, 2 + rand() * 6, rand() * Math.PI, 0, Math.PI * 2);
      c.fill();
    }
    // sand blown in along the edges
    for (const [x0, y0, x1, y1] of [[0, 0, 0, 1], [0, 0, 1, 0], [1, 0, 1, 1], [0, 1, 1, 1]]) {
      const g = c.createLinearGradient(x0 * W, y0 * H, (x0 + (x1 === x0 ? (x0 ? -0.06 : 0.06) : 0)) * W, (y0 + (y1 === y0 ? (y0 ? -0.08 : 0.08) : 0)) * H);
      g.addColorStop(0, "rgba(196,150,96,.55)");
      g.addColorStop(1, "rgba(196,150,96,0)");
      c.fillStyle = g;
      c.fillRect(0, 0, W, H);
    }
  });
  return new THREE.MeshStandardMaterial({ map, transparent: true, depthWrite: false, roughness: 0.95, polygonOffset: true, polygonOffsetFactor: -1 });
}

/** Laterite: the red-brown earth of untarred Lagos side streets, with tyre ruts, stones and dried puddle marks. */
export function lateriteTexture(repeat: number): THREE.Texture {
  const rand = seeded(11);
  const t = canvasTex(512, 512, (c, W, H) => {
    c.fillStyle = "#9a5434";
    c.fillRect(0, 0, W, H);
    for (let i = 0; i < 9000; i++) {
      const v = rand();
      c.fillStyle = v < 0.45 ? `rgba(70,30,15,${rand() * 0.18})` : v < 0.9 ? `rgba(205,130,80,${rand() * 0.16})` : `rgba(230,220,200,${rand() * 0.3})`;
      const s = 1 + rand() * 2.5;
      c.fillRect(rand() * W, rand() * H, s, s);
    }
    // dried puddles: darker, smoother patches
    for (let i = 0; i < 5; i++) {
      const g = c.createRadialGradient(0, 0, 0, 0, 0, 1);
      g.addColorStop(0, "rgba(90,42,22,.35)");
      g.addColorStop(1, "rgba(90,42,22,0)");
      c.save();
      c.translate(rand() * W, rand() * H);
      c.scale(30 + rand() * 50, 16 + rand() * 24);
      c.fillStyle = g;
      c.beginPath();
      c.arc(0, 0, 1, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }
    // tyre ruts running along the street
    c.strokeStyle = "rgba(60,26,12,.18)";
    for (const y of [0.3, 0.38, 0.7, 0.78]) {
      c.lineWidth = 7;
      c.beginPath();
      c.moveTo(0, y * H);
      for (let x = 0; x <= W; x += 32) c.lineTo(x, y * H + Math.sin(x * 0.05 + y * 9) * 4);
      c.stroke();
    }
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  return t;
}

/**
 * Painted kerb: the black-and-yellow blocks that line Lagos roads. Returns a material whose map runs along the
 * kerb's length (`len` metres, 1 m per block).
 */
export function kerbMaterial(len: number): THREE.MeshStandardMaterial {
  const t = canvasTex(128, 32, (c, W, H) => {
    c.fillStyle = "#e9b922";
    c.fillRect(0, 0, W / 2, H);
    c.fillStyle = "#1a1a1a";
    c.fillRect(W / 2, 0, W / 2, H);
    // chipped paint
    c.fillStyle = "rgba(150,140,125,.8)";
    for (let i = 0; i < 40; i++) c.fillRect(Math.random() * W, Math.random() * H, 2 + Math.random() * 4, 1 + Math.random() * 2);
  });
  t.wrapS = THREE.RepeatWrapping;
  t.repeat.set(len / 2, 1);
  return new THREE.MeshStandardMaterial({ map: t, roughness: 0.8 });
}

/** Board panels around the court with hand-painted slogans (original text; no brands). */
export const BOARD_SLOGANS = ["ADUGBO", "OMO ADUGBO NO DEY DULL", "BALL NA LIFE", "STREET KINGS", "EKO O NI BAJE", "PLAY WELL, NO WAHALA"];

export function boardTexture(len: number, h: number): THREE.Texture {
  const ppm = 64, W = Math.min(4096, Math.round(len * ppm)), H = Math.max(32, Math.round(h * ppm));
  const rand = seeded(Math.round(len * 10));
  const t = canvasTex(W, H, (c) => {
    const panel = 6 * ppm;
    for (let x = 0, i = Math.floor(rand() * BOARD_SLOGANS.length); x < W; x += panel, i++) {
      const style = i % 3;
      c.fillStyle = style === 0 ? "#e9b922" : style === 1 ? "#1d8a4e" : "#f2efe4";
      c.fillRect(x, 0, panel, H);
      c.fillStyle = style === 0 ? "#1a1a1a" : style === 1 ? "#f2efe4" : "#1d8a4e";
      c.textAlign = "center";
      c.textBaseline = "middle";
      const text = BOARD_SLOGANS[i % BOARD_SLOGANS.length];
      let size = H * 0.62;
      do c.font = `800 ${size}px 'Barlow Condensed', Arial, sans-serif`;
      while (c.measureText(text).width > panel * 0.86 && --size > 10);
      c.fillText(text, x + panel / 2, H * 0.54);
      c.fillStyle = "rgba(0,0,0,.35)";
      c.fillRect(x + panel - 3, 0, 3, H);
    }
    // sun-faded and scuffed by the ball
    c.fillStyle = "rgba(255,255,255,.12)";
    c.fillRect(0, 0, W, H * 0.3);
    for (let i = 0; i < W / 6; i++) {
      c.fillStyle = `rgba(40,30,20,${rand() * 0.25})`;
      c.beginPath();
      c.arc(rand() * W, H * (0.3 + rand() * 0.7), 2 + rand() * 7, 0, Math.PI * 2);
      c.fill();
    }
  });
  return t;
}
