import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { loadCurrentSubjectId } from "./subjectsSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  WINTER_SEASON,
  SUBJ_IS_ACTIVE,
  URL_ADMIN_HOME,
} from "../../../constants";
import Navigation from "../../../components/navigations/Navigation";
import AddSubjectModal from "./AddSubjectModal";
import Badge from "react-bootstrap/Badge";

function SubjectsPageList({ subjects }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showAddSubject, setShowAddSubject] = useState(false);
  const showModalAddSubject = () => setShowAddSubject(true);

  const handleEnterSubjClick = (event) => {
    const subjectId = parseInt(event.target.getAttribute("subjectid"));
    dispatch(loadCurrentSubjectId(subjectId)).then(() => {
      history.push({ pathname: `/subject/${subjectId}${URL_ADMIN_HOME}` });
    });
  };

  return (
    <div>
      <Navigation />
      <h2 className="text-center mb-5">Predmety</h2>
      <Container fluid>
        <Row>
          <Col></Col>
          <Col xl={8} lg={12}>
            <Button
              variant="success"
              size="sm"
              className="mb-3"
              onClick={showModalAddSubject}
            >
              Pridať predmet
            </Button>
            <Table hover size="sm">
              <thead>
                <tr>
                  <th>Názov predmetu</th>
                  <th>Stav</th>
                  <th>Školský rok</th>
                  <th>Semester</th>
                  <th>Limit</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => {
                  const subjIsActive = subject.status == SUBJ_IS_ACTIVE;
                  return (
                    <tr
                      key={subject.id}
                      onClick={handleEnterSubjClick}
                      style={{ cursor: "pointer" }}
                    >
                      <td subjectid={subject.id}>{subject.name}</td>
                      <td subjectid={subject.id}>
                        {subjIsActive ? (
                          <Badge pill variant="success" subjectid={subject.id}>
                            Aktívny
                          </Badge>
                        ) : (
                          <Badge
                            pill
                            variant="secondary"
                            subjectid={subject.id}
                          >
                            Neaktívny
                          </Badge>
                        )}
                      </td>
                      <td subjectid={subject.id}>{subject.year}</td>
                      {/* prettier-ignore */}
                      <td subjectid={subject.id}>{subject.season == WINTER_SEASON ? "Zimný semester": "Letný semester"}</td>
                      <td subjectid={subject.id}>
                        {subject.count_students}/{subject.user_limit}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col></Col>
        </Row>
      </Container>

      <AddSubjectModal
        showAddSubject={showAddSubject}
        setShowAddSubject={setShowAddSubject}
      />
    </div>
  );
}

export default SubjectsPageList;
