import React from "react";
import "./App.css";

function Letter(props) {
  return <div className="letter">{props.visible && props.letter}</div>;
}

export default Letter;
