import { useEffect, useState } from "react";
import { api, serverUrl, type Profile } from "../net/client";
import { loadSettings, saveSettings, type Quality, type Settings, type TimeOfDay } from "../settings/settings";

export function SettingsScreen({ onBack }: { onBack: () => void }) {
  const [s, setS] = useState<Settings>(loadSettings);
  const change = (p: Partial<Settings>) => {
    const n = { ...s, ...p };
    setS(n);
    saveSettings(n);
  };
  return (
    <div className="screen">
      <h2>Settings</h2>
      <div className="options">
        <label>
          Graphics quality
          <select aria-label="Graphics quality" value={s.quality} onChange={(e) => change({ quality: e.target.value as Quality })}>
            <option value="low">Low — no shadow maps, 1x resolution, fewer spectators</option>
            <option value="medium">Medium — shadows, up to 1.5x resolution</option>
            <option value="high">High — soft shadows, up to 2x resolution, full crowd</option>
          </select>
        </label>
        <label>
          Practice time of day
          <select aria-label="Time of day" value={s.timeOfDay} onChange={(e) => change({ timeOfDay: e.target.value as TimeOfDay })}>
            <option value="day">Day</option>
            <option value="evening">Evening (floodlights)</option>
          </select>
        </label>
      </div>
      <h3>Sound</h3>
      <div className="options">
        {(
          [
            ["masterVolume", "Master volume"],
            ["sfxVolume", "Ball and effects"],
            ["crowdVolume", "Crowd and street"],
          ] as const
        ).map(([k, label]) => (
          <label key={k}>
            {label} {Math.round(s[k] * 100)}%
            <input aria-label={label} type="range" min={0} max={1} step={0.05} value={s[k]} onChange={(e) => change({ [k]: +e.target.value })} />
          </label>
        ))}
        <label>
          Mute
          <input aria-label="Mute" type="checkbox" checked={s.muted} onChange={(e) => change({ muted: e.target.checked })} />
        </label>
      </div>
      <p className="muted">
        Sound effects: Kenney Impact Sounds (CC0). Whistle, crowd and street ambience are synthesised in the game; there is no
        music or commentary. Settings are saved on this device.
      </p>
      <OnlineSettings />
      <div className="btns">
        <button className="primary" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}

/** Online name and whether others may watch your matches (only when online play is connected). */
function OnlineSettings() {
  const [p, setP] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (serverUrl()) api.me().then((x) => (setP(x), setName(x.name)), (e: Error) => setError(e.message));
  }, []);
  if (!serverUrl()) return null;
  const update = async (u: { name?: string; allowWatch?: boolean }) => {
    try {
      const x = await api.updateMe(u);
      setP(x);
      setName(x.name);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  };
  return (
    <>
      <h3>Online</h3>
      {error && <p className="error">{error}</p>}
      {p && (
        <>
          <label>
            Name{" "}
            <input aria-label="Online name" value={name} maxLength={16} onChange={(e) => setName(e.target.value)} onBlur={() => name !== p.name && void update({ name })} />
          </label>
          <label className="check">
            <input type="checkbox" checked={p.allowWatch} onChange={(e) => void update({ allowWatch: e.target.checked })} /> Let others watch my online matches
          </label>
        </>
      )}
    </>
  );
}
