const Gameover = ((_) => {
  const hangman = document.querySelector(".hangman");
  const state = {
    winOrLose: null,
    correctWord: null,
  };
  const setState = (obj) => {
    state.winOrLose = obj.result;
    state.correctWord = obj.correctWord;
    render();
  };
  const render = (_) => {
    let markup = "";
    markup = `
        <h1 class="hangman__title">GAME OVER</h1>
        <p class="result">
        YOU ${state.winOrLose.toUpperCase()}!
        <br>
        <br>
     The Word is 🥢 ${state.correctWord.toUpperCase()}

        </p>
        <button class="button hangman__trigger">Main Menu</button>
    `;
    hangman.innerHTML = markup;
  };
  return {
    setState,
  };
})();
export default Gameover;
