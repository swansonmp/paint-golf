const CURSIZE = 16;
const RATE = 100;
const TEXT_SIZE = 20;
const TEXT_PADDING = 2;
const LINE_WIDTH = 2;

const LINE_RATE = 0.001;
const COLOR1 = "rgba(144, 144, 255, 0.5)";
const COLOR2 = "rgba(255, 255, 255, 0.5)"

export default class Cursor {
  constructor(game) {
    this.game = game;
    
    this.offset = 0;
    this.lastTime = 0;
    this.ballX = 0;
    this.ballY = 0;
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
    //draw line
    this.grd = ctx.createLinearGradient(this.ballX, this.ballY, this.curX, this.curY);
    if (this.offset >= 0.4) this.grd.addColorStop(-0.4 + this.offset, COLOR1);
    if (this.offset >= 0.2) this.grd.addColorStop(-0.2 + this.offset, COLOR2);
    this.grd.addColorStop(0 + this.offset, COLOR1);
    this.grd.addColorStop(0.2 + this.offset, COLOR2);
    this.grd.addColorStop(0.4 + this.offset, COLOR1);
    if (this.offset <= 0.4) this.grd.addColorStop(0.6 + this.offset, COLOR2);
    if (this.offset <= 0.2) this.grd.addColorStop(0.8 + this.offset, COLOR1);
    if (this.offset <= 0) this.grd.addColorStop(1 + this.offset, COLOR2);
    ctx.strokeStyle = this.grd;
    ctx.lineWidth = LINE_WIDTH;
    ctx.beginPath();
    ctx.moveTo(this.ballX + 2, this.ballY + 2);
    ctx.lineTo(this.curX, this.curY);
    ctx.stroke();  
    
    //draw cursor
    ctx.drawImage(
      this.image[this.imageIndex],
      this.curX - CURSIZE / 2,
      this.curY - CURSIZE,
      CURSIZE,
      CURSIZE
    );
    
    //draw text
    ctx.font = "small-caps bold " + TEXT_SIZE + "px monospace";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.textAlign = "center";
    ctx.strokeText(this.game.bag.getClub().carry + "y", this.curX, this.curY - TEXT_SIZE - TEXT_PADDING);
    ctx.fillStyle = "white";
    ctx.fillText(this.game.bag.getClub().carry + "y", this.curX, this.curY - TEXT_SIZE - TEXT_PADDING);
  }
  
  update(deltaTime) {
    //calculate location
    this.ballX = this.game.ball.getDrawX();
    this.ballY = this.game.ball.getDrawY();
    this.curX = this.ballX + this.game.bag.getClub().carry * this.game.ball.scale * Math.cos(this.game.ball.angle);
    this.curY = this.ballY + this.game.bag.getClub().carry * this.game.ball.scale * Math.sin(this.game.ball.angle);
    
    //calculate line offset
    this.offset += deltaTime * LINE_RATE;
    if (this.offset > 0.4) this.offset = 0; 
    
    //calculate animation
    this.lastTime += deltaTime;
    this.lastTime %= RATE * 3;
    if (this.lastTime < RATE) this.imageIndex = 0;
    else if (this.lastTime < RATE * 2) this.imageIndex = 1;
    else this.imageIndex = 2;
  }
}