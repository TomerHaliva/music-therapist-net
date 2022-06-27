import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";

import AddComment from "../components/AddComment";
import CommentsList from "../components/CommentsList";
import Loading from "../../shared/components/UIElements/Loading";

import "./ViewScreen.css";
import SongsList from "../components/SongsList";

const COMMENTS = [
  {
    id: "1",
    userName: "Tomer Haliva",
    text: "This is a comment",
    avatar: "TH",
    likes: 8,
    unlikes: 0,
  },
  {
    id: "2",
    userName: "Gal Itach",
    text: "This is a comment",
    avatar: "GI",
    likes: 32,
    unlikes: 9,
  },
];

const ViewScreen = () => {
  const language = useParams().language;
  const genre = useParams().genre;

  useEffect(() => {
    loadPlaylist();
  }, []);

  const [playlist, setPlaylist] = useState();

  const loadPlaylist = async () => {
    await axios
      .get(`http://localhost:5000/api/genres/${genre}`) // GET genre by id
      .then(async (res) => {
        if (res.data.genre.type === "genre") {
          // if Genre been chosen
          await axios
            .get(`http://localhost:5000/api/playlists/${genre}`) // GET playlist which is genre
            .then((res) => {
              // console.log(res);
              setPlaylist(res.data.playlist.records);
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

  // if (playlist.records.length === 0) return <Loading show={true} />;
  if (!playlist) return <Loading show={true} />;
  if (playlist.length === 0) return <div>No songs</div>;
  console.log(playlist);

  return (
    <div className="view-screen__container">
      <div className="view-screen__primary">
        <div className="view-screen__player-container">
          <YouTube
            iframeClassName="view-screen__player"
            videoId="GMkmQlfOJDk"
          ></YouTube>
        </div>
        <div className="view-screen__info">
          <h1>{playlist[0].title}</h1>
          <h2>{playlist[0].artistName}</h2>
        </div>
        <div className="view-screen__comments-container">
          <h4>{`${playlist[0].comments.length} תגובות`}</h4>
          <AddComment
            avatar={"TH"}
            comments={playlist[0].comments}
          ></AddComment>
        </div>
        {/* <div className="view-screen__comments"></div> */}
        <CommentsList items={playlist[0].comments}></CommentsList>
      </div>

      <div className="view-screen__secondary">
        <SongsList items={playlist} />
      </div>
    </div>
  );
};

export default ViewScreen;
