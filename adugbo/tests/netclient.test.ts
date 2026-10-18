import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// A fake browser for the room socket: storage with a guest pass and a server address, and a WebSocket we can drop.
class FakeSocket {
  static made: FakeSocket[] = [];
  readyState = 0;
  onopen: (() => void) | null = null;
  onmessage: ((e: { data: string }) => void) | null = null;
  onclose: ((e: { code: number }) => void) | null = null;
  constructor(readonly url: string) {
    FakeSocket.made.push(this);
  }
  send() {}
  close(code = 1000) {
    this.readyState = 3;
    this.onclose?.({ code });
  }
  /** The network drops the connection. */
  drop() {
    this.readyState = 3;
    this.onclose?.({ code: 1006 });
  }
}

beforeEach(() => {
  FakeSocket.made = [];
  const mem = new Map<string, string>([
    ["adugbo.server", "http://server.test"],
    ["adugbo.guest", JSON.stringify({ id: "g_1", token: "ab" })],
  ]);
  vi.stubGlobal("localStorage", { getItem: (k: string) => mem.get(k) ?? null, setItem: (k: string, v: string) => void mem.set(k, v), removeItem: (k: string) => void mem.delete(k) });
  vi.stubGlobal("location", { search: "" });
  vi.stubGlobal("WebSocket", Object.assign(FakeSocket, { OPEN: 1 }));
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("room socket", () => {
  it("reconnects after a dropped connection", async () => {
    const { RoomLink } = await import("../src/net/client");
    const link = new RoomLink("ABCDE", "player");
    await link.connect();
    expect(FakeSocket.made).toHaveLength(1);
    FakeSocket.made[0].drop();
    await vi.advanceTimersByTimeAsync(5000);
    expect(FakeSocket.made).toHaveLength(2);
    link.close();
  });

  it("leaving during the reconnect wait cancels it: the seat is not taken back", async () => {
    const { RoomLink } = await import("../src/net/client");
    const link = new RoomLink("ABCDE", "player");
    await link.connect();
    FakeSocket.made[0].drop();
    link.close(); // the player leaves the room screen while the retry is pending
    await vi.advanceTimersByTimeAsync(60_000);
    expect(FakeSocket.made).toHaveLength(1);
  });
});
