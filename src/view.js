import Vector from "./vector.js";

export default class View {
  constructor(game) {
    this.game = game;
    this.offset = new Vector();
    this.scale = 1;
    this.scaleFactor = 1 + Math.pow(2, -5);
    this.panRate = 10;
  }
  
  reset() { this.offset.setComponents(0, 0); }
  getOffset() { return this.offset; }
  getScaledPanRate() { return this.panRate / this.scale; }
  incrementViewOffsetX() { this.offset.x += this.getScaledPanRate(); }
  incrementViewOffsetY() { this.offset.y += this.getScaledPanRate(); }
  decrementViewOffsetX() { this.offset.x -= this.getScaledPanRate(); }
  decrementViewOffsetY() { this.offset.y -= this.getScaledPanRate(); }
  
  zoomIn() { this.scale *= this.scaleFactor; }
  zoomOut() { this.scale /= this.scaleFactor; }
  
  clamp(n, min, max) { return Math.min(Math.max(n, min), max); }
  
}