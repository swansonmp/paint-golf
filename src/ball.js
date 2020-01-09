import Vector from "./vector.js";

const DEFAULT_SIZE = 4;
const ANGLE_INCREMENT = 1/32;
const SIZE_INCREASE = 3;
const SPIN_RATE = 3;
const SPIN_DECAY = 0.5;

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
    this.gravity = new Vector(0, 0, -9.8);
    this.friction = 0.90;
    this.bounce = -0.5;
    this.radius = 0.0625;
    this.c = 0.5;
    this.rho = 1.2;
    this.A = Math.PI * Math.pow(this.radius, 2);
	
    this.reset();
  }

  reset(xp, yp, zp) {    
    this.position = new Vector(xp / this.scale, yp / this.scale, zp / this.scale);
    this.lastPosition = this.setLastPosition();
    this.velocity = new Vector();
    this.fnet = this.gravity.multiply(this.mass);
    
    this.angle = 0;
    this.dtheta = 0;
    
    this.spin = new Vector();
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
    this.lastPosition = this.position.copy();
  }

  isMoving() {
    return this.position.z > 0.05 || this.velocity.mag() > 0.05;
  }

  strike(horizontal, vertical, dtheta) {
    //set last position
    this.game.ball.setLastPosition();
    //set velocity
    this.velocity.fromPolar(this.angle, horizontal * this.getLieRate() * this.mass);
    this.velocity.z = vertical * this.getLieRate();
    //set wind resistance
    this.fnet = this.gravity.multiply(this.mass);
    //set spin
    this.spin.fromPolar(this.angle, -this.game.bag.getClub().vertical / this.game.bag.getClub().horizontal * SPIN_RATE);
    //set inaccuracy
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
    if (this.position.z <= 0) { this.size = DEFAULT_SIZE; }
    else { this.size = DEFAULT_SIZE + this.position.z / SIZE_INCREASE; }

    //draw ball
    ctx.drawImage(
      this.image,
      this.getScaledPosition().x,
      this.getScaledPosition().y,
      this.size,
      this.size
    );
  }
  
  update(deltaTime) {
    this.setDeltaTime(deltaTime);
    if (this.isMoving()) {
      this.debug();
      //update positions
      this.position.addTo(this.velocity.multiply(this.deltaTime / this.mass));
      //apply inaccuracy
      this.velocity.rotate(this.dtheta);
      //apply wind
      this.velocity.addTo(this.game.wind.getWind().multiply(this.position.z * this.game.wind.getHeightRate()));
      //update wind resistance
      this.fnet = this.gravity.multiply(this.mass).subtract(
          this.velocity.multiply(0.5 * this.c * this.rho * this.A * Math.pow(this.velocity.mag() / this.mass, 2)).divide(this.velocity.mag()));
      //update velocity
      this.velocity.addTo(this.fnet.multiply(this.deltaTime));
      
      this.calculateOoBBounce();
      this.calculateGroundBounce();
      this.calculateFriction();
    }
    else {
      this.reset(this.position.x, this.position.y, this.position.z);
    }
  }
  
  setDeltaTime(deltaTime) {
    this.deltaTime = deltaTime /= this.rate;
  }
  
  calculateOoBBounce() {
    if (this.getScaledX() < 0 || this.getScaledX() > this.game.COURSE_WIDTH) this.velocity.x *= -0.2;
    if (this.getScaledY() < 0 || this.getScaledY() > this.game.COURSE_HEIGHT) this.velocity.y *= -0.2;
  }
  
  calculateGroundBounce() {
    if (this.position.z < 0) {
      this.position.z = 0;
      this.velocity.z *= this.getLieRate() * this.bounce;
      
      //calculate spin
      this.velocity.addTo(this.spin);
      this.spin.multiplyBy(SPIN_DECAY);
    }
  }
  
  calculateFriction() {
    if (this.position.z < 0.325 && Math.abs(this.velocity.z) < 0.325) {
      this.position.z = 0;
      this.velocity.z = 0;
      this.velocity.multiplyBy(this.friction * this.getLieRate());
    }
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
  getScaledPosition() { return this.position.multiply(this.scale) };
  
  angleToHole() {
    this.angle =  Math.atan2(
        this.game.course.holes[this.game.holeNum].y - this.getScaledY(), 
        this.game.course.holes[this.game.holeNum].x - this.getScaledX()
    );
  }
  
  debug() {
    if (this.game.debug.active) console.log(this.position.toString()); 
  }
}
