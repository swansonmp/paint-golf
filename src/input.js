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
          game.strike(10, 10, 20);
          break;
        default:
      }
    });
  }
}
