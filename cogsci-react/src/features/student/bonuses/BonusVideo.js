import React from "react";
//import ReactPlayer from "react-player";

function BonusVideo({ url }) {
  return (
    //<ReactPlayer url={url} />
    <div className={"embed-responsive embed-responsive-16by9 mb-3 "}>
      <iframe
        className={"embed-responsive-item"}
        src={url}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default BonusVideo;
