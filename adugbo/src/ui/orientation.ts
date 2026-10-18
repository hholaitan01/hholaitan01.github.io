/** Phones and tablets held upright: the game is landscape-only there. Desktop windows are never blocked. */
export const PORTRAIT_TOUCH = "(orientation: portrait) and (pointer: coarse)";

export function isPortraitTouch() {
  return typeof matchMedia === "function" && matchMedia(PORTRAIT_TOUCH).matches;
}

/**
 * Best effort: where the browser allows it (Android Chrome, installed web apps), go fullscreen and lock to
 * landscape. iOS Safari has no orientation lock, so there the rotate overlay is what enforces landscape.
 */
export async function tryLockLandscape() {
  if (typeof matchMedia !== "function" || !matchMedia("(pointer: coarse)").matches) return;
  const orientation = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> };
  if (!orientation?.lock) return;
  try {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
    await orientation.lock("landscape");
  } catch {
    // not supported or not allowed: the overlay still asks the player to rotate
  }
}
