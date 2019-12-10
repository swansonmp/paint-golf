import Loader from "./loader.js";
import Game from "./game.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

canvas.width = 800; //document.body.clientWidth;
canvas.height = 600; //document.body.clientHeight;

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

let loader = new Loader(GAME_WIDTH, GAME_HEIGHT, ctx);
let game = new Game(GAME_WIDTH, GAME_HEIGHT, loader);

let lastTime = 0;

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
