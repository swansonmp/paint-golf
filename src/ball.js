const DEFAULT_SIZE = 4;

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("img_ball");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;
    this.size = DEFAULT_SIZE;
    this.reset();
  }

  reset() {
    this.position = { x: 400, y: 400, z: 0 };
    this.velocity = { x: 0, y: 0, z: 0 };
  }

  isMoving() {
    return (this.position.z > 0 || this.velocity.z < -0.1 || this.velocity.z > 0.1);
  }

  strike(xVel, yVel, zVel) {
    this.velocity.x = xVel; 
    this.velocity.y = yVel;
    this.velocity.z = zVel;
  }

  draw(ctx) {
	//calculate size
	if (this.position.z <= 0) {
	  this.size = DEFAULT_SIZE;
	}
	else {
	  this.size = DEFAULT_SIZE + this.position.z / 10;
	}
	
	//draw ball
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    if (!this.isMoving()) return;
	
	//update positions
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;
	  
    //update velocities
    if (this.velocity.x > 1) this.velocity.x -= 1;
	else if (this.velocity.x < -1) this.velocity.x += 1;
	else this.velocity.x = 0;
	
    if (this.velocity.y > 1) this.velocity.y -= 1;
	else if (this.velocity.y < -1) this.velocity.y += 1;
	else this.velocity.y = 0;
	
    if (this.position.z < 0) this.velocity.z = -this.velocity.z / 2;
    this.velocity.z -= 1;
  }
}
