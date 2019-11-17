import Ball from "./ball.js";
import Cursor from "./cursor.js";
import Bag from "./bag.js";
import InputHandler from "./input.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.ball = new Ball(this);
	this.cursor = new Cursor(this.ball);
    //this.gameObjects = [];

    new InputHandler(this.ball, this);
  }

  start() {
    //don't restart the game if we're not in menu or newlevel
    if (this.gamestate !== GAMESTATE.MENU) return;

    this.ball.reset();
    //this.gameObjects = [this.ball, this.cursor];

    this.gamestate = GAMESTATE.PAUSED;
  }

  strike(speed, zvel) {
    this.gamestate = GAMESTATE.RUNNING;
    this.ball.strike(speed, zvel);
  }
  
  update(deltaTime) {
	
	console.log("Gamestate: " + this.gamestate + "\n"
	  + "Position: x:" + this.ball.position.x + ", y:" + this.ball.position.y + ", z:" + this.ball.position.z + "\n"
	  + "Speed: " + this.ball.speed + "\n"
	  + "Angle: " + this.ball.angle + "\n"
	  + "ZVel: " + this.ball.zvel + "\n"
	  + "Is moving: " + this.ball.isMoving()); 
	
	
    if (this.gamestate === GAMESTATE.MENU) return;
	//if (this.gamestate === GAMESTATE.PAUSED) return;
	
    if (this.ball.isMoving()) {
      this.ball.update(deltaTime); //this.gameObjects.forEach(object => object.update(deltaTime));
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }

  }

  draw(ctx) {
    this.ball.draw(ctx); //this.gameObjects.forEach(object => object.draw(ctx));
    
	//if game is paused
    if (this.gamestate === GAMESTATE.PAUSED) {
	  this.cursor.draw(ctx);
	  
	  /* Grayed-out menu code
      ctx.fillStyle = "rgba(0,0,0,0.5)";
	  ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      //ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      //ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(this.ball.angle, this.gameWidth / 2, this.gameHeight / 2);
	  */
    }
	
    //if game is in menu
    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
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
