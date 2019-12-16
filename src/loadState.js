import Course from "./course.js";

export default class LoadState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    this.game.stroke = 0;
    
    if (this.game.course == null) { //TODO also must check to see if new course has been selected to load    
      //load the course
      this.game.course = new Course(this.game);
      this.game.loader.loadHole(this.game.course);
      
      //set ball
      this.game.ball.reset(this.game.course.tees[1].x, this.game.course.tees[1].y, 0);
    }
    
    this.game.status.update(deltaTime);
    //go to idle state
    this.game.setState(this.game.getIdleState());
  }
  
  draw(ctx) {
    this.game.course.drawCourse(ctx);
  }
  
  handleEnter() { }
  handleSpace() { }
  handleUpArrow() { }
  handleDownArrow() { }
  handleLeftArrow() { }
  handleRightArrow() { }
  handleEscape() { }
  
}