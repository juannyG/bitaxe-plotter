"use client";

import { useState, useEffect } from "react";

const BTCNetworkStats = () => {
  const [blockHeight, setBlockHeight] = useState("...");
  const storeNewBlockHeight = (h: string) => {
    setBlockHeight(h.toString());
    localStorage.setItem("blockHeight", h.toString());
  };

  useEffect(() => {
    const h = window.localStorage.getItem("blockHeight") || null;
    if (h) {
      setBlockHeight(h);
    } else {
      fetch("https://mempool.space/api/blocks/tip/height")
        .then((r) => r.json())
        .then((new_h) => storeNewBlockHeight(new_h.toString()))
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return <>Block height: {blockHeight}</>;
};

export default BTCNetworkStats;
