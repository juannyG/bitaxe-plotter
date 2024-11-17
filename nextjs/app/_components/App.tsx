"use client";

import { useState, useEffect } from "react";

import DrawerMenu from "./DrawerMenu";
import HeroStatsContainer from "./HeroStatsContainer";

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
  return (
    <>
      <div
        className="flex flex-col items-center h-dvh w-full"
        data-theme={theme}
      >
        {/* TODO: Store chart selections in local storage and read them back in as defaults */}
        <div className="drawer" data-theme={theme}>
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="drawer-button">
              <div className="visible h-dvh fixed border-r p-5 drawer-button cursor-pointer border-neutral-800">
                {">>"}
              </div>
            </label>

            {/* TITLE */}
            <div className="flex justify-center pt-5">
              <h1 className="text-2xl">Miner Stats</h1>
            </div>

            <HeroStatsContainer />

            {/* MAIN CONTENT */}
            <main className="flex flex-col items-center w-full">
              {children}
            </main>
          </div>

          {/* CONFIGURATIONS */}
          <DrawerMenu selectedTheme={theme} selectNewTheme={selectNewTheme} />
        </div>
      </div>
    </>
  );
};

export default App;
