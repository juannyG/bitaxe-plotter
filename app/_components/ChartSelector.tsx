"use client";

import { useContext } from "react";

import { ChartSelectionContext } from "../_contexts";
import { AVAILABLE_CHART_KEYS, LABEL_MAP } from "../_constants";

const ChartSelector = () => {
  const { selectedCharts, setSelectedCharts } = useContext(ChartSelectionContext);
  const handleChartSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target as HTMLInputElement;
    if (checked === true) {
      setSelectedCharts([...selectedCharts, value].sort());
    } else {
      setSelectedCharts(selectedCharts.filter((c) => c !== value).sort());
    }
  };

  return (
    <>
      {AVAILABLE_CHART_KEYS.map((k, i) => (
        <label className="label cursor-default" key={i}>
          <span className="label-text">
            {LABEL_MAP[k as keyof typeof LABEL_MAP]}
          </span>
          <input
            type="checkbox"
            className="checkbox"
            value={k}
            onChange={(e) => handleChartSelect(e)}
          />
        </label>
      ))}

      {/* COMING SOON */}
      <label className="label cursor-default">
        <span className="label-text">Probability</span>
        <input type="checkbox" value="probability" className="checkbox" />
      </label>
    </>
  );
};

export default ChartSelector;
