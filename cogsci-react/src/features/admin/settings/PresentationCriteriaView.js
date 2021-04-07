import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function PresentationCriteriaView({
  values,
  errorSum,
  allAreInvalid,
  submitForm,
  addCriterion,
  deleteCriterion,
  handleName,
  handleHeight,
}) {
  return (
    <div>
      <h2>Kritériá prezentácie</h2>
      <Form>
        <Row>
          <Col>
            {values.map((val) => (
              <div key={val.id}>
                <TextInput
                  id={val.id}
                  name={val.name}
                  handleName={handleName}
                  content={val.height}
                  handleContent={handleHeight}
                  allAreInvalid={allAreInvalid}
                  deleteCriterion={deleteCriterion}
                />
              </div>
            ))}
          </Col>
        </Row>

        <Row>
          <Col xs="5">
            <Button variant="primary" size="sm" onClick={addCriterion}>
              Pridať kritérium
            </Button>
          </Col>
          <Col xs="2">
            <Button
              variant="success"
              className={
                "mr-2 " + (values.length === 0 ? "d-none" : "d-inline-block")
              }
              type="submit"
              size="sm"
              onClick={submitForm}
            >
              Uložiť
            </Button>
            <br />
          </Col>
        </Row>
        <Row>
          <Col xs="5"></Col>
          <Col>
            <span className={"text-danger mt-1 " + errorSum}>
              Súčet percent kritérií nie je 100 !
            </span>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

function TextInput({
  name,
  handleName,
  content,
  handleContent,
  id,
  allAreInvalid,
  deleteCriterion,
}) {
  return (
    <Form.Group as={Row}>
      <Col xs="5">
        <Form.Control
          required
          type="text"
          onChange={handleName}
          value={name}
          id={id}
        />
      </Col>

      <Col xs="2" className="ml-sm-auto">
        <Form.Control
          required
          type="text"
          onChange={handleContent}
          value={content}
          id={id}
          isInvalid={allAreInvalid}
        />
      </Col>
      <Col>
        <Button variant="danger" size="sm" id={id} onClick={deleteCriterion}>
          Odstrániť
        </Button>
      </Col>
    </Form.Group>
  );
}

export default PresentationCriteriaView;
