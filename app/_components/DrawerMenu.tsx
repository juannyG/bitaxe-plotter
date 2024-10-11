import ChartSelector from "./ChartSelector";
import DrawerMenuRow from "./DrawerMenuRow";
import ThemeSelector from "./ThemeSelector";

const DrawerMenu = ({ ...props }) => {
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

        <DrawerMenuRow title="Theme Selector">
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
