import ActionState from "./actionState.js";

export default class AccuracyState extends ActionState {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    this.game.powerbar.update(deltaTime);
    this.game.wind.update(deltaTime);
    //go to striking if current is out of range
    if (this.game.powerbar.outOfRange()) {
      this.game.powerbar.setAccuracy();
      this.game.setState(this.game.getPreStrikingState());
      return;
    }
  }
  
  drawDynamicElements(ctx) {
    this.game.course.draw(ctx); 
    this.game.ball.draw(ctx);
  }
  
  drawStaticElements(ctx) {
    this.game.wind.draw(ctx);
    this.game.powerbar.draw(ctx);
    this.game.bag.draw(ctx);
    this.game.status.draw(ctx);
  }
  
  handleSpace() {
     this.game.sounds.click.play();
    //only set accuracy is current is valid
    if (this.game.powerbar.validAccuracy()) {
      this.game.sounds.click.play();
      this.game.powerbar.setAccuracy();
      this.game.setState(this.game.getPreStrikingState());
    }
  }
  
}