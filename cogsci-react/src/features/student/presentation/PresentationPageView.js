import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "../../../components/Navigation";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { URL_PRESENTATIONS } from "../../../constants";
import CommentsList from "../bonus/CommentsList";
import { Link } from "react-router-dom";
import PresentationEvaluation from "./PresentationEvaluation";

function PresentationPageView({
  presentation,
  comments,
  currentUserId,
  subjectId,
}) {
  return (
    <div>
      <Navigation />
      <Container>
        <Row>
          <Col>
            <Link
              // prettier-ignore
              to={"/subject/" + subjectId + URL_PRESENTATIONS + "/" + presentation?.id}
              className="pl-0 font-weight-bold"
            >
              <h2>{presentation?.title}</h2>
            </Link>
            <h4>
              {presentation?.first_name} {presentation?.last_name}
            </h4>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form method="get" action={presentation?.path}>
              <Button size="sm" variant="success">
                Stiahnuť
              </Button>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col>
            <PresentationEvaluation/>
          </Col>
        </Row>

        <CommentsList comments={comments} currentUserId={currentUserId} />
      </Container>
    </div>
  );
}

export default PresentationPageView;
