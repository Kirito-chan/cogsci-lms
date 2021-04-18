import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {
  loadCurrentSubjectId,
  loadSubjects,
  signInForSubject,
} from "./subjectsSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  URL_HOME_STUDENT,
  WINTER_SEASON,
  PENDING_FOR_SUBJ,
  ACCEPTED_TO_SUBJ,
  REJECTED_TO_SUBJ,
} from "../../../constants";
import Navigation from "../../../components/Navigation";

// prettier-ignore
function SubjectsPageList({ subjects, currentUserId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEnterClick = (event) => {
    const subjectId = parseInt(event.target.value);
    dispatch(loadCurrentSubjectId(subjectId)).then(() => {
      history.push({ pathname: `/subject/${subjectId}${URL_HOME_STUDENT}` });
    });
  };

  const handleSignInClick = (event) => {
    const subjectId = parseInt(event.target.value);
    dispatch(signInForSubject(currentUserId, subjectId)).then(() => {
      dispatch(loadSubjects(currentUserId));
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
                      {!subject.is_enrolled && (
                        <Button
                          variant="warning"
                          size="sm"
                          value={subject.id}
                          onClick={handleSignInClick}
                        >
                          Prihlásiť sa
                        </Button>
                      )}

                      {subject.is_enrolled &&
                      subject.status === ACCEPTED_TO_SUBJ ? (
                        <Button
                          variant="success"
                          size="sm"
                          value={subject.id}
                          onClick={handleEnterClick}
                        >
                          Vstúp
                        </Button>
                      ) : 
                      
                      subject.is_enrolled &&
                        subject.status === PENDING_FOR_SUBJ ? (
                        <Button variant="warning" size="sm" disabled>
                          Čaká sa na potvrdenie
                        </Button>
                      ) : 
                      
                      subject.is_enrolled &&
                        subject.status === REJECTED_TO_SUBJ ? (
                        <Button
                          variant="warning"
                          size="sm"
                          value={subject.id}
                          onClick={handleSignInClick}
                        >
                          Potvrdenie zamietnuté - skúste ešteraz
                        </Button>
                      ) : (
                        ""
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
