import ActionState from "./actionState.js";

export default class RunningState extends ActionState {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    this.game.wind.update(deltaTime);
    if (this.game.ball.isMoving()) {
      this.game.ball.update(deltaTime);
      this.game.currentYards.update(deltaTime);
    }
    else {
      this.game.setState(this.game.getEvaluateState());
    }
  }
  
  drawDynamicElements(ctx) {
    this.game.course.draw(ctx); 
    this.game.ball.draw(ctx);
  }
  
  drawStaticElements(ctx) {
    this.game.wind.draw(ctx);
    this.game.bag.draw(ctx);
    this.game.status.draw(ctx);
    this.game.currentYards.draw(ctx);
  }
  
}