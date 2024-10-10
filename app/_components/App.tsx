"use client";

import { useState } from "react";

const App = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(() => {
    const theme = localStorage.getItem("theme");
    return theme || "dracula";
  });

  const selectNewTheme = ( theme: string ) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <>
      <div className="flex flex-col items-center h-full w-full" data-theme={theme}>
        <main className="flex flex-col items-center h-full w-full">{children}</main>
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
