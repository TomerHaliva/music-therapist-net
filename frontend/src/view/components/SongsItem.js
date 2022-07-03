import axios from "axios";
import React, { useContext } from "react";
import YouTube from "react-youtube";

import Card from "../../shared/components/UIElements/Card";
import { PlayerContext } from "../../shared/context/player-context";

import "./SongsItem.css";

const SongsItem = (props) => {
  const playerContext = useContext(PlayerContext);
  // console.log(playerContext);

  const switchRecordHandler = async (obj) => {
    await axios
      .get(`http://localhost:5000/api/records/${props.id}`)
      .then((res) => {
        console.log(res.data.record);
        // obj.currentPlay = res.data.record;
        obj.switchRecord(res.data.record);
      });
  };
  return (
    <PlayerContext.Consumer>
      {({ currentPlay, switchRecord }) => {
        return (
          <li
            className="song-item"
            onClick={() => switchRecordHandler({ currentPlay, switchRecord })}
          >
            <Card className="song-item__content">
              <div className="song-item-video">
                <YouTube
                  videoId={props.videoId}
                  iframeClassName="iframe"
                  className="video"
                  opts={{ playerVars: { modestbranding: 1, controls: 0 } }}
                />
              </div>
              <div className="song-item__info">
                <h4>{props.title}</h4>
                <h5>{props.artistName}</h5>
              </div>
            </Card>
          </li>
        );
      }}
    </PlayerContext.Consumer>
  );
};

export default SongsItem;
