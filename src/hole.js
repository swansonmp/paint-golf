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
  constructor(name) {
    this.image = document.getElementById(name);
    
    //this.map = loadHole(image);
  }
  
  loadHole(image) {
    
  }
  
  draw(ctx) {
    ctx.drawImage(this.image, 0, 0, GAME_WIDTH, GAME_HEIGHT);
  }
  
  update(deltaTime) {
    
  }
}