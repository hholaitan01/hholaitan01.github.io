import { useEffect, useState } from "react";
import { jobDone, jobFor, weekStrip } from "../game/jobs";
import { api, serverUrl, type Profile } from "../net/client";

/** Main menu: today's job and the street table on the left, every mode as a tile. */
export function Home({ go }: { go: (route: string) => void }) {
  const job = jobFor(), done = jobDone(), week = weekStrip();
  const online = !!serverUrl();
  const [live, setLive] = useState<number | null>(null);
  const [me, setMe] = useState<Profile | null>(null);
  useEffect(() => {
    if (!online) return;
    api.liveCount().then(setLive, () => setLive(null));
    api.me().then(setMe, () => {});
  }, [online]);

  return (
    <div className="screen home2" data-testid="home">
      <header className="home-head">
        <h1>
          ADUGBO<span>Street Kings</span>
        </h1>
      </header>
      <div className="home-grid">
        <aside className="home-side">
          <button className={`job-card ${done ? "done" : ""}`} onClick={() => go(job.route)} data-testid="todays-job">
            <small>Today's job</small>
            <b>{job.text}</b>
            <span>{done ? "Done today ✓" : "▸ Go"}</span>
            <span className="week">
              {week.map((d, i) => (
                <i key={i} className={`${d.done ? "done" : ""} ${d.today ? "today" : ""}`}>
                  {d.label}
                </i>
              ))}
            </span>
          </button>
          <button className="rank-card" onClick={() => go("rankings")}>
            <small>Rankings ↗</small>
            {me?.rank ? (
              <b>
                #{me.rank} · {me.rating}
              </b>
            ) : (
              <b>Join the table</b>
            )}
            <span>{online ? (me?.rank ? `${me.wins}W ${me.draws}D ${me.losses}L` : "Finish a ranked match to get a place") : "Needs online play"}</span>
          </button>
        </aside>
        <nav className="home-tiles">
          <button className="tile big" onClick={() => go("play")}>
            <b>Play match</b>
            <span>Street 5s monkey post, 7-a-side or Four posts against the CPU. Pick your teams and house rules.</span>
          </button>
          <button className="tile" onClick={() => go("penalties")}>
            <b>Penalty shootout</b>
            <span>Five kicks each, then sudden death.</span>
          </button>
          <button className="tile" onClick={() => go("training")}>
            <b>Training</b>
            <span>Free play, drills and penalty practice.</span>
          </button>
          <button className="tile vs" onClick={() => go("online")}>
            <b>Online multiplayer</b>
            <span>{online ? "Play a friend, quick match or ranked." : "Not connected yet"}</span>
          </button>
          <button className="tile" onClick={() => go("ball")}>
            <b>Ball designer</b>
            <span>Make your own match ball.</span>
          </button>
          <button className="tile" onClick={() => go("watch")}>
            <b>Watch matches</b>
            <span>{live === null ? (online ? "Live online matches" : "Not connected yet") : `${live} on now ▸`}</span>
          </button>
          <button className="tile" onClick={() => go("settings")}>
            <b>Settings</b>
            <span>Graphics, sound and online name.</span>
          </button>
        </nav>
      </div>
      <div className="home-links">
        <button onClick={() => go("howto")}>How to play</button>
        <button onClick={() => go("lab")}>Player lab</button>
        <button onClick={() => go("credits")}>Credits</button>
      </div>
    </div>
  );
}
