const INITIAL_SPEED_MAX = 8;
const ANGLE_RATE = 1;
const SPEED_RATE = 0.5;
const INTERNAL_RATIO = 256;
const HEIGHT_RATE = 1/64;

const BACKGROUND_COLOR = "rgba(255, 255, 255, 0.85)";
const OUTLINE_COLOR = "rgba(0, 0, 0, 1)";
const SIZE = 75;
const PADDING = 20;
const TEXT_SIZE = 30;
const LINE_COLOR = "rgba(64, 64, 255, 1)";
const LINE_WIDTH = 4;
const LINE_CAP = "round";
const LINE_SIZE = SIZE / 2 * 0.8;
const POINT_SIZE = LINE_SIZE / 3;
const POINT_ROTATION = 4/5 * Math.PI;
const OFFSET_MAX = 0.25;

export default class Wind {
  constructor(game) {
    this.game = game;
    
    this.reset();
  }
  
  reset() {
    this.offset = 0;
    this.offsetRate = 1/4096;
    
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * INITIAL_SPEED_MAX;
    this.wind = { x: 0, y: 0 };
    this.updateWind();
  }
  
  getWind() {
    return { x: this.wind.x / INTERNAL_RATIO, y: this.wind.y / INTERNAL_RATIO };
  }
  
  getHeightRate() {
    return HEIGHT_RATE;
  }
  
  updateWind() {
    this.angle += Math.random() * ANGLE_RATE - ANGLE_RATE / 2;
    this.speed += Math.random() * SPEED_RATE - SPEED_RATE / 2;
    
    if (this.speed < 0) this.speed = 0;
    
    this.wind.x = Math.cos(this.angle) * this.speed;
    this.wind.y = Math.sin(this.angle) * this.speed;
  }
  
  update(deltaTime) {
    this.offset += this.offsetRate * this.speed * deltaTime;
    if (this.offset > OFFSET_MAX) this.offset = -OFFSET_MAX;
  }
  
  getOffset() {
    return Math.abs(this.offset) - OFFSET_MAX / 2;
  }
  
  draw(ctx) { 
    let a = this.angle + this.getOffset();
    let start = { 
        x: this.game.GAME_WIDTH - SIZE / 2 - PADDING, 
        y: PADDING + SIZE / 2
    };
    let end = {
        x: start.x + Math.cos(a) * LINE_SIZE,
        y: start.y + Math.sin(a) * LINE_SIZE
    };
    
    //draw fill
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(start.x - SIZE / 2, start.y - SIZE / 2, SIZE, SIZE);
    
    //draw outline
    ctx.strokeStyle = OUTLINE_COLOR;
    ctx.lineWidth = 3;
    ctx.strokeRect(start.x - SIZE / 2, start.y - SIZE / 2, SIZE, SIZE);
    
    //draw main line
    ctx.strokeStyle = LINE_COLOR;
    ctx.lineWidth = LINE_WIDTH;
    ctx.lineCap = LINE_CAP;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke(); 
    
    //draw left point
    ctx.beginPath();
    ctx.moveTo(end.x, end.y);
    ctx.lineTo(end.x + Math.cos(a - POINT_ROTATION) * POINT_SIZE, end.y + Math.sin(a - POINT_ROTATION) * POINT_SIZE);
    ctx.stroke();
    
    //draw right point
    ctx.beginPath();
    ctx.moveTo(end.x, end.y);
    ctx.lineTo(end.x + Math.cos(a + POINT_ROTATION) * POINT_SIZE, end.y + Math.sin(a + POINT_ROTATION) * POINT_SIZE);
    ctx.stroke();
    
    //draw speed    
    this.game.drawUtil.drawText( ctx,
        this.speed.toFixed(1) + "m", 
        this.game.GAME_WIDTH - this.game.drawUtil.getPadding() - SIZE / 2, 
        this.game.drawUtil.getPadding() + SIZE + this.game.drawUtil.getDefaultTextSize() * 0.6,
        "center",
        this.game.drawUtil.getDefaultTextSize() * 0.6,
        this.game.drawUtil.getDefaultStrokeWidth() * 0.6,
        true
    );
  }
  
}