import React from "react";
import Navigation from "../../../components/Navigation";
import BonusInfo from "./BonusInfo";
import Comments from "./Comments";

function BonusPageView({ bonus, bonusOrderId, subjectId }) {
  return (
    <div>
      <Navigation />

      <BonusInfo
        headerComponent={
          <h2>
            Bonusová úloha č. {bonusOrderId}: {bonus?.title}
          </h2>
        }
        subjectId={subjectId}
        bonus={bonus}
      />

      <Comments bonusId={bonus?.id} />
    </div>
  );
}

export default BonusPageView;
