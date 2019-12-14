const DEFAULT_SIZE = 4;
const RATE = 200;

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
  TEE: 1,
  HOLE: 0,
  GREEN: 0.99,
  FAIRWAY: 0.98,
  ROUGH: 0.8,
  BUNKER: 0.6,
  WATER: 0.1
};

const ANGLE_INCREMENT = 0.03125;

export default class Ball {
  constructor(game) {
    this.game = game;
    
    this.image = document.getElementById("img_ball");
    this.scale = 2;
    this.mass = 0.25;
    this.gravity = -9.8;
    this.friction = 0.90;
    this.bounce = -0.5;
    this.radius = 0.0625;
    this.c = 0.5;
    this.rho = 1.2;
    this.A = Math.PI * Math.pow(this.radius, 2)
    this.cRhoA = this.c * this.rho * this.A;
	
    this.reset();
  }

  reset(xp, yp, zp) {
    xp /= this.scale;
    yp /= this.scale;
    zp /= this.scale;
    
    this.position = { x: xp, y: yp, z: zp };
    this.lastPosition = { x: xp, y: yp, z: zp };
    this.velocity = { x: 0, y: 0, z: 0 };
    this.fnet = { x: 0, y: (this.gravity * this.mass), z: 0 };
    
    this.angle = 0;
    this.dtheta = 0;
    
    this.spin = { x: 0 , y: 0 , z: 0 };
  }
  
  setLastPosition() {
    this.lastPosition = this.position;
  }

  isMoving() {
    return (Math.abs(this.position.z) > 0.05 || Math.abs(this.velocity.x) > 0.05 || Math.abs(this.velocity.y) > 0.05 || Math.abs(this.velocity.z) > 0.05);
  }

  strike(horizontal, vertical, dtheta) {    
    this.velocity.x = Math.cos(this.angle) * horizontal * this.getLieRate() * this.mass;
    this.velocity.y = Math.sin(this.angle) * horizontal * this.getLieRate() * this.mass;
    this.velocity.z = vertical * this.getLieRate();
    
    const SPIN_RATE = 3;
    this.spin.x = -vertical / horizontal * SPIN_RATE * Math.cos(this.angle);
    this.spin.y = -vertical / horizontal * SPIN_RATE * Math.sin(this.angle);
    
    const INACCURACY = 0.015625;
    this.dtheta = dtheta * INACCURACY;
  }
  
  incAngle() {
	this.angle += ANGLE_INCREMENT;
    if (this.angle >= Math.PI * 2)
      this.angle -= Math.PI * 2;
  }
  
  decAngle() {
    this.angle -= ANGLE_INCREMENT;
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
      this.getDrawX(),
      this.getDrawY(),
      this.size,
      this.size
    );
  }
  
  getDrawX() {
    let drawX = this.game.GAME_WIDTH / 2 - this.size / 2;
    if (this.getScaledX() < this.game.GAME_WIDTH / 2) {
      drawX -= this.game.GAME_WIDTH / 2 - this.getScaledX();
    }
    else if (this.getScaledX() > this.game.COURSE_WIDTH - this.game.GAME_WIDTH / 2) {
      drawX += this.game.GAME_WIDTH / 2 + this.game.COURSE_WIDTH - this.getScaledX()
    }
    return drawX;
  }
  
  getDrawY() {
    let drawY = this.game.GAME_HEIGHT / 2 - this.size / 2;
    if (this.getScaledY() < this.game.GAME_HEIGHT / 2) {
      drawY -= this.game.GAME_HEIGHT / 2 - this.getScaledY();
    }
    else if (this.getScaledY() > this.game.COURSE_HEIGHT - this.game.GAME_HEIGHT / 2) {
      drawY += this.game.GAME_HEIGHT / 2 + this.game.COURSE_HEIGHT - this.getScaledY();
    }
    return drawY;
  }
  
  update(deltaTime) {
    if (!this.isMoving()) {
      this.velocity.x = 0;
      this.velocity.y = 0;
      this.velocity.z = 0;
      return;
    }
    
    this.debug(); //TODO
    
    deltaTime /= RATE;
    
    //update positions
    this.position.x += this.velocity.x / this.mass * deltaTime;
    this.position.y += this.velocity.y / this.mass * deltaTime;
    this.position.z += this.velocity.z / this.mass * deltaTime;
    
    //apply inaccuracy using rotation matrix
    let xv = this.velocity.x; //the unmodified xvel
    this.velocity.x = this.velocity.x * Math.cos(this.dtheta) - this.velocity.y * Math.sin(this.dtheta);
    this.velocity.y = xv * Math.sin(this.dtheta) + this.velocity.y * Math.cos(this.dtheta);
    //apply inaccuracy to spin
    //let xs = this.spin.x;
    //this.spin.x = this.spin.x * Math.cos(this.dtheta) - this.spin.y * Math.sin(this.dtheta);
    //this.spin.y = xs * Math.sin(this.dtheta) + this.spin.y * Math.cos(this.dtheta);
    
    //update velocities
    this.velocity.x += this.fnet.x * deltaTime;
    this.velocity.y += this.fnet.y * deltaTime;
    this.velocity.z += this.fnet.z * deltaTime;
    
    //calculate bounce
    if (this.position.z < 0) {
      this.position.z = 0;
      this.velocity.z *= this.getLieRate() * this.bounce;
      
      //calculate spin
      this.velocity.x += this.spin.x;
      this.velocity.y += this.spin.y;
      this.spin.x *= 0.5;
      this.spin.y *= 0.5;
    }
    
    //calculate friction
    if (this.position.z < 0.325 && Math.abs(this.velocity.z) < 0.325) {
      this.position.z = 0;
      this.velocity.z = 0;
      this.velocity.x *= this.friction * this.getLieRate();
      this.velocity.y *= this.friction * this.getLieRate();
    }
    
    //calculate wind resistance
    let magveldivmass = Math.sqrt(
        Math.pow(this.velocity.x / this.mass, 2) + 
        Math.pow(this.velocity.y / this.mass, 2) + 
        Math.pow(this.velocity.z / this.mass, 2)
    );
    
    let magvel = Math.sqrt(
        Math.pow(this.velocity.x, 2) + 
        Math.pow(this.velocity.y, 2) + 
        Math.pow(this.velocity.z, 2)
    );
    
    this.fnet.x = ( -0.5 * this.cRhoA * Math.pow(magveldivmass, 2) * this.velocity.x / magvel );
    this.fnet.y = ( -0.5 * this.cRhoA * Math.pow(magveldivmass, 2) * this.velocity.y / magvel );
    this.fnet.z = ( this.gravity * this.mass - 0.5 * this.cRhoA * Math.pow(magveldivmass, 2) * this.velocity.z / magvel );
  }
  
  getLieRate() {
    let lie = this.getPixelType();
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
  
  getPixelType() {
    return this.game.course.map[Math.floor(this.getScaledX())][Math.floor(this.getScaledY())];
  }
  
  inHole() {
    return this.getPixelType() == PIXEL_TYPE.HOLE;
  }
  
  inWater() {
    return this.getPixelType() == PIXEL_TYPE.WATER;
  }
  
  getScaledX() { return this.position.x * this.scale; }
  getScaledY() { return this.position.y * this.scale; }
  
  debug() {
    console.log(
        this.position.x + "," + this.position.y + "," + this.position.z
    ); 
  }
}
