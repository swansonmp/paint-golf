export default class AccuracyState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    this.game.powerbar.update(deltaTime);
    //go to striking if current is -10
    if (this.game.powerbar.getCurrent() <= -10) {
      this.game.setState(this.game.getStrikingState());
      return;
    }
  }
  
  draw(ctx) {
    this.game.hole.draw(ctx);
    this.game.ball.draw(ctx);
    
    this.game.powerbar.draw(ctx);
  }
  
  handleEnter() { }
  
  handleSpace() {
    //only set accuracy is current is valid
    if (this.game.powerbar.getCurrent() <= 10) {
      this.game.powerbar.setAccuracy();
      this.game.setState(this.game.getStrikingState());
    }
  }
  
  handleUpArrow() { }
  handleDownArrow() { }
  handleLeftArrow() { }
  handleRightArrow() { }
  
}