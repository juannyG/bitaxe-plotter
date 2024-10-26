import { useContext } from "react";

import { BitaxeHeroStatsContext } from "../_contexts";

import HeroStatCell from "./HeroStatCell";
import HeroStatTitle from "./HeroStatTitle";

const buildUptimeDisplay = (uptimeSeconds: number) => {
  const day = 86400;
  const hour = 3600;
  const minute = 60;

  if (uptimeSeconds < minute) {
    // Seconds
    return uptimeSeconds.toString() + "s";
  } else if (uptimeSeconds < hour) {
    // Minutes
    const m = Math.floor(uptimeSeconds / minute);
    const s = uptimeSeconds - m * minute;
    return m.toFixed(0) + "min, " + s.toString() + "s";
  } else if (uptimeSeconds < day) {
    // Hours
    const h = Math.floor(uptimeSeconds / hour);
    const m = Math.floor((uptimeSeconds - h * hour) / minute);
    const s = uptimeSeconds - h * hour - m * minute;
    return h.toString() + "hr, " + m.toString() + "min, " + s + "s";
  }
  // Days
  const d = Math.floor(uptimeSeconds / day);
  const h = Math.floor((uptimeSeconds - d * day) / hour);
  const m = Math.floor((uptimeSeconds - d * day - h * hour) / minute);
  const s = uptimeSeconds - d * day - h * hour - m * minute;
  return d.toString() + "d, " + h + "hr, " + m + "min, " + s + "s";
};

const BitaxeHeroStats = () => {
  const bitaxeHeroStats = useContext(BitaxeHeroStatsContext);
  const uptimeDisplay = bitaxeHeroStats.uptimeSeconds
    ? buildUptimeDisplay(bitaxeHeroStats.uptimeSeconds)
    : "";

  return (
    <div className="flex self-stretch justify-center items-center">
      <div>
        <HeroStatTitle title="Bitaxe Hero Stats" />
        <div className="stats stats-vertical lg:stats-horizontal shadow">
          <HeroStatCell title="Name" value={bitaxeHeroStats.stratumUser} />
          <HeroStatCell title="Best diff" value={bitaxeHeroStats.bestDiff} />
          <HeroStatCell
            title="Best session diff"
            value={bitaxeHeroStats.bestSessionDiff}
          />
          <HeroStatCell title="Uptime" value={uptimeDisplay} />
        </div>
      </div>
    </div>
  );
};

export default BitaxeHeroStats;
