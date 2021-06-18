import Game from "./game.js";
import Manual from "./manual.js";
import { sound } from "./../data/sound.js";
const Menu = ((_) => {
  const hangman = document.querySelector(".hangman");
  const init = (_) => {
    render();
    listeners();
  };
  const render = (_) => {
    let markup = "";
    markup += `
      <h1 class="hangman__title">Hangman</h1>
      <button class='button start'>New Game</button>
      <button class='button instructions'>How To Play</button>
    
    `;
    hangman.innerHTML = markup;
  };
  const listeners = (_) => {
    document.querySelector(".start").addEventListener("click", (_) => {
      Game.init();
      sound.click.play();
    });
    document.querySelector(".instructions").addEventListener("click", (_) => {
      Manual.init();
      sound.click.play();
    });
  };

  return {
    init,
  };
})();
export default Menu;
