import { lazy, Suspense, useEffect, useState } from "react";
import { Home } from "./ui/Home";
import { MatchSetup } from "./ui/MatchSetup";
import { Credits } from "./ui/Credits";
import { RotateGate } from "./ui/RotateGate";

// the 3D screens pull in three.js and Rapier (several MB): load them only when needed
const PlayerLab = lazy(() => import("./ui/PlayerLab").then((m) => ({ default: m.PlayerLab })));
const PracticeScreen = lazy(() => import("./ui/PracticeScreen").then((m) => ({ default: m.PracticeScreen })));
const RoomScreen = lazy(() => import("./ui/online/RoomScreen").then((m) => ({ default: m.RoomScreen })));
const PenaltyScreen = lazy(() => import("./ui/PenaltyScreen").then((m) => ({ default: m.PenaltyScreen })));
const BallDesigner = lazy(() => import("./ui/BallDesigner").then((m) => ({ default: m.BallDesigner })));
const MatchScreen = lazy(() => import("./ui/MatchScreen").then((m) => ({ default: m.MatchScreen })));
import { HowToPlay } from "./ui/HowToPlay";
import { SettingsScreen } from "./ui/SettingsScreen";
import type { MatchConfig } from "./game/match/rules";
import { OnlineHome } from "./ui/online/OnlineHome";
import { QueueScreen } from "./ui/online/QueueScreen";
import { RankingsScreen } from "./ui/online/RankingsScreen";
import { WatchScreen } from "./ui/online/WatchScreen";
import { TrainingMenu } from "./ui/TrainingMenu";

const routeOf = () => location.hash.replace(/^#\/?/, "") || "home";

export default function App() {
  const [route, setRoute] = useState(routeOf);
  const [match, setMatch] = useState<{ cfg: MatchConfig; n: number } | null>(null);
  useEffect(() => {
    const on = () => setRoute(routeOf());
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  const go = (r: string) => {
    location.hash = r === "home" ? "" : `/${r}`;
  };
  return (
    <>
      <Suspense fallback={<div className="loading">Loading…</div>}>{screen()}</Suspense>
      <RotateGate />
    </>
  );

  function screen() {
    const room = route.match(/^(online\/room|watch)\/([A-Z0-9]{5})$/);
    if (room) return <RoomScreen key={route} code={room[2]} spectate={room[1] === "watch"} go={go} />;
    const queue = route.match(/^online\/queue\/(quick|ranked)$/);
    if (queue) return <QueueScreen key={route} mode={queue[1] as "quick" | "ranked"} go={go} />;
    switch (route) {
    case "penalties":
      return <PenaltyScreen key="shootout" mode="shootout" go={go} />;
    case "training":
      return <TrainingMenu go={go} />;
    case "training/penalties":
      return <PenaltyScreen key="practice" mode="practice" go={go} />;
    case "ball":
      return <BallDesigner go={go} />;
    case "online":
      return <OnlineHome go={go} />;
    case "rankings":
      return <RankingsScreen go={go} />;
    case "watch":
      return <WatchScreen go={go} />;
    case "lab":
      return <PlayerLab />;
    case "practice":
      return <PracticeScreen onExit={() => go("home")} />;
    case "play":
      return (
        <MatchSetup
          onBack={() => go("home")}
          onStart={(cfg) => {
            setMatch({ cfg, n: 0 });
            go("match");
          }}
        />
      );
    case "match":
      // a reload loses the in-memory setup: go back to it rather than show an empty match
      if (!match) {
        queueMicrotask(() => go("play"));
        return null;
      }
      return <MatchScreen key={match.n} config={match.cfg} onExit={() => go("home")} onReplay={() => setMatch({ cfg: match.cfg, n: match.n + 1 })} />;
    case "howto":
      return <HowToPlay onBack={() => go("home")} />;
    case "credits":
      return <Credits onBack={() => go("home")} />;
    case "settings":
      return <SettingsScreen onBack={() => go("home")} />;
    default:
      return <Home go={go} />;
    }
  }
}
