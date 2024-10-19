"use client";

import { useState, useEffect } from "react";

import HeroStatCell from "./HeroStatCell";
import HeroStatTitle from "./HeroStatTitle";

const BTCNetworkStats = () => {
  const [nextUpdate, setNextUpdate] = useState("");
  const [blockHeight, setBlockHeight] = useState("");
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

  const [networkHash, setNetworkHash] = useState("");
  const [currDiff, setCurrDiff] = useState("");
  useEffect(() => {
    fetch("https://mempool.space/api/v1/mining/hashrate/3d")
      .then((r) => r.json())
      .then((data) => {
        const newCurrDiff =
          (data.currentDifficulty / 10 ** 12).toFixed(3) + " T";
        setCurrDiff(newCurrDiff);

        const newNetworkHash =
          (data.currentHashrate / 10 ** 18).toFixed(3) + " EH/s";
        setNetworkHash(newNetworkHash);
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
    tick();
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
  }, [nextUpdate]);

  const remainingDisplay = remaining
    ? remaining.m + "min, " + remaining.s + "s"
    : "";
  return (
    <div className="flex self-stretch justify-center items-center">
      <div>
        <HeroStatTitle title="BTC Network Stats" />
        <div className="stats stats-vertical lg:stats-horizontal shadow">
          <HeroStatCell title="Block Height" value={blockHeight} />
          <HeroStatCell title="Current Difficulty" value={currDiff} />
          <HeroStatCell title="Network Hash Rate" value={networkHash} />
          <HeroStatCell title="Next Update" value={remainingDisplay} />
        </div>
      </div>
    </div>
  );
};

export default BTCNetworkStats;
