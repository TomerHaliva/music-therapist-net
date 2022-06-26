import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

import "./Comment.css";

const Comment = (props) => {
  return (
    <div className="comment__container">
      <div className="comment__avatar-container">
        <button className="comment__avatar">{props.avatar}</button>
      </div>
      <div className="comment__info">
        <h4>{props.userName}</h4>
        <p>{props.text}</p>
        <div className="comment__toolbar">
          <FontAwesomeIcon icon={faThumbsUp} />
          {props.likes}
          <FontAwesomeIcon
            icon={faThumbsDown}
            style={{ marginTop: "0.1rem" }}
          />
          {props.unlikes}
        </div>
      </div>
    </div>
  );
};

export default Comment;
