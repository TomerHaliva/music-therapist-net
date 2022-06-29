import React, { useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";

import AddComment from "../components/AddComment";
import CommentsList from "../components/CommentsList";
import Loading from "../../shared/components/UIElements/Loading";
import SongsList from "../components/SongsList";
import { PlayerContext } from "../../shared/context/player-context";
import { AuthContext } from "../../shared/context/auth-context";

import "./ViewScreen.css";

const ViewScreen = () => {
  const language = useParams().language;
  const genre = useParams().genre;

  const playerContext = useContext(PlayerContext);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadPlaylist().then(setLoaded(true));
  }, []);

  const [playlist, setPlaylist] = useState([]);
  const [currentPlay, setCurrentPlay] = useState({});

  const switchRecord = useCallback((record) => {
    playerContext.currentPlay = record;
    setCurrentPlay(record);
  }, []);

  const loadPlaylist = async () => {
    await axios
      .get(`http://localhost:5000/api/genres/${genre}`) // GET genre by id
      .then(async (res) => {
        if (res.data.genre.type === "genre") {
          // if Genre been chosen
          await axios
            .get(`http://localhost:5000/api/playlists/${genre}`) // GET playlist which is genre
            .then((res) => {
              console.log(res);
              setPlaylist(res.data.playlist.records);
              switchRecord(res.data.playlist.records[0]);
            })
            .catch((err) => {
              console.log(err.response.data.message);
              createPlaylist(genre);
            });
        } else {
          // if Decade been chosen
        }
      })
      .catch((err) => console.log(err.response.data.message));
  };

  const createPlaylist = async (playlistName) => {
    console.log(playlistName);
    const newPlaylist = { id: playlistName, name: playlistName };
    await axios
      .post("http://localhost:5000/api/playlists", newPlaylist)
      .then(() => {
        console.log(`${playlistName} playlist created!`);
        // setPlaylist(newPlaylist);
      })
      .catch((err) => console.log(err));
  };

  if (!playlist) return <Loading show={true} />;
  if (playlist.length === 0) return <div>No songs</div>;

  return (
    <PlayerContext.Provider
      value={{ currentPlay: currentPlay, switchRecord: switchRecord }}
    >
      <div className="view-screen__container">
        <div className="view-screen__primary">
          <div className="view-screen__player-container">
            <YouTube
              iframeClassName="view-screen__player"
              videoId={playerContext.currentPlay.videoId}
            ></YouTube>
          </div>
          <div className="view-screen__info">
            <h1>{playerContext.currentPlay.title}</h1>
            <h2>{playerContext.currentPlay.artistName}</h2>
          </div>
          <div className="view-screen__comments-container">
            <h4>{`${
              playerContext.currentPlay.comments
                ? playerContext.currentPlay.comments.length
                : 0
            } תגובות`}</h4>
            {Object.keys(playerContext.currentPlay).length > 0 ? (
              <AddComment
                record={playerContext.currentPlay}
                onAdded={(comment) => {
                  console.log(comment);
                  playerContext.currentPlay.comments = comment;
                  setCurrentPlay({ ...currentPlay, comments: comment });
                }}
              ></AddComment>
            ) : null}
          </div>
          <CommentsList
            items={playerContext.currentPlay.comments}
          ></CommentsList>
        </div>

        <div className="view-screen__secondary">
          <SongsList items={playlist} />
        </div>
      </div>
    </PlayerContext.Provider>
  );
};

export default ViewScreen;
