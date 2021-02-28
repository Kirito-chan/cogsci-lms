import React from "react";
import Navigation from "../../../components/Navigation";
import BonusInfo from "./BonusInfo";
import Comments from "./Comments";
import Container from "react-bootstrap/Container";

function BonusPageView({ bonus, bonusOrderId, subjectId }) {
  return (
    <div>
      <Navigation />
      <Container>
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
      </Container>
    </div>
  );
}

export default BonusPageView;
