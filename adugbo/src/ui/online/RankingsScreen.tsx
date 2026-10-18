import { useCallback, useEffect, useState } from "react";
import { api, serverUrl, type Profile } from "../../net/client";
import type { RankRow } from "../../net/protocol";
import { NotConnected } from "./OnlineHome";

/** The street table: ranked players by Elo rating. */
export function RankingsScreen({ go }: { go: (r: string) => void }) {
  const [rows, setRows] = useState<RankRow[] | null>(null);
  const [total, setTotal] = useState(0);
  const [me, setMe] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(() => {
    setError(null);
    api.leaderboard(50).then((r) => (setRows(r.rows), setTotal(r.total)), (e: Error) => setError(e.message));
    api.me().then(setMe, () => {});
  }, []);
  useEffect(() => {
    if (serverUrl()) load();
  }, [load]);
  if (!serverUrl()) return <NotConnected onBack={() => go("home")} />;
  return (
    <div className="screen rankings" data-testid="rankings">
      <p className="kicker">Street table</p>
      <h2>Rankings</h2>
      <div className="join-table">
        {me?.rank ? (
          <span>
            You are <b>#{me.rank}</b> with a rating of <b>{me.rating}</b> ({me.wins}W {me.draws}D {me.losses}L).
          </span>
        ) : (
          <span>
            <b>Join the table:</b> finish a Ranked match to earn your place. Everyone starts on 1000.
          </span>
        )}
      </div>
      {error && <p className="error">{error}</p>}
      {rows && rows.length === 0 && <p className="muted">Nobody has played a ranked match yet. Be the first.</p>}
      {rows && rows.length > 0 && (
        <table className="rank-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Record</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className={r.id === me?.id ? "me" : ""}>
                <td>{r.rank}</td>
                <td>{r.name}</td>
                <td>
                  {r.wins}W {r.draws}D {r.losses}L
                </td>
                <td>
                  <b>{r.rating}</b>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {total > (rows?.length ?? 0) && <p className="muted">Showing the top {rows?.length} of {total}.</p>}
      <div className="btns">
        <button onClick={load}>Refresh</button>
        <button className="primary" onClick={() => go("online/queue/ranked")}>
          Play ranked
        </button>
        <button onClick={() => go("online")}>Back</button>
      </div>
    </div>
  );
}
