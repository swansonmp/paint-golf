const PAN_DECAY = 1;
const PAN_ACCEL_RATE = 1;

export default class View {
  constructor(game) {
    this.game = game;
    
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.panRate = 10;
    this.panAccel = { x: 0, y: 0 };
  }
  
  update(deltaTime) {
    /*
    console.log(this.panAccel.x + ", " + this.panAccel.y);
    deltaTime /= 512;
    
    if (this.panAccel.x > 0) {
      this.incrementViewOffsetX(this.panAccel.x * deltaTime);
      this.panAccel.x -= PAN_DECAY;
    }
    else if (this.panAccel.x < 0) {
      this.decrementViewOffsetX(this.panAccel.x * deltaTime);
      this.panAccel.x += PAN_DECAY;
    }
    
    if (this.panAccel.y > 0) {
      this.incrementViewOffsetY(this.panAccel.y * deltaTime);
      this.panAccel.y -= PAN_DECAY;
    }
    else if (this.panAccel.y < 0) {
      this.decrementViewOffsetY(this.panAccel.y * deltaTime);
      this.panAccel.y += PAN_DECAY;
    }
    */
  }
  
  incrementViewOffsetX(amount) {
    if (amount == undefined) { amount = this.panRate; }
    if (this.game.course.getDrawX() + this.offsetX < this.game.COURSE_WIDTH - this.game.GAME_WIDTH / 2) {
      this.offsetX += amount;
      this.panAccel.x += PAN_ACCEL_RATE;
    }
  }
  incrementViewOffsetY(amount) {
    if (amount == undefined) { amount = this.panRate; }
    if (this.game.course.getDrawY() + this.offsetY < this.game.COURSE_HEIGHT - this.game.GAME_HEIGHT / 2) {
      this.offsetY += amount;
      this.panAccel.y += PAN_ACCEL_RATE;
    }
  }
  decrementViewOffsetX(amount) {
    if (amount == undefined) { amount = this.panRate; }
    if (this.game.course.getDrawX() + this.offsetX > 0) {
      this.offsetX -= amount;
      this.panAccel.x -= PAN_ACCEL_RATE;
    }
  }
  decrementViewOffsetY(amount) {
    if (amount == undefined) { amount = this.panRate; }
    if (this.game.course.getDrawY() + this.offsetY > 0) {
      this.offsetY -= amount;
      this.panAccel.y -= PAN_ACCEL_RATE;
    }
  }
  
}