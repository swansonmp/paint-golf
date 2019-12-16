const PADDING = 20;

export default class HoleInfo {
  constructor(game) {
    this.game = game;
  }
  
  draw(ctx) {
    //Hole number indicator
    ctx.font = "bold 50px monospace";
    ctx.textAlign = "left";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.strokeText("Hole " + this.holeNum, PADDING, 50);
    ctx.fillStyle = "white";
    ctx.fillText("Hole " + this.holeNum, PADDING, 50);
    
    //Par indicator
    ctx.font = "bold 50px monospace";
    ctx.textAlign = "left";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.strokeText("Par " + this.par, PADDING, 50 * 2);
    ctx.fillStyle = "white";
    ctx.fillText("Par " + this.par, PADDING, 50 * 2);
    
    //Hole yardage indicator
    ctx.font = "small-caps bold 50px monospace";
    ctx.textAlign = "left";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.strokeText(this.distance + "y", PADDING, 50 * 3);
    ctx.fillStyle = "white";
    ctx.fillText(this.distance + "y", PADDING, 50 * 3);
  }
  
  update(deltaTime) {
    this.holeNum = this.game.holeNum;
    this.par = this.game.course.getPar(this.game.holeNum);
    this.distance = this.game.course.getDistance(this.game.holeNum);
  }
}