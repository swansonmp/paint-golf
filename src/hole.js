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
  constructor(holeNum) {
    //this.loaded = false;
    this.image = document.getElementById("hole");
    /*
    this.image.onload = function() {
      this.loaded = true;
    };
    this.image.src = "./assets/holes/hole".concat(holeNum.toString()).concat(".png");
    */
    
    //this.map = loadHole(image);
  }
  
  loadHole(image) {
    
  }
  
  draw(ctx) {
    //console.log(this.loaded);
    //if (this.loaded)
      ctx.drawImage(this.image, 0, 0, GAME_WIDTH, GAME_HEIGHT);
  }
  
  update(deltaTime) {
    
  }
}