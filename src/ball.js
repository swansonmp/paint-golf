const DEFAULT_SIZE = 4;

export default class Ball {
  constructor(game) {
    this.game = game;
    
    this.image = document.getElementById("img_ball");
    this.size = DEFAULT_SIZE;
	
    this.reset();
  }

  reset(xp, yp, zp) {
    this.position = { x: xp, y: yp, z: zp };
    this.speed = 0;
    this.zvel = 0;
    this.angle = 0;
    this.dangle = 0;
  }

  isMoving() {
    return (this.position.z > 1 || this.zvel < -0.5 || this.zvel > 0.5 || this.speed > 0.05);
  }

  strike(speed, zvel, dangle) {
    this.speed = speed;
    this.zvel = zvel;
    this.dangle = dangle;
  }
  
  incAngle() {
	this.angle += 0.075;
    if (this.angle >= Math.PI * 2)
      this.angle -= Math.PI * 2;
  }
  
  decAngle() {
    this.angle -= 0.075;
    if (this.angle <= 0)
      this.angle += Math.PI * 2;
  }

  draw(ctx) {
    //calculate size
    if (this.position.z <= 0) {
      this.size = DEFAULT_SIZE;
    }
    else {
      this.size = DEFAULT_SIZE + this.position.z / 4;
    }
	
    //draw ball
    ctx.drawImage(
      this.image,
      this.position.x - this.size / 2,
      this.position.y - this.size / 2,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
	  
    if (!this.isMoving()) {
      this.speed = 0;
      this.zvel = 0;
      return;
    }

    const DECAY = 0.1;
    const ZDECAY = 0.05;
    const BOUNCE = 6;
    const DANGLERATE = 0.025;
	
    //update positions
    this.position.x += this.speed * Math.cos(this.angle);
    this.position.y += this.speed * Math.sin(this.angle);
    this.position.z += this.zvel;
    
    //update velocities
    if (this.speed > DECAY) this.speed -= DECAY;
    else this.speed = 0;
	
    if (this.position.z < 0) {
      if (this.zvel < 0) {
        this.position.z = -this.position.z / BOUNCE;
        this.zvel = -this.zvel / BOUNCE;
        this.speed += this.zvel * BOUNCE;
      }
    }
    else if (this.position.z > 0) {
      this.zvel -= ZDECAY;
    }
    
    this.angle += this.dangle * DANGLERATE;
    
  }
}
