import { createContext } from "react";

interface IChartSelection {
  selectedCharts: string[];
  setSelectedCharts: Function;
}
export const ChartSelectionContext = createContext<IChartSelection>({
  selectedCharts: [],
  setSelectedCharts: () => {},
});

interface IPolling {
  pollingEnabled: boolean;
  setPollingEnabled: Function;
}
export const PollingContext = createContext<IPolling>({
  pollingEnabled: true,
  setPollingEnabled: () => {},
});
