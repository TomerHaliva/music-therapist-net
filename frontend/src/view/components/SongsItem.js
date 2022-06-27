import React from "react";

import Card from "../../shared/components/UIElements/Card";
import YouTube from "react-youtube";

import "./SongsItem.css";

const SongsItem = (props) => {
  return (
    <li className="song-item" onClick={(e) => e.preventDefault()}>
      <Card className="song-item__content">
        <div
          className="song-item-video"
          onClick={(e) => {
            e.preventDefault();
            console.log("clikced");
          }}
        >
          <YouTube
            videoId={props.videoId}
            iframeClassName="iframe"
            className="video"
            onClick={(e) => {
              e.preventDefault();
              console.log("clikced");
            }}
            // opts={{ playerVars: { enablejsapi: 1 } }}
            // onStateChange={(e) => {
            //   e.target.stopVideo();
            // }}
          />
        </div>
        <div className="song-item__info">
          <h4>{props.title}</h4>
          <h5>{props.artistName}</h5>
        </div>
      </Card>
    </li>
  );
};

export default SongsItem;
