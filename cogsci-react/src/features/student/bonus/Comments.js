import React from "react";

function Comments({ bonusId }) {
  return (
    <aside className="pl-2 mt-5">
      <hr />
      <h3 id={bonusId}>Komentáre</h3>
    </aside>
  );
}

export default Comments;
