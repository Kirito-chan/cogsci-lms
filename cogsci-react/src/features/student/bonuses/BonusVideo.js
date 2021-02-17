import React from "react";

function BonusVideo({ url }) {
  return (
    <div className="embed-responsive embed-responsive-16by9 my-lg-3 video w-50">
      <iframe
        className="embed-responsive-item video"
        src={url}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default BonusVideo;
