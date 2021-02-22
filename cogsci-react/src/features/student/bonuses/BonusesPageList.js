import React from "react";
import Navigation from "../../../components/Navigation";
import BonusInfo from "../bonus/BonusInfo";

function BonusesPageList({ bonuses, subjectId }) {
  return (
    <div>
      <Navigation />
      <h1 className="text-center mb-4">Bonusové úlohy</h1>

      {bonuses.map((bonus, i) => (
        <BonusInfo
          headerComponent={
            <h4>
              {bonuses.length - i}. {bonus.title}
            </h4>
          }
          subjectId={subjectId}
          bonus={bonus}
          key={i}
        />
      ))}
    </div>
  );
}

export default BonusesPageList;
