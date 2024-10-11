"use client";

import { useState, useEffect } from "react";
import DrawerMenu from "./DrawerMenu";
import { ChartSelectionContext } from "../_contexts/ChartSelectionContext";

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
      <div
        className="flex flex-col items-center h-dvh w-full"
        data-theme={theme}
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

            {/* TITLE */}
            <div className="flex justify-center pt-10">
              <h1 className="text-2xl">Bitaxe Stat Plotter</h1>
            </div>

            {/* MAIN PAGE */}
            <main className="flex flex-col items-center h-full w-full">
              {/* TODO: Store chart selections in local storage and read them back in as defaults */}
              <ChartSelectionContext.Provider value={selectedCharts}>
                {children}
              </ChartSelectionContext.Provider>
            </main>
          </div>

          {/* CONFIGURATIONS */}
          <DrawerMenu
            handleChartSelect={handleChartSelect}
            selectedTheme={theme}
            selectNewTheme={selectNewTheme}
          />
        </div>
      </div>
    </>
  );
};

export default App;
