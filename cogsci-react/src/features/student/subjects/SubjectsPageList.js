import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import { loadCurrentSubject } from "./subjectsSlice";
// import { useDispatch } from "react-redux";
//import { Link } from "react-router-dom";
//import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";

function SubjectsPageList(props) {
  //const dispatch = useDispatch();
  const { subjects } = props;
  //const history = useHistory();
  const history = createBrowserHistory();

  //const [subjectIdStorage] = useState(localStorage.getItem("subjectId"));

  // useEffect(() => {
  //   if (subjectIdStorage) dispatch(loadCurrentSubject(subjectIdStorage));
  //   else dispatch(clearCurrentSubject());
  // }, [subjectIdStorage]);

  const handleEnterClick = (event) => {
    event.preventDefault();
    //dispatch(loadCurrentSubject(parseInt(event.target.id)));
    console.log("som tuuuuuuuuu");
    history.push("/home-student");

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
                      <Form
                        className="login-wrapper"
                        onSubmit={handleEnterClick}
                      >
                        <Button variant="primary" type="submit">
                          Prihlásiť
                        </Button>
                      </Form>
                    ) : (
                      // <button
                      //   // variant="success"
                      //   // size="sm"
                      //   // id={subject.id}
                      //   onClick={() => history.push("/home-student")}
                      // >
                      //   Vstúp
                      // </button>
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
