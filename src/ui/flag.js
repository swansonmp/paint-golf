const PADDING = 20;
const FLAG_WIDTH = 100;
const FLAG_HEIGHT = 75;
const TEXT_SIZE = 50;

export default class Flag {
  constructor(game) {
    this.game = game;
    
    this.flagColor = "rgba(255, 0, 0, 1)";
  }
  
  draw(ctx) {
    //Flag background
    ctx.fillStyle = this.flagColor;
    ctx.fillRect(PADDING, PADDING, FLAG_WIDTH, FLAG_HEIGHT);
    
    //Hole number indicator
    this.game.drawUtil.drawText( ctx,
        this.holeNum, 
        this.game.drawUtil.getPadding() + FLAG_WIDTH / 2,
        this.game.drawUtil.getPadding() + FLAG_HEIGHT / 2 + this.game.drawUtil.getDefaultTextSize() * 0.6 / 2,
        "center"
    );
  }
  
  update(deltaTime) {
    this.holeNum = this.game.gameData.getHoleNum();
  }
}