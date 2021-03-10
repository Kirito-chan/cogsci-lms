import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import formatTranslation from "../../../../components/StringUtils";
import { Link } from "react-router-dom";
import { URL_PRESENTATIONS } from "../../../../constants";

function MyPresentationList({
  myPresentations,
  presentationWeight,
  subjectId,
}) {
  return (
    <div className="mt-5 mb-5">
      <h3>Moja prezentácia</h3>
      <div>
        {myPresentations.length ? (
          ""
        ) : (
          <span className="text-secondary">Neodovzdaná prezentácia</span>
        )}
        {myPresentations.map((presentation) => (
          <div key={presentation.id}>
            <Link
              // prettier-ignore
              to={"/subject/" + subjectId + URL_PRESENTATIONS + "/" + presentation.id + "?is_opened=false"}
              className="pl-0 nav-link"
            >
              {presentation.title}
            </Link>
            <p>
              <b>Hodnotenie:</b> {presentation.points} z {presentationWeight}{" "}
              {formatTranslation(presentationWeight, "bod")}
            </p>
          </div>
        ))}
        <Form className="mt-4">
          <Form.Group>
            <Form.File id="presentationUpload" />
          </Form.Group>
          <Button size="sm" type="submit" variant="success">
            Pridať prezentáciu
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default MyPresentationList;
