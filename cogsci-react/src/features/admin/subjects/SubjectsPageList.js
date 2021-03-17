import React from "react";
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
  URL_HOME_ADMIN,
} from "../../../constants";
import Navigation from "../../../components/Navigation";

function SubjectsPageList({ subjects }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEditClick = (event) => {
    const subjectId = parseInt(event.target.id);
    dispatch(loadCurrentSubjectId(subjectId));
    history.push({ pathname: `/subject/${subjectId}${URL_HOME_ADMIN}` });
  };

  return (
    <div>
      <Navigation />
      <h2 className="text-center mb-5">Predmety</h2>
      <Row>
        <Col></Col>
        <Col lg={8}>
          <Table hover size="sm">
            <thead>
              <tr>
                <th>Názov predmetu</th>
                <th>Školský rok</th>
                <th>Semester</th>
                <th>Limit</th>
                <th>Status</th>
                <th>Možnosti</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => {
                const subjIsActive = subject.status == SUBJ_IS_ACTIVE;
                return (
                  <tr key={subject.id}>
                    <td>{subject.name}</td>
                    <td>{subject.year}</td>
                    {/* prettier-ignore */}
                    <td>{subject.season == WINTER_SEASON ? "Zimný semester": "Letný semester"}</td>
                    <td>
                      {subject.count_students}/{subject.user_limit}
                    </td>
                    <td>{subjIsActive ? "Aktívny" : "Neaktívny"}</td>
                    <td>
                      <Button
                        variant={subjIsActive ? "success" : "info"}
                        id={subject.id}
                        onClick={handleEditClick}
                        size="sm"
                      >
                        {subjIsActive ? "Vstúp" : "Edituj"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default SubjectsPageList;
