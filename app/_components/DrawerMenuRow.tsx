const DrawerMenuRow = ({ ...props }) => {
  return (
    <li className="border-b border-t border-neutral-400">
      <a>
        <div className="collapse">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            {props.title}
          </div>
          <div className="collapse-content cursor-default">
            {props.children}
          </div>
        </div>
      </a>
    </li>
  );
};

export default DrawerMenuRow;
