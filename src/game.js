import Loader from "./loader.js";

import Ball from "./ball.js";
import Cursor from "./cursor.js";
import Bag from "./bag.js";
import PowerBar from "./powerbar.js";
import Status from "./status.js";
import InputHandler from "./input.js";

import MenuState from "./menuState.js";
import LoadState from "./loadState.js";
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
  getIdleState() { return this.idleState; }
  getPowerState() { return this.powerState; }
  getAccuracyState() { return this.accuracyState; }
  getStrikingState() { return this.strikingState; }
  getRunningState() { return this.runningState; }
  getEvaluateState() { return this.evaluateState; }
  
  setState(state) {
    this.state = state;
  }
  
  debug() {
    
  }
  
  update(deltaTime) {
    this.state.update(deltaTime);
  }
  
  draw(ctx) {
    this.state.draw(ctx);
  }
  
  getCourse(name) {
    document.getElementById("course").src = "./assets/holes/" + name + ".png";
    document.getElementById("vanity").src = "./assets/holes/" + name + "-vanity.png";
    this.courseImage = document.getElementById("course");
    this.COURSE_WIDTH = this.courseImage.width;
    this.COURSE_HEIGHT = this.courseImage.height; 
    this.vanityImage = document.getElementById("vanity");
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
