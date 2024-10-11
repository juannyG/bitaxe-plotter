"use client";

import { useState, useEffect } from "react";

const App = ({ children }: { children: React.ReactNode }) => {
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

            <div className="flex justify-center pt-10">
              <h1 className="text-2xl">Bitaxe Stat Plotter</h1>
            </div>

            <main className="flex flex-col items-center h-full w-full">
              {children}
            </main>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}


              {/* CHART SELECTION */}
              <li className="border-b border-t border-neutral-400">
                <a>
                  <div className="collapse">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                      Graph Selector
                    </div>
                    <div className="collapse-content cursor-default">
                      <label className="label cursor-default">
                        <span className="label-text">Hash rate</span>
                        <input type="checkbox" value="hashRate" className="checkbox" />
                      </label>
                      <label className="label cursor-default">
                        <span className="label-text">Power</span>
                        <input type="checkbox" value="power" className="checkbox" />
                      </label>
                      <label className="label cursor-default">
                        <span className="label-text">Temp</span>
                        <input type="checkbox" value="temp" className="checkbox" />
                      </label>
                      <label className="label cursor-default">
                        <span className="label-text">Probability</span>
                        <input type="checkbox" value="probability" className="checkbox" />
                      </label>
                    </div>
                  </div>
                </a>
              </li>


              {/* THEME SELECTION */}
              <li>
                <a>
                  <div className="collapse">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                      Theme Selector
                    </div>
                    <div className="collapse-content cursor-default">
                      <label className="flex cursor-pointer gap-2">
                        <span className="label-text">Light</span>
                        <input
                          type="checkbox"
                          className="toggle theme-controller"
                          onChange={(e) => selectNewTheme(e.target.checked) }
                          checked={theme === "dracula" }
                        />
                        <span className="label-text">Dark</span>
                      </label>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
