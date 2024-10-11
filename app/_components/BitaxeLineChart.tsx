"use client";
import Chart from "chart.js/auto";

import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";

import { TEMP_KEY, HASH_RATE_KEY, POWER_KEY } from "../_constants";

Chart.register(CategoryScale);

export type BitaxeData = {
  [TEMP_KEY]: number[];
  [HASH_RATE_KEY]: number[];
  [POWER_KEY]: number[];
};

export type ChartData = {
  labels: string[];
  bitaxeData: BitaxeData;
};

const BitaxeLineChart = ({
  data,
  target,
  label,
}: {
  data: ChartData;
  target: keyof typeof data.bitaxeData;
  label: string;
}) => {
  return (
    <Line
      data={{
        labels: data.labels,
        datasets: [
          {
            label: label,
            data: data.bitaxeData[target],
          },
        ],
      }}
      options={{
        scales: {
          x: {
            ticks: {
              callback: function (val, index) {
                return index % 5 === 0
                  ? this.getLabelForValue(Number(val))
                  : "";
              },
            },
          },
        },
      }}
    />
  );
};

export default BitaxeLineChart;
