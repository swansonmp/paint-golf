export default class StrokeInfo {
  constructor(game) {
    this.game = game;
  }
  
  draw(ctx) {
    //draw strokes
    this.game.drawUtil.drawText( ctx,
        this.strokes, 
        this.game.GAME_WIDTH - this.game.drawUtil.getPadding(),
        this.game.GAME_HEIGHT / 2,
        "right",
        this.game.drawUtil.getDefaultTextSize(),
        this.game.drawUtil.getDefaultStrokeWidth(),
        false
    );
  }
  
  update(deltaTime) {
    this.strokes = this.game.strokes;
  }
}