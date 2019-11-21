import Hole from "./hole.js";

export default class LoadState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    //load the hole
    this.game.hole = new Hole(this.game);
    this.game.loader.loadHole(this.game.hole);
    
    //set ball
    this.game.ball.reset(20, 20, 0);
    
    //go to idle state
    this.game.setState(this.game.getIdleState());
  }
  
  draw(ctx) {
    this.drawLoadScreen(ctx);
  }
  
  drawLoadScreen(ctx) {
    ctx.rect(0, 0, this.game.GAME_WIDTH, this.game.GAME_HEIGHT);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();

    ctx.font = "small-caps bold 50px monospace";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(
      "Loading...",
      this.game.GAME_WIDTH / 2,
      this.game.GAME_HEIGHT / 2
    );
  }
  
  handleEnter() { }
  handleSpace() { }
  handleUpArrow() { }
  handleDownArrow() { }
  handleLeftArrow() { }
  handleRightArrow() { }
  
}