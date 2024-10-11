"use client";
import { useState, useEffect } from "react";

import type { ChartData } from "./_components/BitaxeLineChart";
import BitaxeLineChart from "./_components/BitaxeLineChart";
import ChartSelector from "./_components/ChartSelector";

export default function Home() {
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);
  const [data, setData] = useState<ChartData>({
    labels: [],
    bitaxeData: { temp: [], hashRate: [], power: [] },
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

  const chartNameMap = {
    temp: "Temperature (C)",
    hashRate: "Hash Rate (TH/s)",
    power: "Power (W)",
  };

  // TODO: Need a way to have a "settings" component for configurations which feeds back into charts, etc
  // TODO: Add a way to turn off polling for updates
  return (
    <div className="w-4/5 pt-5">
      <ChartSelector
        selectedCharts={selectedCharts}
        setSelectedCharts={setSelectedCharts}
      />

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
                label={chartNameMap[c as keyof typeof data.bitaxeData]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
