import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { loadCurrentSubjectId } from "./subjectsSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { URL_HOME_STUDENT, WINTER_SEASON } from "../../../constants";
import Navigation from "../../../components/Navigation";

function SubjectsPageList({ subjects }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEnterClick = (event) => {
    const subjectId = parseInt(event.target.id);
    dispatch(loadCurrentSubjectId(subjectId)).then(() => {
      history.push({ pathname: `/subject/${subjectId}${URL_HOME_STUDENT}` });
    });
  };

  return (
    <div>
      <Navigation />
      <h2 className="text-center mb-5">Predmety</h2>
      <Container fluid>
        <Row>
          <Col></Col>
          <Col lg={8}>
            {subjects.map((subject) => (
              <article
                key={subject.id}
                className="mx-lg-5 border border-dark rounded p-3 mb-5"
              >
                <Row>
                  <Col>
                    <h3>
                      {subject.name} –{" "}
                      {subject.season == WINTER_SEASON ? "ZS" : "LS"}{" "}
                      {subject.year}
                    </h3>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>{subject.about}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>
                      {subject.is_enrolled ? (
                        <Button
                          variant="success"
                          id={subject.id}
                          onClick={handleEnterClick}
                        >
                          Vstúp
                        </Button>
                      ) : (
                        <Button variant="warning" size="sm">
                          Prihlásiť sa
                        </Button>
                      )}
                    </p>
                  </Col>
                </Row>
              </article>
            ))}
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default SubjectsPageList;
