import Hole from "./hole.js";


export default class LoadState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    this.game.stroke = 0;
    
    //load the hole
    this.game.hole = new Hole(this.game);
    this.game.loader.loadHole(this.game.hole);
    
    //set ball
    this.game.ball.reset(this.game.hole.tee.x, this.game.hole.tee.y, 0);
    
    //go to idle state
    this.game.setState(this.game.getIdleState());
  }
  
  draw(ctx) {
    this.game.hole.drawCourse(ctx);
  }
  
  handleEnter() { }
  handleSpace() { }
  handleUpArrow() { }
  handleDownArrow() { }
  handleLeftArrow() { }
  handleRightArrow() { }
  
}