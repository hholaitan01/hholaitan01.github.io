// Match balls: a pattern and three colours. Designed in the Ball designer, saved on this device, used in every match
// you play; online, the host's ball is the match ball and both players and spectators see it.

export const BALL_PATTERNS = ["classic", "panels", "stripes", "stars", "swirl", "halves", "dots", "flag"] as const;
export type BallPattern = (typeof BALL_PATTERNS)[number];

export interface BallDesign {
  pattern: BallPattern;
  base: string;
  a: string;
  b: string;
}

export const PATTERN_LABEL: Record<BallPattern, string> = {
  classic: "Classic pentagons",
  panels: "Big panels",
  stripes: "Stripes",
  stars: "Stars",
  swirl: "Swirl",
  halves: "Halves",
  dots: "Dots",
  flag: "Green-white-green",
};

export const PRESETS: { name: string; d: BallDesign }[] = [
  { name: "Street classic", d: { pattern: "classic", base: "#f4f4f0", a: "#1c1c1c", b: "#1c1c1c" } },
  { name: "Naija", d: { pattern: "flag", base: "#f4f4f0", a: "#0b8a4a", b: "#0b8a4a" } },
  { name: "Danfo", d: { pattern: "stripes", base: "#f6c90e", a: "#111111", b: "#111111" } },
  { name: "Night game", d: { pattern: "swirl", base: "#f97316", a: "#111111", b: "#fde047" } },
  { name: "Owambe", d: { pattern: "stars", base: "#6d28d9", a: "#facc15", b: "#ffffff" } },
  { name: "Mama Put", d: { pattern: "dots", base: "#dc2626", a: "#ffffff", b: "#facc15" } },
];

export const DEFAULT_BALL: BallDesign = PRESETS[0].d;
const KEY = "adugbo.ball.v1";
const HEX = /^#[0-9a-f]{6}$/i;

/** A design from untrusted data (storage or the network), or null if it isn't one. */
export function validBall(x: unknown): BallDesign | null {
  const d = x as Partial<BallDesign> | null;
  if (!d || !BALL_PATTERNS.includes(d.pattern as BallPattern)) return null;
  if (![d.base, d.a, d.b].every((c) => typeof c === "string" && HEX.test(c))) return null;
  return { pattern: d.pattern as BallPattern, base: d.base!, a: d.a!, b: d.b! };
}

export function loadBall(): BallDesign {
  try {
    return validBall(JSON.parse(localStorage.getItem(KEY) ?? "null")) ?? DEFAULT_BALL;
  } catch {
    return DEFAULT_BALL;
  }
}

export function saveBall(d: BallDesign) {
  try {
    localStorage.setItem(KEY, JSON.stringify(d));
  } catch {
    /* private mode: the design lasts until the page closes */
  }
}

/**
 * Paints a design onto an equirectangular canvas (2:1) for a sphere's UV map. Rows near the top and bottom are
 * squashed so shapes keep their proportions near the poles.
 */
export function paintBall(g: CanvasRenderingContext2D, d: BallDesign, W = 512, H = 256) {
  g.fillStyle = d.base;
  g.fillRect(0, 0, W, H);
  const poly = (x: number, y: number, r: number, n: number, sy = 1, rot = -Math.PI / 2) => {
    g.beginPath();
    for (let i = 0; i < n; i++) {
      const t = (i / n) * Math.PI * 2 + rot;
      g.lineTo(x + Math.cos(t) * r, y + Math.sin(t) * r * sy);
    }
    g.closePath();
    g.fill();
  };
  const star = (x: number, y: number, r: number, sy = 1) => {
    g.beginPath();
    for (let i = 0; i < 10; i++) {
      const t = (i / 10) * Math.PI * 2 - Math.PI / 2, rr = i % 2 ? r * 0.45 : r;
      g.lineTo(x + Math.cos(t) * rr, y + Math.sin(t) * rr * sy);
    }
    g.closePath();
    g.fill();
  };
  const squash = (y: number) => Math.max(0.35, Math.sin((y / H) * Math.PI));
  switch (d.pattern) {
    case "classic":
      g.fillStyle = d.a;
      for (let row = 0; row < 5; row++)
        for (let col = 0; col < 8; col++) {
          const x = col * 64 + (row % 2) * 32, y = 24 + row * 52;
          poly(x, y, 13, 5, row === 0 || row === 4 ? 0.6 : 1);
        }
      break;
    case "panels":
      for (let col = 0; col < 6; col++) {
        g.fillStyle = col % 2 ? d.a : d.b;
        g.beginPath();
        const x = (col * W) / 6;
        g.moveTo(x, 0);
        g.bezierCurveTo(x + 50, H * 0.35, x + 10, H * 0.65, x + 40, H);
        g.lineTo(x + 70, H);
        g.bezierCurveTo(x + 40, H * 0.65, x + 80, H * 0.35, x + 30, 0);
        g.fill();
      }
      break;
    case "stripes":
      for (let i = 0; i < 6; i++) {
        g.fillStyle = i % 2 ? d.b : d.a;
        g.fillRect(0, (H * (i + 0.6)) / 7, W, H / 14);
      }
      break;
    case "stars":
      for (let row = 0; row < 4; row++)
        for (let col = 0; col < 6; col++) {
          g.fillStyle = (row + col) % 2 ? d.a : d.b;
          const y = 34 + row * 62;
          star(col * 86 + (row % 2) * 43 + 20, y, 17, squash(y));
        }
      break;
    case "swirl":
      g.lineWidth = 16;
      for (let i = 0; i < 3; i++) {
        g.strokeStyle = i % 2 ? d.b : d.a;
        g.beginPath();
        for (let x = -20; x <= W + 20; x += 8) g.lineTo(x, H / 2 + Math.sin((x / W) * Math.PI * 4 + i * 2.1) * H * 0.3);
        g.stroke();
      }
      break;
    case "halves":
      g.fillStyle = d.a;
      g.fillRect(0, 0, W / 2, H);
      g.fillStyle = d.b;
      g.fillRect(W / 2 - 6, 0, 12, H);
      g.fillRect(0, H / 2 - 5, W, 10);
      break;
    case "dots":
      for (let row = 0; row < 6; row++)
        for (let col = 0; col < 12; col++) {
          g.fillStyle = (row + col) % 3 ? d.a : d.b;
          const y = 20 + row * 43;
          g.beginPath();
          g.ellipse(col * 43 + (row % 2) * 21 + 10, y, 9, 9 * squash(y), 0, 0, Math.PI * 2);
          g.fill();
        }
      break;
    case "flag":
      // green-white-green bands around the ball, the white band down the middle
      g.fillStyle = d.a;
      g.fillRect(0, 0, W / 3, H);
      g.fillRect((2 * W) / 3, 0, W / 3, H);
      g.fillStyle = d.b;
      g.fillRect(W / 3 - 4, 0, 8, H);
      g.fillRect((2 * W) / 3 - 4, 0, 8, H);
      break;
  }
  // seams
  g.strokeStyle = "rgba(0,0,0,.18)";
  g.lineWidth = 1.5;
  for (let i = 1; i < 4; i++) {
    g.beginPath();
    g.moveTo(0, (H * i) / 4);
    g.lineTo(W, (H * i) / 4);
    g.stroke();
  }
}
