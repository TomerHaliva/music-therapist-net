import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initThumbBtn, increment } from "../../shared/slices/thumbsSlice";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ThumbButton.css";

const ThumbButton = (props) => {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist);
  const thumbBtn = useSelector((state) => state.thumbBtn);

  // const [loaded, setLoaded] = useEffect(false);

  useEffect(() => {
    dispatch(
      initThumbBtn({
        isActive: false,
        record: playlist.currentPlay,
      })
    );
    // setLoaded(true);
    // console.log(playlist);
  }, [playlist]);

  const thumbClickHandler = async () => {
    if(props.action === "like"){
      if(!thumbBtn.isActive)
      dispatch(increment())
      else dispatch()
    }
    // console.log(buttonState.record);
    // buttonState.isActive
    //   ? buttonDispatch({ type: "DECREMENT", action: buttonState.action })
    //   : buttonDispatch({ type: "INCREMENT", action: buttonState.action });
    // console.log(buttonState);
    // await axios
    //   .patch(
    //     `http://localhost:5000/api/records/${props.record._id}`,
    //     buttonState
    //   )
    //   .then((res) => console.log(res));
  };

  return (
    <span className="thumb-button">
      <FontAwesomeIcon
        className="thumb-button__icon"
        onClick={thumbClickHandler}
        icon={props.icon}
        size={props.size}
      />{" "}
      {props.action === "like" && thumbBtn.record.likes}
      {props.action === "unlike" && thumbBtn.record.unlikes}
    </span>
  );
};

export default ThumbButton;
