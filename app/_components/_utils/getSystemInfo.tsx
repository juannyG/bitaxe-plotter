import { TChartData, TBitaxeHeroStats } from "@/app/_types";

const getSystemInfo = async (
  pollingEnabled: boolean,
  setChartData: React.Dispatch<React.SetStateAction<TChartData>>,
  setBitaxeHeroStats: React.Dispatch<React.SetStateAction<TBitaxeHeroStats>>,
) => {
  if (!pollingEnabled) {
    return;
  }
  // TODO: User inputs address of bitaxe(s)
  fetch("http://10.0.0.244/api/system/info")
    .then((r) => r.json())
    .then((j) => {
      setBitaxeHeroStats({
        bestDiff: j.bestDiff,
        bestSessionDiff: j.bestSessionDiff,
        stratumUser: j.stratumUser,
        wifiStatus: j.wifiStatus,
        uptimeSeconds: j.uptimeSeconds,
      });
      setChartData((oldData: TChartData) => {
        const now = new Date();
        const newData = {
          labels: [...oldData.labels, now.toLocaleString("en-US")],
          bitaxeData: {
            temp: [...oldData.bitaxeData.temp, j.temp],
            hashRate: [...oldData.bitaxeData.hashRate, j.hashRate / 1000],
            power: [...oldData.bitaxeData.power, j.power],
          },
        };
        return newData;
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export default getSystemInfo;
