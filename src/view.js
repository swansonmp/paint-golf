export default class View {
  constructor(game) {
    this.game = game;
    
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.panRate = 10;
    this.panAccel = 0;
  }
  
  incrementViewOffsetX() { 
    if (this.game.course.getDrawX() + this.offsetX < this.game.COURSE_WIDTH - this.game.GAME_WIDTH / 2) 
      this.offsetX += this.panRate;
  }
  incrementViewOffsetY() {
    if (this.game.course.getDrawY() + this.offsetY < this.game.COURSE_HEIGHT - this.game.GAME_HEIGHT / 2)
      this.offsetY += this.panRate;
  }
  decrementViewOffsetX() {
    if (this.game.course.getDrawX() + this.offsetX > 0)
      this.offsetX -= this.panRate;
  }
  decrementViewOffsetY() {
    if (this.game.course.getDrawY() + this.offsetY > 0)
      this.offsetY -= this.panRate;
  }
  
}