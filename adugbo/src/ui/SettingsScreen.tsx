import { useState } from "react";
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
      <p className="muted">Settings are saved on this device.</p>
      <div className="btns">
        <button className="primary" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}
