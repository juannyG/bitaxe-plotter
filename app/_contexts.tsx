import { createContext } from "react";

import {
  TEMP_KEY,
  HASH_RATE_KEY,
  POWER_KEY,
  FANRPM_KEY,
} from "./_constants";
import { TBitaxeHeroStats, TChartData } from "./_types";

interface IChartSelection {
  selectedCharts: string[];
  setSelectedCharts: React.Dispatch<React.SetStateAction<string[]>>;
}
export const ChartSelectionContext = createContext<IChartSelection>({
  selectedCharts: [],
  setSelectedCharts: () => {},
});

interface IPolling {
  pollingEnabled: boolean;
  setPollingEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PollingContext = createContext<IPolling>({
  pollingEnabled: true,
  setPollingEnabled: () => {},
});

interface IBitaxeChartData {
  chartData: TChartData;
  setChartData: React.Dispatch<React.SetStateAction<TChartData>>;
}
export const BitaxeChartDataContext = createContext<IBitaxeChartData>({
  chartData: {
    labels: [],
    bitaxeData: {
      [TEMP_KEY]: [],
      [HASH_RATE_KEY]: [],
      [POWER_KEY]: [],
      [FANRPM_KEY]: [],
    },
  },
  setChartData: () => {},
});

export const BitaxeHeroStatsContext = createContext<TBitaxeHeroStats>({
  bestDiff: "",
  bestSessionDiff: "",
  stratumUser: "",
  wifiStatus: "",
  uptimeSeconds: 0,
});
