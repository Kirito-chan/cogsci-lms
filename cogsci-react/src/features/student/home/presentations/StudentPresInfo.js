import React from "react";
import Button from "react-bootstrap/Button";

import Discussion from "../Discussion";

function StudentPresInfo({ presentation }) {
  return (
    <div>
      {presentation.has_evaluated ? (
        <span className="text-success font-weight-bold font-italic">
          hodnotili ste,{" "}
        </span>
      ) : (
        <Button variant="danger" size="sm" className="mr-2">
          Hodnotiť
        </Button>
      )}

      <Discussion data={presentation} classAttribute="d-inline-block mr-3" />
    </div>
  );
}

export default StudentPresInfo;
