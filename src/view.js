import Vector from "./vector.js";

export default class View {
  constructor(game) {
    this.game = game;
    this.offset = new Vector();
    this.panRate = 10;
  }
  
    deltaTime /= 512;
  reset() { this.offset.setComponents(0, 0); }
  getOffset() { return this.offset; }
  
  incrementViewOffsetX() { 
    //if (this.offset.x < this.game.COURSE_WIDTH - this.game.GAME_WIDTH / 2)
      this.offset.x += this.panRate;
  }
  incrementViewOffsetY() {
    //if (this.offset.y < this.game.COURSE_HEIGHT - this.game.GAME_HEIGHT / 2) 
      this.offset.y += this.panRate;
  }
  decrementViewOffsetX() {
    //if (this.offset.x > 0) 
      this.offset.x -= this.panRate;
  }
  decrementViewOffsetY() {
    //if (this.offset.y > 0) 
      this.offset.y -= this.panRate;
  }
  
  clamp(n, min, max) {
    return Math.min(Math.max(n, min), max);
  }
  
}