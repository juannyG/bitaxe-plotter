"use client";
import { useState, useEffect, useContext } from "react";

import { ChartSelectionContext } from "./_contexts/ChartSelectionContext";
import type { ChartData } from "./_components/BitaxeLineChart";
import BitaxeLineChart from "./_components/BitaxeLineChart";
import {
  TEMP_KEY,
  HASH_RATE_KEY,
  POWER_KEY,
  CHART_LABEL_MAP,
} from "./_constants";

export default function Home() {
  const selectedCharts = useContext(ChartSelectionContext);
  const [data, setData] = useState<ChartData>({
    labels: [],
    bitaxeData: { [TEMP_KEY]: [], [HASH_RATE_KEY]: [], [POWER_KEY]: [] },
  });

  const getSystemInfo = async () => {
    // TODO: User inputs address of bitaxe(s)
    fetch("http://10.0.0.244/api/system/info")
      .then((r) => r.json())
      .then((j) => {
        setData((oldData) => {
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

  useEffect(() => {
    getSystemInfo();

    // TODO: Configurable refresh rate
    const interval = setInterval(() => {
      getSystemInfo();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // TODO: Add a way to turn off polling for updates
  return (
    <div className="w-4/5 pt-5">
      <div className="grid auto-cols-max grid-cols-2">
        {selectedCharts.length ? (
          selectedCharts.map((c, i) => {
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
          })
        ) : (
          <div className="flex justify-center col-span-2">
            Please select a chart to view.
          </div>
        )}
      </div>
    </div>
  );
}
