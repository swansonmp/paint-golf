const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

export default class PowerBar {
  constructor() {
    
    
  }
  
  init() {
    this.current = 0;
    this.dir = 1;
  }
  
  draw(ctx) {
    
  }
  
  update(deltaTime) {
    if (this.dir > 0) {
      if (this.current < 100)
        this.current += this.dir;
      else this.dir = -1;
    }
    else {
      if (this.current > -10)
        this.current += dir;
      //else
    }
    
  }
}