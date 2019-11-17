const CURLEN = 25;

export default class Cursor {
  constructor(ball) {
    this.ball = ball;
  }
  
  draw(ctx) {
	let curx = this.ball.position.x + CURLEN * Math.cos(this.ball.angle);
	let cury = this.ball.position.y + CURLEN * Math.sin(this.ball.angle);
	ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.fillRect(curx, cury, 4, 4);
    //ctx.fill();
  }
  
  update() {
  
  
  }
}