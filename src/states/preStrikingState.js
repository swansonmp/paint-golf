import ActionState from "./actionState.js";

export default class PreStrikingState extends ActionState {
  constructor(game) {
    super(game);
    this.maxTime = 1000;
    
    this.reset();
  }
  
  reset() {
    this.elapsedTime = 0;
  }
  
  update(deltaTime) {
    this.elapsedTime += deltaTime;
    if (this.elapsedTime >= this.maxTime) {
      this.reset();
      this.game.setState(this.game.getStrikingState());
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
  
}