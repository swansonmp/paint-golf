export default class MenuState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    //nothing to update!
  }
  
  draw(ctx) {
    this.drawMenu(ctx);
  }
  
  drawMenu(ctx) {
    ctx.rect(0, 0, this.game.GAME_WIDTH, this.game.GAME_HEIGHT);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();

    ctx.font = "small-caps bold 50px monospace";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(
      "Press ENTER To Start",
      this.game.GAME_WIDTH / 2,
      this.game.GAME_HEIGHT / 2
    );
  }
  
  handleEnter() { 
    this.game.setState(this.game.getLoadState());
  }
  
  handleSpace() { }
  handleUpArrow() { }
  handleDownArrow() { }
  handleLeftArrow() { }
  handleRightArrow() { }
  
}