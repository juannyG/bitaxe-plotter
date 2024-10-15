export const TEMP_KEY = "temp";
export const TEMP_LABEL = "Temp";
export const TEMP_CHART_LABEL = "Temperature (C)";

export const HASH_RATE_KEY = "hashRate";
export const HASH_RATE_LABEL = "Hash Rate";
export const HASH_RATE_CHART_LABEL = "Hash Rate (TH/s)";

export const POWER_KEY = "power";
export const POWER_LABEL = "Power";
export const POWER_CHART_LABEL = "Power (W)";

export const EFFICIENCY_KEY = "efficiency";
export const EFFICIENCY_LABEL = "Efficiency";
export const EFFICIENCY_CHART_LABEL = "Efficiency (J/TH)";

export const LABEL_MAP = {
  [TEMP_KEY]: TEMP_LABEL,
  [HASH_RATE_KEY]: HASH_RATE_LABEL,
  [POWER_KEY]: POWER_LABEL,
  [EFFICIENCY_KEY]: EFFICIENCY_LABEL,
};

export const CHART_LABEL_MAP = {
  [TEMP_KEY]: TEMP_CHART_LABEL,
  [HASH_RATE_KEY]: HASH_RATE_CHART_LABEL,
  [POWER_KEY]: POWER_CHART_LABEL,
  [EFFICIENCY_KEY]: EFFICIENCY_CHART_LABEL,
};

export const AVAILABLE_CHART_KEYS = [
  TEMP_KEY,
  HASH_RATE_KEY,
  POWER_KEY,
  EFFICIENCY_KEY,
].sort();
