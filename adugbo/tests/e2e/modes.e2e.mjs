// The new menu and the modes behind it: home tiles and today's job, the penalty shootout (a real kick and a real dive
// with keys), penalty practice from Training, and the ball designer (a saved design is the ball you then play with).
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
// game time, not wall time: software WebGL runs at a few frames per second
const waitGame = (page, seconds) =>
  page.evaluate((s) => new Promise((res) => { const t0 = window.__penalty.sim.time; const f = () => (window.__penalty.sim.time - t0 >= s ? res() : requestAnimationFrame(f)); f(); }), seconds);

try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await ctx.addInitScript(() => localStorage.setItem("adugbo.settings.v1", JSON.stringify({ quality: "low", timeOfDay: "day" })));
  const page = await ctx.newPage();
  collectErrors(page, errs, "modes");
  await page.goto("http://127.0.0.1:4173/");
  await page.waitForSelector("[data-testid=home]");
  const tiles = await page.locator(".home-tiles .tile b").allTextContents();
  const want = ["Play match", "Penalty shootout", "Training", "Online multiplayer", "Ball designer", "Watch matches", "Settings"];
  check("home has every mode: ours and the new ones", want.every((w) => tiles.some((t) => t.toLowerCase() === w.toLowerCase())), tiles.join(" | "));
  const job = await page.textContent("[data-testid=todays-job]");
  check("today's job and the week strip are shown", /Today's job/i.test(job) && (await page.locator(".week i").count()) === 7, job.slice(0, 80));
  await page.screenshot({ path: `${out}/home.png` });

  // ---- penalty shootout ----
  await page.getByRole("button", { name: /Penalty shootout/ }).click();
  await page.waitForSelector("[data-testid=penalty-setup]");
  await page.getByLabel("CPU difficulty").selectOption("easy");
  await page.getByRole("button", { name: "Start" }).click();
  await page.waitForSelector("[data-testid=penalty-hud]", { timeout: 120000 });
  await page.mouse.click(640, 360);
  const first = await page.evaluate(() => window.__penalty.sim.userKicking);
  check("shootout starts with you taking the first kick", first === true);
  // aim right and up a little with real keys, then hold K and release
  await page.keyboard.down("KeyD");
  await waitGame(page, 0.3);
  await page.keyboard.up("KeyD");
  const aim = await page.evaluate(() => window.__penalty.sim.aim);
  check("D moves the aim marker across the goal", aim.z > 0.2, JSON.stringify(aim));
  await page.screenshot({ path: `${out}/penalty-aim.png` });
  await page.keyboard.down("KeyK");
  await page.waitForFunction(() => window.__penalty.hud.holding, null, { timeout: 20000 }).catch(() => {});
  const holding = await page.evaluate(() => window.__penalty.hud.holding);
  await page.waitForTimeout(300);
  await page.keyboard.up("KeyK");
  await page.waitForFunction(() => window.__penalty.sim.kicks.length >= 1, null, { timeout: 90000 }).catch(() => {});
  const k1 = await page.evaluate(() => window.__penalty.sim.kicks);
  check("holding K shows the power bar; releasing takes the kick, which gets a result", holding && k1.length === 1, JSON.stringify(k1));
  // their kick: dive with A + K once they run up
  await page.waitForFunction(() => window.__penalty.sim.phase === "runup" && !window.__penalty.sim.userKicking, null, { timeout: 90000 }).catch(() => {});
  await page.keyboard.down("KeyA");
  await page.keyboard.press("KeyK");
  await page.keyboard.up("KeyA");
  await page.waitForFunction(() => window.__penalty.sim.kicks.length >= 2, null, { timeout: 90000 }).catch(() => {});
  const dove = await page.evaluate(() => window.__penalty.eventLog !== undefined && window.__penalty.sim.kicks.length >= 2);
  check("in goal, A + K dives and their kick gets a result", dove, JSON.stringify(await page.evaluate(() => window.__penalty.sim.kicks)));
  await page.screenshot({ path: `${out}/penalty-keeper.png` });
  // the end screen
  await page.evaluate(() => {
    const s = window.__penalty.sim;
    s.phase = "over";
    s.winner = 0;
  });
  await page.waitForSelector("[data-testid=penalty-over]", { timeout: 20000 });
  check("the shootout ends on a result screen with play again", await page.getByRole("button", { name: "Play again" }).isVisible());
  await page.getByRole("button", { name: "Menu" }).click();

  // ---- training: penalty practice ----
  await page.waitForSelector("[data-testid=home]");
  await page.getByRole("button", { name: /^Training/ }).click();
  await page.waitForSelector("[data-testid=training]");
  await page.getByRole("button", { name: /Penalty practice/ }).click();
  await page.waitForSelector("[data-testid=penalty-hud]", { timeout: 120000 });
  check("training offers penalty practice with a streak counter", /Streak 0/.test(await page.textContent("[data-testid=penalty-hud]")));
  await page.getByRole("button", { name: "Quit" }).click();
  await page.waitForSelector("[data-testid=training]");
  await page.getByRole("button", { name: /Practice court/ }).click();
  await page.waitForSelector("[data-testid=practice-hud]", { timeout: 120000 });
  check("training's free play is the existing practice court", true);
  await page.goto("http://127.0.0.1:4173/");

  // ---- ball designer ----
  await page.waitForSelector("[data-testid=home]");
  await page.getByRole("button", { name: /Ball designer/ }).click();
  await page.waitForSelector("[data-testid=ball-preview] canvas", { timeout: 30000 });
  await page.getByRole("button", { name: "Owambe" }).click();
  await page.getByRole("button", { name: "Swirl" }).click();
  await page.getByLabel("Base colour").fill("#0b8a4a");
  await page.getByRole("button", { name: "Use this ball" }).click();
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("adugbo.ball.v1")));
  check("a design is saved: preset, then pattern and colour changed", saved?.pattern === "swirl" && saved.base === "#0b8a4a" && saved.a === "#facc15", JSON.stringify(saved));
  await page.screenshot({ path: `${out}/ball-designer.png` });
  // and it is the ball in the next match: the ball texture's top-left pixel is the base colour
  await page.goto("http://127.0.0.1:4173/#/practice");
  await page.waitForSelector("[data-testid=practice-hud]", { timeout: 120000 });
  const px = await page.evaluate(() => {
    const img = window.__practice.ball.material.map.image;
    return Array.from(img.getContext("2d").getImageData(2, 2, 1, 1).data.slice(0, 3));
  });
  check("the saved ball is the one you play with", Math.abs(px[0] - 0x0b) < 6 && Math.abs(px[1] - 0x8a) < 6 && Math.abs(px[2] - 0x4a) < 6, JSON.stringify(px));
  await ctx.close();
} catch (e) {
  check("no unexpected errors", false, String(e?.stack ?? e).slice(0, 600));
} finally {
  await browser.close();
  preview.kill();
}
check("no console/page errors", errs.length === 0, errs.join(" | "));
fs.writeFileSync(`${out}/modes-results.json`, JSON.stringify(results, null, 1));
process.exit(results.every((r) => r.ok) ? 0 : 1);
