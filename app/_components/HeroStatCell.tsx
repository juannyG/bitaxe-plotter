const HeroStatCell = ({ title, value }: {title: string, value: string}) => {
  return (
    <div className="stat place-items-center">
      <div className="stat-title text-xs">{title}</div>
      <div className="stat-value text-base">
        {value ? (
          value
        ) : (
          <span className="loading loading-dots loading-xs"></span>
        )}
      </div>
    </div>
  );
};

export default HeroStatCell;
