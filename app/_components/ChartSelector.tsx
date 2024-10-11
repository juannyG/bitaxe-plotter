"use client";

import { Dispatch, SetStateAction } from "react";

const ChartSelector = ({
  selectedCharts,
  setSelectedCharts,
}: {
  selectedCharts: string[];
  setSelectedCharts: Dispatch<SetStateAction<string[]>>;
}) => {
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target as HTMLInputElement;
    if (checked === true) {
      setSelectedCharts([...selectedCharts, value].sort());
    } else {
      setSelectedCharts(selectedCharts.filter((c) => c !== value).sort());
    }
  };

  const chartCBMap = {
    temp: "Temp",
    hashRate: "Hash rate",
    power: "Power",
  };

  return (
    <div>
      <div className="flex justify-center">
        Please select which graphs you'd like to see:
      </div>
      <div className="flex justify-center pb-10">
        {Object.keys(chartCBMap)
          .sort()
          .map((c, i) => (
            <label className="label cursor-pointer" key={i}>
              <span className="label-text pr-2">
                {chartCBMap[c as keyof typeof chartCBMap]}
              </span>
              <input
                key={i}
                type="checkbox"
                className="checkbox"
                name="chartDisplay"
                value={c}
                onChange={(e) => handleSelect(e)}
              />
            </label>
          ))}
        <label className="label cursor-pointer">
          <span className="label-text pr-2">Probability:</span>
          <input
            type="checkbox"
            className="checkbox"
            name="chartDisplay"
            value=""
            onChange={(e) => console.log(e)}
          />
        </label>
      </div>
    </div>
  );
};

export default ChartSelector;
