import React from "react";
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
  let info = null;
  if (presentation.has_evaluated) {
    info = (
      <span className="text-success font-weight-bold">hodnotili ste, </span>
    );
  } else {
    if (isMyPres) {
      info = <span className="text-secondary">nemôžete hodnotiť, </span>;
    } else if (hideHodnotitBtn) {
      info = <span className="text-secondary">nehodnotili ste, </span>;
    } else {
      info = (
        <HashLink
          smooth
          to={`${redirectTo}${queryString ? queryString : ""}${hash}`}
          className="btn btn-danger btn-sm mr-2"
        >
          Hodnotiť
        </HashLink>
      );
    }
  }

  return (
    <div>
      {info}
      <Discussion
        data={presentation}
        classAttribute="d-inline-block mr-3"
        redirectTo={`/subject/${subjectId}${URL_PRESENTATIONS}/${presentation.id}`}
        queryString={
          hideHodnotitBtn
            ? "?is_opened=false"
            : isMyPres
            ? "?is_my=true"
            : "?is_opened=true"
        }
        hash="#myNewComment"
      />
    </div>
  );
}

export default StudentPresInfo;
