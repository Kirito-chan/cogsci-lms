import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "../../../components/Navigation";
import CommentsList from "../bonus/CommentsList";
import PresentationEvaluation from "./PresentationEvaluation";
import { showLoaderIfNull } from "../../../components/StringUtils";
import download from "js-file-download";
import axios from "axios";
import { createUrlToDownloadPresentation } from "../../../constants";

function PresentationPageView({
  presentation,
  comments,
  currentUserId,
  presIsOpened,
  subjectId,
}) {
  const handleDownload = (e) => {
    e.preventDefault();
    axios
      .get(
        createUrlToDownloadPresentation(
          subjectId,
          presentation.id,
          presentation.path
        ),
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        download(res.data, presentation.path);
        // const url = window.URL.createObjectURL(new Blob([res.data]));
        // const link = document.createElement("a");
        // link.href = url;
        // link.setAttribute("download", presentation.path);
        // document.body.appendChild(link);
        // link.click();
        // link.parentNode.removeChild(link);
      });
  };
  return (
    <div>
      <Navigation />
      <Container>
        {showLoaderIfNull(presentation) || (
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
                  {presentation?.title + ".pptx"}
                </a>

                {/* <a href={getFile.url} download={getFile.saveAsFileName}></a> */}
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

        <CommentsList comments={comments} currentUserId={currentUserId} />
      </Container>
    </div>
  );
}

export default PresentationPageView;
