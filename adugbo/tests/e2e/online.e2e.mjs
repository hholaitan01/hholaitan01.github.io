// Online play end to end: real browsers against a running ADUGBO server (`cd server && npm run dev`, or SERVER=...).
// Two players in a friendly room (the guest's input moves the guest's player on the host, the guest's screen follows
// the host), a spectator from the Watch list, reactions, full time on both screens; then two fresh players through
// ranked matchmaking to a rating change on the rankings table; and the honest "not connected" screen without a server.
import { startPreview, launch, collectErrors } from "./browser.mjs";
import fs from "node:fs";

const SERVER = process.env.SERVER ?? "http://127.0.0.1:8787";
const out = process.env.SHOTS ?? "test-results";
fs.mkdirSync(out, { recursive: true });
const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? " — " + detail : ""}`);
};
try {
  const r = await fetch(SERVER + "/api/health");
  if (!r.ok) throw new Error(String(r.status));
} catch (e) {
  console.log(`FAIL server not reachable at ${SERVER} (${e}). Start it with: cd server && npm run dev`);
  process.exit(1);
}
const preview = await startPreview();
const browser = await launch();
const errs = [];
const URL0 = `http://127.0.0.1:4173/?server=${encodeURIComponent(SERVER)}`;

async function player(tag) {
  const ctx = await browser.newContext({ viewport: { width: 960, height: 540 } });
  await ctx.addInitScript(() => localStorage.setItem("adugbo.settings.v1", JSON.stringify({ quality: "low", timeOfDay: "day" })));
  const page = await ctx.newPage();
  collectErrors(page, errs, tag);
  return { ctx, page };
}
const inMatch = (page) => page.waitForFunction(() => window.__online?.view?.sim && document.querySelector("[data-testid=online-hud]"), null, { timeout: 180000 });
const simOf = (page, fn, arg) => page.evaluate(fn, arg);
/** Takes a match to its last half-second on the host, so both screens reach full time. */
const endSoon = (page, score) =>
  page.evaluate((sc) => {
    const s = window.__online.view.sim;
    s.half = 2;
    s.phase = "play";
    s.restart = null;
    s.score = sc;
    s.clock = s.halfLength - 0.3;
  }, score);

