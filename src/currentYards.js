export default class CurrentYards {
  constructor(game) {
    this.game = game;
    this.currentYards = 0;
  }
  
  draw(ctx) {
    this.game.drawUtil.drawText( ctx,
        this.currentYards.toFixed(1) + "y", 
        this.game.GAME_WIDTH / 2, 
        this.game.GAME_HEIGHT - this.game.drawUtil.getPadding(),
        "center",
        this.game.drawUtil.getDefaultTextSize(),
        this.game.drawUtil.getDefaultStrokeWidth(),
        true
    );
  }
  
  update(deltaTime) {
    this.currentYards = this.game.ball.position.distance2D(this.game.ball.lastPosition);
  }
}