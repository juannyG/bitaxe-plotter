import { useContext } from "react";

import { BitaxeHeroStatsContext } from "../_contexts";

import HeroStatCell from "./HeroStatCell";
import HeroStatTitle from "./HeroStatTitle";

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
    : "";

  return (
    <div className="flex self-stretch justify-center items-center">
      <div>
        <HeroStatTitle title="Bitaxe Hero Stats" />
        <div className="stats shadow">
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
