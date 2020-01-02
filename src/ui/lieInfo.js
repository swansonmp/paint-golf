const SIZE = 75;
const BALL_SIZE = 25;
const TEXT_PADDING = 2;


export default class LieInfo {
  constructor(game) {
    this.game = game;
  }
  
  draw(ctx) {
    //draw inside
    ctx.fillStyle = this.fillStyle;
    ctx.fillRect(
        this.game.GAME_WIDTH - SIZE - this.game.drawUtil.getPadding(), 
        this.game.GAME_HEIGHT - SIZE - this.game.drawUtil.getPadding() - this.game.drawUtil.getDefaultTextSize() * 0.6 - TEXT_PADDING, 
        SIZE, 
        SIZE
    );
    //draw ball
    ctx.drawImage(
        this.game.ball.image,
        this.game.GAME_WIDTH - this.game.drawUtil.getPadding() - SIZE / 2 - BALL_SIZE / 2,
        this.game.GAME_HEIGHT - this.game.drawUtil.getPadding() - SIZE / 2 - BALL_SIZE / 2 - this.game.drawUtil.getDefaultTextSize() * 0.6 - TEXT_PADDING,
        BALL_SIZE,
        BALL_SIZE
    );
    //draw outline
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.lineWidth = 3;
    ctx.strokeRect(
        this.game.GAME_WIDTH - SIZE - this.game.drawUtil.getPadding(), 
        this.game.GAME_HEIGHT - SIZE - this.game.drawUtil.getPadding() - this.game.drawUtil.getDefaultTextSize() * 0.6 - TEXT_PADDING, 
        SIZE, 
        SIZE
    );
    //draw text
    this.game.drawUtil.drawText( ctx,
        this.lieRate * 100 +  "%", 
        this.game.GAME_WIDTH - SIZE / 2 - this.game.drawUtil.getPadding(),
        this.game.GAME_HEIGHT - this.game.drawUtil.getPadding(),
        "center",
        this.game.drawUtil.getDefaultTextSize() * 0.6,
        this.game.drawUtil.getDefaultStrokeWidth() * 0.6,
        true
    );
  }
  
  update(deltaTime) {
    this.fillStyle = this.game.course.palette.getHexColor(this.game.ball.getPixelType());
    this.lieRate = this.game.ball.getLieRate();
  }
}