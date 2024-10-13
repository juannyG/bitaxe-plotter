import { useContext } from "react";

import { BitaxeHeroStatsContext } from "../_contexts";

const BitaxeHeroStats = () => {
  const bitaxeHeroStats = useContext(BitaxeHeroStatsContext);
  console.log(bitaxeHeroStats);

  return (
    <>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" name="bitaxe-hero-stats" />
        <div className="collapse-title text-xl font-medium">
          Bitaxe Hero Stats
        </div>
        <div className="collapse-content">
          <table className="table text-center">
            <thead>
              <tr>
                <th>TODO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TODO</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BitaxeHeroStats;
