import "./App.css";
import React, { useState, useEffect, useRef } from "react";

//component for the area displaying all of the letters to click on
//Handles the click event or key press event and determines the styling

const alphabetInOne = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const startingAlphabet = alphabetInOne.split("").map((letter) => {
  return { letter: letter, chosen: false };
});
//props include gameOver boolean to know if events should be handled as well as the handler function
function Choices({ gameOver, handleChoice }) {
  //alphabet state will be an array of objects, where each object has a letter and chosen property
  const [alphabet, setAlphabet] = useState(startingAlphabet);
  //document key listener doesn't recognize current state so have to store it here
  const alphabetRef = useRef(alphabet);
  const gameOverRef = useRef(gameOver);
  alphabetRef.current = alphabet;
  gameOverRef.current = gameOver;

  useEffect(() => {
    document.onkeydown = handleEvent;
    return () => {
      document.removeEventListener("keydown", handleEvent);
    };
  }, []);

  //event handler for key pressed or key clicked that calls handleLetterChoice
  function handleEvent(e) {
    //if key pressed
    if (e.key) handleLetterChoice(e.key.toUpperCase());
    //else key clicked
    else handleLetterChoice(e.target.id);
  }

  //function that handles the letter choice regardless of click or press
  function handleLetterChoice(letter) {
    if (gameOverRef.current) return;

    //letterChoice will be the object in the alphabet that matches the letter chosen.
    //run through the alphabet and set letterChoice to the object that matches the letter
    let letterChoice;
    alphabetRef.current.forEach((letterObj) => {
      if (letterObj.letter === letter) letterChoice = letterObj;
    });
    //key other than alphabet was pressed
    if (!letterChoice) return;
    //if the letter is not already chosen, update alphabet state and call handleChoice
    if (!letterChoice.chosen) {
      setAlphabet((oldAlphabet) => {
        return oldAlphabet.map((letterObj) => {
          return letterObj.letter === letter
            ? { ...letterObj, chosen: true }
            : { ...letterObj };
        });
      });
      handleChoice(letter);
    }
  }

  let choices = alphabet.map((letterObj) => {
    let styles = {
      opacity: letterObj.chosen ? 0.2 : 1,
      cursor: letterObj.chosen || gameOver ? "auto" : "pointer",
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
