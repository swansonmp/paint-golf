export default class RunningState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    if (this.game.ball.isMoving()) {
      this.game.ball.update(deltaTime);
    }
    else {
      this.game.setState(this.game.getIdleState());
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