import React, { useReducer } from "react";

import "./AddComment.css";
import CommentsList from "./CommentsList";

const addCommentReducer = (state, action) => {
  switch (action.type) {
    case "COMMENT_INPUT":
      console.log(action.commentValue);
      if (action.commentValue.length > 0)
        return {
          ...state,
          commentValue: action.commentValue,
          showCommentBtns: true,
        };
      else
        return {
          ...state,
          commentValue: action.commentValue,
          showCommentBtns: false,
        };

    case "CANCEL":
      return { ...state, commentValue: "", showCommentBtns: false };

    case "ADD_COMMENT":
      state.comments.push({
        id: "3",
        userName: "Roni Haliva",
        text: "This is a comment",
        avatar: "RH",
      });
      return {
        ...state,
        commentValue: "",
        showCommentBtns: false,
      };

    default:
      return state;
  }
};

const AddComment = (props) => {
  const [commentState, dispatchAddComment] = useReducer(addCommentReducer, {
    commentValue: "",
    showCommentBtns: false,
    avater: props.avatar,
    comments: props.comments,
  });

  const commentChangeHandler = (event) => {
    dispatchAddComment({
      type: "COMMENT_INPUT",
      commentValue: event.target.value,
    });
  };

  const cancelCommentHandler = () => {
    dispatchAddComment({ type: "CANCEL" });
  };

  const addCommentHandler = (event) => {
    dispatchAddComment({
      type: "ADD_COMMENT",
      commentValue: event.target.value,
    });
    console.log(commentState.comments);
  };

  return (
    <div className="add-comment__container">
      <button className="add-comment__avatar">{props.avatar}</button>
      <div className="add-comment__info">
        <textarea
          placeholder="הוספת תגובה..."
          onChange={(event) => {
            commentChangeHandler(event);
          }}
          value={commentState.commentValue}
        ></textarea>
        {commentState.showCommentBtns && (
          <div className="add-comment__buttons">
            <span onClick={(event) => addCommentHandler(event)}>תגובה</span>
            <span onClick={(event) => cancelCommentHandler(event)}>ביטול</span>
          </div>
        )}
      </div>
      {/* <CommentsList items={commentState.comments}></CommentsList> */}
    </div>
  );
};

export default AddComment;
