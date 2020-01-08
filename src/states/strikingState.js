import State from "./state.js";

export default class StrikingState extends State {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
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

  draw(ctx) {
    this.game.course.draw(ctx);
    this.game.ball.draw(ctx);
    this.game.powerbar.draw(ctx);
    this.game.wind.draw(ctx);
    this.game.bag.draw(ctx);
    this.game.status.draw(ctx);
  }
  
}