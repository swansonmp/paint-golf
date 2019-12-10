const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const BAR_X = GAME_WIDTH / 4;
const BAR_Y = GAME_HEIGHT - 50;
const BAR_WIDTH = GAME_WIDTH / 2;
const BAR_HEIGHT = GAME_HEIGHT / 20;
const PADDING = BAR_HEIGHT / 20;

const BARSTART = BAR_X + BAR_WIDTH - BAR_WIDTH / 11;

const DIR = {
  DECREASING: -1,
  IDLE: 0,
  INCREASING: 1
};

export default class PowerBar {
  constructor(game) {
    this.game = game;
    this.reset();
  }
  
  reset() {
    this.current = 0;
    this.dir = DIR.INCREASING;
    this.power = 0;
    this.accuracy = 0;
  }
  
  setPower() {
    this.power = this.current;
  }
  
  setAccuracy() {
    this.accuracy = this.current;
  }
  
  getCurrent() {
    return this.current;
  }
  
  getPower() {
    return this.power / 100;
  }
  
  getAccuracy() {
    return this.accuracy / 10;
  }
  
  update(deltaTime) {
    const RATE = 8;
    deltaTime /= RATE;
    
    if (this.dir === DIR.INCREASING) {
      if (this.current < 100)
        this.current += deltaTime;
      else
        this.dir = DIR.DECREASING;
    }
    else if (this.dir === DIR.DECREASING) {
      if (this.current > -10) {
        this.current -= deltaTime;
      }
      else {
        this.accuracy = -10;
      }
    }
  }
  
  draw(ctx) {
    //draw center
    ctx.fillStyle = "rgba(128,82,0,1)";
    ctx.fillRect(BAR_X, BAR_Y, BAR_WIDTH, BAR_HEIGHT);
    
    //draw active
    ctx.fillStyle = "rgba(255,165,0,1)";
    ctx.fillRect(this.getBarActiveX(), BAR_Y, this.getBarActiveWidth(), BAR_HEIGHT);
    
    //draw cursor
    const CURSOR_WIDTH = 4;
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillRect(this.getCursorX(), BAR_Y, CURSOR_WIDTH, BAR_HEIGHT);
    
    //draw outline
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.lineWidth = PADDING;
    ctx.strokeRect(BAR_X, BAR_Y, BAR_WIDTH, BAR_HEIGHT);
  }
  
  getBarActiveX() {
    return BARSTART - this.current * (BAR_WIDTH / 110);
  }
  
  getBarActiveWidth() {   
    return BARSTART - this.getBarActiveX();
  }
  
  getCursorX() {
    if (this.power > 0)
      return BARSTART - this.power * (BAR_WIDTH / 110);
    else
      return this.getBarActiveX();
  }

}