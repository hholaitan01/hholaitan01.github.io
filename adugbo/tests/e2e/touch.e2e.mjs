// Touch controls: the eFootball-style pad shows on phones (touch screen, no hover) and never on desktop, and real
// touch input (sent through the Chrome DevTools protocol, so the page receives genuine touch/pointer events) plays the game.
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
const low = () => localStorage.setItem("adugbo.settings.v1", JSON.stringify({ quality: "low", timeOfDay: "day" }));

/** Multi-touch driver over CDP. Each finger is {id, x, y}. */
function fingers(cdp) {
  const live = new Map();
  const send = (type) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: [...live.values()].map((f) => ({ x: f.x, y: f.y, id: f.id, radiusX: 4, radiusY: 4, force: 1 })) });
  return {
    async down(id, x, y) {
      live.set(id, { id, x, y });
      await send("touchStart");
    },
    async move(id, x, y, steps = 6) {
      const f = live.get(id), x0 = f.x, y0 = f.y;
      for (let i = 1; i <= steps; i++) {
        f.x = x0 + ((x - x0) * i) / steps;
        f.y = y0 + ((y - y0) * i) / steps;
        await send("touchMove");
      }
    },
    async up(id) {
      const f = live.get(id);
      live.delete(id);
      await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [...live.values()].map((g) => ({ x: g.x, y: g.y, id: g.id })) });
      void f;
    },
  };
}
const centre = async (page, label) => {
  const b = await page.getByRole("button", { name: label, exact: true }).boundingBox();
  return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
};
// game time, not wall time: software WebGL runs at a few frames per second
const waitGame = (page, view, seconds) =>
  page.evaluate(
    ([v, s]) => new Promise((res) => { const t0 = window[v].sim.time; const f = () => (window[v].sim.time - t0 >= s ? res() : requestAnimationFrame(f)); f(); }),
    [view, seconds],
  );

