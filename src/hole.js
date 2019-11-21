import Palette from "./palette.js";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

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
    
    this.map = this.create2DArray(this.game.GAME_WIDTH);
  }
  
  draw(ctx) {
    //if (this.loaded)
      ctx.drawImage(this.image, 0, 0, GAME_WIDTH, GAME_HEIGHT);
  }
  
  update(deltaTime) {
    
  }
  
  loadHole(image) {
    let imgData = this.game.CTX.getImageData(0, 0, this.game.GAME_WIDTH, this.game.GAME_HEIGHT);
    let i;
    for (i = 0; i < imgData.data.length; i += 4) {
      //imgData.data[i] = 255-imgData.data[i];
      //imgData.data[i + 1] = 255-imgData.data[i + 1];
      //imgData.data[i + 2] = 255-imgData.data[i + 2];
      //imgData.data[i + 3] = 255;
    }
  }

  create2DArray(rows) {
    var arr = [];
    for (var i=0;i<rows;i++) {
      arr[i] = [];
    }
    return arr;
  }
}