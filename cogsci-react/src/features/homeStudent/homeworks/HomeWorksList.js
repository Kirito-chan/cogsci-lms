import React from "react";
import Nav from "react-bootstrap/Nav";
import Discussion from "../Discussion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function HomeWorksList({ homeworks }) {
  return (
    <div className="mt-5">
      <h2>Domáce úlohy</h2>

      {homeworks.map((homework, i) => (
        <article key={homework.id}>
          <Row>
            <Col>
              <Nav.Link href={`domaca${homework.id}`} className="pl-0">
                {homeworks.length - i}. {homework.title}
              </Nav.Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Discussion
                data={homework}
                classAttribute="d-inline-block mr-3"
                evaluation={homework.evaluation}
              />
            </Col>
          </Row>
        </article>
      ))}
    </div>
  );
}

export default HomeWorksList;
