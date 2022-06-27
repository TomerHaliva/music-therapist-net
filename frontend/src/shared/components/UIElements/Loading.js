import React from "react";
import ReactLoading from "react-loading";
import Backdrop from "./Backdrop";

import "./Loading.css";

const Loading = (props) => {
  return (
    <div className="loading">
      <Backdrop />
      <ReactLoading
        type={"balls"}
        color={"white"}
        height={"10%"}
        width={"10%"}
      />
    </div>
  );
};

export default Loading;
