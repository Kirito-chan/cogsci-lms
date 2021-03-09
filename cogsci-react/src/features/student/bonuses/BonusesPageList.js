import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "../../../components/Navigation";
import BonusInfo from "../bonus/BonusInfo";
import { Link } from "react-router-dom";
import { URL_BONUSES } from "../../../constants";

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
                  <Link
                    to={"/subject/" + subjectId + URL_BONUSES + "/" + bonus?.id}
                    className="pl-0 font-weight-bold"
                  >
                    <h4>
                      {bonuses.length - i}. {bonus.title}
                    </h4>
                  </Link>
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
