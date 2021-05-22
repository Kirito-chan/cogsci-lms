import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StudentPresInfo from "./StudentPresInfo";
import { URL_PRESENTATIONS } from "../../../../constants";
import { Link } from "react-router-dom";

function StudentPresentationsList({
  studentPresentations,
  subjectId,
  hideHodnotitBtn,
  myPresentationId,
  hideEvalDiscussion,
}) {
  return (
    <div className={hideHodnotitBtn ? "mt-3 mt-lg-0" : ""}>
      {studentPresentations.length == 0 && (
        <p className="text-secondary">Žiadne</p>
      )}

      {studentPresentations.map((presentation, i) => (
        <article key={i}>
          <Row>
            {/* prettier-ignore */}
            <Link to={"/subject/" + subjectId + URL_PRESENTATIONS + "/" + presentation.id + 
            (hideEvalDiscussion ? "?is_opened=neutral"
            : hideHodnotitBtn
            ? "?is_opened=false"
            : myPresentationId == presentation.id
            ? "?is_my=true"
            : "?is_opened=true")  
                }
              className="nav-link"
            >
              {presentation.title} - {presentation.first_name}{" "}
              {presentation.last_name}
            </Link>
          </Row>

          {hideEvalDiscussion || (
            <Row>
              <Col>
                <StudentPresInfo
                  presentation={presentation}
                  hideHodnotitBtn={hideHodnotitBtn}
                  isMyPres={myPresentationId == presentation.id ? true : false}
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
          )}
        </article>
      ))}
    </div>
  );
}

export default StudentPresentationsList;
