import Loader from "./loader.js";
import Game from "./game.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let course = document.getElementById("course");
const COURSE_WIDTH = course.width;
const COURSE_HEIGHT = course.height;

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

let loader = new Loader(COURSE_WIDTH, COURSE_HEIGHT, ctx);
let game = new Game(COURSE_WIDTH, COURSE_HEIGHT, GAME_WIDTH, GAME_HEIGHT, loader);

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
