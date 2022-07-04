import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import YouTube from "react-youtube";

import Card from "../../shared/components/UIElements/Card";
import { setCurrentPlayer } from "../../shared/slices/playlistSlice";

import "./SongsItem.css";

const SongsItem = (props) => {
  const dispatch = useDispatch();

  const switchRecordHandler = async () => {
    await axios
      .get(`http://localhost:5000/api/records/${props.id}`)
      .then((res) => {
        const recordToDisplay = {
          ...res.data.record,
          playlist: res.data.record.playlist._id,
        };

        dispatch(setCurrentPlayer({ currentPlay: recordToDisplay }));
      });
  };
  return (
    <li className="song-item" onClick={() => switchRecordHandler()}>
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
};

export default SongsItem;
