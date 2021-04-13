import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Navigation from "../../../components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUserEmailsAndNames,
  getStudentEmailsAndNames,
  sendEmail,
} from "../home/homeSlice";
import { useParams } from "react-router";
import { showLoaderIfAnyNull } from "../../../components/StringUtils";

function EmailPage() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const studentEmailsAndNames = useSelector(getStudentEmailsAndNames);
  const [
    studentEmailsAndNamesDoubleArr,
    setStudentEmailsAndNamesDoubleArr,
  ] = useState(null);
  const [checkedEmails, setCheckedEmails] = useState({
    checkedItems: new Map(),
  });

  const [subject, setSubject] = useState("");
  const handleSubject = (e) => setSubject(e.target.value);

  const [message, setMessage] = useState("");
  const handleMessage = (e) => setMessage(e.target.value);

  const handleChange = (e) => {
    const email = e.target.id;
    const isChecked = e.target.checked;
    setCheckedEmails((prevState) => ({
      checkedItems: prevState.checkedItems.set(email, isChecked),
    }));
  };

  const handleCheckAll = (e) => {
    const isChecked = e.target.checked;
    studentEmailsAndNames.forEach((student) =>
      setCheckedEmails((prevState) => ({
        checkedItems: prevState.checkedItems.set(student.email, isChecked),
      }))
    );
  };

  useEffect(() => {
    if (subjectId) dispatch(loadUserEmailsAndNames(subjectId));
  }, [subjectId]);

  useEffect(() => {
    if (studentEmailsAndNames) {
      for (const student of studentEmailsAndNames) {
        setCheckedEmails((prevState) => ({
          checkedItems: prevState.checkedItems.set(student.email, false),
        }));
      }

      const emailsDivided = [];
      let SIZE = 10;
      if (studentEmailsAndNames.length < 40) SIZE = 10;
      else if (studentEmailsAndNames >= 40 && studentEmailsAndNames < 60)
        SIZE = 15;
      else if (studentEmailsAndNames >= 60 && studentEmailsAndNames <= 100)
        SIZE = 20;
      else SIZE = 30;

      for (
        let index = 0;
        index < studentEmailsAndNames?.length;
        index += SIZE
      ) {
        emailsDivided.push(studentEmailsAndNames.slice(index, index + SIZE));
      }
      setStudentEmailsAndNamesDoubleArr(emailsDivided);
    }
  }, [studentEmailsAndNames]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      sendEmail(
        "fero.kochjar@gmail.com",
        "kiritochan776@gmail.com",
        "Kirito",
        subject,
        message
      )
    ).then(() => {
      setSubject("");
      setMessage("");
    });
  };

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

                        <Form.Check.Label>
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
                  type="text"
                  value={subject}
                  onChange={handleSubject}
                />
                <Form.Label>
                  <b>Správa</b>
                </Form.Label>

                <Form.Control
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

export default EmailPage;
