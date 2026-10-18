import { useEffect, useRef, useState } from "react";
import { RoomLink, serverUrl } from "../../net/client";
import type { MatchStart, OnlineMode, RoomPlayer, ServerMsg } from "../../net/protocol";
import { OnlineMatchView, type OnlineRole } from "../../render/OnlineMatchView";
import type { MatchHud } from "../../render/MatchView";
import { loadSettings } from "../../settings/settings";
import { TEAMS } from "../../game/teams";
import { loadBall } from "../../game/ball";
import { TouchPad, useTouchUi } from "../TouchPad";
import { NotConnected, savedTeam, TEAM_KEY } from "./OnlineHome";
import { recordJob } from "../../game/jobs";

declare global {
  interface Window {
    __online?: { view: OnlineMatchView | null; link: RoomLink; phase: string };
  }
}

const teamName = (id: string) => TEAMS.find((t) => t.id === id)?.name ?? id;
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const MODE_LABEL: Record<OnlineMode, string> = { friendly: "Friendly", quick: "Quick match", ranked: "Ranked" };
const REACTIONS = ["👏", "🔥", "😂", "😮", "⚽", "💪"];

type Result = Extract<ServerMsg, { t: "result" }>;

/**
 * A room, as a player (route online/room/CODE) or a spectator (watch/CODE): the lobby, then the match, then the
 * result. One socket for the whole visit.
 */