try {
  // ---- desktop: no pad ----
  const desk = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await desk.addInitScript(low);
  const dp = await desk.newPage();
  collectErrors(dp, errs, "desktop");
  await dp.goto("http://127.0.0.1:4173/#/practice");
  await dp.waitForSelector("[data-testid=practice-hud]", { timeout: 120000 });
  await dp.waitForTimeout(500);
  check("desktop: no touch pad in practice", (await dp.locator("[data-testid=touchpad]").count()) === 0);
  await desk.close();

  // ---- phone, landscape ----
  const phone = await browser.newContext({ viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await phone.addInitScript(low);
  const page = await phone.newPage();
  collectErrors(page, errs, "phone");
  const cdp = await phone.newCDPSession(page);
  const touch = fingers(cdp);
  await page.goto("http://127.0.0.1:4173/#/practice");
  await page.waitForSelector("[data-testid=practice-hud]", { timeout: 120000 });
  await page.waitForSelector("[data-testid=touchpad]", { timeout: 10000 }).catch(() => {});
  check("phone: touch pad shown in practice", await page.locator("[data-testid=touchpad]").isVisible());
  const labels = await page.locator(".pad-btn").evaluateAll((els) => els.map((e) => e.getAttribute("aria-label")));
  check("attacking buttons: PASS, THROUGH, SHOOT, DASH", ["PASS", "THROUGH", "SHOOT", "DASH"].every((l) => labels.includes(l)), labels.join(","));
  await page.screenshot({ path: `${out}/touch-practice.png` });

  // collect kicks as the view sees them
  await page.evaluate(() => {
    window.__kicks = [];
    const v = window.__practice, orig = v.sim.consume.bind(v.sim);
    v.sim.consume = () => {
      const ev = orig();
      for (const e of ev) if (e.type === "kick") window.__kicks.push(e.kind);
      return ev;
    };
  });
  const S = (fn) => page.evaluate(fn);
  const user = () => S(() => { const s = window.__practice.sim; return { x: s.user.pos.x, owner: s.owner?.id ?? null }; });

  // stick: thumb down on the left half, slide right, hold
  let u = await user();
  const x0 = u.x;
  await touch.down(1, 200, 250);
  await touch.move(1, 260, 250);
  await waitGame(page, "__practice", 1.5);
  await page.screenshot({ path: `${out}/touch-stick.png` });
  await touch.up(1);
  u = await user();
  check("stick: dragging right dribbles toward goal with the ball", u.x > x0 + 3 && u.owner === 0, `moved ${(u.x - x0).toFixed(1)} m, owner ${u.owner}`);
  check("stick released: the virtual stick lets go", (await S(() => window.__practice.keys.stick().x)) === 0);

  // PASS tap
  await waitGame(page, "__practice", 0.6);
  const pass = await centre(page, "PASS");
  await touch.down(2, pass.x, pass.y);
  await page.waitForTimeout(80);
  await touch.up(2);
  await page.waitForFunction(() => window.__kicks.length > 0, null, { timeout: 40000 }).catch(() => {});
  check("PASS tap plays a pass", (await S(() => window.__kicks)).includes("pass"), JSON.stringify(await S(() => window.__kicks)));

  // ball back, then flick up on PASS: lofted pass
  const ball = await centre(page, "BALL");
  await touch.down(3, ball.x, ball.y);
  await touch.up(3);
  await waitGame(page, "__practice", 0.8);
  await S(() => (window.__kicks.length = 0));
  await touch.down(4, pass.x, pass.y);
  await touch.move(4, pass.x, pass.y - 60, 4);
  await touch.up(4);
  await page.waitForFunction(() => window.__kicks.length > 0, null, { timeout: 40000 }).catch(() => {});
  let kicks = await S(() => window.__kicks);
  check("flick up on PASS plays a lofted pass (and no ground pass)", kicks.includes("lob") && !kicks.includes("pass"), JSON.stringify(kicks));

  // THROUGH
  await touch.down(5, ball.x, ball.y);
  await touch.up(5);
  await waitGame(page, "__practice", 0.8);
  await S(() => (window.__kicks.length = 0));
  const thr = await centre(page, "THROUGH");
  await touch.down(6, thr.x, thr.y);
  await page.waitForTimeout(80);
  await touch.up(6);
  await page.waitForFunction(() => window.__kicks.length > 0, null, { timeout: 40000 }).catch(() => {});
  kicks = await S(() => window.__kicks);
  check("THROUGH plays a ball into space", kicks.includes("pass"), JSON.stringify(kicks));

  // SHOOT: hold, the power bar shows, release shoots
  await touch.down(7, ball.x, ball.y);
  await touch.up(7);
  await waitGame(page, "__practice", 0.8);
  await S(() => (window.__kicks.length = 0));
  const shoot = await centre(page, "SHOOT");
  await touch.down(8, shoot.x, shoot.y);
  await page.waitForFunction(() => window.__practice.hud.powerFor === "shoot", null, { timeout: 20000 }).catch(() => {});
  const bar = await S(() => window.__practice.hud.powerFor);
  await page.waitForTimeout(300);
  await touch.up(8);
  await page.waitForFunction(() => window.__kicks.length > 0, null, { timeout: 40000 }).catch(() => {});
  kicks = await S(() => window.__kicks);
  check("SHOOT: holding shows the power bar, releasing shoots", bar === "shoot" && kicks.includes("shot"), `bar ${bar}, ${JSON.stringify(kicks)}`);

  // DASH while moving: sprint is held
  await touch.down(9, ball.x, ball.y);
  await touch.up(9);
  const dash = await centre(page, "DASH");
  await touch.down(10, 200, 250);
  await touch.move(10, 260, 250);
  await touch.down(11, dash.x, dash.y);
  await waitGame(page, "__practice", 0.3);
  const sprinting = await S(() => window.__practice.sim.user.intent.sprint);
  await touch.up(11);
  await touch.up(10);
  check("DASH (with the stick held, two fingers at once) sprints", sprinting === true);
  await phone.close();

  // ---- match on a phone: buttons change when defending ----
  const phone2 = await browser.newContext({ viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await phone2.addInitScript(low);
  const mp = await phone2.newPage();
  collectErrors(mp, errs, "phone-match");
  const cdp2 = await phone2.newCDPSession(mp);
  const t2 = fingers(cdp2);
  await mp.goto("http://127.0.0.1:4173/");
  await mp.getByRole("button", { name: "Play match" }).click();
  await mp.getByRole("button", { name: "Next: rules" }).click();
  await mp.getByRole("button", { name: "Kick off" }).click();
  await mp.waitForSelector("[data-testid=match-hud]", { timeout: 120000 });
  await mp.waitForSelector("[data-testid=touchpad]", { timeout: 10000 }).catch(() => {});
  check("phone: touch pad shown in a match", await mp.locator("[data-testid=touchpad]").isVisible());
  // hand the ball to the nearest opponent of the user's player
  await mp.evaluate(() => {
    const s = window.__match.sim;
    s.phase = "play";
    s.restart = null;
    const u = s.controlled, o = s.squads[1 - s.cfg.userTeam].find((p) => p.role === "field");
    o.pos = { x: u.pos.x + 0.9, z: u.pos.z };
    s.physics.setBall({ x: o.pos.x + 0.3, y: 0.11, z: o.pos.z });
    s.setOwner(o);
  });
  await mp.waitForFunction(() => document.querySelector("[data-testid=touchpad]")?.getAttribute("data-mode") === "defend", null, { timeout: 20000 }).catch(() => {});
  const dl = await mp.locator(".pad-btn").evaluateAll((els) => els.map((e) => e.getAttribute("aria-label")));
  check("defending buttons: SWITCH, SLIDE, TACKLE, DASH", ["SWITCH", "SLIDE", "TACKLE", "DASH"].every((l) => dl.includes(l)), dl.join(","));
  await mp.screenshot({ path: `${out}/touch-defend.png` });
  const before = await mp.evaluate(() => window.__match.sim.controlled.id);
  const sw = await centre(mp, "SWITCH");
  await t2.down(1, sw.x, sw.y);
  await mp.waitForTimeout(80);
  await t2.up(1);
  await mp.waitForFunction((b) => window.__match.sim.controlled?.id !== b, before, { timeout: 30000 }).catch(() => {});
  const after = await mp.evaluate(() => window.__match.sim.controlled?.id);
  check("SWITCH changes the controlled player", after !== before, `${before} -> ${after}`);
  const tackles0 = await mp.evaluate(() => window.__match.sim.stats[window.__match.sim.cfg.userTeam].tackles);
  const tk = await centre(mp, "TACKLE");
  await mp.evaluate(() => {
    const s = window.__match.sim, u = s.controlled, o = s.owner;
    if (o) u.pos = { x: o.pos.x - 0.8, z: o.pos.z };
    u.yaw = o ? Math.atan2(o.pos.x - u.pos.x, o.pos.z - u.pos.z) : u.yaw;
  });
  await t2.down(2, tk.x, tk.y);
  await mp.waitForTimeout(80);
  await t2.up(2);
  await mp.waitForFunction((n) => window.__match.sim.stats[window.__match.sim.cfg.userTeam].tackles > n, tackles0, { timeout: 30000 }).catch(() => {});
  const tackles1 = await mp.evaluate(() => window.__match.sim.stats[window.__match.sim.cfg.userTeam].tackles);
  check("TACKLE makes a tackle", tackles1 > tackles0, `${tackles0} -> ${tackles1}`);
  await phone2.close();

  // ---- desktop match: no pad ----
  const desk2 = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await desk2.addInitScript(low);
  const dm = await desk2.newPage();
  collectErrors(dm, errs, "desktop-match");
  await dm.goto("http://127.0.0.1:4173/");
  await dm.getByRole("button", { name: "Play match" }).click();
  await dm.getByRole("button", { name: "Next: rules" }).click();
  await dm.getByRole("button", { name: "Kick off" }).click();
  await dm.waitForSelector("[data-testid=match-hud]", { timeout: 120000 });
  check("desktop: no touch pad in a match", (await dm.locator("[data-testid=touchpad]").count()) === 0);
  await desk2.close();
} finally {
  await browser.close();
  preview.kill();
}
check("no console/page errors", errs.length === 0, errs.join(" | "));
fs.writeFileSync(`${out}/touch-results.json`, JSON.stringify(results, null, 1));
process.exit(results.every((r) => r.ok) ? 0 : 1);
