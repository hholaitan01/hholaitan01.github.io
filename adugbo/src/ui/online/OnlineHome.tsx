import { useEffect, useState } from "react";
import { api, OfflineError, pingServer, serverUrl, type Profile } from "../../net/client";
import { isRoomCode } from "../../net/protocol";
import { TEAMS } from "../../game/teams";

export const TEAM_KEY = "adugbo.online.team";
export const savedTeam = () => {
  try {
    return localStorage.getItem(TEAM_KEY) ?? TEAMS[0].id;
  } catch {
    return TEAMS[0].id;
  }
};

/** Shown wherever online play is offered but no server is set up for this copy of the game. */
export function NotConnected({ onBack }: { onBack: () => void }) {
  return (
    <div className="screen" data-testid="online-offline">
      <h2>Online play</h2>
      <p>Online play isn't connected for this copy of the game yet: its server hasn't been set up.</p>
      <p className="muted">Everything else (matches against the CPU, penalties, training, the ball designer) works offline.</p>
      <div className="btns">
        <button className="primary" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export function OnlineHome({ go }: { go: (r: string) => void }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [team, setTeam] = useState(savedTeam);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [ping, setPing] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const configured = !!serverUrl();

  useEffect(() => {
    if (!configured) return;
    api.me().then((p) => (setProfile(p), setName(p.name)), (e: Error) => setError(e.message));
  }, [configured]);

  if (!configured) return <NotConnected onBack={() => go("home")} />;

  const pickTeam = (t: string) => {
    setTeam(t);
    try {
      localStorage.setItem(TEAM_KEY, t);
    } catch {
      /* not saved */
    }
  };
  const saveName = async () => {
    if (!profile || name === profile.name) return;
    try {
      setProfile(await api.updateMe({ name }));
    } catch (e) {
      setError((e as Error).message);
      setName(profile.name);
    }
  };
  const friendly = async () => {
    setBusy(true);
    try {
      go(`online/room/${await api.createRoom()}`);
    } catch (e) {
      setError(e instanceof OfflineError ? e.message : (e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const check = async () => {
    setPing("Checking…");
    const r = await pingServer();
    setPing(r.ok ? `Server reached ${r.ok}/5 times · ${r.median} ms round trip${r.median > 250 ? " (slow: expect some delay)" : ""}` : "Could not reach the server.");
  };
  const joinCode = code.trim().toUpperCase();

  return (
    <div className="screen online-home" data-testid="online-home">
      <p className="kicker">Online multiplayer</p>
      <h2>Choose online mode</h2>
      {error && <p className="error">{error}</p>}
      <div className="profile-row">
        <label>
          Your name{" "}
          <input aria-label="Your name" value={name} maxLength={16} onChange={(e) => setName(e.target.value)} onBlur={saveName} onKeyDown={(e) => e.key === "Enter" && void saveName()} />
        </label>
        {profile && (
          <span className="muted" data-testid="my-rating">
            Rating {profile.rating}
            {profile.rank ? ` · #${profile.rank} on the table` : " · not on the table yet"} · {profile.wins}W {profile.draws}D {profile.losses}L
          </span>
        )}
        <label>
          Your team{" "}
          <select aria-label="Your team" value={team} onChange={(e) => pickTeam(e.target.value)}>
            {TEAMS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mode-cards">
        <button className="mode-card" onClick={() => go("online/queue/quick")}>
          <small>Matchmaking</small>
          <b>Quick match</b>
          <span>Find anyone who is searching. Two 90-second halves. Doesn't change your rating.</span>
        </button>
        <button className="mode-card" onClick={() => go("online/queue/ranked")}>
          <small>Matchmaking</small>
          <b>Ranked</b>
          <span>Play someone near your rating. Win to climb the table (Elo).</span>
        </button>
        <div className="mode-card">
          <small>Invite room</small>
          <b>Friendly</b>
          <span>Make a room and send the code to a friend, or type theirs.</span>
          <div className="inline">
            <button className="primary" disabled={busy} onClick={friendly}>
              Create room
            </button>
            <input aria-label="Room code" placeholder="CODE" value={code} maxLength={5} onChange={(e) => setCode(e.target.value.toUpperCase())} />
            <button disabled={!isRoomCode(joinCode)} onClick={() => go(`online/room/${joinCode}`)}>
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="btns">
        <button onClick={() => go("rankings")}>Rankings</button>
        <button onClick={() => go("watch")}>Watch matches</button>
        <button onClick={check}>Check my connection</button>
        <button onClick={() => go("home")}>Back</button>
      </div>
      {ping && <p className="muted" data-testid="ping">{ping}</p>}
      <p className="muted small">
        How it works: one player's device runs the match and the other sees it a fraction of a second later, so a steady connection helps. Keep the game on screen while you play.
      </p>
    </div>
  );
}
