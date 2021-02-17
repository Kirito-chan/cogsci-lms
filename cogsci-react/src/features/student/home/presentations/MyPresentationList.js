import React from "react";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import formatTranslation from "../../../../components/StringUtils";

function MyPresentationList({ myPresentations, presentationWeight }) {
  return (
    <div className="mt-5">
      <h3>Moja prezentácia</h3>
      <div>
        {myPresentations.length ? (
          ""
        ) : (
          <span className="text-secondary font-italic">
            Neodovzdaná prezentácia
          </span>
        )}
        {myPresentations.map((presentation) => (
          <div key={presentation.id}>
            <Nav.Link href="#subor.ppt" className="pl-0">
              {presentation.title}
            </Nav.Link>
            <p>
              <b>Hodnotenie:</b> {presentation.points} z {presentationWeight}{" "}
              {formatTranslation(presentationWeight, "bod")}
            </p>
          </div>
        ))}
        <Form className="mt-4">
          <Form.Group>
            <Form.File
              id="presentationUpload"
              label="Uploadovanie prezentácie"
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default MyPresentationList;
