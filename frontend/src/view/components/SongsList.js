import React from "react";
import SongsItem from "./SongsItem";

import "./SongsList.css";

const SongsList = (props) => {
  return (
    <ul className="songs-list">
      {props.items.map((song) => (
        <SongsItem
          key={song.title}
          id={song.title}
          videoId={song.videoId}
          title={song.title}
          artistName={song.artistName}
        />
      ))}
      {/* <AddLanguagesItem id="ADD" name="Add Language" onClose={props.onAdded} /> */}
    </ul>
  );
};

export default SongsList;
