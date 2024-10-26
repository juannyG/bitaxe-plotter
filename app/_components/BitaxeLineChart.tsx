"use client";
import Chart from "chart.js/auto";

import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";

import { TChartData } from "../_types";

Chart.register(CategoryScale);

const BitaxeLineChart = ({
  data,
  target,
  label,
}: {
  data: TChartData;
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
        maintainAspectRatio: false,
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
        elements: {
          point: {
            radius: 2
          }
        }
      }}
    />
  );
};

export default BitaxeLineChart;
