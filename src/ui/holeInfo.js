const FLAG_WIDTH = 100;

export default class HoleInfo {
  constructor(game) {
    this.game = game;
  }
  
  draw(ctx) {
    //Par indicator
    this.game.drawUtil.drawText( ctx,
        "Par " + this.par, 
        this.game.drawUtil.getPadding() * 2 + FLAG_WIDTH,
        this.game.drawUtil.getDefaultTextSize(),
        "left",
        this.game.drawUtil.getDefaultTextSize(),
        this.game.drawUtil.getDefaultStrokeWidth(),
        false
    );
    
    //Hole yardage indicator    
    this.game.drawUtil.drawText( ctx,
        this.distance.toFixed(0) + "y", 
        this.game.drawUtil.getPadding() * 2 + FLAG_WIDTH,
        this.game.drawUtil.getDefaultTextSize() * 2,
        "left",
        this.game.drawUtil.getDefaultTextSize(),
        this.game.drawUtil.getDefaultStrokeWidth(),
        true
    );
  }
  
  update(deltaTime) {
    this.par = this.game.course.getPar(this.game.holeNum);
    this.distance = this.game.course.getDistance(this.game.holeNum);
  }
}