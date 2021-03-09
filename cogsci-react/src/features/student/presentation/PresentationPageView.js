import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "../../../components/Navigation";
//import Form from "react-bootstrap/Form";
//import Button from "react-bootstrap/Button";
import CommentsList from "../bonus/CommentsList";
import PresentationEvaluation from "./PresentationEvaluation";

function PresentationPageView({
  presentation,
  comments,
  currentUserId,
  presIsOpened,
}) {
  return (
    <div>
      <Navigation />
      <Container>
        <div className="mb-4">
          <Row>
            <Col>
              <h2>{presentation.title}</h2>

              <h5>
                {presentation.first_name} {presentation.last_name}
              </h5>
            </Col>
          </Row>

          <Row>
            <Col>
              <a href={presentation?.path}>{presentation?.title + ".pptx"}</a>
              {/* <Form method="get" action={presentation?.path}>
                <Button size="sm" variant="success">
                  Stiahnuť
                </Button>
              </Form> */}
            </Col>
          </Row>
        </div>

        {presIsOpened && (
          <Row>
            <Col>
              <PresentationEvaluation />
            </Col>
          </Row>
        )}

        <CommentsList comments={comments} currentUserId={currentUserId} />
      </Container>
    </div>
  );
}

export default PresentationPageView;
