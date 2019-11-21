export default class LoadState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    //load the hole
    
    //set ball
    this.game.ball.reset();
    
    //go to idle state
    this.game.setState(this.game.getIdleState());
  }
  
  draw(ctx) {
    this.drawLoadScreen(ctx);
  }
  
  drawLoadScreen(ctx) {
    ctx.rect(0, 0, this.game.gameWidth, this.game.gameHeight);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();

    ctx.font = "small-caps bold 50px monospace";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(
      "Loading...",
      this.game.gameWidth / 2,
      this.game.gameHeight / 2
    );
  }
  
  handleEnter() { }
  handleSpace() { }
  handleUpArrow() { }
  handleDownArrow() { }
  handleLeftArrow() { }
  handleRightArrow() { }
  
}