import "./App.css";
import React, { useState } from "react";

const alphabetInOne = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabetArray = alphabetInOne.split("");
const startingAlphabet = alphabetArray.map((letter) => {
  return { letter: letter, chosen: false };
});

function Choices(props) {
  const [alphabet, setAlphabet] = useState(startingAlphabet);

  function handleClick(e) {
    let letterClicked = "";
    alphabet.forEach((letterObj) => {
      if (letterObj.letter === e.target.id) letterClicked = letterObj;
    });
    if (!letterClicked.chosen) {
      setAlphabet((oldAlphabet) => {
        return oldAlphabet.map((letterObj) => {
          return letterObj.letter === e.target.id
            ? { ...letterObj, chosen: true }
            : { ...letterObj };
        });
      });
      props.handleChoice(e.target.id);
    }
  }

  let choices = alphabet.map((letterObj) => {
    let styles = {
      opacity: letterObj.chosen ? 0.2 : 1,
      cursor: letterObj.chosen ? "auto" : "pointer",
    };
    return (
      <span
        className="choice"
        id={letterObj.letter}
        onClick={handleClick}
        key={letterObj.letter}
        style={styles}
      >
        {letterObj.letter}
      </span>
    );
  });

  return <div className="choices-container">{choices}</div>;
}

export default Choices;
