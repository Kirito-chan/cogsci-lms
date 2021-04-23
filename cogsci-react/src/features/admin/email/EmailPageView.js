import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Navigation from "../../../components/Navigation";
import { showLoaderIfAnyNull } from "../../../components/StringUtils";

function EmailPageView({
  studentEmailsAndNamesDoubleArr,
  subject,
  message,
  handleSubmit,
  handleCheckAll,
  handleChange,
  handleMessage,
  handleSubject,
  checkedEmails,
}) {
  return (
    <div>
      <Navigation />
      <h2 className="text-center mb-5">Hromadné posielanie emailu študentom</h2>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            {showLoaderIfAnyNull(studentEmailsAndNamesDoubleArr) || (
              <Row>
                {studentEmailsAndNamesDoubleArr.map((group, i) => (
                  <Col key={i}>
                    {group.map((student) => (
                      <Form.Check
                        key={student.id}
                        id={student.email}
                        type="checkbox"
                      >
                        <Form.Check.Input
                          type="checkbox"
                          onChange={handleChange}
                          checked={
                            checkedEmails.checkedItems.get(student.email)
                              ? checkedEmails.checkedItems.get(student.email)
                              : false
                          }
                        />

                        <Form.Check.Label title={student.email}>
                          {student.first_name + " " + student.last_name}
                        </Form.Check.Label>
                      </Form.Check>
                    ))}
                  </Col>
                ))}
              </Row>
            )}
            <Row className="mt-4">
              <Col>
                <Form.Check type="checkbox">
                  <Form.Check.Input type="checkbox" onChange={handleCheckAll} />
                  <Form.Check.Label>
                    <b>Označiť všetkých</b>
                  </Form.Check.Label>
                </Form.Check>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Row>
              <Col></Col>
              <Col md="8">
                <Form.Label>
                  <b>Predmet</b>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={subject}
                  onChange={handleSubject}
                />
                <Form.Label>
                  <b>Správa</b>
                </Form.Label>

                <Form.Control
                  required
                  as="textarea"
                  rows={5}
                  value={message}
                  onChange={handleMessage}
                />
                <Button
                  variant="success"
                  type="submit"
                  size="sm"
                  className="mt-3 float-right"
                >
                  Poslať email
                </Button>
              </Col>
              <Col></Col>
            </Row>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}

export default EmailPageView;
