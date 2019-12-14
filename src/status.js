const SIZE = 75;
const PADDING = 20;
const BALL_SIZE = 25;
const TEXT_SIZE = 30;
const TEXT_PADDING = 2;

const PIXEL_TYPE = {
  TEE: 0,
  HOLE: 1,
  GREEN: 2,
  FAIRWAY: 3,
  ROUGH: 4,
  BUNKER: 5,
  WATER: 6
};

export default class Status {
  constructor(game) {
    this.game = game;
  }
  
  draw(ctx) {
    /*
    //draw strokes
    ctx.font = "small-caps bold 50px monospace";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.strokeText(this.game.strokes, this.game.GAME_WIDTH - PADDING * 4, this.game.GAME_HEIGHT - PADDING);
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(this.game.strokes, this.game.GAME_WIDTH - PADDING * 4, this.game.GAME_HEIGHT - PADDING);
    */
    
    this.drawHoleInfo(ctx);
    this.drawLieIndicator(ctx);
    
  }
  
  drawHoleInfo(ctx) {
    ctx.font = "small-caps bold 50px monospace";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.fillText("Par " + this.game.course.getPar(this.game.holeNum), PADDING, 50);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeText("Par " + this.game.course.getPar(this.game.holeNum), PADDING, 50);
    
    ctx.font = "small-caps bold 50px monospace";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.fillText(this.game.course.getDistance(this.game.holeNum) + "y", PADDING, 50 + 50);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeText(this.game.course.getDistance(this.game.holeNum) + "y", PADDING, 50 + 50);
  }
  
  drawLieIndicator(ctx) {
    //draw inside
    ctx.fillStyle = this.game.course.palette.getHexColor(this.game.ball.getPixelType());
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
        this.game.ball.getLieRate() * 100 +  "%",
        this.game.GAME_WIDTH - SIZE / 2 - PADDING,
        this.game.GAME_HEIGHT - PADDING
    );
    ctx.fillStyle = "white";
    ctx.fillText(
        this.game.ball.getLieRate() * 100 +  "%",
        this.game.GAME_WIDTH - SIZE / 2 - PADDING,
        this.game.GAME_HEIGHT - PADDING
    );
  }
}