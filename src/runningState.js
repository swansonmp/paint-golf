export default class RunningState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    if (this.game.ball.isMoving()) {
      this.game.ball.update(deltaTime);
    }
    else {
      this.game.setState(this.game.getEvaluateState());
    }
  }
  
  draw(ctx) {
    this.game.course.draw(ctx);
    this.game.ball.draw(ctx);
  }
  
  handleEnter() { }
  handleSpace() { }
  handleUpArrow() { }
  handleDownArrow() { }
  handleLeftArrow() { }
  handleRightArrow() { }
  handleEscape() { }
  
}