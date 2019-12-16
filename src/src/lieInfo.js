const SIZE = 75;
const PADDING = 20;
const BALL_SIZE = 25;
const TEXT_SIZE = 30;
const TEXT_PADDING = 2;

export default class LieInfo {
  constructor(game) {
    this.game = game;
  }
  
  draw(ctx) {
    //draw inside
    ctx.fillStyle = this.fillStyle;
    ctx.fillRect(this.game.GAME_WIDTH - SIZE - PADDING, this.game.GAME_HEIGHT - SIZE - PADDING - TEXT_SIZE - TEXT_PADDING, SIZE, SIZE);
    //draw ball
    ctx.drawImage(
      this.game.ball.image,
      this.game.GAME_WIDTH - PADDING - SIZE / 2 - BALL_SIZE / 2,
      this.game.GAME_HEIGHT - PADDING - SIZE / 2 - BALL_SIZE / 2 - TEXT_SIZE - TEXT_PADDING,
      BALL_SIZE,
      BALL_SIZE
    );
    //draw outline
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.lineWidth = 3;
    ctx.strokeRect(this.game.GAME_WIDTH - SIZE - PADDING, this.game.GAME_HEIGHT - SIZE - PADDING - TEXT_SIZE - TEXT_PADDING, SIZE, SIZE);
    //draw text
    ctx.font = "small-caps bold " + TEXT_SIZE + "px monospace";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.textAlign = "center";
    ctx.strokeText(
        this.lieRate * 100 +  "%",
        this.game.GAME_WIDTH - SIZE / 2 - PADDING,
        this.game.GAME_HEIGHT - PADDING
    );
    ctx.fillStyle = "white";
    ctx.fillText(
        this.lieRate * 100 +  "%",
        this.game.GAME_WIDTH - SIZE / 2 - PADDING,
        this.game.GAME_HEIGHT - PADDING
    );
  }
  
  update(deltaTime) {
    this.fillStyle = this.game.course.palette.getHexColor(this.game.ball.getPixelType());
    this.lieRate = this.game.ball.getLieRate();
  }
}