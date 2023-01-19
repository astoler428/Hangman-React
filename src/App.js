import "./App.css";
import Letter from "./Letter";
import Choices from "./Choices";
import Canvas from "./Canvas";
import React, { useEffect, useState } from "react";

function App() {
  const [word, setWord] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word").then((res) =>
      res.json().then((data) => {
        let letters = data.toString().toUpperCase().split("");

        setWord(
          letters.map((letter) => {
            return { letter: letter, visible: false };
          })
        );
      })
    );
  }, []);
  // console.log(word);

  function checkLetter(letter) {
    let wordContainsLetter = false;
    word.forEach((wordObj) => {
      if (wordObj.letter === letter) wordContainsLetter = true;
    });
    if (wordContainsLetter) {
      setWord((oldWord) =>
        oldWord.map((letterObj) => {
          return letterObj.letter === letter
            ? { ...letterObj, visible: true }
            : { ...letterObj };
        })
      );
    } else {
      setIncorrectGuesses((prev) => prev + 1);
    }
  }

  let letterElements = word.map((letterObject) => (
    <Letter
      key={Math.random()}
      visible={letterObject.visible}
      letter={letterObject.letter}
    />
  ));

  return (
    <>
      <div className="letters-container">{letterElements}</div>
      <div className="container">
        <Choices handleChoice={checkLetter} />
        <Canvas incorrectGuesses={incorrectGuesses} />
      </div>
    </>
  );
}

export default App;

/*
deal with gameOver - reveal word, stop accepting answers, display gameOver
allow playAgain
*/
