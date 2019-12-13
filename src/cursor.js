//const CURLEN = 48;
const CURSIZE = 16;

export default class Cursor {
  constructor(game) {
    this.game = game;
    this.lastTime = 0;
    this.curX = 0;
    this.curY = 0;
    
    this.image = [
        document.getElementById("cursor1"), 
        document.getElementById("cursor2"), 
        document.getElementById("cursor3")
    ];
    this.imageIndex = 0;
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
  }
  
  update(deltaTime) {
    //calculate location
    this.curX = this.game.ball.getDrawX() + this.game.bag.getClub().carry * Math.cos(this.game.ball.angle);
    this.curY = this.game.ball.getDrawY() + this.game.bag.getClub().carry * Math.sin(this.game.ball.angle);
    
    //calculate animation
    this.lastTime += deltaTime;
    this.lastTime %= 300;
    
    if (this.lastTime < 100) this.imageIndex = 0;
    else if (this.lastTime < 200) this.imageIndex = 1;
    else this.imageIndex = 2;
  }
}