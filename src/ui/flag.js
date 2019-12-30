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
    ctx.font = "bold " + TEXT_SIZE + "px monospace";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.strokeText(this.holeNum, PADDING + FLAG_WIDTH / 2, PADDING + FLAG_HEIGHT / 2 + TEXT_SIZE * 0.6 / 2);
    ctx.fillStyle = "white";
    ctx.fillText(this.holeNum, PADDING + FLAG_WIDTH / 2, PADDING + FLAG_HEIGHT / 2 + TEXT_SIZE * 0.6 / 2);
  }
  
  update(deltaTime) {
    this.holeNum = this.game.holeNum;
  }
}