export default class IdleState {
  constructor(game) {
    this.game = game;
  }
  
  update(deltaTime) {
    //nothing to update!
  }
  
  draw(ctx) {
    this.game.hole.draw(ctx);
    this.game.ball.draw(ctx);
    
    this.game.cursor.draw(ctx);
    this.game.bag.draw(ctx);
    
    this.game.powerbar.draw(ctx);
  }
  
  handleEnter() { }
  
  handleSpace() {
    this.game.powerbar.start();
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

}