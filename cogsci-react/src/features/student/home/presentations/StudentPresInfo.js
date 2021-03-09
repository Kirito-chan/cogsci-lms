import React from "react";
import Button from "react-bootstrap/Button";

import Discussion from "../Discussion";

function StudentPresInfo({ presentation, hideHodnotitBtn }) {
  let info = null;
  if (presentation.has_evaluated) {
    info = (
      <span className="text-success font-weight-bold">hodnotili ste, </span>
    );
  } else {
    if (hideHodnotitBtn) {
      info = <span className="text-secondary">nehodnotili ste, </span>;
    } else {
      info = (
        <Button variant="danger" size="sm" className="mr-2">
          Hodnotiť
        </Button>
      );
    }
  }

  return (
    <div>
      {info}
      <Discussion data={presentation} classAttribute="d-inline-block mr-3" />
    </div>
  );
}

export default StudentPresInfo;
