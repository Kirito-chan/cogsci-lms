import React from "react";

function BonusVideo({ url }) {
  return (
    <div className="embed-responsive embed-responsive-16by9 mb-3">
      <iframe
        className="embed-responsive-item"
        src={url}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default BonusVideo;
