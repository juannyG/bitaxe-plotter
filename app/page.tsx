"use client";
import { useState, useEffect, useContext } from "react";

import { ChartSelectionContext, PollingContext } from "./_contexts";
import type { ChartData } from "./_components/BitaxeLineChart";
import {
  TEMP_KEY,
  HASH_RATE_KEY,
  POWER_KEY,
  CHART_LABEL_MAP,
} from "./_constants";
import ChartView from "./_components/ChartView";

export default function Home() {
  const { selectedCharts } = useContext(ChartSelectionContext);
  const { pollingEnabled } = useContext(PollingContext);

  const [data, setData] = useState<ChartData>({
    labels: [],
    bitaxeData: { [TEMP_KEY]: [], [HASH_RATE_KEY]: [], [POWER_KEY]: [] },
  });

  const getSystemInfo = async (pollingEnabled: boolean) => {
    if (!pollingEnabled) {
      return;
    }

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
    getSystemInfo(pollingEnabled);

    // TODO: Configurable refresh rate
    const interval = setInterval(() => {
      getSystemInfo(pollingEnabled);
    }, 5000);

    return () => clearInterval(interval);
  }, [pollingEnabled]);

  return (
    <div className="w-4/5 pt-5">
        {selectedCharts.length ? (
          <ChartView data={data} />
        ) : (
          <div className="flex justify-center col-span-2">
            Please select a chart to view.
          </div>
        )}
      </div>
  );
}
