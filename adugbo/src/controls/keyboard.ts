// Desktop keyboard input. (Touch controls are a separate, later stage.)
// Movement is reported in camera space: x = right, y = up the screen (away from the camera).

export type Button = "pass" | "shoot" | "lob" | "sprint" | "reset" | "pause";

const KEYMAP: Record<string, Button | "up" | "down" | "left" | "right"> = {
  KeyW: "up", ArrowUp: "up", KeyS: "down", ArrowDown: "down", KeyA: "left", ArrowLeft: "left", KeyD: "right", ArrowRight: "right",
  Space: "pass", KeyJ: "pass", KeyK: "shoot", KeyL: "lob", ShiftLeft: "sprint", ShiftRight: "sprint", KeyR: "reset", KeyP: "pause", Escape: "pause",
};

export const KEY_HELP: [string, string][] = [
  ["W A S D / arrows", "move"],
  ["Shift", "sprint"],
  ["Space or J", "pass (hold for longer pass into space)"],
  ["K (hold)", "shoot — hold longer for power"],
  ["L", "lofted pass"],
  ["R", "ball back to your feet"],
  ["P / Esc", "pause"],
];

export class Keyboard {
  private down = new Set<string>();
  private pressedAt = new Map<Button, number>();
  /** Buttons released this frame with how long they were held (s). */
  private released: { button: Button; held: number; stick: { x: number; y: number } }[] = [];
  private tapped = new Set<Button>();

  constructor(private target: Window = window) {
    target.addEventListener("keydown", this.onDown);
    target.addEventListener("keyup", this.onUp);
    target.addEventListener("blur", this.onBlur);
  }

  private onDown = (e: KeyboardEvent) => {
    const k = KEYMAP[e.code];
    if (!k) return;
    if ((e.target as HTMLElement | null)?.closest?.("input, select, textarea")) return;
    e.preventDefault();
    if (this.down.has(e.code)) return;
    this.down.add(e.code);
    if (k !== "up" && k !== "down" && k !== "left" && k !== "right") {
      this.pressedAt.set(k, performance.now());
      this.tapped.add(k);
    }
  };

  private onUp = (e: KeyboardEvent) => {
    const k = KEYMAP[e.code];
    this.down.delete(e.code);
    if (!k || k === "up" || k === "down" || k === "left" || k === "right") return;
    const t0 = this.pressedAt.get(k);
    if (t0 !== undefined) {
      // the stick is sampled now: a quick tap may be released before the next frame reads it
      this.released.push({ button: k, held: (performance.now() - t0) / 1000, stick: this.stick() });
      this.pressedAt.delete(k);
    }
  };

  private onBlur = () => {
    this.down.clear();
    this.pressedAt.clear();
  };

  private is(dir: string) {
    for (const c of this.down) if (KEYMAP[c] === dir) return true;
    return false;
  }

  /** Camera-space stick, length ≤ 1. */
  stick(): { x: number; y: number } {
    const x = (this.is("right") ? 1 : 0) - (this.is("left") ? 1 : 0);
    const y = (this.is("up") ? 1 : 0) - (this.is("down") ? 1 : 0);
    const l = Math.hypot(x, y);
    return l > 0 ? { x: x / l, y: y / l } : { x: 0, y: 0 };
  }

  held(b: Button): boolean {
    for (const c of this.down) if (KEYMAP[c] === b) return true;
    return false;
  }

  /** Seconds the button has been held so far (0 if up). */
  holdTime(b: Button): number {
    const t0 = this.pressedAt.get(b);
    return t0 === undefined ? 0 : (performance.now() - t0) / 1000;
  }

  /** Releases since the last call (consumed). */
  takeReleases() {
    const r = this.released;
    this.released = [];
    return r;
  }

  /** Buttons pressed down since the last call (consumed). */
  takeTaps() {
    const t = [...this.tapped];
    this.tapped.clear();
    return t;
  }

  dispose() {
    this.target.removeEventListener("keydown", this.onDown);
    this.target.removeEventListener("keyup", this.onUp);
    this.target.removeEventListener("blur", this.onBlur);
  }
}
