const GAMESTATE = {
  IDLE: 0,
  STRIKING: 1,
  RUNNING: 2,
  MENU: 3
};

export default class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 13:
          //console.log("ENTER key; calling start()");
          game.start();
          break;
        case 32:
          //console.log("SPACE bar; calling ???");
          if (game.gamestate === GAMESTATE.IDLE) {
            game.gamestate = GAMESTATE.STRIKING;
            game.powerbar.start();
          }
          else if (game.gamestate === GAMESTATE.STRIKING) {
            game.powerbar.handle();
          }
          break;
        case 37:
          //console.log("Left Arrow; calling decAngle()");
          game.ball.decAngle();
          break;
        case 39:
          //console.log("Right Arrow; calling incAngle()");
          game.ball.incAngle();
          break;
        case 38:
          //console.log("Up Arrow; calling incBag()");
          game.bag.incBag();
          break;
        case 40:
          //console.log("Down Arrow; calling decBag()");
          game.bag.decBag();
          break;
        default:
      }
    });
  }
}
