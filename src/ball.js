const DEFAULT_SIZE = 4;
const ANGLE_INCREMENT = 1/32;
const SIZE_INCREASE = 3;
const SPIN_RATE = 3;

export default class Ball {
  constructor(game) {
    this.game = game;
    
    this.image = document.getElementById("img_ball");
    
    this.PIXEL_TYPE = {
      TEE: 0,
      HOLE: 1,
      GREEN: 2,
      FAIRWAY: 3,
      ROUGH: 4,
      BUNKER: 5,
      WATER: 6
    };
    this.PIXEL_RATE = {
      TEE: 1,
      HOLE: 0,
      GREEN: 0.99,
      FAIRWAY: 0.98,
      ROUGH: 0.8,
      BUNKER: 0.6,
      WATER: 0.1
    };
    
    this.rate = 750;
    this.inaccuracyRate = 1/128;
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
    this.lastPosition = this.setLastPosition();
    this.velocity = { x: 0, y: 0, z: 0 };
    this.fnet = { x: 0, y: (this.gravity * this.mass), z: 0 };
    
    this.angle = 0;
    this.dtheta = 0;
    
    this.spin = { x: 0 , y: 0 , z: 0 };
  }
  
  setScale(scale) {
    this.scale = scale;
  }
  
  setRate(rate) {
    this.rate = rate;
  }
  
  setInaccuracyRate(inaccuracyRate) {
    this.inaccuracyRate = inaccuracyRate;
  }
  
  setLastPosition() {
    //console.log("Setting last pos...");
    this.lastPosition = this.position;
    //this.lastPosition.x = this.getScaledX();
    //this.lastPosition.y = this.getScaledY();
    //this.lastPosition.z = this.position.z;
  }

  isMoving() {
    return (Math.abs(this.position.z) > 0.05 || Math.abs(this.velocity.x) > 0.05 || Math.abs(this.velocity.y) > 0.05 || Math.abs(this.velocity.z) > 0.05);
  }

