export default class RunningState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    this.game.wind.update(deltaTime);
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
    this.game.wind.draw(ctx);
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
  handleWKey() { }
  handleAKey() { }
  handleSKey() { }
  handleDKey() { }
  
}