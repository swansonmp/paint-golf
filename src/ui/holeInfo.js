const PADDING = 20;
const FLAG_WIDTH = 100;
const TEXT_SIZE = 50;

export default class HoleInfo {
  constructor(game) {
    this.game = game;
  }
  
  draw(ctx) {
    //Par indicator
    ctx.font = "bold " + TEXT_SIZE + "px monospace";
    ctx.textAlign = "left";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.strokeText("Par " + this.par, PADDING * 2 + FLAG_WIDTH, TEXT_SIZE);
    ctx.fillStyle = "white";
    ctx.fillText("Par " + this.par, PADDING * 2 + FLAG_WIDTH, TEXT_SIZE);
    
    //Hole yardage indicator
    ctx.font = "small-caps bold " + TEXT_SIZE + "px monospace";
    ctx.textAlign = "left";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.strokeText(this.distance.toFixed(0) + "y", PADDING * 2 + FLAG_WIDTH, TEXT_SIZE * 2);
    ctx.fillStyle = "white";
    ctx.fillText(this.distance.toFixed(0) + "y", PADDING * 2 + FLAG_WIDTH, TEXT_SIZE * 2);
  }
  
  update(deltaTime) {
    this.par = this.game.course.getPar(this.game.holeNum);
    this.distance = this.game.course.getDistance(this.game.holeNum);
  }
}