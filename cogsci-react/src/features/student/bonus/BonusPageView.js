import React from "react";
import BonusInfo from "./BonusInfo";
import CommentsList from "./CommentsList";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FaArrowUp } from "react-icons/fa";
import "./Bonus.css";
import Navigation from "../../../components/navigations/Navigation";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { insertComment, loadComments } from "./bonusSlice";
import { showLoaderIfAnyNull } from "../../../components/utils/StringUtils";

function BonusPageView({
  bonus,
  subjectId,
  comments,
  currentUserId,
  isAdmin,
  commentsMap,
  refToScrolledElement,
  setScrollElementIndex,
}) {
  return (
    <div className="pb-5">
      <Navigation />
      <Container className="pb-5">
        {showLoaderIfAnyNull(bonus) || (
          <BonusInfo
            headerComponent={
              <h2 className="d-inline">
                {bonus?.orderNumber > 0 && (
                  <span>
                    Bonusová úloha č. {bonus.orderNumber}: {bonus.title}
                  </span>
                )}
              </h2>
            }
            subjectId={subjectId}
            bonus={bonus}
            isAdmin={isAdmin}
            currentUserId={currentUserId}
          />
        )}

        <CommentsList
          comments={comments}
          currentUserId={currentUserId}
          id={bonus?.id}
          commentsMap={commentsMap}
          refToScrolledElement={refToScrolledElement}
          setScrollElementIndex={setScrollElementIndex}
          insertComment={insertComment}
          loadComments={loadComments}
          isBonus={true}
        />

        <OverlayTrigger
          placement="left"
          overlay={<Tooltip id="button-tooltip">Navrch</Tooltip>}
        >
          <div className="fixed">
            <Button
              tooltip="Navrch"
              variant="primary"
              className="btn-circle btn-md pt-1"
              onClick={() =>
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                })
              }
            >
              <FaArrowUp />
            </Button>
          </div>
        </OverlayTrigger>
      </Container>
    </div>
  );
}

export default BonusPageView;
