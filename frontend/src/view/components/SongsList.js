import React, { useState } from "react";
import SongsItem from "./SongsItem";

import "./SongsList.css";
import AddRecordItem from "./AddRecordItem";

const SongsList = (props) => {
  console.log(props.playlistDetails);

  return (
    <ul className="songs-list">
      {/* <li className="song-item">
        <Card className="song-list__content">
          <button className="song-list__add" onClick={addRecordHandler}>
            +
          </button>
        </Card>
      </li> */}
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
      {/* <AddLanguagesItem id="ADD" name="Add Language" onClose={props.onAdded} /> */}
    </ul>
  );
};

export default SongsList;
