import { useContext } from "react";

import { BitaxeHeroStatsContext } from "../_contexts";

const buildUptimeDisplay = (uptimeSeconds: number) => {
  if (uptimeSeconds < 60) {
    // Seconds
    return uptimeSeconds.toString() + "s";
  } else if (uptimeSeconds < 60 * 60) {
    // Minutes
    const m = Math.floor(uptimeSeconds / 60);
    const s = uptimeSeconds - m * 60;
    return m.toFixed(0) + "min, " + s.toString() + "s";
  } else if (uptimeSeconds < 60 * 60 * 24) {
    // Hours
    const h = Math.floor(uptimeSeconds / 3600);
    const m = Math.floor((uptimeSeconds - h * 3600) / 60);
    const s = uptimeSeconds - h * 3600 - m * 60;
    return h.toString() + "hr, " + m.toString() + "min, " + s + "s";
  }
  // Days
  return uptimeSeconds.toString() + " but in days";
};

const BitaxeHeroStats = () => {
  const bitaxeHeroStats = useContext(BitaxeHeroStatsContext);
  const uptimeDisplay = bitaxeHeroStats.uptimeSeconds
    ? buildUptimeDisplay(bitaxeHeroStats.uptimeSeconds)
    : "Loading...";
  console.log(bitaxeHeroStats);

  return (
    <>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" name="bitaxe-hero-stats" />
        <div className="collapse-title text-xl font-medium">
          Bitaxe Hero Stats
        </div>
        <div className="collapse-content">
          <table className="table text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>All time best diff</th>
                <th>Best diff since boot</th>
                <th>Uptime (min)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{bitaxeHeroStats.stratumUser}</td>
                <td>{bitaxeHeroStats.bestDiff}</td>
                <td>{bitaxeHeroStats.bestSessionDiff}</td>
                <td>{uptimeDisplay}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BitaxeHeroStats;
