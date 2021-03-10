import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StudentPresInfo from "./StudentPresInfo";
import { URL_PRESENTATIONS } from "../../../../constants";
import { Link } from "react-router-dom";

function StudentPresentationsList({
  studentPresentations,
  subjectId,
  textForStatus,
  hideHodnotitBtn,
}) {
  return (
    <div>
      <h3>Študentské prezentácie {textForStatus}</h3>
      {studentPresentations.map((presentation, i) => (
        <article key={i}>
          <Row>
            {/* prettier-ignore */}
            <Link to={"/subject/" + subjectId + URL_PRESENTATIONS + "/" + presentation.id +
                "?is_opened=" + (hideHodnotitBtn ? "false" : "true")}
              className="nav-link"
            >
              {presentation.title} - {presentation.first_name}{" "}
              {presentation.last_name}
            </Link>
          </Row>

          <Row>
            <Col>
              <StudentPresInfo
                presentation={presentation}
                hideHodnotitBtn={hideHodnotitBtn}
                subjectId={subjectId}
                redirectTo={
                  "/subject/" +
                  subjectId +
                  URL_PRESENTATIONS +
                  "/" +
                  presentation.id
                }
                queryString={
                  "?is_opened=" + (hideHodnotitBtn ? "false" : "true")
                }
                hash={"#sliderForm"}
              />
            </Col>
          </Row>
        </article>
      ))}
    </div>
  );
}

export default StudentPresentationsList;
