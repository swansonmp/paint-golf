const PADDING = 20;
const TEXT_SIZE = 50;

export default class StrokeInfo {
  constructor(game) {
    this.game = game;
  }
  
  draw(ctx) {
    //draw strokes
    ctx.font = "small-caps bold 50px monospace";
    ctx.textAlign = "right";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.strokeText(this.strokes, this.game.GAME_WIDTH - PADDING, this.game.GAME_HEIGHT / 2);
    ctx.fillStyle = "white";
    ctx.fillText(this.strokes, this.game.GAME_WIDTH - PADDING, this.game.GAME_HEIGHT / 2);
  }
  
  update(deltaTime) {
    this.strokes = this.game.strokes;
  }
}