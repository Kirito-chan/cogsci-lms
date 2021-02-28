import React from "react";

function PresentationPageView({ presentation }) {
  return (
    <div>
      <h1>{presentation?.title}</h1>
    </div>
  );
}

export default PresentationPageView;
