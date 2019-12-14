import Palette from "./palette.js";

export default class Course {
  constructor(game) {
    this.game = game;
    
    this.palette = new Palette();
    
    this.tees = this.createCourseCoordinateList();
    this.holes = this.createCourseCoordinateList();
    
    this.map;
  }
  
  draw(ctx) {
    ctx.drawImage(
        this.game.courseImage,
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
    ctx.drawImage(this.game.courseImage, 0, 0, this.game.COURSE_WIDTH, this.game.COURSE_HEIGHT);
  }
  
  update(deltaTime) {
    
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