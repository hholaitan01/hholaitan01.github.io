import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import type { Button, Keyboard } from "../controls/keyboard";

/** Phones and tablets: a touch screen is the main pointer and there is no hover. Desktops (even with a touch screen) do not match. */
export const TOUCH_FIRST = "(hover: none) and (pointer: coarse)";

export function useTouchUi(): boolean {
  const [on, setOn] = useState(() => typeof matchMedia === "function" && matchMedia(TOUCH_FIRST).matches);
  useEffect(() => {
    if (typeof matchMedia !== "function") return;
    const mq = matchMedia(TOUCH_FIRST);
    const f = () => setOn(mq.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return on;
}

export type Slot = "TL" | "TR" | "BL" | "BR";
export type SlotDef = { label: string; button: Button; flick?: "loft" };
export type PadMode = "attack" | "defend";

/**
 * eFootball-style mobile layout: four buttons whose jobs change between attacking and defending. Each entry is the
 * game button it presses and whether an upward flick off it means "lofted".
 */
const SLOTS: Record<PadMode, Record<Slot, { label: string; button: Button; flick?: "loft" }>> = {
  attack: {
    TL: { label: "THROUGH", button: "through", flick: "loft" },
    TR: { label: "SHOOT", button: "shoot" },
    BL: { label: "PASS", button: "pass", flick: "loft" },
    BR: { label: "DASH", button: "sprint" },
  },
  defend: {
    TL: { label: "SLIDE", button: "lob" },
    TR: { label: "TACKLE", button: "shoot" },
    BL: { label: "SWITCH", button: "switch" },
    BR: { label: "DASH", button: "sprint" },
  },
};

// Button centres and radii in a 236 x 206 box at the bottom right (CSS px on a 390 px tall screen; scaled with height).
const GEOM: Record<Slot, { x: number; y: number; r: number }> = {
  TL: { x: 62, y: 76, r: 40 },
  TR: { x: 176, y: 40, r: 40 },
  BL: { x: 40, y: 164, r: 40 },
  BR: { x: 168, y: 152, r: 48 },
};

const STICK_R = 56;

/**
 * On-screen controls for touch devices. Left half: a floating stick that appears where the thumb lands. Right: the
 * action buttons. Everything is fed into the same Keyboard input object the desktop keys use.
 */
export function TouchPad({ keys, mode, extra, slots }: { keys: Keyboard; mode: PadMode; extra?: { label: string; button: Button }; slots?: Partial<Record<Slot, SlotDef | null>> }) {
  // a screen can relabel or hide buttons (penalties: SHOOT when kicking, DIVE in goal)
  const slotDef = (slot: Slot): SlotDef | null => (slots && slot in slots ? (slots[slot] ?? null) : SLOTS[mode][slot]);
  const [stick, setStick] = useState<{ ox: number; oy: number; x: number; y: number } | null>(null);
  const [down, setDown] = useState<Partial<Record<Slot, true>>>({});
  const stickId = useRef<number | null>(null);
  // per pointer on a button: which game button it pressed, where it started, whether a flick already fired
  const btn = useRef(new Map<number, { slot: Slot; button: Button; x: number; y: number; flick?: "loft"; fired: boolean }>());
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const f = () => setScale(Math.max(0.8, Math.min(1.5, innerHeight / 390)));
    f();
    addEventListener("resize", f);
    return () => removeEventListener("resize", f);
  }, []);

  // let go of everything if the pad goes away mid-touch
  useEffect(
    () => () => {
      keys.setStick(null);
      for (const b of btn.current.values()) keys.release(b.button);
    },
    [keys],
  );

  const stickDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (stickId.current !== null) return;
    stickId.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    setStick({ ox: e.clientX, oy: e.clientY, x: 0, y: 0 });
    keys.setStick({ x: 0, y: 0 });
  };
  const stickMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (e.pointerId !== stickId.current || !stick) return;
    const r = STICK_R * scale;
    let dx = e.clientX - stick.ox, dy = e.clientY - stick.oy;
    const l = Math.hypot(dx, dy);
    if (l > r) {
      dx *= r / l;
      dy *= r / l;
    }
    setStick({ ...stick, x: dx, y: dy });
    // screen y grows downward; the game's stick y is "up the screen"
    keys.setStick({ x: dx / r, y: -dy / r });
  };
  const stickUp = (e: RPointerEvent<HTMLDivElement>) => {
    if (e.pointerId !== stickId.current) return;
    stickId.current = null;
    setStick(null);
    keys.setStick(null);
  };

  const flicked = (b: { x: number; y: number }, e: RPointerEvent) => {
    const dx = e.clientX - b.x, dy = b.y - e.clientY;
    return dy > 22 * scale && dy > Math.abs(dx) * 0.7;
  };
  const press = (slot: Slot) => (e: RPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const s = slotDef(slot);
    if (!s) return;
    btn.current.set(e.pointerId, { slot, button: s.button, x: e.clientX, y: e.clientY, flick: s.flick, fired: false });
    keys.press(s.button);
    setDown((d) => ({ ...d, [slot]: true }));
  };
  const move = (e: RPointerEvent<HTMLDivElement>) => {
    const b = btn.current.get(e.pointerId);
    // a flick up on PASS plays the lofted pass at once, without waiting for the finger to lift
    if (b && !b.fired && b.flick && b.button === "pass" && flicked(b, e)) {
      b.fired = true;
      keys.release("pass");
      keys.cancelLastRelease("pass");
      keys.press("lob");
      keys.release("lob");
    }
  };
  const lift = (e: RPointerEvent<HTMLDivElement>) => {
    const b = btn.current.get(e.pointerId);
    if (!b) return;
    btn.current.delete(e.pointerId);
    if (!b.fired) keys.release(b.button, !!b.flick && flicked(b, e));
    setDown((d) => {
      const n = { ...d };
      delete n[b.slot];
      return n;
    });
  };

  const box = { w: 236 * scale, h: 206 * scale };
  return (
    <div className="touchpad" data-testid="touchpad" data-mode={mode}>
      <div className="stick-zone" data-testid="stick-zone" onPointerDown={stickDown} onPointerMove={stickMove} onPointerUp={stickUp} onPointerCancel={stickUp}>
        {stick ? (
          <div className="stick-base" style={{ left: stick.ox, top: stick.oy, width: 2 * STICK_R * scale, height: 2 * STICK_R * scale }}>
            <div className="stick-knob" style={{ transform: `translate(calc(-50% + ${stick.x}px), calc(-50% + ${stick.y}px))` }} />
          </div>
        ) : (
          <div className="stick-base idle" style={{ left: 120 * scale, bottom: 30 * scale, width: 2 * STICK_R * scale, height: 2 * STICK_R * scale }} />
        )}
      </div>
      <div className="pad-buttons" style={{ width: box.w, height: box.h }}>
        {(Object.keys(GEOM) as Slot[]).map((slot) => {
          const g = GEOM[slot], s = slotDef(slot);
          if (!s) return null;
          return (
            <div
              key={slot}
              role="button"
              aria-label={s.label}
              data-slot={slot}
              className={`pad-btn ${slot === "BR" ? "dash" : ""} ${down[slot] ? "down" : ""}`}
              style={{ left: (g.x - g.r) * scale, top: (g.y - g.r) * scale, width: 2 * g.r * scale, height: 2 * g.r * scale }}
              onPointerDown={press(slot)}
              onPointerMove={move}
              onPointerUp={lift}
              onPointerCancel={lift}
            >
              <span>{s.label}</span>
              {s.flick && <small>flick ↑ lofted</small>}
            </div>
          );
        })}
      </div>
      {extra && (
        <div
          role="button"
          aria-label={extra.label}
          className="pad-extra"
          onPointerDown={(e) => {
            e.preventDefault();
            keys.press(extra.button);
            keys.release(extra.button);
          }}
        >
          {extra.label}
        </div>
      )}
    </div>
  );
}
