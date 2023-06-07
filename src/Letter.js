import React from "react";
import "./App.css";

//simple component that displays the letter if visible property is set to true
//styles with className "letter"

function Letter({ letterObj }) {
  return <div className="letter">{letterObj.visible && letterObj.letter}</div>;
}

export default Letter;
