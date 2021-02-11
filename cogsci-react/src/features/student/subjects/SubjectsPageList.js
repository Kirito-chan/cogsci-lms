import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { loadCurrentSubjectId } from "./subjectsSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function SubjectsPageList(props) {
  const dispatch = useDispatch();
  const { subjects } = props;
  const history = useHistory();

  const handleEnterClick = (event) => {
    const subjectId = parseInt(event.target.id);
    console.log(subjectId);
    dispatch(loadCurrentSubjectId(subjectId));
    history.replace({ pathname: `/home-student/${subjectId}` });
    //history.push({ pathname: `/home-student/18` });

    //localStorage.setItem("subjectId", parseInt(event.target.id));
  };

  return (
    <div>
      <h2 className="text-center mb-5">Predmety</h2>
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
                    {subject.name} - {subject.year}
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
    </div>
  );
}

export default SubjectsPageList;
