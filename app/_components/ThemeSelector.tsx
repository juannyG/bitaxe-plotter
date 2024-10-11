const ThemeSelector = ({ ...props }) => {
  return (
    <label className="flex cursor-pointer gap-2">
      <span className="label-text">Light</span>
      <input
        type="checkbox"
        className="toggle theme-controller"
        onChange={(e) => props.selectNewTheme(e.target.checked)}
        checked={props.selectedTheme === "dracula"}
      />
      <span className="label-text">Dark</span>
    </label>
  );
};

export default ThemeSelector;
