const ThemeSelector = ({ ...props }) => {
  return (
    <label className="label cursor-pointer">
      <span className="label-text">Dark theme</span>
      <input
        type="checkbox"
        className="checkbox"
        onChange={(e) => props.selectNewTheme(e.target.checked)}
        checked={props.selectedTheme === "dracula"}
      />
    </label>
  );
};

export default ThemeSelector;
