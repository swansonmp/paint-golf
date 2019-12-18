const PADDING = 20;
const TEXT_SIZE = 50;

export default class HoleInfo {
  constructor(game) {
    this.game = game;
  }
  
  draw(ctx) {
    //Hole number indicator
    ctx.font = "bold " + TEXT_SIZE + "px monospace";
    ctx.textAlign = "left";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.strokeText("Hole " + this.holeNum, PADDING, TEXT_SIZE);
    ctx.fillStyle = "white";
    ctx.fillText("Hole " + this.holeNum, PADDING, TEXT_SIZE);
    
    //Par indicator
    ctx.font = "bold " + TEXT_SIZE + "px monospace";
    ctx.textAlign = "left";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.strokeText("Par " + this.par, PADDING, TEXT_SIZE * 2);
    ctx.fillStyle = "white";
    ctx.fillText("Par " + this.par, PADDING, TEXT_SIZE * 2);
    
    //Hole yardage indicator
    ctx.font = "small-caps bold " + TEXT_SIZE + "px monospace";
    ctx.textAlign = "left";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.strokeText(this.distance.toFixed(0) + "y", PADDING, TEXT_SIZE * 3);
    ctx.fillStyle = "white";
    ctx.fillText(this.distance.toFixed(0) + "y", PADDING, TEXT_SIZE * 3);
  }
  
  update(deltaTime) {
    this.holeNum = this.game.holeNum;
    this.par = this.game.course.getPar(this.game.holeNum);
    this.distance = this.game.course.getDistance(this.game.holeNum);
  }
}