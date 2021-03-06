import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCurrentPlayer } from "../../shared/slices/playlistSlice";
import { AuthContext } from "../../shared/context/auth-context";
import { PlayerContext } from "../../shared/context/player-context";

import "./AddComment.css";

const AddComment = (props) => {
  const authContext = useContext(AuthContext);

  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist);

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
        console.log(res.data);
        setCommentValue("");
        setShowCommentBtns(false);
        // playlist.currentPlay.comments = res.da
        // obj.switchRecord({ ...obj.currentPlay, comments: res.data.comment });
        dispatch(setCurrentPlayer({ comment: res.data }));
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
                placeholder="?????????? ??????????..."
                onChange={(event) => {
                  commentChangeHandler(event);
                }}
                value={commentValue}
              ></textarea>
              {showCommentBtns && (
                <div className="add-comment__buttons">
                  <span
                    id="submit-comment"
                    onClick={() =>
                      addCommentHandler({ currentPlay, switchRecord })
                    }
                  >
                    ??????????
                  </span>
                  <span onClick={() => cancelCommentHandler()}>??????????</span>
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
