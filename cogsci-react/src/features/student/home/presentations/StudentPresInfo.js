import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { HashLink } from "react-router-hash-link";
import { URL_PRESENTATIONS } from "../../../../constants";
import Discussion from "../Discussion";

function StudentPresInfo({
  presentation,
  hideHodnotitBtn,
  subjectId,
  redirectTo,
  queryString,
  hash,
  isMyPres,
}) {
  let hodnotitElement = null;
  if (presentation.has_evaluated) {
    hodnotitElement = (
      <span className="text-success font-weight-bold">hodnotili ste, </span>
    );
  } else {
    if (isMyPres) {
      hodnotitElement = (
        <span className="text-secondary">nemôžete hodnotiť, </span>
      );
    } else if (hideHodnotitBtn) {
      hodnotitElement = (
        <span className="text-secondary">nehodnotili ste, </span>
      );
    } else {
      hodnotitElement = (
        <HashLink
          smooth
          to={`${redirectTo}${queryString ? queryString : ""}${hash}`}
          className="btn btn-danger btn-sm"
        >
          Hodnotiť
        </HashLink>
      );
    }
  }

  return (
    <div>
      <Row>
        <Col>
          <Discussion
            data={presentation}
            redirectTo={`/subject/${subjectId}${URL_PRESENTATIONS}/${presentation.id}`}
            queryString={
              hideHodnotitBtn
                ? "?is_opened=false"
                : isMyPres
                ? "?is_my=true"
                : "?is_opened=true"
            }
            hash="#myNewComment"
            homepageStudent={true}
            hodnotitElement={hodnotitElement}
          />
        </Col>
      </Row>
    </div>
  );
}

export default StudentPresInfo;
