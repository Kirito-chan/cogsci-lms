import React from "react";
import ReactPlayer from "react-player";
import "./BonusVideo.css";
import { ReactTinyLink } from "react-tiny-link";

function BonusVideo({ url, isFocusing }) {
  const canPlay = ReactPlayer.canPlay(url);
  console.log(isFocusing);

  return (
    <div>
      {isFocusing ? (
        <ReactTinyLink cardSize="small" showGraphic={true} url={url} />
      ) : canPlay ? (
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url={url}
            width="100%"
            height="100%"
            controls={false}
            //width={width != null && width != undefined ? width + "px" : "0px"}
            //height={height != null && height != undefined ? height + "px" : "0px"}
          />
        </div>
      ) : (
        <div className={"embed-responsive embed-responsive-16by9 mb-3 "}>
          <iframe
            className={"embed-responsive-item"}
            src={url}
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default BonusVideo;
