export default class AccuracyState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    this.game.powerbar.update(deltaTime);
    this.game.wind.update(deltaTime);
    //go to striking if current is -10
    if (this.game.powerbar.getCurrent() <= -10) {
      this.game.setState(this.game.getStrikingState());
      return;
    }
  }
  
  draw(ctx) {
    this.game.course.draw(ctx);
    this.game.ball.draw(ctx);
    this.game.wind.draw(ctx);
    this.game.powerbar.draw(ctx);
    this.game.bag.draw(ctx);
    this.game.status.draw(ctx);
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
  handleWKey() { }
  handleAKey() { }
  handleSKey() { }
  handleDKey() { }
  
}