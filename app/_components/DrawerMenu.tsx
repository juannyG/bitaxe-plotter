import { useContext } from "react";

import { PollingContext, BitaxeChartDataContext } from "../_contexts";
import ChartSelector from "./ChartSelector";
import DrawerMenuRow from "./DrawerMenuRow";
import ThemeSelector from "./ThemeSelector";
import { TEMP_KEY, HASH_RATE_KEY, POWER_KEY, FANRPM_KEY } from "../_constants";

const DrawerMenu = ({ ...props }) => {
  const { pollingEnabled, setPollingEnabled } = useContext(PollingContext);
  const { setChartData } = useContext(BitaxeChartDataContext);

  const handleGraphClear = (e) => {
    e.stopPropagation();
    setChartData({
      labels: [],
      bitaxeData: {
        [TEMP_KEY]: [],
        [HASH_RATE_KEY]: [],
        [POWER_KEY]: [],
        [FANRPM_KEY]: [],
      },
    });
  };
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="bg-base-200 text-base-content min-h-full w-80 p-4">
        <DrawerMenuRow title="Graph Selector">
          <ChartSelector />
        </DrawerMenuRow>

        <DrawerMenuRow title="Page Configs">
          <label className="label cursor-pointer">
            <span className="label-text">Polling Enabled</span>
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e) => setPollingEnabled(e.target.checked)}
              checked={pollingEnabled === true}
            />
          </label>
          <ThemeSelector
            selectedTheme={props.selectedTheme}
            selectNewTheme={props.selectNewTheme}
          />
          <div className="place-self-center">
            <button className="btn btn-neutral" onClick={(e) => handleGraphClear(e)}>
              Clear Graphs
            </button>
          </div>
        </DrawerMenuRow>
      </ul>
    </div>
  );
};

export default DrawerMenu;
