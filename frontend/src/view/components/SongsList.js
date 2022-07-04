import React from "react";
import { useSelector } from "react-redux";
import SongsItem from "./SongsItem";

import "./SongsList.css";
import AddRecordItem from "./AddRecordItem";

const SongsList = (props) => {
  console.log(props.playlistDetails);

  return (
    <ul className="songs-list">
      <AddRecordItem playlist={props.playlistDetails} onAdded={props.onAdded} />
      {props.items.map((song) => (
        <SongsItem
          key={song._id}
          id={song._id}
          videoId={song.videoId}
          title={song.title}
          comments={song.comments}
          artistName={song.artistName}
        />
      ))}
    </ul>
  );
};

export default SongsList;
