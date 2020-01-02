export default class DrawUtil {
  constructor(game) {
    this.game = game;
    
    this.defaultTextSize = 50;
    this.defaultStrokeWidth = 5;
    this.padding = 20;
  }
  
  getDefaultTextSize() { return this.defaultTextSize; }
  getDefaultStrokeWidth() { return this.defaultStrokeWidth; }
  getPadding() { return this.padding; }
  setDefaultTextSize(textSize) { this.defaultTextSize = textSize; }
  setDefaultStrokeWidth(strokeWidth) { this.defaultStrokeWidth = strokeWidth; }
  setPadding(padding) { this.padding = padding; }
  
  /*
   *  Utility method to draw text
   *
   *  @param text         : Text to draw 
   *  @param x            : X coordinate to draw
   *  @param y            : Y coordinate to draw
   *  @param align        : String containing alignment value
   *  @param textSize     : Text size in pixels
   *  @param strokeWidth  : Size of stroke width in pixels
   *  @param smallCaps    : Boolean whether to use small caps or not
   */
  drawText(ctx, text, x, y, align, textSize, strokeWidth, smallCaps) {
    //set smallCaps string
    if (smallCaps == undefined || smallCaps == true) { smallCaps = "small-caps "; }
    else { smallCaps = ""; }
    
    if (strokeWidth == undefined) { strokeWidth = 5; }
    
    ctx.font = smallCaps + "bold " + textSize + "px monospace";
    ctx.textAlign = align;
    ctx.strokeStyle = "black";
    ctx.lineWidth = strokeWidth;
    ctx.strokeText(text, x, y);
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);
  }
  
}