const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const BAR_X = GAME_WIDTH / 4;
const BAR_Y = GAME_HEIGHT - 50;
const BAR_WIDTH = 400;
const BAR_HEIGHT = 30;
const PADDING = 2;

export default class PowerBar {
  constructor() {
    
    
  }
  
  init() {
    this.current = 0;
    this.dir = 1;
  }
  
  draw(ctx) {
    //draw outline
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(BAR_X, BAR_Y, BAR_WIDTH, BAR_HEIGHT);

    //draw center
    ctx.fillStyle = "rgba(128,82,0,1)";
    ctx.fillRect(BAR_X + PADDING, BAR_Y + PADDING, BAR_WIDTH - PADDING * 2, BAR_HEIGHT - PADDING * 2);
    
    //draw active
    //ctx.fillStyle = "rgba(255,165,0,1)";
    
    //draw cursor
    //TODO
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