import React from "react";

import Comment from "./Comment";
import Card from "../../shared/components/UIElements/Card";
import "./CommentsList.css";

const CommentsList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>אין תגובות</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="comment-list">
      {props.items.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          userName={comment.userName}
          text={comment.text}
          avatar={comment.avatar}
          likes={comment.likes}
          unlikes={comment.unlikes}
        />
      ))}
    </ul>
  );
};

export default CommentsList;
