"use client";

import { useState, useEffect } from "react";
import DrawerMenu from "./DrawerMenu";
import { ChartSelectionContext, PollingContext } from "../_contexts";
import BTCNetworkStats from "./BTCNetworkStats";

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
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="drawer-button">
                <div className="visible h-dvh fixed border-r p-5 drawer-button cursor-pointer border-neutral-800">
                  {">>"}
                </div>
              </label>

              {/* BTC NETWORK STATS */}
              <div className="flex justify-center pt-5 w-full">
                <BTCNetworkStats />
              </div>

              {/* TITLE */}
              <div className="flex justify-center pt-5">
                <h1 className="text-2xl">Bitaxe Stat Plotter</h1>
              </div>

              {/* MAIN CONTENT */}
              <main className="flex flex-col items-center h-full w-full">
                <PollingContext.Provider
                  value={{ pollingEnabled, setPollingEnabled }}
                >
                  {children}
                </PollingContext.Provider>
              </main>
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
