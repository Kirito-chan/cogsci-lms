import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  STUD_PRES_CLOSED,
  STUD_PRES_OPENED,
  URL_PRESENTATIONS,
} from "../../../constants";

function Presentation({ student }) {
  const { subjectId } = useParams();
  const noPresentation =
    student.pres_status === undefined || student.pres_status === null;

  return (
    <div>
      <h2>Prezentácia</h2>
      {noPresentation && <p>Žiadna</p>}
      {noPresentation || (
        <Link
          to={
            "/subject/" +
            subjectId +
            URL_PRESENTATIONS +
            "/" +
            student.presentation_id +
            "?is_opened=" +
            (student.pres_status == STUD_PRES_OPENED
              ? "true"
              : student.pres_status == STUD_PRES_CLOSED
              ? "false"
              : "neutral")
          }
          className="btn btn-success btn-sm"
        >
          Prezentácia
        </Link>
      )}
    </div>
  );
}

export default Presentation;
