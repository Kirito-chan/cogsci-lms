import React from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import {
  STUD_PRES_CLOSED,
  STUD_PRES_NEUTRAL,
  STUD_PRES_OPENED,
} from "../../../constants";
import { updatePresentationStatus } from "./presentationSlice";

function PresStatusButtons({ presentationId, status, subjectId, history }) {
  const dispatch = useDispatch();
  const isNeutral = status == STUD_PRES_NEUTRAL;
  const isOpened = status == STUD_PRES_OPENED;
  const isClosed = status == STUD_PRES_CLOSED;

  const translatePresStatus = (status) => {
    if (status == STUD_PRES_NEUTRAL) return "Prijatý na feedback";
    if (status == STUD_PRES_OPENED) return "Otvorený na hodnotenie";
    if (status == STUD_PRES_CLOSED) return "Uzavreté hodnotenie";
    return "chyba";
  };

  const returnToFeedback = () => {
    dispatch(updatePresentationStatus(presentationId, STUD_PRES_NEUTRAL)).then(
      () => {
        history.push({ pathname: `/subject/${subjectId}/admin/presentation` });
        history.push({
          pathname: `/subject/${subjectId}/presentation/${presentationId}`,
          search: "?is_opened=neutral",
        });
      }
    );
  };
  const openPresentation = () => {
    dispatch(updatePresentationStatus(presentationId, STUD_PRES_OPENED)).then(
      () => {
        history.push({ pathname: `/subject/${subjectId}/presentation` });
        history.push({
          pathname: `/subject/${subjectId}/presentation/${presentationId}`,
          search: "?is_opened=true",
        });
      }
    );
  };
  const closePresentation = () => {
    dispatch(updatePresentationStatus(presentationId, STUD_PRES_CLOSED)).then(
      () => {
        history.push({ pathname: `/subject/${subjectId}/presentation` });
        history.push({
          pathname: `/subject/${subjectId}/presentation/${presentationId}`,
          search: "?is_opened=false",
        });
      }
    );
  };

  return (
    <div>
      <p>
        <b>Stav:</b> {translatePresStatus(status)}
      </p>
      <Button
        variant="outline-secondary"
        size="sm"
        disabled={isNeutral}
        onClick={returnToFeedback}
      >
        Vrátiť na feedback
      </Button>
      <Button
        variant="success"
        size="sm"
        className="mx-3"
        disabled={isOpened}
        onClick={openPresentation}
      >
        Otvoriť na hodnotenie
      </Button>
      <Button
        variant="warning"
        size="sm"
        disabled={isClosed}
        onClick={closePresentation}
      >
        Uzatvoriť hodnotenie
      </Button>
    </div>
  );
}

export default PresStatusButtons;
