import React, { useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import YouTube from "react-youtube";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";

import "./AddRecordItem.css";
import { initPlaylist } from "../../shared/slices/playlistSlice";

const AddRecordItem = (props) => {
  console.log(props);

  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist);
  const [showAdd, setShowAdd] = useState(false);

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

  const submitFormHandler = async (event, switchRecord) => {
    event.preventDefault();
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
          .get(`http://localhost:5000/api/playlists/${playlist.name}`)
          .then((res) => {
            console.log(res);
            setShowAdd(false);
            dispatch(
              initPlaylist({
                ...res.data.playlist,
                currentPlay: res.data.playlist.records[0],
              })
            );

            setShowAdd(false);
          });
      });
  };

  const openAddHandler = () => setShowAdd(true);
  const closeAddHandler = () => setShowAdd(false);

  return (
    <React.Fragment>
      <Modal
        show={showAdd}
        onCancel={closeAddHandler}
        footer={
          <React.Fragment>
            <button id="cancel" onClick={closeAddHandler}>
              CANCEL
            </button>
            <button
              id="submit"
              type="submit"
              onClick={(e) => submitFormHandler(e)}
            >
              SUBMIT
            </button>
          </React.Fragment>
        }
        footerClass="add-language"
      >
        <div className="addLanguage-container">
          <h2>Add a new record</h2>
          {addSongForm}
        </div>
      </Modal>
      <li className={`song-item ${props.addClass ?? ''}`} onClick={openAddHandler}>
        <Card className="song-item__add-content">
          <button className="song-list__add">+</button>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default AddRecordItem;
