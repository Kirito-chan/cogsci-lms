import React from "react";
import Navigation from "../../../components/Navigation";
import BonusInfo from "./BonusInfo";
import CommentsList from "./CommentsList";
import Container from "react-bootstrap/Container";

function BonusPageView({
  bonus,
  bonusOrderId,
  subjectId,
  comments,
  currentUserId,
}) {
  return (
    <div>
      <Navigation />
      <Container>
        <BonusInfo
          headerComponent={
            <h2>
              {bonusOrderId > 0 && (
                <span>
                  Bonusová úloha č. {bonusOrderId}: {bonus?.title}
                </span>
              )}
            </h2>
          }
          subjectId={subjectId}
          bonus={bonus}
        />

        <CommentsList comments={comments} currentUserId={currentUserId} />
      </Container>
    </div>
  );
}

export default BonusPageView;
