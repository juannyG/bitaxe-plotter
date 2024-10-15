"use client";

import { useState, useEffect } from "react";

import {
  ChartSelectionContext,
  PollingContext,
  BitaxeChartDataContext,
  BitaxeHeroStatsContext,
} from "../_contexts";
import { TBitaxeHeroStats, TChartData } from "../_types";
import {
  TEMP_KEY,
  HASH_RATE_KEY,
  POWER_KEY,
  EFFICIENCY_KEY,
} from "../_constants";
import DrawerMenu from "./DrawerMenu";
import BTCNetworkStats from "./BTCNetworkStats";
import BitaxeHeroStats from "./BitaxeHeroStats";
import getSystemInfo from "./_utils/getSystemInfo";

const App = ({ children }: { children: React.ReactNode }) => {
  /* Setup theme conf so ThemeSelector in Drawer can communicate with `data-theme` element here */
  const [theme, setTheme] = useState("");
  useEffect(() => {
    const t = window.localStorage.getItem("theme");
    setTheme(t || "dracula");
  }, []);

  const selectNewTheme = (checked: boolean) => {
    const theme = checked ? "dracula" : "light";
    window.localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  /* Setup chart conf so ChartSelector in Drawer can communicate with Charts in {children} under <main> */
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);
  const [pollingEnabled, setPollingEnabled] = useState<boolean>(true);
  const [bitaxeHeroStats, setBitaxeHeroStats] = useState<TBitaxeHeroStats>({
    bestDiff: "",
    bestSessionDiff: "",
    stratumUser: "",
    wifiStatus: "",
    sharesAccepted: 0,
    sharesRejected: 0,
    uptimeSeconds: 0,
  });
  const [chartData, setChartData] = useState<TChartData>({
    labels: [],
    bitaxeData: {
      [TEMP_KEY]: [],
      [HASH_RATE_KEY]: [],
      [POWER_KEY]: [],
      [EFFICIENCY_KEY]: [],
    },
  });

  useEffect(() => {
    getSystemInfo(pollingEnabled, setChartData, setBitaxeHeroStats);

    // TODO: Configurable refresh rate
    const interval = setInterval(() => {
      getSystemInfo(pollingEnabled, setChartData, setBitaxeHeroStats);
    }, 5000);

    return () => clearInterval(interval);
  }, [pollingEnabled]);

  return (
    <>
      <div
        className="flex flex-col items-center h-dvh w-full"
        data-theme={theme}
      >
        {/* TODO: Store chart selections in local storage and read them back in as defaults */}
        <ChartSelectionContext.Provider
          value={{ selectedCharts, setSelectedCharts }}
        >
          <div className="drawer" data-theme={theme}>
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="drawer-button">
                <div className="visible h-dvh fixed border-r p-5 drawer-button cursor-pointer border-neutral-800">
                  {">>"}
                </div>
              </label>

              <BitaxeChartDataContext.Provider
                value={{ chartData, setChartData }}
              >
                <div className="flex items-center justify-center">
                  <div className="grid">
                    <div className="relative">
                      {/* BTC NETWORK HERO STATS */}
                      <div className="flex justify-center pt-5 w-full">
                        <BTCNetworkStats />
                      </div>

                      <div className="flex justify-center pt-5 w-full">
                        <BitaxeHeroStatsContext.Provider
                          value={bitaxeHeroStats}
                        >
                          <BitaxeHeroStats />
                        </BitaxeHeroStatsContext.Provider>
                      </div>
                    </div>
                  </div>
                </div>
                {/* TITLE */}
                <div className="flex justify-center pt-5">
                  <h1 className="text-2xl">Bitaxe Stat Plotter</h1>
                </div>

                {/* MAIN CONTENT */}
                <main className="flex flex-col items-center w-full">
                  <PollingContext.Provider
                    value={{ pollingEnabled, setPollingEnabled }}
                  >
                    {children}
                  </PollingContext.Provider>
                </main>
              </BitaxeChartDataContext.Provider>
            </div>

            {/* CONFIGURATIONS */}
            <DrawerMenu selectedTheme={theme} selectNewTheme={selectNewTheme} />
          </div>
        </ChartSelectionContext.Provider>
      </div>
    </>
  );
};

export default App;
