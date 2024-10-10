"use client";
import Chart from "chart.js/auto";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";

import type { ChartData } from "./_components/BitaxeLineChart";
import BitaxeLineChart from "./_components/BitaxeLineChart";

Chart.register(CategoryScale);

export default function Home() {
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
          let newData = {
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

  return (
    <div className="grid grid-cols-2 gap-4 w-4/5">
      <div className="">
        <BitaxeLineChart data={data} target="temp" label="Temperature (C)" />
      </div>
      <div className="">
        <BitaxeLineChart
          data={data}
          target="hashRate"
          label="Hashrate (TH/s)"
        />
      </div>
      <div className="">
        <BitaxeLineChart
          data={data}
          target="power"
          label="Power (Watts)"
        />
      </div>
    </div>
  );
}
