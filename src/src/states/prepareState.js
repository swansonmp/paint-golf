export default class PrepareState {
  constructor(game) {
    this.game = game;
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
  
  draw(ctx) {
    this.game.course.draw(ctx);
    this.game.ball.draw(ctx);
    this.game.bag.draw(ctx);
  }
  
  handleEnter() { }
  handleSpace() { }
  handleUpArrow() { }
  handleDownArrow() { }
  handleLeftArrow() { }
  handleRightArrow() { }
  handleEscape() { }
  handleWKey() { }
  handleAKey() { }
  handleSKey() { }
  handleDKey() { }
  
}