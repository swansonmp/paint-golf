import ActionState from "./actionState.js";

export default class PrepareState extends ActionState {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) { 
    try {
      this.game.status.update(deltaTime);
    }
    catch (e) {
      console.error(e);
      this.game.setState(this.game.getMenuState()); //go to menu state
    }
    
    this.game.ball.angleToHole();
    
    this.game.wind.updateWind();
    this.game.wind.update(deltaTime);
    
    this.game.setState(this.game.getIdleState()); //go to idle state
  }
  
  drawDynamicElements(ctx) {
    this.game.course.draw(ctx);
    this.game.ball.draw(ctx);
  }
  
  drawStaticElements(ctx) {
    this.game.bag.draw(ctx);
  }
  
}