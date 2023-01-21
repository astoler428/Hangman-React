import "./App.css";
import Letter from "./Letter";
import Choices from "./Choices";
import Canvas from "./Canvas";
import winAudio from "./audio/winAudio.mp3";
import loseAudio from "./audio/loseAudio.mp3";
import React, { useEffect, useState } from "react";

const playWinAudio = new Audio(winAudio);
const playLoseAudio = new Audio(loseAudio);

function App() {
  const [word, setWord] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [gameResults, setGameResults] = useState({
    gameOver: false,
    win: false,
  });
  const [gameCount, setGameCount] = useState(0);

  useEffect(() => {
    getNewWord();
  }, []);

  useEffect(() => {
    if (gameResults.gameOver) return;

    if (
      incorrectGuesses === 6 ||
      (word.length > 0 && word.every((letterObj) => letterObj.visible === true))
    )
      endGame();
  }, [word, incorrectGuesses]);

  function getNewWord() {
    fetch("https://random-word-api.herokuapp.com/word").then((res) =>
      res.json().then((data) => {
        let letters = data.toString().toUpperCase().split("");
        setWord(
          letters.map((letter) => {
            return { letter: letter, visible: false };
          })
        );
        //these must be after word is set since they cause rerender before new word is set, setGuesses causes to check endGame in useEffect and if since fetch takes a while, word still looks solved
        setGameCount((prev) => prev + 1);
        setIncorrectGuesses(0);
      })
    );
  }
  console.log(word);

  function checkLetter(letter) {
    if (gameResults.gameOver) return;

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

  function endGame() {
    setGameResults({ gameOver: true, win: !(incorrectGuesses === 6) });

    !(incorrectGuesses === 6) ? playWinAudio.play() : playLoseAudio.play();

    //reveal word
    setTimeout(revealWord, 1000);

    function revealWord() {
      setWord((oldWord) =>
        oldWord.map((letterObj) => {
          return { ...letterObj, visible: true };
        })
      );
    }
  }

  function restartGame() {
    setGameResults({
      gameOver: false,
      win: false,
    });
    getNewWord();
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
        <Choices
          key={gameCount} //when key changes, component refreshes
          handleChoice={checkLetter}
          gameOver={gameResults.gameOver}
        />
        <Canvas key={gameCount + 1} incorrectGuesses={incorrectGuesses} />
      </div>
      <div className="results">
        <button onClick={restartGame}>Play Again</button>

        {gameResults.gameOver && (
          <div>{gameResults.win ? "You win!" : "Sorry, you lose."}</div>
        )}
      </div>
    </>
  );
}

export default App;
