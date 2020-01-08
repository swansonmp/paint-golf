import State from "./state.js";

export default class PanState extends State {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    this.game.cursor.update(deltaTime);
    this.game.wind.update(deltaTime);
    this.game.view.update(deltaTime);
  }
  
  draw(ctx) {
    this.game.course.draw(ctx);
    this.game.cursor.draw(ctx);
    this.game.ball.draw(ctx);
    this.game.wind.draw(ctx);
    this.game.bag.draw(ctx);
    this.game.status.draw(ctx);
  }
  
  handleReset() {
    this.game.view.offsetX = 0;
    this.game.view.offsetY = 0;
    this.game.setState(this.game.getIdleState());  //go to running state
  }
  handleEnter() { this.handleReset(); }  
  handleSpace() { this.handleReset(); }
  
  handleUpArrow() { this.game.bag.incBag(); }
  handleDownArrow() { this.game.bag.decBag(); }
  handleLeftArrow() { this.game.ball.decAngle(); }
  handleRightArrow() { this.game.ball.incAngle(); }
  handleEscape() { this.game.setState(this.game.getMenuState()); }
  
  handleWKey() { this.game.view.decrementViewOffsetY(); }
  handleAKey() { this.game.view.decrementViewOffsetX(); }
  handleSKey() { this.game.view.incrementViewOffsetY(); }
  handleDKey() { this.game.view.incrementViewOffsetX(); }

}