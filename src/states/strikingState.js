import ActionState from "./actionState.js";

export default class StrikingState extends ActionState {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    this.playStrikeSound();
    //strike ball - late sends ball left, early sends ball right
    this.game.ball.strike(
        this.game.bag.getClub().horizontal * this.game.powerbar.getPower(), 
        this.game.bag.getClub().vertical * this.game.powerbar.getPower(), 
        this.game.powerbar.getAccuracy()
    );
    this.game.wind.update(deltaTime);
    this.game.powerbar.reset();                       //reset powerbar
    this.game.strokes++;                              //add stroke
    this.game.setState(this.game.getRunningState());  //go to running state
  }
  
  playStrikeSound() {
    if (Math.abs(this.game.powerbar.getAccuracy()) < 1/8) this.game.sounds.goodStrike.play();
    else if (Math.abs(this.game.powerbar.getAccuracy()) < 1/3) this.game.sounds.okayStrike.play();
    else this.game.sounds.badStrike.play();
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