import BTCNetworkStats from "./BTCNetworkStats";

const HeroStatsContainer = () => {
  return (
    <div className="flex items-center justify-center pt-5">
      <div className="grid grid-cols-1">
        <BTCNetworkStats />
      </div>
    </div>
  );
};
export default HeroStatsContainer;
