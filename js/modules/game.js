import { sound } from "../data/sound.js";
import Menu from "./menu.js";
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
  const words = ["mango", "ball", "cat", "parrot"];
  let chosenWord;
  let guessedWord;
  let lives;
  let guesses;

  const hangman = document.querySelector(".hangman");

  const init = (_) => {
    chosenWord = chooseWord();
    guessedWord = Array(chosenWord.length).fill("_");
    guesses = [];
    lives = 6;
    showGameScreen();
    listeners();
  };

  //! Generate Game Screen
  const showGameScreen = (_) => {
    let elements = "";
    elements = `
    <p class="hangman__stats">Lives: <span class="hangman__lives">${lives}</span> </p>
    <h1 class="hangman__title">hangman</h1> 
    <canvas class="hangman__board" height="155px"></canvas>
    <div class="hangman__word">${guessedWord.join("")}</div>
    <p class="hangman__instructions">Select letters to guess the correct word. </p>
    <ul class="hangman__letters">
    ${showLetters()}
    </ul>
    <button class="hangman__trigger button">Main Menu</button>
    `;
    hangman.innerHTML = elements;
  };

  //! get a random word
  const chooseWord = (_) => {
    words.sort((a, b) => 0.5 - Math.random());
    return words[0];
  };
  //! show letters
  const showLetters = (_) => {
    let markup = ``;
    letters.forEach((letter) => {
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
        sound.click.play();
        check(e.target.innerText.toLowerCase());
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
      setTimeout(() => alert("You Win"), 500);
    }
    if (playerLose()) {
      alert("Loser");
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
