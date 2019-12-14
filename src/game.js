import Loader from "./loader.js";

import Ball from "./ball.js";
import Cursor from "./cursor.js";
import Bag from "./bag.js";
import PowerBar from "./powerbar.js";
import Status from "./status.js";
import InputHandler from "./input.js";

import TitleState from "./titleState.js";
import MainState from "./mainState.js";
import OpenState from "./openState.js";
import SettingsState from "./settingsState.js";
import LoadState from "./loadState.js";
import IdleState from "./idleState.js";
import PowerState from "./powerState.js";
import AccuracyState from "./accuracyState.js";
import StrikingState from "./strikingState.js";
import RunningState from "./runningState.js";
import EvaluateState from "./evaluateState.js";

export default class Game {
  constructor(GAME_WIDTH, GAME_HEIGHT, CTX) {
    this.course = document.getElementById("course");
    this.COURSE_WIDTH = course.width;
    this.COURSE_HEIGHT = course.height; 
    this.GAME_WIDTH = GAME_WIDTH;
    this.GAME_HEIGHT = GAME_HEIGHT;
    this.loader = new Loader(this, CTX);
    
    this.ball = new Ball(this);
    this.cursor = new Cursor(this);
    this.powerbar = new PowerBar(this);
    this.bag = new Bag(this);
    this.status = new Status(this);
    
    this.strokes = 0;
    this.holeNum = 1;
    this.hole;

    new InputHandler(this);
    
    this.titleState = new TitleState(this);
    this.mainState = new MainState(this);
    this.openState = new OpenState(this);
    this.settingsState = new SettingsState(this);
    this.loadState = new LoadState(this);
    this.idleState = new IdleState(this);
    this.powerState = new PowerState(this);
    this.accuracyState = new AccuracyState(this);
    this.strikingState = new StrikingState(this);
    this.runningState = new RunningState(this);
    this.evaluateState = new EvaluateState(this);
    
    this.setState(this.getTitleState());
  }
  
  getTitleState() { return this.titleState; }
  getMainState() { return this.mainState; }
  getOpenState() { return this.openState; }
  getSettingsState() { return this.settingsState; }
  getLoadState() { return this.loadState; }
  getIdleState() { return this.idleState; }
  getPowerState() { return this.powerState; }
  getAccuracyState() { return this.accuracyState; }
  getStrikingState() { return this.strikingState; }
  getRunningState() { return this.runningState; }
  getEvaluateState() { return this.evaluateState; }
  
  setState(state) {
    this.state = state;
  }
  
  /*
   *  Outputs relevant debug information to the console.
   */
  debug() {
    console.log("Gamestate: " + this.state + "\n"
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
