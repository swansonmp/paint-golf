export default class EvaluateState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    if (this.game.ball.inHole()) {                  //if the ball is in the hole
      this.game.holeNum++;                          //increment hole
      this.game.strokes = 0;
      this.game.ball.reset(this.game.course.tees[this.game.holeNum].x, this.game.course.tees[this.game.holeNum].y, 0);
      this.game.setState(this.game.getIdleState()); //load next hole
    }
    else {
      if (this.game.ball.inWater()) {               //if the ball is in the water
        this.game.strokes++;                        //add penalty stroke
        this.game.ball.reset(
            this.game.ball.lastPosition.x, 
            this.game.ball.lastPosition.y, 
            this.game.ball.lastPosition.z
        );
      }
      this.game.strokes++;                          //add stroke
      this.game.ball.setLastPosition();
      this.game.status.update(deltaTime);
      this.game.setState(this.game.getIdleState()); //go to idle state
    }
  }
  
  draw(ctx) {
    this.game.course.draw(ctx);
    this.game.ball.draw(ctx);
    this.game.bag.draw(ctx);
    this.game.status.draw(ctx);
  }
  
  handleEnter() { }
  handleSpace() { }
  handleUpArrow() { }
  handleDownArrow() { }
  handleLeftArrow() { }
  handleRightArrow() { }
  handleEscape() { }
  
}