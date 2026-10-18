import { useEffect, useState } from "react";
import { isPortraitTouch, PORTRAIT_TOUCH, tryLockLandscape } from "./orientation";

/** Covers the app while a phone or tablet is held upright; the game only plays in landscape. */
export function RotateGate() {
  const [portrait, setPortrait] = useState(isPortraitTouch);
  useEffect(() => {
    const mq = matchMedia(PORTRAIT_TOUCH);
    const on = () => setPortrait(mq.matches);
    mq.addEventListener("change", on);
    // the first tap is a user gesture, which fullscreen and orientation lock require
    const tap = () => void tryLockLandscape();
    addEventListener("pointerdown", tap, { once: true });
    return () => {
      mq.removeEventListener("change", on);
      removeEventListener("pointerdown", tap);
    };
  }, []);
  if (!portrait) return null;
  return (
    <div className="rotate-gate" role="alertdialog" aria-label="Rotate your device" data-testid="rotate-gate">
      <div className="rotate-icon" aria-hidden>
        📱
      </div>
      <h2>Turn your phone sideways</h2>
      <p>ADUGBO: Street Kings plays in landscape only.</p>
    </div>
  );
}
