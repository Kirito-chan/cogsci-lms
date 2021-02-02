import React from "react";
import Button from "react-bootstrap/Button";

function Discussion({ data, classAttribute }) {
  return (
    <div className={classAttribute}>
      <p className={classAttribute}>
        <b>Diskusia:</b> {data.num_all_comments || 0} príspevkov,{" "}
        {data.num_of_comments} váš
      </p>
      <Button variant="success" size="sm">
        Diskutovať
      </Button>
    </div>
  );
}

export default Discussion;
