import { useEffect, useRef, useState } from "react";
import { LabScene, type LabStats } from "../render/LabScene";
import { HEADS, type HairStyle, type HeadId, type PlayerLook } from "../game/PlayerPrefab";
import type { ActionName } from "../game/anim/locomotion";
import { TEAMS } from "../game/teams";
import type { Kit, KitPattern } from "../render/kit";

const PATTERNS: KitPattern[] = ["plain", "hoops", "hoop", "stripes", "pinstripe", "halves", "sash", "chevron"];
const ACTIONS: ActionName[] = ["pass", "shoot", "kick", "header", "cheer"];
const HAIR: HairStyle[] = ["full", "hightop", "mohawk", "none"];

declare global {
  interface Window {
    __adugbo?: { lab: LabScene };
  }
}

/** Stage 1 test scene: one player prefab with every look option and animation state wired to real controls. */
export function PlayerLab() {
  const host = useRef<HTMLDivElement>(null);
  const lab = useRef<LabScene | null>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<LabStats | null>(null);
  const [teamId, setTeamId] = useState(TEAMS[0].id);
  const [kit, setKit] = useState<Kit>(TEAMS[0].home);
  const [look, setLook] = useState<Omit<PlayerLook, "kit">>({ name: "Adebayo", number: 10, head: "m300", hair: "full", skinTone: 0.62 });
  const [speed, setSpeed] = useState(0);
  const [dribbling, setDribbling] = useState(false);

  useEffect(() => {
    const s = new LabScene(host.current!);
    lab.current = s;
    window.__adugbo = { lab: s };
    let alive = true;
    s.load({ ...look, kit }, setProgress)
      .then(() => alive && setReady(true))
      .catch((e: unknown) => alive && setError(String(e)));
    const id = setInterval(() => setStats({ ...s.stats }), 250);
    return () => {
      alive = false;
      clearInterval(id);
      s.dispose();
      lab.current = null;
    };
    // the scene is built once; look changes are pushed by the effect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ready) lab.current?.player?.setLook({ ...look, kit });
  }, [ready, look, kit]);

  useEffect(() => {
    if (lab.current) {
      lab.current.speed = speed;
      lab.current.dribbling = dribbling;
    }
  }, [speed, dribbling]);

  const turn = (rate: number) => () => {
    if (lab.current) lab.current.yawRate = rate;
  };
  const turnProps = (rate: number) => ({
    onPointerDown: turn(rate),
    onPointerUp: turn(0),
    onPointerLeave: turn(0),
    onPointerCancel: turn(0),
  });

  return (
    <div className="lab">
      <div className="lab-view" ref={host}>
        {!ready && !error && <div className="loading">Loading footballer… {Math.round(progress * 100)}%</div>}
        {error && <div className="loading error">Could not load the player model: {error}</div>}
        {stats && ready && (
          <div className="hud" data-testid="hud">
            {stats.fps || "–"} fps · {stats.state} · {stats.clip}
            {stats.action ? ` · ${stats.action}` : ""}
          </div>
        )}
      </div>
      <aside className="lab-panel">
        <h1>ADUGBO: Street Kings</h1>
        <p className="sub">Player prefab test scene · drag to orbit, scroll or pinch to zoom</p>

        <h2>Animation</h2>
        <div className="row">
          <label htmlFor="speed">Speed</label>
          <input id="speed" type="range" min={0} max={8} step={0.1} value={speed} onChange={(e) => setSpeed(+e.target.value)} disabled={!ready} />
        </div>
        <div className="btns">
          {[["Idle", 0], ["Walk", 1.4], ["Jog", 3.6], ["Sprint", 6.8]].map(([n, v]) => (
            <button key={n} onClick={() => setSpeed(v as number)} disabled={!ready}>
              {n}
            </button>
          ))}
        </div>
        <div className="row">
          <label htmlFor="drib">Ball at feet</label>
          <input id="drib" type="checkbox" checked={dribbling} onChange={(e) => setDribbling(e.target.checked)} disabled={!ready} />
        </div>
        <div className="btns" style={{ marginTop: 6 }}>
          <button {...turnProps(2.5)} disabled={!ready}>
            ⟲ Hold turn L
          </button>
          <button {...turnProps(-2.5)} disabled={!ready}>
            Hold turn R ⟳
          </button>
        </div>
        <div className="btns" style={{ marginTop: 6 }}>
          {ACTIONS.map((a) => (
            <button key={a} className="primary" onClick={() => lab.current?.play(a)} disabled={!ready || !!stats?.action}>
              {a}
            </button>
          ))}
        </div>

        <h2>Team & kit</h2>
        <div className="row">
          <label htmlFor="team">Team</label>
          <select
            id="team"
            value={teamId}
            onChange={(e) => {
              const t = TEAMS.find((x) => x.id === e.target.value)!;
              setTeamId(t.id);
              setKit(t.home);
            }}
          >
            {TEAMS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className="btns">
          <button onClick={() => setKit(TEAMS.find((x) => x.id === teamId)!.home)}>Home kit</button>
          <button onClick={() => setKit(TEAMS.find((x) => x.id === teamId)!.away)}>Away kit</button>
        </div>
        <div className="row">
          <label htmlFor="pattern">Pattern</label>
          <select id="pattern" value={kit.pattern} onChange={(e) => setKit({ ...kit, pattern: e.target.value as KitPattern })}>
            {PATTERNS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="colours">
          {(["shirt", "trim", "shorts", "socks", "boots"] as const).map((k) => (
            <label key={k}>
              <input type="color" value={kit[k]} onChange={(e) => setKit({ ...kit, [k]: e.target.value })} aria-label={`${k} colour`} />
              {k}
            </label>
          ))}
        </div>
        <div className="row">
          <label htmlFor="sleeves">Long sleeves</label>
          <input id="sleeves" type="checkbox" checked={!!kit.longSleeves} onChange={(e) => setKit({ ...kit, longSleeves: e.target.checked })} />
        </div>

        <h2>Player</h2>
        <div className="row">
          <label htmlFor="pname">Name</label>
          <input id="pname" type="text" maxLength={14} value={look.name} onChange={(e) => setLook({ ...look, name: e.target.value })} />
        </div>
        <div className="row">
          <label htmlFor="num">Number</label>
          <input id="num" type="number" min={1} max={99} value={look.number} onChange={(e) => setLook({ ...look, number: Math.max(1, Math.min(99, +e.target.value || 1)) })} />
        </div>
        <div className="row">
          <label htmlFor="head">Head</label>
          <select id="head" value={look.head} onChange={(e) => setLook({ ...look, head: e.target.value as HeadId })}>
            {HEADS.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </div>
        <div className="row">
          <label htmlFor="hair">Hair (m300)</label>
          <select id="hair" value={look.hair} disabled={look.head !== "m300"} onChange={(e) => setLook({ ...look, hair: e.target.value as HairStyle })}>
            {HAIR.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </div>
        <div className="row">
          <label htmlFor="tone">Skin (m300)</label>
          <input id="tone" type="range" min={0.35} max={1.1} step={0.01} value={look.skinTone} disabled={look.head !== "m300"} onChange={(e) => setLook({ ...look, skinTone: +e.target.value })} />
        </div>

        <h2>Asset</h2>
        <div className="stats" data-testid="stats">
          {stats
            ? `triangles (visible) ${stats.triangles}\njoints ${stats.joints}\nclips ${stats.clipCount}\nlast contact: ${stats.lastContact}\n` +
              Object.entries(stats.contacts)
                .map(([k, v]) => `contact ${k}: ${v}`)
                .join("\n")
            : "…"}
        </div>
        <p className="sub" style={{ marginTop: 10 }}>
          Body and heads: Microsoft Rocketbox (MIT). Animations: Mixamo, Quaternius (CC0), CMU mocap. Heads are generic stock avatars, not
          Nigerian likenesses — see docs/ASSET_MANIFEST.md.
        </p>
      </aside>
    </div>
  );
}
