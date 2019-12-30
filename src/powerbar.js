const DIR = {
  DECREASING: -1,
  IDLE: 0,
  INCREASING: 1
};

export default class PowerBar {
  constructor(game) {
    this.game = game;
    this.reset();
    
    //fields for drawing
    this.BAR_X = this.game.GAME_WIDTH / 4;
    this.BAR_Y = this.game.GAME_HEIGHT - 50;
    this.BAR_WIDTH = 600;
    this.BAR_HEIGHT = 30;
    this.PADDING = this.BAR_HEIGHT / 20;
    this.BARSTART = this.BAR_X + this.BAR_WIDTH - this.BAR_WIDTH / 11;
    this.CURSOR_WIDTH = 4;
  }
  
  reset() {
    this.current = 0;
    this.dir = DIR.INCREASING;
    this.power = 0;
    this.accuracy = 0;
  }
  
  setPower() { this.power = this.current; }
  setAccuracy() { this.accuracy = this.current; }
  getCurrent() { return this.current; }
  getPower() { return this.power / 100; }
  getAccuracy() { return this.accuracy / 10; }
  
  update(deltaTime) { 
    const RATE = 10;
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
    //update draw positions
    this.BAR_X = this.game.GAME_WIDTH / 4;
    this.BAR_Y = this.game.GAME_HEIGHT - 50;
    this.BARSTART = this.BAR_X + this.BAR_WIDTH - this.BAR_WIDTH / 11;
    
    //draw center
    ctx.fillStyle = "rgba(128,82,0,1)";
    ctx.fillRect(this.BAR_X, this.BAR_Y, this.BAR_WIDTH, this.BAR_HEIGHT);
    
    //draw active
    ctx.fillStyle = "rgba(255,165,0,1)";
    ctx.fillRect(this.getBarActiveX(), this.BAR_Y, this.getBarActiveWidth(), this.BAR_HEIGHT);
    
    //draw cursor
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillRect(this.getCursorX(), this.BAR_Y, this.CURSOR_WIDTH, this.BAR_HEIGHT);
    
    //draw outline
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.lineWidth = this.PADDING;
    ctx.strokeRect(this.BAR_X, this.BAR_Y, this.BAR_WIDTH, this.BAR_HEIGHT);
  }
  
  getBarActiveX() {
    return this.BARSTART - this.current * (this.BAR_WIDTH / 110);
  }
  
  getBarActiveWidth() {   
    return this.BARSTART - this.getBarActiveX();
  }
  
  getCursorX() {
    if (this.power > 0)
      return this.BARSTART - this.power * (this.BAR_WIDTH / 110);
    else
      return this.getBarActiveX();
  }

}