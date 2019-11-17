export default class InputHandler {
  constructor(ball, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 13:
          console.log("ENTER key; calling start()");
          game.start();
          break;
        case 32:
          console.log("SPACE bar; calling strike()");
          game.strike();
          break;
        case 37:
          console.log("Left Arrow; calling decAngle()");
          ball.decAngle();
          break;
        case 39:
          console.log("Right Arrow; calling incAngle()");
          ball.incAngle();
          break;
        case 38:
          console.log("Up Arrow; calling incBag()");
          game.incBag();
          break;
        case 40:
          console.log("Down Arrow; calling decBag()");
          game.decBag();
          break;
        default:
      }
    });
  }
}
