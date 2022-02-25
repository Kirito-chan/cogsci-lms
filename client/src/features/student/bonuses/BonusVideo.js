import React from "react";
import ReactPlayer from "react-player";
import "./BonusVideo.css";
import { ReactTinyLink } from "react-tiny-link";
import { isValidHTTPSUrl } from "../../../components/utils/StringUtils";

function BonusVideo({ url, isFocusing }) {
  const canPlay = ReactPlayer.canPlay(url);

  return (
    <div>
      {isFocusing && isValidHTTPSUrl(url) ? (
        <ReactTinyLink cardSize="small" showGraphic={true} url={url} />
      ) : canPlay ? (
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url={url}
            width="100%"
            height="100%"
            controls={false}
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
