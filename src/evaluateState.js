export default class EvaluateState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    if (this.game.ball.inHole()) {
      this.game.holeNum++;
      this.game.setState(this.game.getLoadState());
    }
    else {
      this.game.strokes++;
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