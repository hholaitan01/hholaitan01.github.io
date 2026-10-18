// Landscape-only: phones/tablets held upright get a rotate overlay and the game pauses; desktops are never blocked.
import { startPreview, launch, collectErrors } from "./browser.mjs";
import fs from "node:fs";

const out = process.env.SHOTS ?? "test-results";
fs.mkdirSync(out, { recursive: true });
const preview = await startPreview();
const browser = await launch();
const errs = [];
const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? " — " + detail : ""}`);
};
const gate = (page) => page.locator("[data-testid=rotate-gate]").isVisible();
try {
  // phone held upright
  const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await phone.addInitScript(() => localStorage.setItem("adugbo.settings.v1", JSON.stringify({ quality: "low", timeOfDay: "day" })));
  const page = await phone.newPage();
  collectErrors(page, errs, "phone");
  await page.goto("http://127.0.0.1:4173/");
  check("phone in portrait: rotate overlay covers the menu", await gate(page));
  await page.screenshot({ path: `${out}/orientation-portrait.png` });
  // turn it sideways: overlay goes, menu is usable
  await page.setViewportSize({ width: 844, height: 390 });
  await page.waitForTimeout(300);
  check("phone in landscape: no overlay", !(await gate(page)));
  await page.getByRole("button", { name: "Practice" }).click();
  await page.waitForSelector("[data-testid=practice-hud]", { timeout: 120000 });
  check("practice runs in landscape", (await page.evaluate(() => window.__practice.paused)) === false);
  // turning upright mid-game pauses it and shows the overlay
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForFunction(() => window.__practice.paused === true, null, { timeout: 30000 }).catch(() => {});
  const paused = await page.evaluate(() => window.__practice.paused);
  check("turning upright mid-game shows the overlay and pauses play", (await gate(page)) && paused === true, `paused ${paused}`);
  await page.screenshot({ path: `${out}/orientation-portrait-ingame.png` });
  // a keyboard's pause key must not restart play behind the rotate screen
  await page.keyboard.press("KeyP");
  await page.waitForFunction(() => window.__practice.paused === false, null, { timeout: 30000 }).catch(() => {});
  const t0 = await page.evaluate(() => window.__practice.sim.time);
  await page.waitForTimeout(1500);
  const t1 = await page.evaluate(() => window.__practice.sim.time);
  check("pause key in portrait does not restart play behind the overlay", t1 === t0, `sim time ${t0} -> ${t1}`);
  await page.keyboard.press("KeyP");
  await page.waitForFunction(() => window.__practice.paused === true, null, { timeout: 30000 }).catch(() => {});
  await page.setViewportSize({ width: 844, height: 390 });
  await page.waitForTimeout(400);
  const back = await page.evaluate(() => ({ paused: window.__practice.paused, hud: window.__practice.hud.paused }));
  const pauseMenu = await page.locator(".overlay").filter({ hasText: "Paused" }).waitFor({ timeout: 30000 }).then(() => true, () => false);
  const gateGone = await page.locator("[data-testid=rotate-gate]").waitFor({ state: "detached", timeout: 30000 }).then(() => true, () => false);
  check("back to landscape: overlay gone, game waits on the pause menu", gateGone && pauseMenu, JSON.stringify({ ...back, gateGone, pauseMenu }));
  await phone.close();
  // desktop with a tall window is never blocked
  const desk = await browser.newContext({ viewport: { width: 600, height: 900 } });
  const dp = await desk.newPage();
  collectErrors(dp, errs, "desktop");
  await dp.goto("http://127.0.0.1:4173/");
  check("desktop in a tall window: no overlay", !(await gate(dp)));
  await desk.close();
} finally {
  await browser.close();
  preview.kill();
}
check("no console/page errors", errs.length === 0, errs.join(" | "));
fs.writeFileSync(`${out}/orientation-results.json`, JSON.stringify(results, null, 1));
process.exit(results.every((r) => r.ok) ? 0 : 1);
