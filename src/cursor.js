const CURLEN = 48;
const CURSIZE = 16;

export default class Cursor {
  constructor(ball) {
    this.image = document.getElementById("img_cursor");
    this.ball = ball;
  }
  
  draw(ctx) {
    let curx = this.ball.position.x + CURLEN * Math.cos(this.ball.angle);
    let cury = this.ball.position.y + CURLEN * Math.sin(this.ball.angle);
  
    ctx.drawImage(
      this.image,
      curx - CURSIZE / 2,
      cury - CURSIZE / 2,
      CURSIZE,
      CURSIZE
    );
  }
  
  update() {
  
  
  }
}