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
        className="flex flex-col items-center h-full w-full"
        data-theme={theme}
      >
        <div className="flex justify-center pt-10">
          <h1 className="text-2xl">Bitaxe Stat Plotter</h1>
        </div>

        <main className="flex flex-col items-center h-full w-full">
          {children}
        </main>
        <footer className="flex flex-column p-10">
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
    </>
  );
};

export default App;
