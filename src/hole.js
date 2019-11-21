import Palette from "./palette.js";

const PIXELTYPE = {
  TEE: 0,
  HOLE: 1,
  GREEN: 2,
  FAIRWAY: 3,
  ROUGH: 4,
  BUNKER: 5,
  WATER: 6
};

export default class Hole {
  constructor(game) {
    this.game = game;
    //this.loaded = false;
    this.image = document.getElementById("hole");
    
    this.palette = new Palette();
    /*
    this.image.onload = function() {
      this.loaded = true;
    };
    this.image.src = "./assets/holes/hole".concat(holeNum.toString()).concat(".png");
    */
  }
  
  draw(ctx) {
    //if (this.loaded)
      ctx.drawImage(this.image, 0, 0, this.game.GAME_WIDTH, this.game.GAME_HEIGHT);
  }
  
  update(deltaTime) {
    
  }

}