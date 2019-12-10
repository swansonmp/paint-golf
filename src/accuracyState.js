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
    this.game.powerbar.setAccuracy();
    this.game.setState(this.game.getStrikingState());
  }
  
  handleUpArrow() { }
  handleDownArrow() { }
  handleLeftArrow() { }
  handleRightArrow() { }
  
}