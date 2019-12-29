import Loader from "./loader.js";

import Ball from "./ball.js";
import Wind from "./wind.js";
import Cursor from "./cursor.js";
import Bag from "./bag.js";
import PowerBar from "./powerbar.js";
import Status from "./status.js";
import InputHandler from "./input.js";
import Debug from "./debug.js";
import View from "./view.js";

import MenuState from "./states/menuState.js";
import LoadState from "./states/loadState.js";
import PrepareState from "./states/prepareState.js";
import IdleState from "./states/idleState.js";
import PanState from "./states/panState.js";
import PowerState from "./states/powerState.js";
import AccuracyState from "./states/accuracyState.js";
import StrikingState from "./states/strikingState.js";
import RunningState from "./states/runningState.js";
import EvaluateState from "./states/evaluateState.js";

export default class Game {
  constructor(GAME_WIDTH, GAME_HEIGHT, CTX) {
    this.getCourse("course");
    this.course;
    this.GAME_WIDTH = GAME_WIDTH;
    this.GAME_HEIGHT = GAME_HEIGHT;
    this.loader = new Loader(this, CTX);
    
    this.ball = new Ball(this);
    this.wind = new Wind(this);
    this.cursor = new Cursor(this);
    this.powerbar = new PowerBar(this);
    this.bag = new Bag(this);
    this.status = new Status(this);
    
    this.debug = new Debug(this);
    this.view = new View(this);
    
    this.strokes = 0;
    this.holeNum = 1;

    new InputHandler(this);
    
    this.menuState = new MenuState(this);
    this.loadState = new LoadState(this);
    this.prepareState = new PrepareState(this);
    this.idleState = new IdleState(this);
    this.panState = new PanState(this);
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
  getPanState() { return this.panState; }
  getPowerState() { return this.powerState; }
  getAccuracyState() { return this.accuracyState; }
  getStrikingState() { return this.strikingState; }
  getRunningState() { return this.runningState; }
  getEvaluateState() { return this.evaluateState; }
  
  setState(state) {
    this.state = state;
  }
  
  update(deltaTime) {
    this.state.update(deltaTime);
    this.debug.update(deltaTime);
  }
  
  draw(ctx) {
    this.state.draw(ctx);
    this.debug.draw(ctx);
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
  
  getCustomCourse() {
    this.courseImage = document.getElementById("custom");
    this.vanityImage = this.courseImage;
    this.COURSE_WIDTH = this.courseImage.width;
    this.COURSE_HEIGHT = this.courseImage.height;
  }
  
}