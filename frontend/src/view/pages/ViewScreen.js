import React, { useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

import AddComment from "../components/AddComment";
import CommentsList from "../components/CommentsList";
import Loading from "../../shared/components/UIElements/Loading";
import SongsList from "../components/SongsList";
import Card from "../../shared/components/UIElements/Card";
import ThumbButton from "../components/ThumbButton";

import { PlayerContext } from "../../shared/context/player-context";

import "./ViewScreen.css";
import AddRecordItem from "../components/AddRecordItem";

const ViewScreen = () => {
  const genre = useParams().genre;

  const playerContext = useContext(PlayerContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadPlaylist();
    console.log("loadPlaylist");
  }, []);

  const [currentPlay, setCurrentPlay] = useState({});
  useEffect(() => {
    console.log("player context changed");
  }, [playerContext]);

  const [playlist, setPlaylist] = useState([]);
  const [playlistDetails, setPlaylistDetails] = useState({});

  const switchRecord = useCallback((record) => {
    console.log("switching");
    playerContext.currentPlay = record;
    setCurrentPlay(record);
    // setCurrentPlay(record);
    console.log(playerContext.currentPlay);
    // console.log(currentPlay);

  }, []);

  const init = () => {
    setLoaded(false);
    loadPlaylist();
  };

  const loadPlaylist = async () => {
    console.log(loaded);
    let playlistId;
    await axios
      .get(`http://localhost:5000/api/genres/${genre}`) // GET genre by id
      .then(async (res) => {
        if (res.data.genre.type === "genre") {
          playlistId = genre;
        } else {
          const currentLanguage = localStorage.getItem("language");
          const obj = JSON.parse(currentLanguage);
          console.log(res.data.genre);
          playlistId = `${obj.name}-${obj.id}-${res.data.genre.id}`;

          // await axios
          //   .get(`http://localhost:5000/api/languages/${res.data.genre._id}`)
          //   .then((res) => {
          //     playlistId = `${res.data.language.name}-${res.data.language.id}`;
          //     console.log("playlist id second " + playlistId);
          //   })
          //   .catch((err) => {});
        }
      })
      .catch((err) => console.log(err.response.data.message))
      .finally(async () => {
        await axios
          .get(`http://localhost:5000/api/playlists/${playlistId}`)
          .then((res) => {
            // console.log(res.data.playlist.records);
            setPlaylist(res.data.playlist.records);
            switchRecord(res.data.playlist.records[0]);
            setCurrentPlay(res.data.playlist.records[0]);
            setPlaylistDetails(res.data.playlist);
            setLoaded(true);
            // console.log("done");
          })
          .catch((err) => {
            console.log(err.response.data.message);
            createPlaylist(playlistId);
          });
      });
  };

  const createPlaylist = async (playlistName) => {
    console.log(playlistName);
    const newPlaylist = { id: playlistName, name: playlistName };
    await axios
      .post("http://localhost:5000/api/playlists", newPlaylist)
      .then((res) => {
        console.log(`${playlistName} playlist created!`);
        setPlaylist(res.data.playlist.records);
        switchRecord(res.data.playlist.records[0]);
        setPlaylistDetails(res.data.playlist);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  if (!loaded) return <Loading />;
  else {
    if (playlist.length === 0) {
      return (
        <PlayerContext.Provider
          value={{ currentPlay: currentPlay, switchRecord: switchRecord }}
        >
          <React.Fragment>
            <div className="center">
              <Card>
                <h2>לא קיימים שירים עבור פלייליסט זה</h2>
              </Card>
            </div>
            <AddRecordItem playlist={playlistDetails} onAdded={init} />
          </React.Fragment>
        </PlayerContext.Provider>
      );
    }

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
              <div>
                <h1>{playerContext.currentPlay.title}</h1>
                <h2>{playerContext.currentPlay.artistName}</h2>
              </div>
              <div className="view-screen__info__likes">
                <ThumbButton
                  icon={faThumbsUp}
                  size="xl"
                  likes={playerContext.currentPlay.likes}
                  unlikes={playerContext.currentPlay.unlikes}
                  action="like"
                  record={playerContext.currentPlay}
                />
                <ThumbButton
                  icon={faThumbsDown}
                  size="xl"
                  likes={playerContext.currentPlay.likes}
                  unlikes={playerContext.currentPlay.unlikes}
                  action="unlike"
                  record={playerContext.currentPlay}
                />
              </div>
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
                  // onAdded={(comment) => {
                  //   console.log(comment);
                  //   playerContext.currentPlay.comments = comment;
                  //   setCurrentPlay({ ...currentPlay, comments: comment });
                  // }}
                ></AddComment>
              ) : null}
            </div>
            <CommentsList
              items={playerContext.currentPlay.comments}
            ></CommentsList>
          </div>

          <div className="view-screen__secondary">
            <SongsList
              items={playlist}
              playlistDetails={playlistDetails}
              onAdded={init}
            />
          </div>
        </div>
        {/* {console.log(loaded)} */}
      </PlayerContext.Provider>
    );
  }
};

export default ViewScreen;
