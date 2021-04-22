import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "../../../components/Navigation";
import BonusInfo from "../bonus/BonusInfo";
import { Link } from "react-router-dom";
import { URL_BONUSES } from "../../../constants";
import Button from "react-bootstrap/esm/Button";
import AddBonusModal from "./AddBonusModal";

function BonusesPageList({ bonuses, subjectId, isAdmin, currentUserId }) {
  const [showAddBonus, setShowAddBonus] = useState(false);
  const showModalAddBonus = () => setShowAddBonus(true);

  return (
    <div>
      <Navigation />
      <h2 className="text-center mb-4">Bonusové úlohy</h2>
      <Container className="mb-5">
        {isAdmin && (
          <div>
            <Button variant="success" size="sm" onClick={showModalAddBonus}>
              Pridať bonusovú úlohu
            </Button>
            <Link className="btn btn-warning btn-sm ml-2">
              Zobraziť celkovú tabuľku bonusov
            </Link>
          </div>
        )}
      </Container>

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
                    <h4 className="d-inline">
                      {bonuses.length - i}. {bonus.title}
                    </h4>
                  </Link>
                }
                subjectId={subjectId}
                bonus={{ ...bonus, orderNumber: bonuses.length - i }}
                isAdmin={isAdmin}
              />
            </Col>
          </Row>
        </Container>
      ))}
      <AddBonusModal
        showAddBonus={showAddBonus}
        setShowAddBonus={setShowAddBonus}
        subjectId={subjectId}
        currentUserId={currentUserId}
      />
    </div>
  );
}

export default BonusesPageList;
