import React from "react";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import formatTranslation from "../../../../components/StringUtils";

function MyPresentationList({ myPresentation }) {
  return (
    <div className="mt-5">
      <h3>Moja prezentácia</h3>
      <div>
        {myPresentation.length ? (
          ""
        ) : (
          <span className="text-secondary font-italic">
            Neodovzdaná prezentácia
          </span>
        )}
        {myPresentation.map((presentation) => (
          <div key={presentation.id}>
            <Nav.Link href="#subor.ppt" className="pl-0">
              {presentation.title}
            </Nav.Link>
            <p>
              <b>Hodnotenie:</b> {presentation.points} z {presentation.weight}{" "}
              {formatTranslation(presentation.weight, "bod")}
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
