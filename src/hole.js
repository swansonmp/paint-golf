import Palette from "./palette.js";

export default class Hole {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("course");
    
    this.palette = new Palette();
    
    this.tee = { x: -1, y: -1 };
    this.map;
  }
  
  draw(ctx) {
    ctx.drawImage(
        this.image,
        this.getDrawX(),
        this.getDrawY(), 
        this.game.GAME_WIDTH, 
        this.game.GAME_HEIGHT,
        0,
        0,
        this.game.GAME_WIDTH, 
        this.game.GAME_HEIGHT
    );
  }
  
  getDrawX() {
    let drawX = this.game.ball.position.x - this.game.GAME_WIDTH / 2;
    if (drawX < 0) {
      drawX = 0;
    }
    else {
      let maxX = this.game.COURSE_WIDTH - this.game.GAME_WIDTH;
      if (drawX > maxX) {
        drawX = maxX;
      }
    }
    return drawX;
  }
  
  getDrawY() {
    let drawY = this.game.ball.position.y - this.game.GAME_HEIGHT / 2;
    if (drawY < 0) {
      drawY = 0;
    }
    else {
      let maxY = this.game.COURSE_HEIGHT - this.game.GAME_HEIGHT;
      if (drawY > maxY) {
        drawY = maxY;
      }
    }
    return drawY;
  }
  
  drawCourse(ctx) {
    ctx.drawImage(this.image, 0, 0, this.game.COURSE_WIDTH, this.game.COURSE_HEIGHT);
  }
  
  update(deltaTime) {
    
  }

}