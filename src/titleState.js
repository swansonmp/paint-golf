const TITLE_SIZE = 96;
const HEADING_SIZE = 48;

export default class TitleState {
  constructor(game, menuState) {
    this.game = game;
    this.menuState = menuState;
  }
  
  update(deltaTime) { }
  
  draw(ctx) {
    //draw title
    ctx.font = "bold " + TITLE_SIZE + "px monospace";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(
      "paint-golf",
      this.game.GAME_WIDTH / 2,
      this.game.GAME_HEIGHT / 4
    );
    
    //draw subtitle
    ctx.font = "bold " + HEADING_SIZE + "px monospace";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(
      "Press Enter",
      this.game.GAME_WIDTH / 2,
      this.game.GAME_HEIGHT / 2 + this.game.GAME_HEIGHT / 4
    );
  }
  
  handleConfirm() {
    this.menuState.setState(this.menuState.getMainState());
  }
  
  handleBack() { }
  handleIncrement() { }
  handleDecrement() { }
  
}