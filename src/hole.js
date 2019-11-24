import Palette from "./palette.js";

export default class Hole {
  constructor(game) {
    this.game = game;
    //this.loaded = false;
    this.image = document.getElementById("hole" + this.game.holeNum);
    
    this.palette = new Palette();
    /*
    this.image.onload = function() {
      this.loaded = true;
    };
    this.image.src = "./assets/holes/hole".concat(holeNum.toString()).concat(".png");
    */
    
    this.tee = { x: -1, y: -1 };
    this.map;
  }
  
  draw(ctx) {
    //if (this.loaded)
      ctx.drawImage(this.image, 0, 0, this.game.GAME_WIDTH, this.game.GAME_HEIGHT);
  }
  
  update(deltaTime) {
    
  }

}