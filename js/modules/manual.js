import Menu from "./menu.js";
import { sound } from "./../data/sound.js";

const Manual = ((_) => {
  const hangman = document.querySelector(".hangman");
  const init = (_) => {
    render();
    listeners();
  };

  const render = (_) => {
    let markup = `
    <h1 class="hangman__title animate__animated animate__backInLeft">How To Play</h1>
    <ul class="how animate__animated animate__backInRight">
      <li><span>Playing</span> the game is pretty straightforward</li>
      <li>All you need to do is<span> guess</span> the correct letters to make a word</li>
      <li>You will have total <span>7</span> lives. </li>
      <li>Lives will <span>decrease</span> each time you guess the wrong word</li>
      <li>If you <span>lose</span>,your character will be <span>hanged</span></li>
      <li>So, try your best to<span> win!</span></li>
      <li><span>Good Luck</span></li>
    </ul>
    <button class="animate__animated home button hangman__trigger"> <img src="./../../img/icons8-home-64.png" alt="logo"> </button>
    `;

    hangman.innerHTML = markup;
  };
  const listeners = (_) => {
    const home = document.querySelector(".home");

    home.addEventListener("click", () => {
      Menu.init();
      sound.click.play();
    });
  };
  return {
    init,
  };
})();

export default Manual;