try {
  // ---- friendly room ----
  const H = await player("host"), G = await player("guest");
  await H.page.goto(`${URL0}#/online`);
  await H.page.waitForSelector("[data-testid=online-home]", { timeout: 30000 });
  await H.page.getByRole("button", { name: "Create room" }).click();
  await H.page.waitForSelector("[data-testid=room-code]", { timeout: 30000 });
  const code = (await H.page.textContent("[data-testid=room-code]")).trim();
  check("host creates a friendly room and sees its code", /^[A-Z2-9]{5}$/.test(code), code);
  await G.page.goto(`${URL0}#/online/room/${code}`);
  await G.page.waitForFunction(() => document.querySelectorAll("[data-testid^=seat-] b:not(.muted)").length === 2, null, { timeout: 30000 });
  check("guest joins with the code: both seats filled on the guest's screen", true);
  await H.page.waitForFunction(() => document.querySelectorAll("[data-testid^=seat-] b:not(.muted)").length === 2, null, { timeout: 30000 });
  await H.page.getByLabel("Your team").selectOption("mushin");
  await G.page.getByLabel("Your team").selectOption("agege");
  await H.page.screenshot({ path: `${out}/online-lobby.png` });
  await H.page.getByRole("button", { name: "Ready", exact: true }).click();
  await G.page.getByRole("button", { name: "Ready", exact: true }).click();
  await Promise.all([inMatch(H.page), inMatch(G.page)]);
  const roles = [await simOf(H.page, () => window.__online.view.role), await simOf(G.page, () => window.__online.view.role)];
  const teams = await simOf(G.page, () => window.__online.view.sim.teams.map((t) => t.id));
  check("both ready: the match starts, host runs it, guest follows", roles[0] === "host" && roles[1] === "guest" && teams[0] === "mushin" && teams[1] === "agege", `${roles} ${teams}`);

  // the guest moves their player: it must move on the host
  await simOf(H.page, () => {
    const s = window.__online.view.sim;
    s.phase = "play";
    s.restart = null;
  });
  const before = await simOf(H.page, () => window.__online.view.sim.ctrl[1].pos.x);
  await G.page.bringToFront();
  await G.page.keyboard.down("KeyA");
  await H.page.waitForFunction((x0) => Math.abs(window.__online.view.sim.ctrl[1].pos.x - x0) > 1.5, before, { timeout: 60000 }).catch(() => {});
  await G.page.keyboard.up("KeyA");
  const after = await simOf(H.page, () => window.__online.view.sim.ctrl[1].pos.x);
  check("the guest's keys move the guest's player in the host's match", Math.abs(after - before) > 1.5, `${before.toFixed(1)} -> ${after.toFixed(1)}`);
  // the guest's screen shows the host's match
  await G.page.waitForTimeout(1500);
  const hp = await simOf(H.page, () => window.__online.view.sim.ctrl[1].pos);
  const gp = await simOf(G.page, () => window.__online.view.sim.ctrl[1].pos);
  check("the guest's screen follows the host's (same player position within 1.5 m)", Math.hypot(hp.x - gp.x, hp.z - gp.z) < 1.5, `host ${hp.x.toFixed(1)},${hp.z.toFixed(1)} guest ${gp.x.toFixed(1)},${gp.z.toFixed(1)}`);
  await G.page.screenshot({ path: `${out}/online-guest.png` });

  // a spectator finds it on the Watch list
  const S = await player("spectator");
  await S.page.goto(`${URL0}#/watch`);
  await S.page.waitForSelector("[data-testid=live-card]", { timeout: 30000 }).catch(() => {});
  const cards = await S.page.locator("[data-testid=live-card]").count();
  check("the match appears on the Watch list", cards >= 1, `${cards} live`);
  await S.page.locator("[data-testid=live-card]").first().click();
  await inMatch(S.page);
  check("a spectator watches it", (await simOf(S.page, () => window.__online.view.role)) === "spectator");
  await H.page.waitForFunction(() => document.querySelector(".online-strip")?.textContent.includes("👁 1"), null, { timeout: 30000 }).catch(() => {});
  check("the players see the watcher count", (await H.page.textContent(".online-strip")).includes("👁 1"));
  await S.page.getByRole("button", { name: "React 🔥" }).click();
  await H.page.waitForFunction(() => document.querySelector(".react-feed")?.textContent.includes("🔥"), null, { timeout: 30000 }).catch(() => {});
  check("reactions reach the players", (await H.page.textContent(".react-feed")).includes("🔥"));
  await S.page.screenshot({ path: `${out}/online-spectator.png` });

  // full time
  await endSoon(H.page, [2, 1]);
  await Promise.all([H.page, G.page].map((p) => p.waitForSelector("[data-testid=online-result]", { timeout: 90000 }).catch(() => {})));
  const titles = [await H.page.textContent("[data-testid=online-result] h2").catch(() => ""), await G.page.textContent("[data-testid=online-result] h2").catch(() => "")];
  check("full time on both screens: host won, guest lost", titles[0] === "You win!" && titles[1] === "You lost", JSON.stringify(titles));
  await G.page.screenshot({ path: `${out}/online-result.png` });
  for (const x of [H, G, S]) await x.ctx.close();

  // ---- ranked ----
  const A = await player("ranked-a"), B = await player("ranked-b");
  await A.page.goto(`${URL0}#/online/queue/ranked`);
  await A.page.waitForSelector("[data-testid=queue]");
  await A.page.waitForTimeout(1500);
  await B.page.goto(`${URL0}#/online/queue/ranked`);
  await Promise.all([A, B].map((x) => x.page.waitForSelector("[data-testid=room-lobby]", { timeout: 60000 }).catch(() => {})));
  check("two players in the ranked queue are matched into a room", (await A.page.url()).includes("/online/room/") && (await A.page.url()) === (await B.page.url()), await A.page.url());
  await A.page.waitForFunction(() => document.querySelectorAll("[data-testid^=seat-] b:not(.muted)").length === 2, null, { timeout: 30000 });
  await B.page.waitForFunction(() => document.querySelectorAll("[data-testid^=seat-] b:not(.muted)").length === 2, null, { timeout: 30000 });
  await A.page.getByRole("button", { name: "Ready", exact: true }).click();
  await B.page.getByRole("button", { name: "Ready", exact: true }).click();
  await Promise.all([inMatch(A.page), inMatch(B.page)]);
  const hostPage = (await simOf(A.page, () => window.__online.view.role)) === "host" ? A.page : B.page;
  const guestPage = hostPage === A.page ? B.page : A.page;
  await endSoon(hostPage, [3, 0]);
  await Promise.all([hostPage, guestPage].map((p) => p.waitForSelector("[data-testid=rating-change]", { timeout: 90000 }).catch(() => {})));
  const rc = [await hostPage.textContent("[data-testid=rating-change]").catch(() => ""), await guestPage.textContent("[data-testid=rating-change]").catch(() => "")];
  check("ranked result: the winner gains rating, the loser drops", /\(\+\d+\)/.test(rc[0]) && /\(-\d+\)/.test(rc[1]), JSON.stringify(rc));
  await hostPage.getByRole("button", { name: "Rankings" }).click();
  await hostPage.waitForSelector(".rank-table tr.me", { timeout: 30000 }).catch(() => {});
  check("the winner is on the rankings table, highlighted", (await hostPage.locator(".rank-table tr.me").count()) === 1);
  await hostPage.screenshot({ path: `${out}/online-rankings.png` });
  for (const x of [A, B]) await x.ctx.close();

  // ---- no server configured ----
  const N = await player("offline");
  await N.page.goto("http://127.0.0.1:4173/#/online");
  await N.page.waitForSelector("[data-testid=online-offline]", { timeout: 30000 }).catch(() => {});
  check("without a server the game says online isn't connected (no fake lobby)", await N.page.locator("[data-testid=online-offline]").isVisible());
  await N.ctx.close();
} catch (e) {
  check("no unexpected errors", false, String(e?.stack ?? e).slice(0, 600));
} finally {
  await browser.close();
  preview.kill();
}
check("no console/page errors", errs.length === 0, errs.join(" | "));
fs.writeFileSync(`${out}/online-results.json`, JSON.stringify(results, null, 1));
process.exit(results.every((r) => r.ok) ? 0 : 1);
