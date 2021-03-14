import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import formatTranslation from "../../../../components/StringUtils";
import { Link } from "react-router-dom";
import {
  createUrlToUploadPresentation,
  URL_PRESENTATIONS,
} from "../../../../constants";
import axios from "axios";

function MyPresentationList({
  myPresentation,
  presentationWeight,
  subjectId,
  currentUserId,
}) {
  const handleUpload = (e) => {
    e.preventDefault();
    const file = document.getElementById(
      `presentationUpload${myPresentation.id}`
    ).files[0];
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const data = new FormData();
    data.append("file", file);
    axios
      .post(
        createUrlToUploadPresentation(subjectId, false, currentUserId),
        data,
        config
      )
      .then(() => {
        //console.log(res.statusText);
      });
  };

  return (
    <div className="mt-5 mb-5">
      <h3>Moja prezentácia</h3>
      <div>
        {Object.entries(myPresentation).length !== 0 ? (
          ""
        ) : (
          <span className="text-secondary">Neodovzdaná prezentácia</span>
        )}

        <div key={myPresentation.id}>
          <Link
            // prettier-ignore
            to={"/subject/" + subjectId + URL_PRESENTATIONS + "/" + myPresentation.id + "?is_my=true"}
            className="pl-0 nav-link"
          >
            {myPresentation.title}
          </Link>
          <p>
            <b>Hodnotenie:</b>{" "}
            {myPresentation.points ? myPresentation.points : 0} z{" "}
            {presentationWeight} {formatTranslation(presentationWeight, "bod")}
          </p>
        </div>

        <Form className="mt-4" onSubmit={handleUpload}>
          <Form.Group>
            <Form.File id={"presentationUpload" + myPresentation.id} />
          </Form.Group>
          <Button size="sm" type="submit" variant="success">
            Pridať prezentáciu
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default MyPresentationList;
