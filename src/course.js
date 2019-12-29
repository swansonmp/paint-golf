import Palette from "./palette.js";

export default class Course {
  constructor(game) {
    this.game = game;
    
    this.palette = new Palette(game);
    
    this.tees = this.createCourseCoordinateList();
    this.holes = this.createCourseCoordinateList();
    this.map = [0];
  }
  
  draw(ctx) {
    ctx.drawImage(
        this.game.vanityImage,
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
    let drawX = this.game.ball.getScaledX() - this.game.GAME_WIDTH / 2;
    if (drawX < 0) {
      drawX = 0;
    }
    else {
      let maxX = this.game.COURSE_WIDTH - this.game.GAME_WIDTH;
      if (drawX > maxX) {
        drawX = maxX;
      }
    }
    return drawX + this.game.view.offsetX;
  }
  
  getDrawY() {
    let drawY = this.game.ball.getScaledY() - this.game.GAME_HEIGHT / 2;
    if (drawY < 0) {
      drawY = 0;
    }
    else {
      let maxY = this.game.COURSE_HEIGHT - this.game.GAME_HEIGHT;
      if (drawY > maxY) {
        drawY = maxY;
      }
    }
    return drawY + this.game.view.offsetY;
  }
  
  drawCourse(ctx, xOffset, yOffset, width, height) {
    ctx.drawImage(
        this.game.courseImage,
        xOffset,
        yOffset, 
        width, 
        height,
        0,
        0,
        width, 
        height
    );
  }
  
  update(deltaTime) {
    
  }
  
  getPar(n) {
    let distance = this.getDistance(n);
    if (distance <= 250) return 3;
    else if (distance <= 470) return 4;
    else return 5;
  }
  
  getDistance(n) {
    return Math.sqrt(
        Math.pow(this.holes[n].x - this.tees[n].x, 2) + 
        Math.pow(this.holes[n].y - this.tees[n].y, 2)
    ) / this.game.ball.scale;
  }
  
  createCourseCoordinateList() {
    let list = [];
    let i;
    for (i = 0; i <= 18; i++) {
      list.push({ x: -1, y: -1 });
    }
    return list;
  }

}