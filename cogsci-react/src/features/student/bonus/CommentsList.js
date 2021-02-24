import React, { useState } from "react";
import Comment from "./Comment";
import MyComment from "./MyComment";

function CommentsList({ bonusId, comments, currentUserName }) {
  const [myCommentClass, setMyCommentClass] = useState(-1);

  const handleOdpovedat = (event) => {
    setMyCommentClass(event.target.id);
    //dispatch(loadCurrentSubjectId(subjectId));
  };

  const handleZrusit = () => {
    setMyCommentClass(-1);
  };

  return (
    <aside className="pl-2 mt-5">
      <hr />
      <h3 id={bonusId} className="mb-3">
        Komentáre
      </h3>
      {comments.map((comment, i) => (
        <div key={i}>
          <Comment comment={comment} handleOdpovedat={handleOdpovedat} />
          <MyComment
            classname={myCommentClass == comment.id ? "" : "d-none"}
            currentUserName={currentUserName}
            handleZrusit={handleZrusit}
            placeholder="Reagovať na komentár..."
            rows={3}
          />
        </div>
      ))}

      <MyComment
        classname="ml-0 pl-0"
        currentUserName={currentUserName}
        handleZrusit={handleZrusit}
        placeholder="Pridať nový komentár..."
        rows={5}
        zrusitBtnClassname="d-none"
      />
    </aside>
  );
}

export default CommentsList;
