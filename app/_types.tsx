import {
  TEMP_KEY,
  HASH_RATE_KEY,
  POWER_KEY,
  EFFICIENCY_KEY,
} from "./_constants";

export type TBitaxeData = {
  [TEMP_KEY]: number[];
  [HASH_RATE_KEY]: number[];
  [POWER_KEY]: number[];
  [EFFICIENCY_KEY]: number[];
};

export type TChartData = {
  labels: string[];
  bitaxeData: TBitaxeData;
};

export type TBitaxeHeroStats = {
  bestDiff: string;
  bestSessionDiff: string;
  stratumUser: string;
  wifiStatus: string;
  uptimeSeconds: number;
};
