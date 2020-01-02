export default class CurrentYards {
  constructor(game) {
    this.game = game;
    this.currentYards = 0;
  }
  
  draw(ctx) {
    this.game.drawUtil.drawText( ctx,
        this.currentYards.toFixed(2) + "y", 
        this.game.GAME_WIDTH / 2, 
        this.game.GAME_HEIGHT - this.game.drawUtil.getPadding(),
        "center",
        this.game.drawUtil.getDefaultTextSize(),
        this.game.drawUtil.getDefaultStrokeWidth(),
        true
    );
  }
  
  update(deltaTime) {
    /*
    console.log(
      "Position     : " + this.game.ball.position.x.toFixed(1)     + ", " + this.game.ball.position.y.toFixed(1)     + "\n" +
      "LastPosition : " + this.game.ball.lastPosition.x.toFixed(1) + ", " + this.game.ball.lastPosition.y.toFixed(1)
    );
    */
    this.currentYards = Math.sqrt(
        Math.pow(this.game.ball.position.x - this.game.ball.lastPosition.x, 2) + 
        Math.pow(this.game.ball.position.y - this.game.ball.lastPosition.y, 2)
    );
  }
}