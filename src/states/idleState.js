import ActionState from "./actionState.js";

export default class IdleState extends ActionState {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    this.game.cursor.update(deltaTime);
    this.game.wind.update(deltaTime);
  }
  
  drawDynamicElements(ctx) {
    this.game.course.draw(ctx);
    this.game.cursor.draw(ctx); 
    this.game.ball.draw(ctx);
  }
  
  drawStaticElements(ctx) {
    this.game.wind.draw(ctx);
    this.game.powerbar.draw(ctx);
    this.game.bag.draw(ctx);
    this.game.status.draw(ctx);
  }
  
  //TODO debug command
  handleEnter() {
    this.game.ball.reset(this.game.course.tees[1].x, this.game.course.tees[1].y, 0);
    this.game.ball.strike(this.game.bag.getClub().horizontal, this.game.bag.getClub().vertical, 0);
    this.game.setState(this.game.getRunningState());  //go to running state
  }
  
  handleSpace() {
    this.game.sounds.click.play();
    this.game.powerbar.reset();
    this.game.setState(this.game.getPowerState());
  }
  
  handleUpArrow() {
    this.game.bag.incBag();
  }
  
  handleDownArrow() {
    this.game.bag.decBag();
  }
  
  handleLeftArrow() {
    this.game.ball.decAngle();
  }
  
  handleRightArrow() {
    this.game.ball.incAngle();
  }
  
  handleEscape() {
    this.game.setState(this.game.getMenuState());
  }
  
  handleWKey() { this.game.setState(this.game.getPanState()); }
  handleAKey() { this.game.setState(this.game.getPanState()); }
  handleSKey() { this.game.setState(this.game.getPanState()); }
  handleDKey() { this.game.setState(this.game.getPanState()); }
  
  handleMinusKey() {
    
  }
  
  handleEqualKey() {
    
  }

}