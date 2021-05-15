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
  loading,
  sum,
}) {
  return (
    <div>
      <h2>Kritériá prezentácie</h2>
      <Form>
        <Row>
          <Col>
            <Row>
              <Col xs="5">
                <h6> Kritérium</h6>
              </Col>
              <Col xs="3" xl="2">
                <h6>Váha</h6>
              </Col>
            </Row>

            <Col></Col>
            {values.map((val) => (
              <div key={val.id}>
                <TextInput
                  id={val.id}
                  name={val.name}
                  handleName={handleName}
                  content={val.height}
                  handleContent={(e) => {
                    handleHeight(e);
                  }}
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
          <Col>
            <span className={"text-danger " + errorSum}>
              Súčet percent kritérií je {sum}, musí byť 100 !
            </span>
          </Col>
        </Row>
        <Row>
          <Col xs="11" sm="8" xl="9" className="text-right mt-2">
            <Button
              variant="success"
              type="submit"
              size="sm"
              onClick={submitForm}
            >
              {loading ? (
                <span>
                  <span className={"spinner-border spinner-border-sm "}></span>{" "}
                  Loading...
                </span>
              ) : (
                "Uložiť zmeny"
              )}
            </Button>
            <br />
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

      <Col xs="3" xl="2" className="ml-sm-auto">
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
