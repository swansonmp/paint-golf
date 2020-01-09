import ActionState from "./actionState.js";

export default class EvaluateState extends ActionState {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    if (this.game.ball.inHole()) {                  //if the ball is in the hole
      this.game.holeNum++;                          //increment hole
      this.game.strokes = 0;
      this.game.ball.reset(this.game.course.tees[this.game.holeNum].x, this.game.course.tees[this.game.holeNum].y, 0);
    }
    else {
      if (this.game.ball.inWater()) {               //if the ball is in the water
        this.game.sounds.splash.play();
        this.game.strokes++;                        //add penalty stroke
        this.game.ball.reset(
            this.game.ball.lastPosition.x, 
            this.game.ball.lastPosition.y, 
            this.game.ball.lastPosition.z
        );
      }
    }
    this.game.wind.update(deltaTime);
    this.game.setState(this.game.getPrepareState()); //go to prepare state
  }
  
  drawDynamicElements(ctx) {
    this.game.course.draw(ctx); 
    this.game.ball.draw(ctx);
  }
  
  drawStaticElements(ctx) {
    this.game.wind.draw(ctx);
    this.game.bag.draw(ctx);
    this.game.status.draw(ctx);
  }
  
}