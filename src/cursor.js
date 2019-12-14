const CURSIZE = 16;
const RATE = 100;

export default class Cursor {
  constructor(game) {
    this.game = game;
    
    this.lastTime = 0;
    this.curX = 0;
    this.curY = 0;
    this.imageIndex = 0;
    this.image = [
        document.getElementById("cursor1"), 
        document.getElementById("cursor2"), 
        document.getElementById("cursor3")
    ];
  }
  
  draw(ctx) {    
    //draw cursor
    ctx.drawImage(
      this.image[this.imageIndex],
      this.curX - CURSIZE / 2,
      this.curY - CURSIZE,
      CURSIZE,
      CURSIZE
    );
    
    //draw text
    ctx.font = "small-caps bold 20px monospace";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.textAlign = "center";
    ctx.strokeText(this.game.bag.getClub().carry + "y", this.curX, this.curY - 22);
    ctx.fillStyle = "white";
    ctx.fillText(this.game.bag.getClub().carry + "y", this.curX, this.curY - 22);
  }
  
  update(deltaTime) {
    //calculate location
    this.curX = this.game.ball.getDrawX() + this.game.bag.getClub().carry * Math.cos(this.game.ball.angle);
    this.curY = this.game.ball.getDrawY() + this.game.bag.getClub().carry * Math.sin(this.game.ball.angle);
    
    //calculate animation
    this.lastTime += deltaTime;
    this.lastTime %= RATE * 3;
    if (this.lastTime < RATE) this.imageIndex = 0;
    else if (this.lastTime < RATE * 2) this.imageIndex = 1;
    else this.imageIndex = 2;
  }
}