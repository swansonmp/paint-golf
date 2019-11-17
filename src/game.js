import Ball from "./ball.js";
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
    //this.gameObjects = [];

    new InputHandler(this.ball, this);
  }

  start() {
    //don't restart the game if we're not in menu or newlevel
    if (this.gamestate !== GAMESTATE.MENU) return;

    this.ball.reset();
    //this.gameObjects = [this.ball];

    this.gamestate = GAMESTATE.PAUSED;
  }

  strike(xVel, yVel, zVel) {
    this.gamestate = GAMESTATE.RUNNING;
    this.ball.strike(xVel, yVel, zVel);
  }
  
  update(deltaTime) {
	console.log("Gamestate: " + this.gamestate + "\n"
	+ "Position: x:" + this.ball.position.x + ", y:" + this.ball.position.y + ", z:" + this.ball.position.z + "\n"
	  + "Velocity: x:" + this.ball.velocity.x + ", y:" + this.ball.velocity.y + ", z:" + this.ball.velocity.z + "\n"
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
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
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
