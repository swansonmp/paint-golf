const PADDING = 20;
const TEXT_SIZE = 50;

export default class CurrentYards {
  constructor(game) {
    this.game = game;
    this.currentYards = 0;
  }
  
  draw(ctx) {
    ctx.font = "small-caps bold " + TEXT_SIZE + "px monospace";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.strokeText(this.currentYards.toFixed(2), this.game.GAME_WIDTH / 2, this.game.GAME_HEIGHT - PADDING);
    ctx.fillStyle = "white";
    ctx.fillText(this.currentYards.toFixed(2), this.game.GAME_WIDTH / 2, this.game.GAME_HEIGHT - PADDING);
  }
  
  update(deltaTime) {
    console.log(
      "Position     : " + this.game.ball.position.x.toFixed(1)     + ", " + this.game.ball.position.y.toFixed(1)     + "\n" +
      "LastPosition : " + this.game.ball.lastPosition.x.toFixed(1) + ", " + this.game.ball.lastPosition.y.toFixed(1)
    );
    this.currentYards = Math.sqrt(
        Math.pow(this.game.ball.position.x - this.game.ball.lastPosition.x, 2) + 
        Math.pow(this.game.ball.position.y - this.game.ball.lastPosition.y, 2)
    );
  }
}