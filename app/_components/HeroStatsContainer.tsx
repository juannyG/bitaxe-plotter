import BTCNetworkStats from "./BTCNetworkStats";
import BitaxeHeroStats from "./BitaxeHeroStats";

const HeroStatsContainer = () => {
  return (
    <div className="flex items-center justify-center pt-5">
      <div className="grid grid-cols-2">
          <BTCNetworkStats />
          <BitaxeHeroStats />
        </div>
    </div>
  );
};
export default HeroStatsContainer;
