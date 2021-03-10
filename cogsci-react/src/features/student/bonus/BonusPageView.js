import React from "react";
import Navigation from "../../../components/Navigation";
import BonusInfo from "./BonusInfo";
import CommentsList from "./CommentsList";
import Container from "react-bootstrap/Container";
import { Button, lightColors, darkColors } from "react-floating-action-button";
import { FaArrowUp } from "react-icons/fa";
import "./BonusPageView.css";

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
        <div className="fixed">
          <Button
            tooltip="Scroll up"
            onClick={() =>
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              })
            }
            styles={{
              backgroundColor: darkColors.blue,
              color: lightColors.white,
            }}
          >
            <FaArrowUp />
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default BonusPageView;
