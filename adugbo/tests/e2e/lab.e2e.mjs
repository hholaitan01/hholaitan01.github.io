// Stage 1 browser test: loads the player test scene, drives every animation control and checks the state machine responds.
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
  for (const vp of [{ name: "desktop", width: 1280, height: 720 }, { name: "phone-landscape", width: 844, height: 390, mobile: true }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.mobile, hasTouch: !!vp.mobile, deviceScaleFactor: vp.mobile ? 2 : 1 });
    const page = await ctx.newPage();
    collectErrors(page, errs, vp.name);
    await page.goto("http://127.0.0.1:4173/#/lab");
    await page.waitForSelector("[data-testid=hud]", { timeout: 90000 });
    const lab = (expr) => page.evaluate(expr);
    const st = () => lab(() => ({ ...window.__adugbo.lab.stats }));
    let s = await st();
    check(`${vp.name}: model loaded`, s.joints >= 80 && s.clipCount >= 30, `joints ${s.joints}, clips ${s.clipCount}, visible tris ${s.triangles}`);
    check(`${vp.name}: contact frames found`, ["pass", "strike", "kick"].every((k) => s.contacts[k]), JSON.stringify(s.contacts));
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${out}/lab-${vp.name}-idle.png` });
    if (vp.name === "desktop") {
      for (const [btn, want] of [["Walk", "walk"], ["Jog", "jog"], ["Sprint", "sprint"], ["Idle", "idle"]]) {
        await page.getByRole("button", { name: btn, exact: true }).click();
        await page.waitForTimeout(500);
        s = await st();
        check(`button ${btn} -> state ${want}`, s.state === want, `state ${s.state}, clip ${s.clip}`);
      }
      await page.getByRole("button", { name: "Jog", exact: true }).click();
      await page.getByLabel("Ball at feet").check();
      await page.waitForTimeout(400);
      s = await st();
      check("ball at feet -> dribble clip", s.clip === "dribble", s.clip);
      await page.getByLabel("Ball at feet").uncheck();
      await page.getByRole("button", { name: "Idle", exact: true }).click();
      const turnBtn = page.getByRole("button", { name: /Hold turn L/ });
      await turnBtn.hover();
      await page.mouse.down();
      // software rendering runs slowly, so wait for the rotation rather than a fixed time
      await page.waitForFunction(() => window.__adugbo.lab.player.root.rotation.y > 0.5, null, { timeout: 5000 }).catch(() => {});
      s = await st();
      const yaw = await lab(() => window.__adugbo.lab.player.root.rotation.y);
      await page.mouse.up();
      check("hold turn L -> turnL state and rotation", s.state === "turnL" && yaw > 0.5, `state ${s.state}, yaw ${yaw.toFixed(2)}`);
      await page.waitForTimeout(300);
      await lab(() => (window.__adugbo.lab.player.root.rotation.y = 0));
      for (const a of ["pass", "shoot", "kick", "header", "cheer"]) {
        await page.waitForFunction(() => !window.__adugbo.lab.player.action);
        const before = (await st()).lastContact;
        await page.getByRole("button", { name: a, exact: true }).click();
        const during = { action: await lab(() => window.__adugbo.lab.player.action) };
        if (a === "shoot") {
          await page.waitForTimeout(500);
          await page.screenshot({ path: `${out}/lab-shoot.png` });
        }
        await page.waitForFunction(() => !window.__adugbo.lab.player.action, null, { timeout: 8000 });
        const after = await st();
        const needsContact = ["pass", "shoot", "kick"].includes(a);
        check(`action ${a}`, during.action === a && (!needsContact || after.lastContact !== before), `during ${during.action}, contact ${after.lastContact}`);
      }
      // look changes: team, head, number
      await page.getByLabel("Team").selectOption("ajg");
      await page.getByLabel("Number").fill("7");
      await page.getByLabel("Head").selectOption("m016");
      await page.waitForTimeout(400);
      const vis = await lab(() => {
        const r = {};
        window.__adugbo.lab.player.root.traverse((o) => o.isSkinnedMesh && (r[o.userData.part] = o.visible));
        return r;
      });
      check("head swap shows only rbh_m016", vis.rbh_m016 && !vis.rb_head && !vis.rbh_m006 && !vis.rb_hair, JSON.stringify(vis));
      await page.screenshot({ path: `${out}/lab-ajegunle-m016.png` });
      await lab(() => {
        const l = window.__adugbo.lab;
        l.player.root.rotation.y = Math.PI;
      });
      await page.waitForTimeout(300);
      await page.screenshot({ path: `${out}/lab-back-number.png` });
      s = await st();
      check(`fps measured`, s.fps > 0, `${s.fps} fps (software renderer, not representative of devices)`);
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  preview.kill();
}
check("no console/page errors", errs.length === 0, errs.join(" | "));
fs.writeFileSync(`${out}/lab-results.json`, JSON.stringify(results, null, 1));
process.exit(results.every((r) => r.ok) ? 0 : 1);
