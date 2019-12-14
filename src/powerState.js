export default class PowerState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    //if current is -10, go to idle
    if (this.game.powerbar.getCurrent() <= -10) {
      this.game.setState(this.game.getIdleState());
      return;
    }
    //else update powerbar
    this.game.powerbar.update(deltaTime);
  }
  
  draw(ctx) {
    this.game.course.draw(ctx);
    this.game.ball.draw(ctx);
    
    this.game.powerbar.draw(ctx);
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
  
}