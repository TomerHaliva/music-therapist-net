import React, { useReducer, useContext, useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../../Firebase-config";

import { AuthContext } from "../../shared/context/auth-context";
import { PlayerContext } from "../../shared/context/player-context";

import "./AddComment.css";

const AddComment = (props) => {
  const authContext = useContext(AuthContext);
  const playerContext = useContext(PlayerContext);

  const [record, setRecord] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [commentValue, setCommentValue] = useState("");
  const [showCommentBtns, setShowCommentBtns] = useState(false);

  useEffect(() => {
    setCurrentUser(authContext.currentUser);
    setRecord(props.record);
  }, [props]);

  const commentChangeHandler = (event) => {
    setCommentValue(event.target.value);
    event.target.value.length > 0
      ? setShowCommentBtns(true)
      : setShowCommentBtns(false);
  };

  const cancelCommentHandler = () => {
    setCommentValue("");
    setShowCommentBtns(false);
  };

  const addCommentHandler = async (obj) => {
    const newComment = {
      text: commentValue,
      avatar: currentUser.avatar,
      uid: currentUser.uuid,
      record: record.title,
    };

    await axios
      .post("http://localhost:5000/api/comments", newComment)
      .then((res) => {
        setCommentValue("");
        setShowCommentBtns(false);
        obj.switchRecord({ ...obj.currentPlay, comments: res.data.comment });
      });
  };

  return (
    <PlayerContext.Consumer>
      {({ currentPlay, switchRecord }) => {
        return (
          <div className="add-comment__container">
            <button className="add-comment__avatar">
              {currentUser ? currentUser.avatar : ""}
            </button>
            <div className="add-comment__info">
              <textarea
                placeholder="הוספת תגובה..."
                onChange={(event) => {
                  commentChangeHandler(event);
                }}
                value={commentValue}
              ></textarea>
              {showCommentBtns && (
                <div className="add-comment__buttons">
                  <span
                    onClick={() =>
                      addCommentHandler({ currentPlay, switchRecord })
                    }
                  >
                    תגובה
                  </span>
                  <span onClick={() => cancelCommentHandler()}>ביטול</span>
                </div>
              )}
            </div>
          </div>
        );
      }}
    </PlayerContext.Consumer>
  );
};

export default AddComment;
