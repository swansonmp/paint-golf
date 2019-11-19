const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

export default class Hole {
  constructor(name) {
    this.image = document.getElementById(name);
    
    
  }

  draw(ctx) {
    ctx.drawImage(this.image, 0, 0, GAME_WIDTH, GAME_HEIGHT);
  }
  
  update(deltaTime) {
    
  }
}