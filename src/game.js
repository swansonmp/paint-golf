import Loader from "./loader.js";

import Ball from "./ball.js";
import Cursor from "./cursor.js";
import Bag from "./bag.js";
import PowerBar from "./powerbar.js";
import Status from "./status.js";
import InputHandler from "./input.js";

import MenuState from "./menuState.js";
import LoadState from "./loadState.js";
import PrepareState from "./prepareState.js";
import IdleState from "./idleState.js";
import PowerState from "./powerState.js";
import AccuracyState from "./accuracyState.js";
import StrikingState from "./strikingState.js";
import RunningState from "./runningState.js";
import EvaluateState from "./evaluateState.js";

export default class Game {
  constructor(GAME_WIDTH, GAME_HEIGHT, CTX) {
    this.getCourse("course");
    this.course;
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

    new InputHandler(this);
    
    this.menuState = new MenuState(this);
    this.loadState = new LoadState(this);
    this.prepareState = new PrepareState(this);
    this.idleState = new IdleState(this);
    this.powerState = new PowerState(this);
    this.accuracyState = new AccuracyState(this);
    this.strikingState = new StrikingState(this);
    this.runningState = new RunningState(this);
    this.evaluateState = new EvaluateState(this);
    
    this.setState(this.getMenuState());
  }
  
  getMenuState() { return this.menuState; }
  getLoadState() { return this.loadState; }
  getPrepareState() { return this.prepareState; }
  getIdleState() { return this.idleState; }
  getPowerState() { return this.powerState; }
  getAccuracyState() { return this.accuracyState; }
  getStrikingState() { return this.strikingState; }
  getRunningState() { return this.runningState; }
  getEvaluateState() { return this.evaluateState; }
  
  setState(state) {
    this.state = state;
  }
  
  debug(ctx) {
    ctx.font = "bold 50px monospace";
    ctx.textAlign = "right";
    ctx.fillStyle = "yellow";
    ctx.fillText(
        (1000 / this.dt).toFixed(0),
        this.GAME_WIDTH - 20,
        70
    );
  }
  
  update(deltaTime) {
    this.dt = deltaTime;
    this.state.update(deltaTime);
  }
  
  draw(ctx) {
    this.state.draw(ctx);
    this.debug(ctx);
  }
  
  getCourse(name) {
    this.courseImage = document.getElementById("course");
    this.vanityImage = document.getElementById("vanity");
    this.courseImage.src = "./assets/holes/" + name + ".png";
    this.vanityImage.src = "./assets/holes/" + name + "-vanity.png";
    this.COURSE_WIDTH = this.courseImage.width;
    this.COURSE_HEIGHT = this.courseImage.height; 
    if (this.vanityImage.width == 0) {
      console.error(name + "-vanity.png not found");
      this.vanityImage = this.courseImage;
    }
    else if (this.vanityImage.width != this.courseImage.width || this.vanityImage.height != this.courseImage.height) {
      console.error(name + "-vanity.png's dimensions do not match that of " + name + ".png");
      this.vanityImage = this.courseImage;
    }
  }
  
}
