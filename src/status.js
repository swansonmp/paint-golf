export default class Status {
  constructor(game) {
    this.game = game;
  }
  
  draw(ctx) {
    const PADDING = 20;
    
    ctx.font = "small-caps bold 50px monospace";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.strokeText(this.game.strokes, this.game.GAME_WIDTH - PADDING * 4, this.game.GAME_HEIGHT - PADDING);
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(this.game.strokes, this.game.GAME_WIDTH - PADDING * 4, this.game.GAME_HEIGHT - PADDING);
  }
}