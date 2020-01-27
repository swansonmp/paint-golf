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
    
    this.rate = 750;
    this.inaccuracyRate = 1/128;
    this.scale = 2;
    this.mass = 0.25;
    this.gravity = new Vector(0, 0, -9.8);
    this.friction = 0.98;
    this.bounce = -0.5;
    this.bounceOoB = -0.2;
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
  
  setScale(scale) { this.scale = scale; }
  setRate(rate) { this.rate = rate; }
  setInaccuracyRate(inaccuracyRate) { this.inaccuracyRate = inaccuracyRate; }
  setLastPosition() { this.lastPosition = this.getScaledPosition().copy(); }
  
  inAir()    { return this.position.z > 0.05; }
  inMotion() { return this.velocity.mag() > 0.05; }
  isMoving() { return this.inAir() || this.inMotion(); }

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
    //calculate x bounce
    if (this.getScaledPosition().x < 0) {
      this.position.x = 0;
      this.velocity.x *= this.bounceOoB;
    }
    else if (this.getScaledPosition().x > this.game.COURSE_WIDTH) {
      this.position.x = this.game.COURSE_WIDTH;
      this.velocity.x *= this.bounceOoB;
    }
    //calculate y bounce
    if (this.getScaledPosition().y < 0) {
      this.position.y = 0;
      this.velocity.y *= this.bounceOoB;
    }
    else if (this.getScaledPosition().y > this.game.COURSE_HEIGHT) {
      this.position.y = this.game.COURSE_HEIGHT;
      this.velocity.y *= this.bounceOoB;
    }
  }
  
  calculateGroundBounce() {
    if (this.position.z < 0) {
      this.position.z = 0;
      this.velocity.z *= this.bounce * this.getLieRate();
      
      //calculate spin
      this.velocity.addTo(this.spin);
      this.spin.multiplyBy(SPIN_DECAY);
    }
  }
  
  calculateFriction() {
    if (!this.inAir()) {
      this.position.z = 0;
      this.velocity.multiplyBy(this.friction * this.getLieRate());
    }
  }
  
  getLieRate() { return this.game.course.getLieRate(this.getScaledPosition().x, this.getScaledPosition().y); }
  getPixelType() { return this.game.course.getPixelType(this.getScaledPosition().x, this.getScaledPosition().y); }
  
  inHole() { return this.getPixelType() == this.game.course.terrain.getHoleTerrain(); }
  inWater() { return this.getPixelType() == this.game.course.terrain.getWaterTerrain(); }
  
  getScaledPosition() { return this.position.multiply(this.scale) };
  
  angleToHole() {
    this.angle =  Math.atan2(
        this.game.course.holes[this.game.holeNum].y - this.getScaledPosition().y, 
        this.game.course.holes[this.game.holeNum].x - this.getScaledPosition().x
    );
  }
  
  debug() {
    if (this.game.debug.active) console.log(this.position.toString()); 
  }
}
