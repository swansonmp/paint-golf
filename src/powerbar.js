const DIR = {
  DECREASING: -1,
  IDLE: 0,
  INCREASING: 1
};

export default class PowerBar {
  constructor(game) {
    this.game = game;
    this.reset();
    
    this.BAR_MIN = -12;
    
    //fields for drawing
    this.BAR_WIDTH = 600;
    this.BAR_HEIGHT = 30;
    this.LINE_WIDTH = 3;
    this.CURSOR_WIDTH = 5;
    this.TICK_WIDTH = 3;
    this.tickMarks = [25, 50, 75, 100];
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
  getAccuracy() { return this.accuracy / -this.BAR_MIN; }
  
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
      if (this.current > this.BAR_MIN) {
        this.current -= deltaTime;
      }
      else {
        this.accuracy = this.BAR_MIN;
      }
    }
  }
  
  draw(ctx) {
    //update draw positions
    this.BAR_X = this.game.GAME_WIDTH / 2 - this.BAR_WIDTH / 2;
    this.BAR_Y = this.game.GAME_HEIGHT - this.BAR_HEIGHT - this.game.drawUtil.getPadding() - this.game.drawUtil.getDefaultTextSize() * 0.4;
    this.BAR_START = this.BAR_X + this.BAR_WIDTH - this.BAR_WIDTH / ((100 - this.BAR_MIN) / -this.BAR_MIN);
    //calculate hue
    let h = -0.6 * this.current + 60;
    
    //draw center
    ctx.fillStyle = "hsl(" + h + ",100%,25%)";
    ctx.fillRect(this.BAR_X, this.BAR_Y, this.BAR_WIDTH, this.BAR_HEIGHT);
    
    //draw active
    ctx.fillStyle = "hsl(" + h + ",100%,50%)";
    ctx.fillRect(this.getBarActiveX(), this.BAR_Y, this.getBarActiveWidth(), this.BAR_HEIGHT);
    
    this.drawTickMarks(ctx);
    
    //draw zero
    ctx.fillStyle = "rgba(230,230,230,1)";
    ctx.fillRect(this.getXFromValue(0) - this.CURSOR_WIDTH / 2, this.BAR_Y, this.CURSOR_WIDTH, this.BAR_HEIGHT);
    
    //draw cursor
    this.drawCursor(ctx);
    
    //draw outline
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.lineWidth = this.LINE_WIDTH;
    ctx.strokeRect(this.BAR_X, this.BAR_Y, this.BAR_WIDTH, this.BAR_HEIGHT);
    
    //draw accuracy guide
    this.drawAccuracyGuide(ctx);
  }
  
  drawTickMarks(ctx) {
    for (const t of this.tickMarks) {
      ctx.fillStyle = "rgba(0,0,0,0.75)";
      ctx.fillRect(this.getXFromValue(t) - this.TICK_WIDTH / 2, this.BAR_Y, this.TICK_WIDTH, this.BAR_HEIGHT);
      
      this.game.drawUtil.drawText( ctx,
        t + "%", 
        this.getXFromValue(t),
        this.BAR_Y - this.LINE_WIDTH * 4,
        "center",
        this.game.drawUtil.getDefaultTextSize() * 0.4,
        this.game.drawUtil.getDefaultStrokeWidth() * 0.4,
        true
      );
      
      this.game.drawUtil.drawText( ctx,
        (this.game.bag.getClub().carry * (t / 100)).toFixed(0) + "y", 
        this.getXFromValue(t),
        this.BAR_Y + this.BAR_HEIGHT + this.game.drawUtil.getDefaultTextSize() * 0.4,
        "center",
        this.game.drawUtil.getDefaultTextSize() * 0.4,
        this.game.drawUtil.getDefaultStrokeWidth() * 0.4,
        true
      );
    }
  }
  
  drawCursor(ctx) {
    ctx.fillStyle = "rgba(255,255,255,1)";
    let dx = this.getCursorX() - this.CURSOR_WIDTH / 2;
    let cw = this.CURSOR_WIDTH;
    if (dx < this.BAR_X) {
      cw = this.BAR_X - dx;
      dx = this.BAR_X;
    }
    else if (dx > this.BAR_X + this.BAR_WIDTH - cw) {
      dx = this.BAR_X + this.BAR_WIDTH - cw
    }
    ctx.fillRect(dx, this.BAR_Y, cw, this.BAR_HEIGHT);
  }
  
  drawAccuracyGuide(ctx) {
    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.fillRect(
        this.getXFromValue(-this.BAR_MIN), 
        this.BAR_Y + this.BAR_HEIGHT + this.LINE_WIDTH, 
        this.getXFromValue(this.BAR_MIN) - this.getXFromValue(-this.BAR_MIN), 
        this.BAR_HEIGHT / 4
    );
    ctx.fillStyle = "rgba(255,255,0,1)";
    ctx.fillRect(
        this.getXFromValue(-this.BAR_MIN / 1.75), 
        this.BAR_Y + this.BAR_HEIGHT + this.LINE_WIDTH, 
        this.getXFromValue(this.BAR_MIN / 1.75) - this.getXFromValue(-this.BAR_MIN / 1.75), 
        this.BAR_HEIGHT / 4
    );
    ctx.fillStyle = "rgba(0,255,0,1)";
    ctx.fillRect(
        this.getXFromValue(-this.BAR_MIN / 4), 
        this.BAR_Y + this.BAR_HEIGHT + this.LINE_WIDTH, 
        this.getXFromValue(this.BAR_MIN / 4) - this.getXFromValue(-this.BAR_MIN / 4), 
        this.BAR_HEIGHT / 4
    );
  }
  
  getXFromValue(value) {
    return this.BAR_START - value * (this.BAR_WIDTH / (100 - this.BAR_MIN));
  }
  
  getBarActiveX() {
    return this.BAR_START - this.current * (this.BAR_WIDTH / (100 - this.BAR_MIN));
  }
  
  getBarActiveWidth() {   
    return this.BAR_START - this.getBarActiveX();
  }
  
  getCursorX() {
    if (this.power > 0)
      return this.BAR_START - this.power * (this.BAR_WIDTH / (100 - this.BAR_MIN));
    else
      return this.getBarActiveX();
  }
  
  outOfRange() {
    return this.getCurrent() <= this.BAR_MIN;
  }
  
  validAccuracy() {
    return this.game.powerbar.getCurrent() <= -this.BAR_MIN;
  }
}