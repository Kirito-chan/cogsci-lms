import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "../../../components/Navigation";
import CommentsList from "../bonus/CommentsList";
import PresentationEvaluation from "./PresentationEvaluation";
import { showLoaderIfAnyNull } from "../../../components/StringUtils";
import download from "js-file-download";
import axios from "axios";
import { createUrlToDownloadPresentation } from "../../../constants";

function PresentationPageView({
  presentation,
  comments,
  currentUserId,
  presIsOpened,
  subjectId,
  isTeacherPres,
  commentsMap,
  refToScrolledElement,
  setScrollElementIndex,
  insertComment,
  loadComments,
}) {
  const handleDownload = (e) => {
    e.preventDefault();
    axios
      .get(
        createUrlToDownloadPresentation(
          subjectId,
          presentation.id,
          presentation.path,
          isTeacherPres
        ),
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        download(res.data, presentation.path);
      });
  };
  return (
    <div>
      <Navigation />
      <Container>
        {showLoaderIfAnyNull(presentation) || (
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
                <p className="d-inline">
                  <b>Prevziať:</b>{" "}
                </p>
                <a
                  onClick={handleDownload}
                  href={presentation.path ? presentation.path : "#"}
                >
                  {presentation.path}
                </a>
              </Col>
            </Row>
          </div>
        )}

        {presIsOpened && (
          <Row>
            <Col>
              <PresentationEvaluation />
            </Col>
          </Row>
        )}

        <CommentsList
          comments={comments}
          currentUserId={currentUserId}
          commentsMap={commentsMap}
          id={presentation?.id}
          refToScrolledElement={refToScrolledElement}
          setScrollElementIndex={setScrollElementIndex}
          insertComment={insertComment}
          loadComments={loadComments}
        />
      </Container>
    </div>
  );
}

export default PresentationPageView;
