import { useContext } from "react";

import { PollingContext } from "../_contexts";
import ChartSelector from "./ChartSelector";
import DrawerMenuRow from "./DrawerMenuRow";
import ThemeSelector from "./ThemeSelector";

const DrawerMenu = ({ ...props }) => {
  const { pollingEnabled, setPollingEnabled } = useContext(PollingContext);

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <DrawerMenuRow title="Graph Selector">
          <ChartSelector />
        </DrawerMenuRow>

        <DrawerMenuRow title="Page Configs">
          <label className="label cursor-pointer">
            <span className="label-text">Polling Enabled</span>
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e) => setPollingEnabled(e.target.checked) }
              checked={pollingEnabled === true}
            />
          </label>
          <ThemeSelector
            selectedTheme={props.selectedTheme}
            selectNewTheme={props.selectNewTheme}
          />
        </DrawerMenuRow>
      </ul>
    </div>
  );
};

export default DrawerMenu;
