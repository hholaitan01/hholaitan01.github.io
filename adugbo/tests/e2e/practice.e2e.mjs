// Stage 2 browser test: practice mode driven through real keyboard events.
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
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  // gameplay/input test: low graphics keeps software rendering fast enough (visuals are covered by venue.e2e.mjs)
  await ctx.addInitScript(() => localStorage.setItem("adugbo.settings.v1", JSON.stringify({ quality: "low", timeOfDay: "day" })));
  const page = await ctx.newPage();
  collectErrors(page, errs, "practice");
  await page.goto("http://127.0.0.1:4173/");
  await page.getByRole("button", { name: /^Training/ }).click();
  await page.getByRole("button", { name: /Practice court/ }).click();
  await page.waitForSelector("[data-testid=practice-hud]", { timeout: 90000 });
  const S = (fn) => page.evaluate(fn);
  const user = () => S(() => { const s = window.__practice.sim; return { x: s.user.pos.x, z: s.user.pos.z, owner: s.owner?.id ?? null, bx: s.physics.ballPos.x, goals: s.state.goals, shots: s.state.shots, passes: s.state.passes }; });
  await page.waitForTimeout(800);
  let u = await user();
  check("user starts with the ball", u.owner === 0, JSON.stringify(u));
  await page.screenshot({ path: `${out}/practice-start.png` });

  // dribble right (toward goal) for 2.5 s of game time
  const x0 = u.x;
  await page.keyboard.down("KeyD");
  await page.waitForFunction((x) => window.__practice.sim.user.pos.x > x + 8, x0, { timeout: 40000 }).catch(() => {});
  await page.keyboard.up("KeyD");
  u = await user();
  check("D dribbles toward goal keeping the ball", u.x > x0 + 8 && u.owner === 0, `moved ${(u.x - x0).toFixed(1)} m, owner ${u.owner}`);
  await page.screenshot({ path: `${out}/practice-dribble.png` });

  // shoot: hold K briefly then release
  await page.keyboard.down("KeyK");
  await page.waitForTimeout(300);
  await page.keyboard.up("KeyK");
  await page.waitForFunction(() => window.__practice.sim.state.shots > 0, null, { timeout: 40000 }).catch(() => {});
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${out}/practice-shot.png` });
  await page.waitForFunction(() => window.__practice.sim.state.goals > 0, null, { timeout: 40000 }).catch(() => {});
  const snd = await S(() => ({ running: window.__practice.audio.running, played: [...window.__practice.audio.played] }));
  check("audio unlocked by the first key press and plays kick/shot/goal sounds", snd.running && snd.played.includes("shot") && snd.played.includes("goal"), JSON.stringify(snd));
  u = await user();
  check("K shoots and scores from close range", u.shots === 1 && u.goals === 1, JSON.stringify(u));

  // after the goal the ball comes back to the user; pass to the partner up the screen (W + Space)
  await page.waitForFunction(() => window.__practice.sim.owner === window.__practice.sim.user, null, { timeout: 40000 }).catch(() => {});
  await page.keyboard.down("KeyW");
  await page.keyboard.down("Space");
  await page.waitForTimeout(120);
  await page.keyboard.up("Space");
  await page.keyboard.up("KeyW");
  await page.waitForFunction(() => window.__practice.sim.state.passes > 0, null, { timeout: 40000 }).catch(() => {});
  u = await user();
  check("Space passes to a partner who controls it", u.passes >= 1, JSON.stringify(u));
  await page.waitForFunction(() => window.__practice.sim.owner === window.__practice.sim.user, null, { timeout: 40000 }).catch(() => {});
  u = await user();
  check("partner returns the ball to the user", u.owner === 0, JSON.stringify(u));

  // M toggles mute and the choice is saved
  await page.keyboard.press("KeyM");
  await page.waitForFunction(() => window.__practice.muted === true, null, { timeout: 40000 }).catch(() => {});
  const saved = await S(() => JSON.parse(localStorage.getItem("adugbo.settings.v1")).muted);
  check("M mutes and the setting persists", saved === true);
  await page.keyboard.press("KeyM");
  await page.waitForFunction(() => window.__practice.muted === false, null, { timeout: 40000 }).catch(() => {});
  // drill switch: target shooting shows a timer and lit target
  await page.getByRole("button", { name: "Target shooting" }).click();
  await page.waitForFunction(() => /Target shooting/i.test(document.querySelector("[data-testid=practice-hud]")?.textContent ?? ""), null, { timeout: 40000 }).catch(() => {});
  const hud = await page.textContent("[data-testid=practice-hud]");
  check("target drill starts with a 60 s timer", /Target shooting/i.test(hud) && /(59|60)s/.test(hud), hud);
  await page.screenshot({ path: `${out}/practice-targets.png` });

  // pause with P stops the clock
  await page.keyboard.press("KeyP");
  // the key is handled on the next rendered frame; software GL can stall for a while compiling shaders
  await page.waitForFunction(() => window.__practice.paused === true, null, { timeout: 40000 });
  const t1 = await S(() => window.__practice.sim.state.timeLeft);
  await page.waitForTimeout(1200);
  const t2 = await S(() => window.__practice.sim.state.timeLeft);
  check("P pauses the drill", t1 === t2 && (await page.isVisible("text=Paused")), `${t1} -> ${t2}`);
  await page.locator(".overlay").getByRole("button", { name: "Resume" }).click();
  await page.waitForFunction((t) => window.__practice.sim.state.timeLeft < t, t2, { timeout: 40000 }).catch(() => {});
  const t3 = await S(() => window.__practice.sim.state.timeLeft);
  check("Resume continues the clock", t3 < t2, `${t2} -> ${t3}`);
  await page.locator(".toolbar").getByRole("button", { name: "Menu" }).click();
  check("Menu returns to the home screen", await page.waitForSelector("[data-testid=home]", { timeout: 10000 }).then(() => true, () => false));
  await ctx.close();
} finally {
  await browser.close();
  preview.kill();
}
check("no console/page errors", errs.length === 0, errs.join(" | "));
fs.writeFileSync(`${out}/practice-results.json`, JSON.stringify(results, null, 1));
process.exit(results.every((r) => r.ok) ? 0 : 1);
