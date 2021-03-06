import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import formatTranslation from "../../../../components/utils/StringUtils";
import { Link } from "react-router-dom";
import {
  STUD_PRES_CLOSED,
  STUD_PRES_NEUTRAL,
  STUD_PRES_OPENED,
  URL_PRESENTATIONS,
} from "../../../../constants";
import LoadingInButton from "../../../../components/LoadingInButton";

function MyPresentationList({
  myPresentation,
  presentationWeight,
  subjectId,
  handleUpload,
  fileInputRef,
  loading,
}) {
  const isUploaded = Object.keys(myPresentation).length !== 0;
  return (
    <div>
      <div>
        {isUploaded || (
          <span className="text-secondary">Neodovzdaná prezentácia</span>
        )}

        <div key={myPresentation.id}>
          <Link
            // prettier-ignore
            to={"/subject/" + subjectId + URL_PRESENTATIONS + "/" + myPresentation.id + "?is_my=true"}
            className="pl-0 nav-link"
          >
            {myPresentation.title}
          </Link>
          <p className="mb-1">
            <b>Hodnotenie:</b>{" "}
            {myPresentation.points ? myPresentation.points : 0} z{" "}
            {presentationWeight} {formatTranslation(presentationWeight, "bod")}
          </p>
          {isUploaded && (
            <p>
              <b>Stav: </b>
              {myPresentation.status === STUD_PRES_NEUTRAL
                ? "Prijatá na feedback"
                : myPresentation.status === STUD_PRES_OPENED
                ? "Otvorené hodnotenie"
                : "Uzavreté hodnotenie"}
            </p>
          )}
        </div>

        <Form
          className={
            "mt-4 " +
            (myPresentation.status === STUD_PRES_OPENED ||
            myPresentation.status === STUD_PRES_CLOSED
              ? "d-none"
              : "d-block")
          }
          onSubmit={handleUpload}
        >
          <Form.Group>
            <Form.File
              id={"presentationUpload" + myPresentation.id}
              ref={fileInputRef}
            />
          </Form.Group>
          {!isUploaded ? (
            <Button size="sm" type="submit" variant="success">
              {loading ? <LoadingInButton /> : "Pridať prezentáciu"}
            </Button>
          ) : (
            <Button size="sm" type="submit" variant="outline-warning">
              {loading ? <LoadingInButton /> : "Nahradiť prezentáciu"}
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
}

export default MyPresentationList;
