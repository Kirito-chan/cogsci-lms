import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "../../../components/Navigation";
import BonusInfo from "../bonus/BonusInfo";

function BonusesPageList({ bonuses, subjectId }) {
  return (
    <div>
      <Navigation />
      <h1 className="text-center mb-4">Bonusové úlohy</h1>

      {bonuses.map((bonus, i) => (
        <Container key={i}>
          <Row>
            <Col>
              <BonusInfo
                headerComponent={
                  <h4>
                    {bonuses.length - i}. {bonus.title}
                  </h4>
                }
                subjectId={subjectId}
                bonus={bonus}
              />
            </Col>
          </Row>
        </Container>
      ))}
    </div>
  );
}

export default BonusesPageList;
