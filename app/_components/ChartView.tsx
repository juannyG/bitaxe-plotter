import { useContext } from "react";

import { CHART_LABEL_MAP } from "../_constants";
import { ChartSelectionContext, PollingContext } from "../_contexts";
import BitaxeLineChart from "./BitaxeLineChart";
import { TChartData } from "../_types";

const ChartView = ({ data }: { data: TChartData }) => {
  const { selectedCharts } = useContext(ChartSelectionContext);
  const { pollingEnabled, setPollingEnabled } = useContext(PollingContext);

  return (
    <div className="grid auto-cols-max grid-cols-2">
      <div className="flex col-span-2 justify-center">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text pr-2">Enable Polling</span>
            <input
              type="checkbox"
              className="toggle"
              checked={pollingEnabled}
              onChange={() => setPollingEnabled(!pollingEnabled)}
            />
          </label>
        </div>
      </div>

      {selectedCharts.map((c, i) => {
        const useColSpan = i % 2 === 0 && i === selectedCharts.length - 1;
        // Don't use a completely random key...
        const key = useColSpan ? i + 1 * 10 : i;
        return (
          <div key={key} className={useColSpan ? "col-span-2" : ""}>
            <BitaxeLineChart
              data={data}
              target={c as keyof typeof data.bitaxeData}
              label={CHART_LABEL_MAP[c as keyof typeof CHART_LABEL_MAP]}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChartView;
