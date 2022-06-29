import React from "react";
import SongsItem from "./SongsItem";

import "./SongsList.css";

const SongsList = (props) => {
  return (
    <ul className="songs-list">
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
