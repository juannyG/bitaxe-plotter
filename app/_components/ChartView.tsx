import { useContext } from "react";

import { CHART_LABEL_MAP } from "../_constants";
import { ChartSelectionContext } from "../_contexts";
import BitaxeLineChart from "./BitaxeLineChart";
import { TChartData } from "../_types";

const ChartView = ({ data }: { data: TChartData }) => {
  const { selectedCharts } = useContext(ChartSelectionContext);

  return (
    <div className="grid auto-cols-min grid-cols-1 lg:grid-cols-2 pl-10">
      {selectedCharts.map((c, i) => {
        return (
          <div key={i} className="relative md:min-h-96">
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
