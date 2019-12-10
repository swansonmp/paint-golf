export default class EvaluateState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    if (this.game.ball.inHole()) {                  //if the ball is in the hole
      this.game.holeNum++;                          //increment hole
      this.game.setState(this.game.getLoadState()); //load next hole
      this.game.strokes = 0;
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
      this.game.setState(this.game.getIdleState()); //go to idle state
    }
  }
  
  draw(ctx) {
    this.game.hole.draw(ctx);
    this.game.ball.draw(ctx);
  }
  
  handleEnter() { }
  handleSpace() { }
  handleUpArrow() { }
  handleDownArrow() { }
  handleLeftArrow() { }
  handleRightArrow() { }
  
}