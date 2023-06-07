import "./App.css";
import React, { useState, useEffect, useRef } from "react";

const alphabetInOne = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const startingAlphabet = alphabetInOne.split("").map((letter) => {
  return { letter: letter, chosen: false };
});

function Choices(props) {
  const [alphabet, setAlphabet] = useState(startingAlphabet);
  //document key listener doesn't recognize current state so have to store it here
  const alphabetRef = useRef(alphabet);
  const gameOverRef = useRef(props.gameOver);
  alphabetRef.current = alphabet;
  gameOverRef.current = props.gameOver;

  useEffect(() => {
    document.onkeydown = handleEvent;

    return () => {
      document.removeEventListener("keydown", handleEvent);
    };
  }, []);

  function handleEvent(e) {
    if (e.key) handleClick(e.key.toUpperCase());
    else handleClick(e.target.id);
  }

  function handleClick(letter) {
    if (gameOverRef.current) return;

    let letterClicked = "";
    alphabetRef.current.forEach((letterObj) => {
      if (letterObj.letter === letter) letterClicked = letterObj;
    });
    if (!letterClicked.chosen) {
      setAlphabet((oldAlphabet) => {
        return oldAlphabet.map((letterObj) => {
          return letterObj.letter === letter
            ? { ...letterObj, chosen: true }
            : { ...letterObj };
        });
      });
      props.handleChoice(letter);
    }
  }

  let choices = alphabet.map((letterObj) => {
    let styles = {
      opacity: letterObj.chosen ? 0.2 : 1,
      cursor: letterObj.chosen || props.gameOver ? "auto" : "pointer",
    };
    return (
      <span
        className="choice"
        id={letterObj.letter}
        onClick={handleEvent}
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
