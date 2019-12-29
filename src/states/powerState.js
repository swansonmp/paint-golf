export default class PowerState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    //if current is -10, go to idle
    if (this.game.powerbar.getCurrent() <= -10) {
      this.game.powerbar.reset();
      this.game.setState(this.game.getIdleState());
      return;
    }
    //else update powerbar
    this.game.powerbar.update(deltaTime);
    this.game.wind.update(deltaTime);
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
    this.game.powerbar.setPower();
    this.game.setState(this.game.getAccuracyState());
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