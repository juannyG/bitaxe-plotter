"use client";

import { useState, useEffect } from "react";

const BTCNetworkStats = () => {
  const [nextUpdate, setNextUpdate] = useState("");
  const [blockHeight, setBlockHeight] = useState("...");
  useEffect(() => {
    fetch("https://mempool.space/api/blocks/tip/height")
      .then((r) => r.json())
      .then((newH) => {
        setBlockHeight(newH.toString());
      })
      .catch((e) => {
        console.log(e);
      });
  }, [nextUpdate]);

  const [currDiff, setCurrDiff] = useState("...");
  useEffect(() => {
    fetch("https://mempool.space/api/v1/mining/difficulty-adjustments/1m")
      .then((r) => r.json())
      .then((data) => {
        const newCurrDiff = (data[0][2] / 10 ** 12).toFixed(4) + " T";
        setCurrDiff(newCurrDiff);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [nextUpdate]);

  /* Ticker */
  const [remaining, setRemaining] = useState({ m: "", s: "" });
  const tick = () => {
    const n = nextUpdate ? Number(nextUpdate) : Date.now();
    const r = (n - Date.now()) / 1000; // ms -> s
    if (r <= 0) {
      const newNextUpdate = Date.now() + 1000 * 60 * 10; // 10 min from now
      setNextUpdate(newNextUpdate.toString());
      return;
    }
    const m = Math.floor(r / 60);
    const s = r - m * 60;
    setRemaining({ m: m.toFixed(0), s: s.toFixed(0) });
  };
  useEffect(() => {
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
  }, [nextUpdate]);

  return (
    <>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" name="btc-network-stats" />
        <div className="collapse-title text-xl font-medium">
          Current BTC Network Stats
        </div>
        <div className="collapse-content">
          <table className="table text-center">
            <thead>
              <tr>
                <th>Block Height</th>
                <th>Current Diff</th>
                <th>Next Update</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{blockHeight}</td>
                <td>{currDiff}</td>
                <td>
                  {remaining.m ? (
                    <>
                      {remaining.m} min, {remaining.s} s
                    </>
                  ) : (
                    "Loading..."
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BTCNetworkStats;
