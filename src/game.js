import Ball from "./ball.js";
import Cursor from "./cursor.js";
import Bag from "./bag.js";
import Hole from "./hole.js";
import PowerBar from "./powerbar.js";
import InputHandler from "./input.js";

const GAMESTATE = {
  IDLE: 0,
  STRIKING: 1,
  RUNNING: 2,
  MENU: 3
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    
    this.ball = new Ball();
    this.cursor = new Cursor(this.ball);
    this.powerbar = new PowerBar();
    
    this.bag = new Bag();
    
    this.hole = new Hole("hole1");
    //this.gameObjects = [];

    new InputHandler(this.ball, this);
  }

  start() {
    //don't restart the game if we're not in menu or newlevel
    //TODO take this comment out for no instant reset
    //if (this.gamestate !== GAMESTATE.MENU) return;

    this.ball.reset();
    //this.gameObjects = [this.ball, this.cursor];

    this.gamestate = GAMESTATE.IDLE;
  }

  strike() {
    this.gamestate = GAMESTATE.RUNNING;
    this.ball.strike(this.bag.getClub().speed, this.bag.getClub().zvel);
  }
  
  incBag() {
    this.bag.incBag();
  }
  
  decBag() {
    this.bag.decBag();
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

    this.debug();
	
    if (this.gamestate === GAMESTATE.MENU) return;
    //if (this.gamestate === GAMESTATE.IDLE) return;
    
    if (this.gamestate === GAMESTATE.STRIKING) {
      this.powerbar.update();
    }
	
    if (this.ball.isMoving()) {
      this.ball.update(deltaTime); //this.gameObjects.forEach(object => object.update(deltaTime));
    }
    else {
      this.gamestate = GAMESTATE.IDLE;
    }

  }
  
  draw(ctx) {
    this.hole.draw(ctx);
    this.ball.draw(ctx); //this.gameObjects.forEach(object => object.draw(ctx));
    
    if (this.gamestate === GAMESTATE.STRIKING) {
      this.powerbar.draw(ctx);
    }
    
    //if game is IDLE
    if (this.gamestate === GAMESTATE.IDLE) {
      //draw the cursor
      this.cursor.draw(ctx);
      //draw powerbar
      this.powerbar.draw(ctx);
      //draw club indicator
      this.bag.draw(ctx);
    }
	
    //if game is in menu
    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "small-caps bold 50px monospace";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press ENTER To Start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
  }
  
}
