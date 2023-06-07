import { useEffect } from "react";

export default function useFetchWord(
  setWord,
  setGameCount,
  setIncorrectGuesses,
  gameResults
) {
  useEffect(() => {
    //gameResults is set twice, once to signal the end of the game and once to restart
    //only fetch on restart
    if (gameResults.gameOver === true) return;

    fetch("https://random-word-api.herokuapp.com/word").then((res) =>
      res.json().then((data) => {
        let letters = data.toString().toUpperCase().split("");
        setWord(
          letters.map((letter) => {
            return { letter: letter, visible: false };
          })
        );
        //these must be after word is set since they cause rerender before new word is set, setIncorrectGuesses causes to check endGame in useEffect and since fetch takes a while, word still looks solved
        setGameCount((prev) => prev + 1);
        setIncorrectGuesses(0);
      })
    );
  }, [gameResults]);
}
