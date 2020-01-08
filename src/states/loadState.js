import State from "./state.js";
import Course from "./../course.js";

export default class LoadState extends State {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    this.game.stroke = 0;
       
    //load the course
    this.game.course = new Course(this.game);
    this.game.loader.loadCourse(this.game.course);
      
    //set ball
    this.game.ball.reset(this.game.course.tees[1].x, this.game.course.tees[1].y, 0);
    
    //go to idle state
    this.game.setState(this.game.getPrepareState());
  }
  
}