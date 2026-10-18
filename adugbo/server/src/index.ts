// ADUGBO online server (Cloudflare Worker). The football itself runs in the players' browsers; this routes requests to
// two kinds of Durable Object:
//   Lobby (one instance): guest identities, the rankings table, matchmaking queues and the list of live matches.
//   Room  (one per match code): the two players' and the spectators' sockets; relays inputs and snapshots.
import { isRoomCode } from "../../src/net/protocol";
import { Lobby } from "./lobby";
import { Room } from "./room";

export { Lobby, Room };

export interface Env {
  LOBBY: DurableObjectNamespace;
  ROOM: DurableObjectNamespace;
}

export const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, OPTIONS",
  "access-control-allow-headers": "content-type, authorization",
};

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", ...CORS } });
}

export const lobbyOf = (env: Env) => env.LOBBY.get(env.LOBBY.idFromName("main"));
export const roomOf = (env: Env, code: string) => env.ROOM.get(env.ROOM.idFromName(code));

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
    const path = url.pathname;
    if (path === "/api/health") return json({ ok: true });

    // the lobby answers identity, rankings, live list, room creation and matchmaking
    if (/^\/api\/(guest|me|leaderboard|live|live\/count|rooms|queue)$/.test(path)) return lobbyOf(env).fetch(req);

    // a room socket: check who is connecting with the lobby, then hand the socket to the room
    const m = path.match(/^\/api\/room\/([A-Z0-9]+)$/);
    if (m) {
      const code = m[1];
      if (!isRoomCode(code)) return json({ error: "bad_code", message: "That is not a room code." }, 400);
      if (req.headers.get("upgrade") !== "websocket") return json({ error: "expected_websocket" }, 426);
      const auth = await lobbyOf(env).fetch(`https://lobby/internal/auth?id=${encodeURIComponent(url.searchParams.get("id") ?? "")}&token=${encodeURIComponent(url.searchParams.get("token") ?? "")}`);
      if (!auth.ok) return json({ error: "unauthorised", message: "Sign in again: your guest pass was not recognised." }, 401);
      const headers = new Headers(req.headers);
      headers.set("x-player", await auth.text());
      headers.set("x-code", code);
      return roomOf(env, code).fetch(new Request(req.url, { headers }));
    }
    return json({ error: "not_found" }, 404);
  },
};
