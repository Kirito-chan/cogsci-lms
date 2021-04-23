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
import PresStatusButtons from "./PresStatusButtons";
import DeleteButton from "./DeleteButton";

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
  isAdmin,
  history,
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
          <div>
            <div className="mb-4">
              <Row>
                <Col>
                  <div className="d-flex">
                    <h2>{presentation.title}</h2>
                    <div className="ml-auto pt-1">
                      <DeleteButton
                        presentation={presentation}
                        isTeacherPres={isTeacherPres}
                      />
                    </div>
                  </div>
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
            {isAdmin && !isTeacherPres && (
              <PresStatusButtons
                status={presentation.status}
                presentationId={presentation.id}
                subjectId={subjectId}
                currentUserId={currentUserId}
                history={history}
              />
            )}
          </div>
        )}

        {presIsOpened && !presentation?.has_evaluated && (
          <Row>
            <Col>
              <PresentationEvaluation evaluatedUserId={presentation?.user_id} />
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
