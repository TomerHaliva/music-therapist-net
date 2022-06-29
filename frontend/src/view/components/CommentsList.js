import React, { useEffect } from "react";

import { PlayerContext } from "../../shared/context/player-context";
import Comment from "./Comment";
import Card from "../../shared/components/UIElements/Card";
import "./CommentsList.css";

const CommentsList = (props) => {
  if (!props.items || props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>אין תגובות</h2>
        </Card>
      </div>
    );
  }

  return (
    <PlayerContext.Consumer>
      {({currentPlay, switchRecord}) => (
        <ul className="comment-list">
          {props.items.map((comment) => (
            <Comment
              key={comment._id}
              id={comment._id}
              uid={comment.uid}
              text={comment.text}
              avatar={comment.avatar}
              likes={comment.likes}
              unlikes={comment.unlikes}
            />
          ))}
        </ul>
      )}
    </PlayerContext.Consumer>
  );
};

export default CommentsList;
