import { sound } from "../data/sound.js";
import Menu from "./menu.js";
import Gameover from "./gameover.js";
import Canvas from "./canvas.js";
const Game = ((_) => {
  const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const words = [
    "mango",
    "ball",
    "cat",
    "parrot",
    "javascript",
    "node",
    "front",
  ];
  let chosenWord;
  let guessedWord;
  let lives;
  let guesses;

  const hangman = document.querySelector(".hangman");

  //! Start The Game
  const init = (_) => {
    chosenWord = chooseWord();
    guessedWord = Array(chosenWord.length).fill("_");
    guesses = [];
    lives = 7;
    showGameScreen();
    listeners();
    Canvas.init();
  };

  //! Generate Game Screen
  const showGameScreen = (_) => {
    let elements = "";
    elements = `
    <p class="hangman__stats animate__animated animate__pulse">Lives: <span class="hangman__lives">${lives}</span> </p>
    <div> <button class="hangman__hint">Hint?</button> <p class="hangman__puzzle">${generateHint()}</p> </div>
    <h1 class="hangman__title animate__animated animate__headShake">hang<img src="./../../img/icons8-hang-30.png" alt="logo">man</h1> 
    <canvas class="hangman__board" height="155px"></canvas>
    <div class="hangman__word">${guessedWord.join("")}</div>
    <p class="hangman__instructions">Select letters to guess the correct word. </p>
    <ul class="hangman__letters">
    ${showLetters()}
    </ul>
    <button class="hangman__trigger button animate__animated"> Main Menu </button>
   
    `;
    hangman.innerHTML = elements;
  };

  //! generate a random word
  const chooseWord = (_) => {
    words.sort((a, b) => 0.5 - Math.random());
    return words[0];
  };
  const generateHint = (_) => {
    const word = chosenWord;
    let random = Math.floor(Math.random() * word.length);
    let change1 = word[random];
    let change2 = word[word.length - 1];
    let res = word.replace(change1, "_");
    return res.replace(change2, "_");
  };
  //! show letters
  const showLetters = (_) => {
    let markup = ``;
    letters.forEach((letter) => {
      //gray the letter if its pushed to the guessedWord
      const isActive = alreadyPushed(letter) ? "hangman__letter--active" : "";
      markup += `
      <li class="hangman__letter ${isActive}">${letter}</li>
    `;
    });
    return markup;
  };
  const listeners = (_) => {
    hangman.addEventListener("click", (e) => {
      //Go back to Menu Screen
      if (e.target.matches(".hangman__trigger")) {
        Menu.init();
        sound.click.play();
      }
      // get data from li tag
      if (e.target.matches(".hangman__letter")) {
        sound.kb.play();
        check(e.target.innerText.toLowerCase());
      }
    });
    const hintBtn = document.querySelector(".hangman__hint");
    const hintWord = document.querySelector(".hangman__puzzle");
    hintWord.style.display = "none";
    hintBtn.addEventListener("click", (_) => {
      hintBtn.innerText = "Hint:";
      hintWord.style.display = "inline-block";

      if ((hintWord.style.display = "inline-block")) {
        setTimeout(() => {
          hintBtn.innerText = "Hint?";
          hintWord.style.display = "none";
        }, 2000);
      }
    });
  };
  const alreadyPushed = (letter) => {
    //return if similar word already exists in guesses array
    return guesses.includes(letter);
  };
  const check = (guess) => {
    if (alreadyPushed(guess)) return;
    guesses.push(guess);

    //check if the guessed letter exists in chosen word
    if (chosenWord.includes(guess)) {
      updateWord(guess);
    } else {
      lives--; // decrease lives if false
      Canvas.setLife(lives);
    }
    render();
    isGameOver();
  };

  const render = (_) => {
    document.querySelector(".hangman__lives").innerHTML = lives;
    document.querySelector(".hangman__word").innerHTML = guessedWord
      .join("")
      .toUpperCase();
    document.querySelector(".hangman__letters").innerHTML = showLetters();
  };

  const playerWon = (_) => guessedWord.join("") === chosenWord;

  const playerLose = (_) => lives <= 0;

  const isGameOver = (_) => {
    //if players wins
    if (playerWon()) {
      setTimeout(() => {
        sound.win.play();
        Gameover.setState({
          correctWord: chosenWord,
          result: "Saved the day",
        });
      }, 500);
    }
    if (playerLose()) {
      setTimeout(() => {
        sound.lose.play();
        Gameover.setState({
          correctWord: chosenWord,
          result: "Lose",
        });
      }, 500);
    }
  };

  const updateWord = (letter) => {
    chosenWord.split("").forEach((alphabet, index) => {
      if (alphabet === letter) {
        //if letter is same as alphabet replace it
        guessedWord[index] = letter;
      }
    });
  };
  return {
    init,
  };
})();

export default Game;
