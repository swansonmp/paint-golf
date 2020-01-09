import Palette from "./palette.js";
import Vector from "./vector.js";

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
    //let drawX = this.game.view.clamp(this.game.ball.getScaledX() - this.game.GAME_WIDTH / 2, 0, this.game.COURSE_WIDTH - this.game.GAME_WIDTH);
    return this.game.view.offsetX;
  }
  
  getDrawY() {
    //let drawY = this.game.view.clamp(this.game.ball.getScaledY() - this.game.GAME_HEIGHT / 2, 0, this.game.COURSE_HEIGHT - this.game.GAME_HEIGHT);
    return this.game.view.offsetY;
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
  
  update(deltaTime) { }
  
  getPar(n) {
    let distance = this.getDistance(n);
    if (distance <= 250) return 3;
    else if (distance <= 470) return 4;
    else return 5;
  }
  
  getDistance(n) {
    return this.holes[n].distance2D(this.tees[n]) / this.game.ball.scale;
  }
  
  createCourseCoordinateList() {
    let list = [];
    let i;
    for (i = 0; i <= 18; i++) {
      list.push(new Vector(-1, -1));
    }
    return list;
  }

}