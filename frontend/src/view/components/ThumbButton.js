import React, { useContext, useReducer, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ThumbButton.css";
import { PlayerContext } from "../../shared/context/player-context";

const ThumbButton = (props) => {
  const playerContext = useContext(PlayerContext);
  console.log(playerContext);

  const [record, setRecord] = useState(playerContext.currentPlay);

  const buttonReducer = (state, action) => {
    switch (action.type) {
      case "DECREMENT":
        if (action.action === "like")
          return { ...state, isActive: false, likes: state.likes - 1 };

        if (action.action === "unlike")
          return { ...state, isActive: false, unlikes: state.unlikes - 1 };

      case "INCREMENT":
        if (action.action === "like")
          return { ...state, isActive: true, likes: state.likes + 1 };

        if (action.action === "unlike")
          return { ...state, isActive: true, unlikes: state.unlikes + 1 };
    }
  };

  const [buttonState, buttonDispatch] = useReducer(buttonReducer, {
    isActive: false,
    icon: props.icon,
    size: props.size,
    likes: props.record.likes,
    unlikes: props.record.unlikes,
    action: props.action,
    record: playerContext.currentPlay,
  });

  const thumbClickHandler = async () => {
    console.log(buttonState.record);

    buttonState.isActive
      ? buttonDispatch({ type: "DECREMENT", action: buttonState.action })
      : buttonDispatch({ type: "INCREMENT", action: buttonState.action });

    console.log(buttonState);
    // await axios
    //   .patch(
    //     `http://localhost:5000/api/records/${props.record._id}`,
    //     buttonState
    //   )
    //   .then((res) => console.log(res));
  };

  return (
    <PlayerContext.Consumer>
      {({ currentPlay, switchRecord }) => {
        return (
          <span className="thumb-button">
            <FontAwesomeIcon
              className="thumb-button__icon"
              onClick={thumbClickHandler}
              icon={buttonState.icon}
              size={buttonState.size}
            />{" "}
            {buttonState.action === "like" && buttonState.likes}
            {buttonState.action === "unlike" && buttonState.unlikes}
          </span>
        );
      }}
    </PlayerContext.Consumer>
  );
};

export default ThumbButton;
