import React from "react";
import Nav from "react-bootstrap/Nav";
import HomeWorkEvaluation from "./HomeWorkEvaluation";
import Discussion from "../Discussion";

function HomeWorksList({ homeworks }) {
  return (
    <div>
      <h2>Domáce úlohy</h2>

      {homeworks.map((homework, i) => (
        <div key={homework.id}>
          <Nav.Link href={`domaca${homework.id}`} className="pl-0">
            {homeworks.length - i}. {homework.title}
          </Nav.Link>
          <HomeWorkEvaluation
            evaluation={homework.evaluation}
            classAttribute="d-inline-block mr-3"
          />
          <Discussion data={homework} classAttribute="d-inline-block mr-3" />
        </div>
      ))}
    </div>
  );
}

export default HomeWorksList;
