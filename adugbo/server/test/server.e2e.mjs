// End-to-end test of the online server against a running instance (default: `npm run dev` on 127.0.0.1:8787).
// Real HTTP and WebSocket traffic: guests, a friendly room with a spectator, the live list, ranked matchmaking with
// Elo, the rankings table, a forfeit, and the rejections (bad pass, full room, watching turned off).
const BASE = process.env.SERVER ?? "http://127.0.0.1:8787";
const WS = BASE.replace(/^http/, "ws");
const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok });
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? " — " + detail : ""}`);
};
const api = async (path, opts = {}, who) => {
  const r = await fetch(BASE + path, { ...opts, headers: { "content-type": "application/json", ...(who ? { authorization: `Bearer ${who.id}:${who.token}` } : {}) } });
  return { status: r.status, body: await r.json() };
};
const guest = async (name) => (await api("/api/guest", { method: "POST", body: JSON.stringify({ name }) })).body;

/** A socket that records messages and lets the test wait for one matching a predicate. */
function sock(url) {
  const ws = new WebSocket(url);
  const got = [];
  const waiters = [];
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    got.push(m);
    for (const w of [...waiters]) if (w.f(m)) (waiters.splice(waiters.indexOf(w), 1), w.res(m));
  });
  const closed = new Promise((res) => ws.addEventListener("close", (e) => res(e.code)));
  const open = new Promise((res, rej) => (ws.addEventListener("open", res), ws.addEventListener("error", rej)));
  return {
    ws, got, open, closed,
    send: (m) => ws.send(JSON.stringify(m)),
    wait: (f, ms = 8000) =>
      new Promise((res, rej) => {
        const hit = got.find(f);
        if (hit) return res(hit);
        const w = { f, res };
        waiters.push(w);
        setTimeout(() => rej(new Error("timeout waiting for message; got " + JSON.stringify(got.slice(-4)))), ms);
      }),
  };
}
const room = (code, who, role = "player") => sock(`${WS}/api/room/${code}?id=${who.id}&token=${who.token}&role=${role}`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  // ---- guests ----
  const A = await guest("Ade Test"), B = await guest("Bisi Test"), C = await guest("Chidi Test");
  check("guest passes are issued with a starting rating", A.id && A.token && A.profile.rating === 1000 && A.profile.name === "Ade Test", JSON.stringify(A.profile));
  const me = await api("/api/me", {}, A);
  check("/api/me recognises the pass", me.status === 200 && me.body.profile.id === A.id);
  check("a wrong token is refused", (await api("/api/me", {}, { id: A.id, token: "00" + A.token.slice(2) })).status === 401);
  const rn = await api("/api/me", { method: "PUT", body: JSON.stringify({ name: "Ade<script>" }) }, A);
  check("names are cleaned", rn.body.profile.name === "Adescript", rn.body.profile.name);

  // ---- friendly room ----
  const code = (await api("/api/rooms", { method: "POST" }, A)).body.code;
  check("a friendly room gets a 5-character code", /^[A-Z2-9]{5}$/.test(code), code);
  const a = room(code, A), b = room(code, B);
  await Promise.all([a.open, b.open]);
  const ja = await a.wait((m) => m.t === "joined"), jb = await b.wait((m) => m.t === "joined");
  check("first in is the host (seat 0), second seat 1", ja.seat === 0 && jb.seat === 1, `${ja.seat} ${jb.seat}`);
  const c3 = room(code, C);
  check("a third player is turned away (room full)", (await c3.wait((m) => m.t === "error")).code === "room_full");
  a.send({ t: "hello", name: "Ade", team: "mushin", ball: { pattern: "stars", base: "#ffffff", a: "#ff0000", b: "#000000" } });
  b.send({ t: "hello", name: "Bisi", team: "agege", ball: null });
  a.send({ t: "ready", ready: true });
  b.send({ t: "ready", ready: true });
  const st = await b.wait((m) => m.t === "start");
  check("both ready: the match starts with each side's team and the host's ball", st.start.home === "mushin" && st.start.away === "agege" && st.start.ball?.pattern === "stars" && st.start.mode === "friendly", JSON.stringify(st.start));
  // a spectator joins mid-match and gets the start and the snapshots
  const s = room(code, C, "spectator");
  await s.open;
  await s.wait((m) => m.t === "start");
  a.send({ t: "snap", d: "STATE-1", score: [1, 0], half: 1, clock: 42 });
  check("host snapshots reach the guest", (await b.wait((m) => m.t === "snap")).d === "STATE-1");
  check("host snapshots reach spectators", (await s.wait((m) => m.t === "snap")).d === "STATE-1");
  b.send({ t: "in", d: "INPUT-1" });
  check("guest input reaches the host", (await a.wait((m) => m.t === "in")).d === "INPUT-1");
  check("the guest's input does not reach spectators", !s.got.some((m) => m.t === "in"));
  check("players are told the spectator count", (await a.wait((m) => m.t === "spectators" && m.count === 1)).count === 1);
  await sleep(300);
  const live = (await api("/api/live")).body;
  const lm = live.matches.find((m) => m.code === code);
  check("the match is on the live list with its score", !!lm && lm.score[0] === 1 && lm.home.name === "Ade" && lm.spectators === 1, JSON.stringify(lm));
  s.send({ t: "react", e: "🔥" });
  check("reactions reach everyone", (await a.wait((m) => m.t === "react")).e === "🔥");
  a.send({ t: "end", score: [1, 0] });
  b.send({ t: "end", score: [1, 0] });
  const fr = await a.wait((m) => m.t === "result");
  check("both report the same score: result, not ranked (friendly)", fr.score[0] === 1 && !fr.ranked, JSON.stringify(fr));
  await sleep(300);
  check("a finished match leaves the live list", !(await api("/api/live")).body.matches.some((m) => m.code === code));
  for (const x of [a, b, s]) x.ws.close();

  // ---- ranked matchmaking ----
  const qa = sock(`${WS}/api/queue?mode=ranked&id=${A.id}&token=${A.token}&team=bariga`);
  await qa.open;
  check("queueing reports the search band", (await qa.wait((m) => m.t === "queued")).band === "tight");
  const qb = sock(`${WS}/api/queue?mode=ranked&id=${B.id}&token=${B.token}&team=akoka`);
  const ma = await qa.wait((m) => m.t === "matched"), mb = await qb.wait((m) => m.t === "matched");
  check("two ranked players with close ratings are paired into one room", ma.code === mb.code && ma.seat === 0 && mb.seat === 1 && ma.opponent.id === B.id, `${ma.code} ${mb.code}`);
  const intruder = room(ma.code, C);
  check("only the matched players can sit in a ranked room", (await intruder.wait((m) => m.t === "error")).code === "not_your_room");
  const ra = room(ma.code, A), rb = room(ma.code, B);
  await Promise.all([ra.open, rb.open]);
  ra.send({ t: "hello", name: "Ade", team: "bariga", ball: null });
  rb.send({ t: "hello", name: "Bisi", team: "akoka", ball: null });
  ra.send({ t: "ready", ready: true });
  rb.send({ t: "ready", ready: true });
  await ra.wait((m) => m.t === "start");
  ra.send({ t: "end", score: [2, 1] });
  rb.send({ t: "end", score: [2, 1] });
  const rr = await rb.wait((m) => m.t === "result");
  check("ranked win: Elo +16/−16 between equal ratings", rr.ranked?.delta[0] === 16 && rr.ranked?.delta[1] === -16 && rr.ranked.rating[0] === 1016, JSON.stringify(rr));
  const lb = (await api("/api/leaderboard?limit=50")).body;
  const ia = lb.rows.findIndex((r) => r.id === A.id), ib = lb.rows.findIndex((r) => r.id === B.id);
  check("the rankings table lists both, winner above, with records", ia >= 0 && ib > ia && lb.rows[ia].wins === 1 && lb.rows[ib].losses === 1, JSON.stringify(lb.rows.slice(0, 3)));
  const rank = (await api("/api/me", {}, A)).body.profile.rank;
  // equal ratings share a position
  check("profile shows the table position", rank === lb.rows.filter((r) => r.rating > lb.rows[ia].rating).length + 1, `rank ${rank}`);
  for (const x of [ra, rb, intruder, c3]) x.ws.close();

  // ---- quick match: anyone pairs ----
  const qc = sock(`${WS}/api/queue?mode=quick&id=${C.id}&token=${C.token}&team=onola`);
  const qd = sock(`${WS}/api/queue?mode=quick&id=${B.id}&token=${B.token}&team=akoka`);
  const mc = await qc.wait((m) => m.t === "matched");
  check("quick match pairs regardless of rating", !!mc.code && (await qd.wait((m) => m.t === "matched")).code === mc.code);

  // ---- watching turned off ----
  await api("/api/me", { method: "PUT", body: JSON.stringify({ allowWatch: false }) }, C);
  const xc = room(mc.code, C), xd = room(mc.code, B);
  await Promise.all([xc.open, xd.open]);
  await xc.wait((m) => m.t === "lobby" && m.players.length === 2);
  const sp = room(mc.code, A, "spectator");
  check("a player who turned watching off cannot be watched", (await sp.wait((m) => m.t === "error")).code === "not_watchable");
  for (const x of [xc, xd]) x.ws.close();

  // ---- forfeit ----
  if (!process.env.SKIP_FORFEIT) {
    const D = await guest("Dayo Test"), E = await guest("Emeka Test");
    const q1 = sock(`${WS}/api/queue?mode=ranked&id=${D.id}&token=${D.token}`), q2 = sock(`${WS}/api/queue?mode=ranked&id=${E.id}&token=${E.token}`);
    const m1 = await q1.wait((m) => m.t === "matched");
    await q2.wait((m) => m.t === "matched");
    const d = room(m1.code, D), e = room(m1.code, E);
    await Promise.all([d.open, e.open]);
    d.send({ t: "ready", ready: true });
    e.send({ t: "ready", ready: true });
    await d.wait((m) => m.t === "start");
    d.send({ t: "snap", d: "x", score: [0, 1], half: 1, clock: 10 });
    e.ws.close();
    check("the other player is told when someone drops", (await d.wait((m) => m.t === "peer" && !m.connected)).seat === 1);
    const ff = await d.wait((m) => m.t === "result", 40_000);
    check("gone for 30 s: the match goes to the player who stayed (ranked points too)", ff.forfeit === 1 && ff.ranked?.delta[0] > 0, JSON.stringify(ff));
    d.ws.close();
  }
} catch (e) {
  check("no unexpected errors", false, String(e?.stack ?? e));
}
const failed = results.filter((r) => !r.ok).length;
console.log(`${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
