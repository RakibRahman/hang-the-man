const Canvas = ((_) => {
  let lifeRemaining = null;
  let canvas;
  let context;

  const init = (_) => {
    canvas = document.querySelector(".hangman__board");
    context = canvas.getContext("2d");
    context.strokeStyle = "#F14";
    context.lineWidth = 2;
    base();
  };
  const draw = (startX, startY, endX, endY) => {
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
  };

  // base line
  const lineTop = (_) => draw(10, 15, 150, 15);
  const lineMiddle = (_) => draw(13, 3, 20, 150);
  const lineBottom = (_) => draw(10, 150, 150, 150);

  const rope = (_) => draw(60, 35, 60, 15);

  const head = (_) => {
    context.beginPath();
    context.arc(60, 45, 10, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = "lightyellow";
    context.fill();
  };

  const torso = (_) => draw(60, 56, 60, 90);
  const rightArm = (_) => draw(60, 56, 100, 60);
  const leftArm = (_) => draw(60, 56, 20, 60);
  const rightLeg = (_) => draw(60, 90, 100, 110);
  const leftLeg = (_) => draw(60, 90, 20, 110);

  const base = (_) => {
    lineTop();
    lineMiddle();
    lineBottom();
  };
  const figure = [rope, head, leftArm, rightArm, leftLeg, torso, rightLeg];

  const render = (_) => {
    figure[lifeRemaining]();
  };

  const setLife = (newLife) => {
    lifeRemaining = newLife;
    render();
  };
  return {
    init,
    setLife,
  };
})();
export default Canvas;
