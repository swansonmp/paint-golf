import State from "./state.js";

export default class PowerState extends State {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    //if current is out of range, go to idle
    if (this.game.powerbar.outOfRange()) {
      this.game.powerbar.reset();
      this.game.setState(this.game.getIdleState());
    }
    //else update powerbar
    else {
      this.game.powerbar.update(deltaTime);
      this.game.wind.update(deltaTime);
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
  
  handleSpace() {
    this.game.powerbar.setPower();
    this.game.setState(this.game.getAccuracyState());
  }
  
}