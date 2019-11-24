const DEFAULT_SIZE = 4;

const PIXEL_TYPE = {
  TEE: 0,
  HOLE: 1,
  GREEN: 2,
  FAIRWAY: 3,
  ROUGH: 4,
  BUNKER: 5,
  WATER: 6
};
  
const PIXEL_RATE = {
  TEE: 1.05,
  HOLE: 0,
  GREEN: 1,
  FAIRWAY: 0.98,
  ROUGH: 0.8,
  BUNKER: 0.6,
  WATER: 0
};

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
    this.speed = speed * this.getLieRate();
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
    
    //update speed
    if (this.speed > DECAY) this.speed -= DECAY;
    else this.speed = 0;
	
    //update zvel while calculating bounce
    if (this.position.z < 0) {
      let lieRate = this.getLieRate();
      if (this.zvel < 0) {
        this.position.z = -this.position.z / BOUNCE * lieRate;
        this.zvel = -this.zvel / BOUNCE * lieRate;
        this.speed += this.zvel * BOUNCE * lieRate;
      }
    }
    else if (this.position.z > 0) {
      this.zvel -= ZDECAY;
    }
    
    //update angle
    this.angle += this.dangle * DANGLERATE;
  }
  
  getLieRate() {
    let lie = this.game.hole.map[Math.floor(this.position.x)][Math.floor(this.position.y)];
    switch (lie) {
      case PIXEL_TYPE.TEE:
        return PIXEL_RATE.TEE;
      case PIXEL_TYPE.HOLE:
        return PIXEL_RATE.HOLE;
      case PIXEL_TYPE.GREEN:
        return PIXEL_RATE.GREEN;
      case PIXEL_TYPE.ROUGH:
        return PIXEL_RATE.ROUGH;
      case PIXEL_TYPE.BUNKER:
        return PIXEL_RATE.BUNKER;
      case PIXEL_TYPE.WATER:
        return PIXEL_RATE.WATER;
      default:
        return PIXEL_RATE.FAIRWAY;
    }
  }
  
  inHole() {
    return this.game.hole.map[Math.floor(this.position.x)][Math.floor(this.position.y)] == PIXEL_TYPE.HOLE;
  }
}