export function RoomScreen({ code, spectate, go }: { code: string; spectate: boolean; go: (r: string) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const view = useRef<OnlineMatchView | null>(null);
  const linkRef = useRef<RoomLink | null>(null);
  const [conn, setConn] = useState("connecting");
  const [mode, setMode] = useState<OnlineMode>("friendly");
  const [seat, setSeat] = useState<0 | 1 | null>(null);
  const [players, setPlayers] = useState<RoomPlayer[]>([]);
  const [watchers, setWatchers] = useState(0);
  const [start, setStart] = useState<MatchStart | null>(null);
  const [hud, setHud] = useState<MatchHud | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [peerGone, setPeerGone] = useState(false);
  const [reacts, setReacts] = useState<{ e: string; from: string; k: number }[]>([]);
  const [copied, setCopied] = useState(false);
  const touch = useTouchUi();

  // the socket
  useEffect(() => {
    if (!serverUrl()) return;
    const link = new RoomLink(code, spectate ? "spectator" : "player");
    linkRef.current = link;
    window.__online = { view: null, link, phase: "lobby" };
    link.onState = setConn;
    link.onMessage = (m) => {
      switch (m.t) {
        case "joined":
          setMode(m.mode);
          setSeat(m.seat);
          if (m.role === "player") link.send({ t: "hello", name: "", team: savedTeam(), ball: loadBall() });
          break;
        case "lobby":
          setPlayers(m.players);
          setWatchers(m.spectators);
          break;
        case "spectators":
          setWatchers(m.count);
          break;
        case "start":
          setStart((s) => s ?? m.start);
          break;
        case "peer":
          setPeerGone(!m.connected);
          break;
        case "react":
          setReacts((r) => [...r.slice(-4), { e: m.e, from: m.from, k: Math.random() }]);
          break;
        case "result":
          setResult(m);
          if (!spectate) recordJob({ kind: "online" });
          if (window.__online) window.__online.phase = "result";
          break;
        case "error":
          setError(m.message);
          break;
      }
      view.current?.onNet(m);
    };
    void link.connect().catch((e: Error) => setError(e.message));
    return () => {
      link.close();
      delete window.__online;
    };
  }, [code, spectate]);

  // the match view, once the match starts
  useEffect(() => {
    const link = linkRef.current;
    if (!start || !link || !host.current) return;
    const role: OnlineRole = spectate ? "spectator" : seat === 0 ? "host" : "guest";
    const v = new OnlineMatchView(host.current, { ...loadSettings(), timeOfDay: start.timeOfDay });
    view.current = v;
    if (window.__online) Object.assign(window.__online, { view: v, phase: "match" });
    let alive = true;
    v.loadOnline(start, role, link, setProgress).catch((e: unknown) => alive && setError(String(e)));
    const id = setInterval(() => v.sim && v.hud && setHud({ ...v.hud }), 100);
    return () => {
      alive = false;
      clearInterval(id);
      v.dispose();
      view.current = null;
    };
  }, [start, seat, spectate]);

  if (!serverUrl()) return <NotConnected onBack={() => go("home")} />;

  const me = players.find((p) => p.seat === seat);
  const send = linkRef.current?.send.bind(linkRef.current) ?? (() => {});
  // keep the query: a ?server= address must travel with the invite
  const shareUrl = `${location.origin}${location.pathname}${location.search}#/online/room/${code}`;
  const copy = async () => {
    try {
      if (navigator.share) await navigator.share({ title: "ADUGBO match", text: `Join my ADUGBO room: ${code}`, url: shareUrl });
      else await navigator.clipboard.writeText(`Join my ADUGBO room: ${code} ${shareUrl}`);
      setCopied(true);
    } catch {
      /* cancelled */
    }
  };

  // ---- lobby ----
  if (!start) {
    return (
      <div className="screen room" data-testid="room-lobby">
        <p className="kicker">{MODE_LABEL[mode]}{spectate ? " · watching" : ""}</p>
        <h2>{spectate ? "Waiting for kick-off" : "Room"}</h2>
        {error && <p className="error" data-testid="room-error">{error}</p>}
        {!error && conn !== "open" && <p className="muted">{conn === "reconnecting" ? "Reconnecting…" : "Connecting…"}</p>}
        {mode === "friendly" && !spectate && (
          <div className="room-code">
            <span>Room code</span>
            <b data-testid="room-code">{code}</b>
            <button onClick={copy}>{copied ? "Shared" : "Share invite"}</button>
          </div>
        )}
        <div className="room-players">
          {[0, 1].map((s) => {
            const p = players.find((x) => x.seat === s);
            return (
              <div key={s} className={`room-player ${p?.ready ? "ready" : ""}`} data-testid={`seat-${s}`}>
                <small>{s === 0 ? "Home (runs the match)" : "Away"}</small>
                {p ? (
                  <>
                    <b>
                      {p.name}
                      {p.seat === seat ? " (you)" : ""}
                    </b>
                    <span>{teamName(p.team)}</span>
                    <span className="muted">{p.rating ? `Rating ${p.rating}` : ""}</span>
                    <span className="tag">{!p.connected ? "Disconnected" : p.ready ? "Ready" : "Not ready"}</span>
                  </>
                ) : (
                  <b className="muted">Waiting for a player…</b>
                )}
              </div>
            );
          })}
        </div>
        {me && (
          <div className="inline">
            <label>
              Your team{" "}
              <select
                aria-label="Your team"
                value={me.team}
                onChange={(e) => {
                  send({ t: "team", team: e.target.value });
                  try {
                    localStorage.setItem(TEAM_KEY, e.target.value);
                  } catch {
                    /* not saved */
                  }
                }}
              >
                {TEAMS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>
            <button className={me.ready ? "" : "primary"} onClick={() => send({ t: "ready", ready: !me.ready })} disabled={players.length < 2 && !me.ready}>
              {me.ready ? "Not ready" : "Ready"}
            </button>
          </div>
        )}
        <p className="muted">{watchers ? `${watchers} watching` : ""}</p>
        <div className="btns">
          <button onClick={() => go(spectate ? "watch" : "online")}>Leave</button>
        </div>
      </div>
    );
  }

  // ---- match ----
  const v = view.current;
  const quiet = v && v.role !== "host" && v.quietFor > 3;
  return (
    <div className={touch ? "game touch" : "game"}>
      <div className="game-view" ref={host} />
      {!hud && <div className="loading">Loading match… {Math.round(progress * 100)}%</div>}
      {hud && v && (
        <>
          <div className="scorebar" data-testid="online-hud">
            <span>{hud.home}</span>
            <b className="score">
              {hud.score[0]} – {hud.score[1]}
            </b>
            <span>{hud.away}</span>
            <span className="tag">
              H{hud.half} {mmss(hud.clock)}
            </span>
          </div>
          <div className="online-strip">
            <span className={`mode-tag ${mode}`}>{MODE_LABEL[mode]}</span>
            <span>👁 {watchers}</span>
            {spectate && <span>Watching</span>}
          </div>
          {hud.message && hud.phase !== "play" && (
            <div className="message" key={hud.message}>
              {hud.message}
            </div>
          )}
          {hud.controlled && <div className="controlled">{hud.controlled}{hud.hasBall ? " ●" : ""}</div>}
          {hud.powerFor && (
            <div className="power" aria-label="power">
              <div style={{ width: `${hud.power * 100}%` }} className={hud.powerFor} />
            </div>
          )}
          {(peerGone || quiet) && !result && (
            <div className="net-warning" data-testid="net-warning">
              {peerGone ? "Your opponent dropped out. They have 30 seconds to come back, or the match is yours." : "Waiting for the other player's connection…"}
            </div>
          )}
          <div className="reactions">
            {REACTIONS.map((e) => (
              <button key={e} aria-label={`React ${e}`} onClick={() => send({ t: "react", e })}>
                {e}
              </button>
            ))}
          </div>
          <div className="react-feed">
            {reacts.map((r) => (
              <span key={r.k}>
                {r.e} <small>{r.from}</small>
              </span>
            ))}
          </div>
          <div className="toolbar">
            <button aria-pressed={v.muted} onClick={() => v.toggleMute()}>
              {v.muted ? "Unmute" : "Mute"}
            </button>
            <button onClick={() => go(spectate ? "watch" : "online")}>{spectate ? "Stop watching" : "Leave match"}</button>
          </div>
          {touch && !spectate && !result && <TouchPad keys={v.keys} mode={hud.attacking ? "attack" : "defend"} />}
          {result && (
            <div className="overlay" data-testid="online-result">
              <h2>{resultTitle(result, seat, spectate)}</h2>
              <p className="big">
                {hud.home} {result.score[0]} – {result.score[1]} {hud.away}
              </p>
              {result.ranked && seat !== null && (
                <p data-testid="rating-change">
                  Rating {result.ranked.rating[seat]} ({result.ranked.delta[seat] >= 0 ? "+" : ""}
                  {result.ranked.delta[seat]})
                </p>
              )}
              <div className="btns">
                <button className="primary" onClick={() => go(spectate ? "watch" : "online")}>
                  {spectate ? "More matches" : "Online menu"}
                </button>
                <button onClick={() => go("rankings")}>Rankings</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function resultTitle(r: Result, seat: 0 | 1 | null, spectate: boolean) {
  if (r.forfeit !== undefined) {
    if (spectate || seat === null) return "Match abandoned";
    return r.forfeit === seat ? "You left: match lost" : "Opponent left: you win";
  }
  const [h, a] = r.score;
  if (spectate || seat === null) return h === a ? "Full-time: draw" : "Full-time";
  const mine = seat === 0 ? h - a : a - h;
  return mine > 0 ? "You win!" : mine < 0 ? "You lost" : "Draw";
}
