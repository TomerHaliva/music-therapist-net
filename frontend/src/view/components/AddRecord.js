import axios from "axios";
import React, { useState, useReducer, useEffect } from "react";
import YouTube from "react-youtube";

import Modal from "../../shared/components/UIElements/Modal";
import { PlayerContext } from "../../shared/context/player-context";

import "./AddRecord.css";

const AddRecord = (props) => {
  console.log(props.playlist);
  // useEffect(() => {}, [props]);

  const formReducer = (state, action) => {
    switch (action.type) {
      case "TITLE_CHANGE":
        return { ...state, title: action.titleValue };

      case "ARTIST_CHANGE":
        return { ...state, artistName: action.artistNameValue };

      case "LINK_CHANGE":
        return { ...state, videoLink: action.videoLinkValue };

      case "LINK_SPLIT":
        console.log("In split");

      case "LINK_VALID":
        console.log("In valid");

        try {
          const shortLink = action.videoLinkValue.split("=")[1].split("&")[0];
          return { ...state, isVideoLinkValid: true, videoLink: shortLink };
        } catch (err) {
          return {
            ...state,
            isVideoLinkValid: false,
            videoLink: action.videoLinkValue,
          };
        }
    }
  };

  const [formState, formDispatch] = useReducer(formReducer, {
    title: "",
    artistName: "",
    videoLink: "",
    isVideoLinkValid: false,
    comments: [],
  });


  const addSongForm = (
    <div className="add-record-form">
      <label>Enter Record Title</label>
      <input
        onChange={(e) =>
          formDispatch({ type: "TITLE_CHANGE", titleValue: e.target.value })
        }
        value={formState.title}
      ></input>

      <label>Enter Record Artist Name</label>
      <input
        onChange={(e) =>
          formDispatch({
            type: "ARTIST_CHANGE",
            artistNameValue: e.target.value,
          })
        }
        value={formState.artistName}
      ></input>

      <label>Paste YouTube Link</label>
      <input
        onChange={(e) =>
          // formDispatch({ type: "LINK_VALID", videoLink: e.target.value })
          !formState.isVideoLinkValid
            ? formDispatch({
                type: "LINK_SPLIT",
                videoLinkValue: e.target.value,
              })
            : formDispatch({
                type: "LINK_VALID",
                videoLinkValue: e.target.value,
              })
        }
        value={formState.videoLink}
      ></input>
      {formState.isVideoLinkValid && (
        <div>
          <YouTube
            videoId={formState.videoLink}
            iframeClassName="add-record__iframe"
          />
        </div>
      )}
      {!formState.isVideoLinkValid && formState.videoLink && (
        <p className="add-record__validation-err">invalid YouTube link</p>
      )}
    </div>
  );

  const submitFormHandler = async (event, obj) => {
    event.preventDefault();
    //add record to playlist
    const record = {
      title: formState.title,
      artistName: formState.artistName,
      videoId: formState.videoLink,
      comments: formState.comments,
      playlist: props.playlist._id,
    };

    await axios
      .post("http://localhost:5000/api/records", record)
      .then(async (res) => {
        console.log(res);
        await axios
          .get(`http://localhost:5000/api/playlists/${props.playlist.id}`)
          .then((res) => {
            console.log(res);
            // setShowAdd(false);
            obj.switchRecord(res.data.playlist.records[0]);
            props.onAdded();
          });
      });
  };

  return (
    <PlayerContext.Consumer>
      {({ currentPlay, switchRecord }) => {
        return <React.Fragment>{addSongForm}</React.Fragment>;
      }}
    </PlayerContext.Consumer>
  );
};

export default AddRecord;
