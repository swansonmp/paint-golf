export default class EvaluateState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    //go to idle state
    this.game.setState(this.game.getIdleState());
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