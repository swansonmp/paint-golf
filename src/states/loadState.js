import State from "./state.js";
import Course from "./../course.js";

export default class LoadState extends State {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    this.game.gameData.init();
       
    //load the course
    this.game.course = new Course(this.game);
    this.game.loader.loadCourse(this.game.course);
      
    //set ball
    this.game.ball.reset(
        this.game.course.tees[this.game.gameData.getHoleNum()].x,
        this.game.course.tees[this.game.gameData.getHoleNum()].y,
        0
    );
    
    //go to idle state
    this.game.setState(this.game.getPrepareState());
  }
  
}