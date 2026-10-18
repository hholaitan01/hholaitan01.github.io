import { useCallback, useEffect, useState } from "react";
import { api, serverUrl } from "../../net/client";
import type { LiveMatch } from "../../net/protocol";
import { TEAMS } from "../../game/teams";
import { NotConnected } from "./OnlineHome";

const teamName = (id: string) => TEAMS.find((t) => t.id === id)?.name ?? id;
const MODE = { friendly: "Friendly", quick: "Online", ranked: "Ranked" } as const;

/** Matches being played right now that their players allow others to watch. Refreshes every 10 seconds. */
export function WatchScreen({ go }: { go: (r: string) => void }) {
  const [list, setList] = useState<LiveMatch[] | null>(null);
  const [total, setTotal] = useState(0);
  const [find, setFind] = useState("");
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(() => {
    api.live(48).then((r) => (setList(r.matches), setTotal(r.total), setError(null)), (e: Error) => setError(e.message));
  }, []);
  useEffect(() => {
    if (!serverUrl()) return;
    load();
    const id = setInterval(load, 10_000);
    return () => clearInterval(id);
  }, [load]);
  if (!serverUrl()) return <NotConnected onBack={() => go("home")} />;
  const q = find.trim().toLowerCase();
  const shown = (list ?? []).filter((m) => !q || m.home.name.toLowerCase().includes(q) || m.away.name.toLowerCase().includes(q));
  return (
    <div className="screen watch" data-testid="watch">
      <h2>Watch matches</h2>
      <p className="muted">
        {total} {total === 1 ? "match" : "matches"} on now · tap one to watch
      </p>
      <input className="find" aria-label="Find a player" placeholder="Find a player" value={find} onChange={(e) => setFind(e.target.value)} />
      {error && <p className="error">{error}</p>}
      {list && shown.length === 0 && <p className="muted">{q ? "No live match with that player." : "Nobody is playing online right now. Start one from Online multiplayer."}</p>}
      <div className="live-grid">
        {shown.map((m) => (
          <button key={m.code} className="live-card" data-testid="live-card" onClick={() => go(`watch/${m.code}`)}>
            <span className="side">
              <b>{m.home.name}</b>
              <small>{teamName(m.home.team)}</small>
            </span>
            <span className="mid">
              <b>
                {m.score[0]}–{m.score[1]}
              </b>
              <small>
                {m.half === 1 ? "1st" : "2nd"} · {Math.floor(m.clock / 60)}:{String(Math.floor(m.clock % 60)).padStart(2, "0")}
              </small>
            </span>
            <span className="side right">
              <b>{m.away.name}</b>
              <small>{teamName(m.away.team)}</small>
            </span>
            <span className="foot">
              <span className={`mode-tag ${m.mode}`}>{MODE[m.mode]}</span>
              <span>👁 {m.spectators} watching</span>
            </span>
          </button>
        ))}
      </div>
      <div className="btns">
        <button onClick={load}>Refresh</button>
        <button onClick={() => go("home")}>Back</button>
      </div>
    </div>
  );
}
