import Ball from "./ball.js";
import Cursor from "./cursor.js";
import Bag from "./bag.js";
import PowerBar from "./powerbar.js";
import InputHandler from "./input.js";

import MenuState from "./menuState.js";
import LoadState from "./loadState.js";
import IdleState from "./idleState.js";
import PowerState from "./powerState.js";
import AccuracyState from "./accuracyState.js";
import RunningState from "./runningState.js";
import EvaluateState from "./evaluateState.js";

export default class Game {
  constructor(GAME_WIDTH, GAME_HEIGHT, loader) {
    this.GAME_WIDTH = GAME_WIDTH;
    this.GAME_HEIGHT = GAME_HEIGHT;
    this.loader = loader;
    
    this.ball = new Ball(this);
    this.cursor = new Cursor(this.ball);
    this.powerbar = new PowerBar(this);
    this.bag = new Bag(this);
    this.holeNum = 1;
    this.hole;

    new InputHandler(this);
    
    this.menuState = new MenuState(this);
    this.loadState = new LoadState(this);
    this.idleState = new IdleState(this);
    this.powerState = new PowerState(this);
    this.accuracyState = new AccuracyState(this);
    this.runningState = new RunningState(this);
    this.evaluateState = new EvaluateState(this);
    
    this.setState(this.getMenuState());
  }
  
  getMenuState() { return this.menuState; }
  getLoadState() { return this.loadState; }
  getIdleState() { return this.idleState; }
  getPowerState() { return this.powerState; }
  getAccuracyState() { return this.accuracyState; }
  getRunningState() { return this.runningState; }
  getEvaluateState() { return this.evaluateState; }
  
  setState(state) {
    this.state = state;
  }
  
  /*
   *  Outputs relevant debug information to the console.
   */
  debug() {
    console.log("Gamestate: " + this.gamestate + "\n"
        + "Position: x:" + this.ball.position.x + ", y:" + this.ball.position.y + ", z:" + this.ball.position.z + "\n"
        + "Speed: " + this.ball.speed + "\n"
        + "Angle: " + this.ball.angle + "\n"
        + "ZVel: " + this.ball.zvel + "\n"
        + "Is moving: " + this.ball.isMoving() + "\n"
        + "Club: " + this.bag.getClub().name); 
  }
  
  update(deltaTime) {
    this.state.update(deltaTime);
  }
  
  draw(ctx) {
    this.state.draw(ctx);
  }
  
}
