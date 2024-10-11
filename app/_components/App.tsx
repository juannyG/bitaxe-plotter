"use client";

import { useState, useEffect } from "react";

const App = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    const t = window.localStorage.getItem("theme");
    setTheme(t || "dracula");
  }, []);

  const selectNewTheme = (theme: string) => {
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
            <div className="visible h-dvh fixed border-r-4 border-slate-600 p-5 drawer-button cursor-pointer">
              {'>>'}
            </div>
          </label>

          <div className="flex justify-center pt-10">
            <h1 className="text-2xl">Bitaxe Stat Plotter</h1>
          </div>

          <main className="flex flex-col items-center h-full w-full">
            {children}
          </main>

          <footer className="flex flex-column justify-center p-10">
            <label className="label pr-3">Set your theme:</label>
            <select
              className="select select-bordered"
              value={theme}
              onChange={(e) => selectNewTheme(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="dracula">Dracula</option>
            </select>
          </footer>

        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <a>
                <div className="collapse">
                  <input type="checkbox"  />
                  <div className="collapse-title text-xl font-medium">
                    Sidebar Item 1
                  </div>
                  <div className="collapse-content">
                    <p>hello</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>

      </div>
    </>
  );
};

export default App;
