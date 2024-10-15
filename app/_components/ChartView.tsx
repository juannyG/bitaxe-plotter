import { useContext } from "react";

import { CHART_LABEL_MAP } from "../_constants";
import { ChartSelectionContext } from "../_contexts";
import BitaxeLineChart from "./BitaxeLineChart";
import { TChartData } from "../_types";

const ChartView = ({ data }: { data: TChartData }) => {
  const { selectedCharts } = useContext(ChartSelectionContext);

  return (
    <div className="grid auto-cols-max grid-cols-2">
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
