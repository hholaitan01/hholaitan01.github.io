// Stage 4/5 browser test: menus → setup → rules → match; kick-off by keyboard; AI debug overlay; full-time screen.
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
  await ctx.addInitScript(() => localStorage.setItem("adugbo.settings.v1", JSON.stringify({ quality: "low", timeOfDay: "day" })));
  const page = await ctx.newPage();
  collectErrors(page, errs, "match");
  await page.goto("http://127.0.0.1:4173/");
  await page.getByRole("button", { name: "Play match" }).click();
  // four-post house rules appear and feed the rules screen
  await page.getByRole("radio", { name: /Four posts/ }).click();
  check("four-post house rules shown", await page.locator("fieldset.house legend").isVisible());
  await page.getByLabel("Players a side").selectOption("3");
  await page.getByLabel("Goal width").selectOption("2");
  await page.getByLabel("First to").selectOption("3");
  await page.getByRole("button", { name: "Next: rules" }).click();
  const rules = await page.textContent("[data-testid=rules]");
  check("rules screen reflects the chosen house rules", /3 v 3/.test(rules) && /2\.0 m wide/.test(rules) && /First to 3/.test(rules), rules);
  await page.screenshot({ path: `${out}/match-rules.png` });
  await page.getByRole("button", { name: "Back" }).click();
  // 5s, change teams and difficulty
  await page.getByRole("radio", { name: /Street 5s/ }).click();
  await page.getByRole("button", { name: "Next Away team" }).click();
  await page.getByLabel("Difficulty").selectOption("hard");
  await page.screenshot({ path: `${out}/match-setup.png` });
  await page.getByRole("button", { name: "Next: rules" }).click();
  await page.getByRole("button", { name: "Kick off" }).click();
  await page.waitForSelector("[data-testid=match-hud]", { timeout: 120000 });
  // browsers only start audio after a user gesture: click the pitch first, as a player would
  await page.mouse.click(640, 400);
  await page.waitForTimeout(800);
  const st = () => page.evaluate(() => { const s = window.__match.sim; return { phase: s.phase, score: [...s.score], diff: s.cfg.difficulty, away: s.teams[1].id, ctrl: s.controlled?.id ?? null, taker: s.restart?.taker?.id ?? null, kickTeam: s.restart?.team ?? null, user: s.cfg.userTeam }; });
  let s = await st();
  check("match starts in kick-off with chosen settings", s.phase === "kickoff" && s.diff === "hard" && s.away !== "msh", JSON.stringify(s));
  await page.screenshot({ path: `${out}/match-kickoff.png` });
  if (s.kickTeam === s.user) {
    check("user controls the kick-off taker", s.ctrl === s.taker, JSON.stringify(s));
    await page.keyboard.press("Space");
  }
  await page.waitForFunction(() => window.__match.sim.phase === "play", null, { timeout: 60000 }).catch(() => {});
  s = await st();
  check("kick-off is taken and play starts", s.phase === "play", JSON.stringify(s));
  const whistled = await page.evaluate(() => window.__match.audio.played.includes("whistle"));
  check("referee whistle sounds at kick-off", whistled);
  // let it run a little, moving the user
  await page.keyboard.down("KeyD");
  await page.waitForTimeout(3000);
  await page.keyboard.up("KeyD");
  await page.screenshot({ path: `${out}/match-play.png` });
  // AI debug overlay toggles
  await page.getByRole("button", { name: "AI debug" }).click();
  await page.waitForTimeout(800);
  check("AI debug overlay visible", await page.locator("[data-testid=ai-debug]").isVisible());
  const states = await page.evaluate(() => [...window.__match.sim.ai[0].debug.values(), ...window.__match.sim.ai[1].debug.values()].map((d) => d.state));
  check("AI players report states", states.length >= 8, [...new Set(states)].join(","));
  await page.screenshot({ path: `${out}/match-debug.png` });
  await page.getByRole("button", { name: "Hide AI debug" }).click();
  // pause menu
  await page.keyboard.press("KeyP");
  await page.waitForSelector("[data-testid=paused]", { timeout: 30000 });
  check("P opens the pause menu", true);
  await page.locator(".overlay").getByRole("button", { name: "Resume" }).click();
  await page.waitForSelector("[data-testid=paused]", { state: "detached", timeout: 30000 });
  // fast-forward the simulation (rendering in this test environment is software-only and slow)
  await page.evaluate(() => {
    const s = window.__match.sim;
    for (let i = 0; i < 200000 && s.phase !== "fulltime"; i++) {
      // the user's side takes its own kick-offs and restarts (as a player pressing pass would)
      if ((s.phase === "kickoff" || s.phase === "restart") && s.restart?.taker === s.controlled && s.phaseTime > 0.5) s.applyUser({ move: { x: 0, z: 0 }, sprint: false, pass: 0.5 });
      s.fixedStep(1 / 120);
      s.consume();
    }
  });
  await page.waitForSelector("[data-testid=fulltime]", { timeout: 30000 });
  const ft = await page.textContent("[data-testid=fulltime]");
  check("full-time screen with stats", /Full-time/.test(ft) && /Possession/.test(ft) && /Shots/.test(ft), ft.slice(0, 160));
  await page.screenshot({ path: `${out}/match-fulltime.png` });
  await page.getByRole("button", { name: "Rematch" }).click();
  await page.waitForFunction(() => window.__match?.sim?.phase === "kickoff" && window.__match.sim.score[0] + window.__match.sim.score[1] === 0, null, { timeout: 120000 });
  check("rematch restarts at 0–0", true);
  await page.keyboard.press("KeyP");
  await page.waitForSelector("[data-testid=paused]", { timeout: 30000 });
  await page.getByRole("button", { name: "Quit to menu" }).click();
  check("quit returns to the main menu", await page.getByRole("button", { name: "Play match" }).waitFor({ timeout: 10000 }).then(() => true, () => false));
  // how to play and settings screens
  await page.getByRole("button", { name: "How to play" }).click();
  check("how-to-play lists match controls", await page.getByText("standing tackle").first().waitFor({ timeout: 10000 }).then(() => true, () => false));
  await page.getByRole("button", { name: "Back" }).click();
  await page.getByRole("button", { name: "Settings" }).click();
  await page.getByLabel("Graphics quality").selectOption("medium");
  await page.getByLabel("Master volume").fill("0.3");
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("adugbo.settings.v1")));
  check("settings screen saves quality and volume", saved.quality === "medium" && Math.abs(saved.masterVolume - 0.3) < 0.01, JSON.stringify(saved));
  await ctx.close();
} finally {
  await browser.close();
  preview.kill();
}
check("no console/page errors", errs.length === 0, errs.join(" | "));
fs.writeFileSync(`${out}/match-results.json`, JSON.stringify(results, null, 1));
process.exit(results.every((r) => r.ok) ? 0 : 1);
