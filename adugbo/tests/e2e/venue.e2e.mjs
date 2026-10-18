// Stage 3 browser test: venue in day/evening at each quality, desktop and phone-landscape cameras, readability.
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
// WCAG relative luminance and contrast ratio
const lum = ([r, g, b]) => {
  const f = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
// CIE76 colour difference: a saturated kit can differ strongly in hue from the ground at similar luminance
const lab = ([r, g, b]) => {
  const f = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const [R, G, B] = [f(r), f(g), f(b)];
  const X = (0.4124 * R + 0.3576 * G + 0.1805 * B) / 0.95047, Y = 0.2126 * R + 0.7152 * G + 0.0722 * B, Z = (0.0193 * R + 0.1192 * G + 0.9505 * B) / 1.08883;
  const h = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  return [116 * h(Y) - 16, 500 * (h(X) - h(Y)), 200 * (h(Y) - h(Z))];
};
const deltaE = (a, b) => Math.hypot(...lab(a).map((v, i) => v - lab(b)[i]));
const contrast = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const cases = [
  { name: "desktop-high-day", vp: { width: 1280, height: 720 }, quality: "high", tod: "day" },
  { name: "desktop-high-evening", vp: { width: 1280, height: 720 }, quality: "high", tod: "evening" },
  { name: "phone-medium-day", vp: { width: 844, height: 390 }, mobile: true, quality: "medium", tod: "day" },
  { name: "phone-low-evening", vp: { width: 844, height: 390 }, mobile: true, quality: "low", tod: "evening" },
];
try {
  for (const c of cases) {
    const ctx = await browser.newContext({ viewport: c.vp, isMobile: !!c.mobile, hasTouch: !!c.mobile, deviceScaleFactor: c.mobile ? 2 : 1 });
    await ctx.addInitScript((s) => localStorage.setItem("adugbo.settings.v1", JSON.stringify(s)), { quality: c.quality, timeOfDay: c.tod });
    const page = await ctx.newPage();
    collectErrors(page, errs, c.name);
    await page.goto("http://127.0.0.1:4173/#/practice");
    await page.waitForSelector("[data-testid=practice-hud]", { timeout: 120000 });
    await page.waitForTimeout(1500);
    const q = await page.evaluate(() => ({ quality: window.__practice.settings.quality, tod: window.__practice.venue.timeOfDay, shadows: window.__practice.renderer.shadowMap.enabled }));
    check(`${c.name}: settings applied`, q.quality === c.quality && q.tod === c.tod, JSON.stringify(q));
    const pr = await page.evaluate(() => window.__practice.probe());
    const cs = contrast(pr.shirt.rgb, pr.ground.rgb), cb = contrast(pr.ball.rgb, pr.groundNearBall.rgb);
    const ds = deltaE(pr.shirt.rgb, pr.ground.rgb);
    check(`${c.name}: player and ball in view`, pr.shirt.inView && pr.ball.inView);
    check(
      `${c.name}: player stands out from the ground (luminance contrast ≥ 1.5 or ΔE ≥ 25)`,
      cs >= 1.5 || ds >= 25,
      `shirt ${pr.shirt.rgb.map(Math.round)} vs ground ${pr.ground.rgb.map(Math.round)}: contrast ${cs.toFixed(2)}, ΔE ${ds.toFixed(1)}`,
    );
    check(`${c.name}: ball stands out from the ground (contrast ≥ 1.5)`, cb >= 1.5, `ball ${pr.ball.rgb.map(Math.round)} vs ground ${pr.groundNearBall.rgb.map(Math.round)} = ${cb.toFixed(2)}`);
    await page.screenshot({ path: `${out}/venue-${c.name}.png` });
    // goal camera: switch to target drill, both posts must be on screen
    await page.getByRole("button", { name: "Target shooting" }).click();
    // wait until the drill has reset and a few frames have rendered with the new camera (software GL is slow)
    await page.waitForFunction(() => window.__practice.sim.state.drill === "targets", null, { timeout: 60000 });
    await page.evaluate(() => new Promise((r) => { let n = 0; const f = () => (++n >= 3 ? r() : requestAnimationFrame(f)); requestAnimationFrame(f); }));
    const pr2 = await page.evaluate(() => window.__practice.probe());
    check(`${c.name}: target drill keeps both goal posts and the player in view`, pr2.goalPosts.every(Boolean) && pr2.shirt.inView, JSON.stringify(pr2.goalPosts));
    await page.screenshot({ path: `${out}/venue-${c.name}-goal.png` });
    const fps = await page.evaluate(() => window.__practice.hud.fps);
    const perf = await page.evaluate(() => window.__practice.perf());
    results.push({ name: `${c.name}: perf (software GL, informational)`, ok: true, detail: JSON.stringify({ fps, ...perf }) });
    console.log(`INFO ${c.name}: ${fps} fps in software rendering, ${JSON.stringify(perf)}`);
    await ctx.close();
  }
} finally {
  await browser.close();
  preview.kill();
}
check("no console/page errors", errs.length === 0, errs.join(" | "));
fs.writeFileSync(`${out}/venue-results.json`, JSON.stringify(results, null, 1));
process.exit(results.every((r) => r.ok) ? 0 : 1);
