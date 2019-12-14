const RATE = 50;
const BALL_SIZE = 8;

export default class TitleState {
  constructor(game) {
    this.game = game;
    
    this.ballX = 0;
    this.ballY = this.game.GAME_HEIGHT / 2 - BALL_SIZE / 2;
  }
  
  update(deltaTime) {
    deltaTime /= RATE;
    this.ballX += deltaTime;
    if (this.ballX >= this.game.GAME_WIDTH) {
      this.ballY = Math.floor(Math.random() * this.game.GAME_HEIGHT);
      this.ballX %= this.game.GAME_WIDTH;
    }
  }
  
  draw(ctx) {
    //draw background
    ctx.rect(0, 0, this.game.GAME_WIDTH, this.game.GAME_HEIGHT);
    ctx.fillStyle = "rgba(34,177,76,1)";
    ctx.fill();
    
    //draw ball
    ctx.drawImage(
      this.game.ball.image,
      this.ballX,
      this.ballY,
      BALL_SIZE,
      BALL_SIZE
    );
    
    //draw title
    ctx.font = "bold 96px monospace";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(
      "paint-golf",
      this.game.GAME_WIDTH / 2,
      this.game.GAME_HEIGHT / 4
    );
    
    //draw subtitle
    ctx.font = "small-caps bold 48px monospace";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(
      "Press Enter",
      this.game.GAME_WIDTH / 2,
      this.game.GAME_HEIGHT / 2 + this.game.GAME_HEIGHT / 4
    );
  }
  
  handleConfirm() {
    this.game.setState(this.game.getMainState());
  }
  
  handleEnter() { this.handleConfirm(); }
  handleSpace() { this.handleConfirm(); }
  handleUpArrow() { }
  handleDownArrow() { }
  handleLeftArrow() { }
  handleRightArrow() { this.handleConfirm(); }
  
}