import React, { useState, useReducer } from "react";
import YouTube from "react-youtube";

import AddComment from "../components/AddComment";
import CommentsList from "../components/CommentsList";

import "./ViewScreen.css";

const COMMENTS = [
  {
    id: "1",
    userName: "Tomer Haliva",
    text: "This is a comment",
    avatar: "TH",
    likes: 8,
    unlikes: 0
  },
  {
    id: "2",
    userName: "Gal Itach",
    text: "This is a comment",
    avatar: "GI",
    likes: 32,
    unlikes: 9
  },
];

const ViewScreen = () => {
  // const [commentCount, setCommentCount] = useState(0);

  return (
    <div className="view-screen__container">
      <div className="view-screen__primary">
        <div className="view-screen__player-container">
          <YouTube
            iframeClassName="view-screen__player"
            videoId="9-lEXSv4vv8"
          ></YouTube>
        </div>
        <div className="view-screen__info">
          <h1>Title</h1>
          <h2>artist</h2>
        </div>
        <div className="view-screen__comments-container">
          <h4>{`${COMMENTS.length} תגובות`}</h4>
          <AddComment avatar={"TH"} comments={COMMENTS}></AddComment>
        </div>
        {/* <div className="view-screen__comments"></div> */}
        <CommentsList items={COMMENTS}></CommentsList>
      </div>

      <div className="view-screen__secondary">sec</div>
    </div>
  );
};

export default ViewScreen;
