export default class AccuracyState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    this.game.powerbar.update(deltaTime);
  }
  
  draw(ctx) {
    this.game.hole.draw(ctx);
    this.game.ball.draw(ctx);
    
    this.game.powerbar.draw(ctx);
  }
  
  handleEnter() { }
  
  handleSpace() {
    this.game.powerbar.handle();
    
    this.game.setState(this.game.getRunningState());
  }
  
  handleUpArrow() { }
  handleDownArrow() { }
  handleLeftArrow() { }
  handleRightArrow() { }
  
}