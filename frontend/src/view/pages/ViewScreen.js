import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  initPlaylist,
  setCurrentPlayer,
} from "../../shared/slices/playlistSlice";
import YouTube from "react-youtube";
import axios from "axios";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

import AddComment from "../components/AddComment";
import CommentsList from "../components/CommentsList";
import Loading from "../../shared/components/UIElements/Loading";
import SongsList from "../components/SongsList";
import Card from "../../shared/components/UIElements/Card";
import ThumbButton from "../components/ThumbButton";
import AddRecordItem from "../components/AddRecordItem";

import "./ViewScreen.css";

const ViewScreen = () => {
  const genre = useParams().genre;

  const playlist = useSelector((state) => state.playlist);
  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadPlaylist();
    console.log("loadPlaylist");
  }, []);

  // const init = () => {
  //   setLoaded(false);
  //   loadPlaylist();
  // };

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
        }
      })
      .catch((err) => console.log(err.response.data.message))
      .finally(async () => {
        await axios
          .get(`http://localhost:5000/api/playlists/${playlistId}`)
          .then((res) => {
            dispatch(
              initPlaylist({
                _id: res.data.playlist._id,
                name: res.data.playlist.name,
                records: res.data.playlist.records,
                currentPlay: res.data.playlist.records[0],
              })
            );
            setLoaded(true);
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
        // switchRecord(res.data.playlist.records[0]);
        dispatch(
          setCurrentPlayer({ currentPlay: res.data.playlist.records[0] })
        );

        setLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  if (!loaded) return <Loading />;
  else {
    if (playlist.records.length === 0) {
      return (
        <React.Fragment>
          <div className="center">
            <Card>
              <h2>לא קיימים שירים עבור פלייליסט זה</h2>
            </Card>
          </div>
          <ul>
            <AddRecordItem addClass="add-record" playlist={playlist} />
          </ul>
        </React.Fragment>
      );
    }

    return (
      <div className="view-screen__container">
        <div className="view-screen__primary">
          <div className="view-screen__player-container">
            <YouTube
              iframeClassName="view-screen__player"
              videoId={playlist.currentPlay.videoId}
            ></YouTube>
          </div>
          <div className="view-screen__info">
            <div>
              <h1>{playlist.currentPlay.title}</h1>
              <h2>{playlist.currentPlay.artistName}</h2>
            </div>
            <div className="view-screen__info__likes">
              <ThumbButton
                icon={faThumbsUp}
                size="xl"
                // likes={playlist.currentPlay.likes}
                // unlikes={playlist.currentPlay.unlikes}
                action="like"
                // record={playlist.currentPlay}
              />
              <ThumbButton
                icon={faThumbsDown}
                size="xl"
                // likes={playlist.currentPlay.likes}
                // unlikes={playlist.currentPlay.unlikes}
                action="unlike"
                // record={playlist.currentPlay}
              />
            </div>
          </div>
          <div className="view-screen__comments-container">
            <h4>{`${
              playlist.currentPlay.comments
                ? playlist.currentPlay.comments.length
                : 0
            } תגובות`}</h4>
            {Object.keys(playlist.currentPlay).length > 0 ? (
              <AddComment record={playlist.currentPlay} />
            ) : null}
          </div>
          <CommentsList items={playlist.currentPlay.comments} />
        </div>

        <div className="view-screen__secondary">
          <SongsList items={playlist.records} playlistDetails={playlist} />
        </div>
      </div>
    );
  }
};

export default ViewScreen;
