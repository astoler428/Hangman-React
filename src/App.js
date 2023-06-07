import "./App.css";
import Letter from "./Letter";
import Choices from "./Choices";
import Canvas from "./Canvas";
import winAudio from "./audio/winAudio.mp3";
import loseAudio from "./audio/loseAudio.mp3";
import useFetchWord from "./useFetchWord";
import React, { useEffect, useState } from "react";

const playWinAudio = new Audio(winAudio);
const playLoseAudio = new Audio(loseAudio);

function App() {
  // word will be an array of objects where each object is a letter and a visible boolean
  const [word, setWord] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [gameResults, setGameResults] = useState({
    gameOver: false,
    win: false,
  });
  //tracks number of games
  const [gameCount, setGameCount] = useState(0);

  //custom hook to generate a word
  useFetchWord(setWord, setGameCount, setIncorrectGuesses, gameResults);

  //checks for the end of the game
  //dependency array includes word because when a letter is guessed, the word state is changed
  useEffect(() => {
    if (gameResults.gameOver) return;
    if (
      incorrectGuesses === 6 ||
      (word.length > 0 && word.every((letterObj) => letterObj.visible === true))
    )
      endGame();
  }, [word, incorrectGuesses]);

  //event listener for when a letter is chosen
  //first checks if letter is in word at all. If so, change to visible, if not, increment incorrectGuesses
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

  //determines if win or loss, plays audio and reveals word
  function endGame() {
    setGameResults({ gameOver: true, win: !(incorrectGuesses === 6) });
    !(incorrectGuesses === 6) ? playWinAudio.play() : playLoseAudio.play();
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
    // new word gets generated because of dependency array in useFetchWord
  }

  let letterElements = word.map((letterObject) => (
    <Letter key={Math.random()} letterObj={letterObject} />
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
