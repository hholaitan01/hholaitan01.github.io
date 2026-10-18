import { useEffect, useRef, useState } from "react";
import { QueueLink, serverUrl } from "../../net/client";
import type { QueueMsg } from "../../net/protocol";
import { NotConnected, savedTeam } from "./OnlineHome";

const BAND_TEXT = { tight: "Looking for players close to your rating", expanded: "Widening the search", open: "Looking for anyone" };

/** Matchmaking: waits in the quick or ranked queue until the server pairs us, then goes to the room. */
export function QueueScreen({ mode, go }: { mode: "quick" | "ranked"; go: (r: string) => void }) {
  const [state, setState] = useState<QueueMsg | null>(null);
  const [secs, setSecs] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const link = useRef<QueueLink | null>(null);
  const matched = useRef(false);

  useEffect(() => {
    if (!serverUrl()) return;
    const q = new QueueLink();
    link.current = q;
    q.onMessage = (m) => {
      if (m.t === "matched") {
        matched.current = true;
        go(`online/room/${m.code}`);
      } else if (m.t === "error") setError(m.message);
      else setState(m);
    };
    q.onClose = () => !matched.current && setError((e) => e ?? "The search stopped. Try again.");
    q.start(mode, savedTeam()).catch((e: Error) => setError(e.message));
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => {
      clearInterval(id);
      if (!matched.current) q.cancel();
    };
  }, [mode, go]);

  if (!serverUrl()) return <NotConnected onBack={() => go("home")} />;
  const band = state?.t === "queued" ? state : null;
  return (
    <div className="screen queue" data-testid="queue">
      <p className="kicker">{mode === "ranked" ? "Ranked" : "Quick match"}</p>
      <h2>Finding an opponent…</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <p className="big-time">{Math.floor(secs / 60)}:{String(secs % 60).padStart(2, "0")}</p>
          <p>{band ? BAND_TEXT[band.band] : "Joining the queue"}</p>
          {band && <p className="muted">{band.waiting === 1 ? "You're the only one searching right now." : `${band.waiting} players searching`}</p>}
          {secs >= 45 && (
            <p className="muted">
              Nobody has turned up yet. You can keep waiting, invite a friend with a room code, or play the CPU meanwhile.
            </p>
          )}
        </>
      )}
      <div className="btns">
        <button onClick={() => go("online")}>Cancel</button>
        {secs >= 45 && <button onClick={() => go("play")}>Play the CPU instead</button>}
      </div>
    </div>
  );
}
