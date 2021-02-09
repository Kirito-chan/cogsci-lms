import React from "react";
import Nav from "react-bootstrap/Nav";
import Discussion from "../Discussion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function BonusesList({ bonuses }) {
  return (
    <div className="mt-5">
      <h2>Bonusové úlohy</h2>

      {bonuses.map((bonus, i) => (
        <article key={bonus.id}>
          <Row>
            <Col>
              <Nav.Link href={`bonus${bonus.id}`} className="pl-0">
                {bonuses.length - i}. {bonus.title}
              </Nav.Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Discussion
                data={bonus}
                classAttribute="d-inline-block mr-3"
                evaluation={bonus.evaluation}
              />
            </Col>
          </Row>
        </article>
      ))}
    </div>
  );
}

export default BonusesList;