  strike(horizontal, vertical, dtheta) {
    this.game.ball.setLastPosition();
    
    //set velocities
    this.velocity.x = Math.cos(this.angle) * horizontal * this.getLieRate() * this.mass;
    this.velocity.y = Math.sin(this.angle) * horizontal * this.getLieRate() * this.mass;
    this.velocity.z = vertical * this.getLieRate();
    
    //set spin
    this.spin.x = -this.game.bag.getClub().vertical / this.game.bag.getClub().horizontal * SPIN_RATE * Math.cos(this.angle);
    this.spin.y = -this.game.bag.getClub().vertical / this.game.bag.getClub().horizontal * SPIN_RATE * Math.sin(this.angle);
    
    this.dtheta = dtheta * this.inaccuracyRate;
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
      this.size = DEFAULT_SIZE + this.position.z / SIZE_INCREASE;
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
      drawX += this.game.GAME_WIDTH / 2 - this.game.COURSE_WIDTH + this.getScaledX();
    }
    return drawX - this.game.view.offsetX;
  }
  
  getDrawY() {
    let drawY = this.game.GAME_HEIGHT / 2 - this.size / 2;
    if (this.getScaledY() < this.game.GAME_HEIGHT / 2) {
      drawY -= this.game.GAME_HEIGHT / 2 - this.getScaledY();
    }
    else if (this.getScaledY() > this.game.COURSE_HEIGHT - this.game.GAME_HEIGHT / 2) {
      drawY += this.game.GAME_HEIGHT / 2 - this.game.COURSE_HEIGHT + this.getScaledY();
    }
    return drawY - this.game.view.offsetY;
  }
  
  update(deltaTime) {
    this.setDeltaTime(deltaTime);
    if (!this.isMoving()) {
      this.reset(this.position.x, this.position.y, this.position.z);
    }
    else {
      this.debug();
      this.updatePositions();
      this.applyInaccuracy();
      this.applyWind();
      this.updateVelocities();
      this.calculateOoBBounce();
      this.calculateGroundBounce();
      this.calculateFriction();
      this.calculateWindResistance();
    }
  }
  
  setDeltaTime(deltaTime) {
    this.deltaTime = deltaTime /= this.rate;
  }
  
  updatePositions() {
    this.position.x += this.velocity.x / this.mass * this.deltaTime;
    this.position.y += this.velocity.y / this.mass * this.deltaTime;
    this.position.z += this.velocity.z / this.mass * this.deltaTime;
  }
  
  applyInaccuracy() {
    let xv = this.velocity.x; //the unmodified xvel
    this.velocity.x = this.velocity.x * Math.cos(this.dtheta) - this.velocity.y * Math.sin(this.dtheta);
    this.velocity.y = xv * Math.sin(this.dtheta) + this.velocity.y * Math.cos(this.dtheta);
  }
  
  applyWind() {
    this.velocity.x += this.game.wind.getWind().x * this.position.z * this.game.wind.getHeightRate();
    this.velocity.y += this.game.wind.getWind().y * this.position.z * this.game.wind.getHeightRate();
  }
  
  updateVelocities() {
    this.velocity.x += this.fnet.x * this.deltaTime;
    this.velocity.y += this.fnet.y * this.deltaTime;
    this.velocity.z += this.fnet.z * this.deltaTime;
  }
  
  calculateOoBBounce() {
    if (this.getScaledX() < 0 || this.getScaledX() > this.game.COURSE_WIDTH) this.velocity.x *= -1;
    if (this.getScaledY() < 0 || this.getScaledY() > this.game.COURSE_HEIGHT) this.velocity.y *= -1;
  }
  
  calculateGroundBounce() {
    if (this.position.z < 0) {
      this.position.z = 0;
      this.velocity.z *= this.getLieRate() * this.bounce;
      
      //calculate spin
      this.velocity.x += this.spin.x;
      this.velocity.y += this.spin.y;
      this.spin.x *= 0.5;
      this.spin.y *= 0.5;
    }
  }
  
  calculateFriction() {
    if (this.position.z < 0.325 && Math.abs(this.velocity.z) < 0.325) {
      this.position.z = 0;
      this.velocity.z = 0;
      this.velocity.x *= this.friction * this.getLieRate();
      this.velocity.y *= this.friction * this.getLieRate();
    }
  }
  
  calculateWindResistance() {
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
      case this.PIXEL_TYPE.TEE:
        return this.PIXEL_RATE.TEE;
      case this.PIXEL_TYPE.HOLE:
        return this.PIXEL_RATE.HOLE;
      case this.PIXEL_TYPE.GREEN:
        return this.PIXEL_RATE.GREEN;
      case this.PIXEL_TYPE.ROUGH:
        return this.PIXEL_RATE.ROUGH;
      case this.PIXEL_TYPE.BUNKER:
        return this.PIXEL_RATE.BUNKER;
      case this.PIXEL_TYPE.WATER:
        return this.PIXEL_RATE.WATER;
      default:
        return this.PIXEL_RATE.FAIRWAY;
    }
  }
  
  getPixelType() {
    return this.game.course.map[Math.floor(this.getScaledX())][Math.floor(this.getScaledY())];
  }
  
  inHole() {
    return this.getPixelType() == this.PIXEL_TYPE.HOLE;
  }
  
  inWater() {
    return this.getPixelType() == this.PIXEL_TYPE.WATER;
  }
  
  getScaledX() { return this.position.x * this.scale; }
  getScaledY() { return this.position.y * this.scale; }
  
  angleToHole() {
    this.angle =  Math.atan2(
        this.game.course.holes[this.game.holeNum].y - this.getScaledY(), 
        this.game.course.holes[this.game.holeNum].x - this.getScaledX()
    );
  }
  
  debug() {
    if (this.game.debug.active) {
      console.log(
          this.position.x.toFixed(2) + "," + this.position.y.toFixed(2) + "," + this.position.z.toFixed(2)
      ); 
    }
  }
}
