import Palette from "./palette.js";

export default class Loader {
  constructor(game, CTX) {
    this.game = game;
    this.CTX = CTX;
  }
  
  loadCourse(course) {
    this.course = course;
    this.course.map = this.create2DArray(this.game.COURSE_WIDTH);
    
    this.palette = new Palette(this.game);
    
    this.yOffset = 0;
    while (this.yOffset + this.game.GAME_HEIGHT < this.game.COURSE_HEIGHT) {
      this.xOffset = 0;
      //do full widths
      while (this.xOffset + this.game.GAME_WIDTH < this.game.COURSE_WIDTH) {
        this.parseSection(this.game.GAME_WIDTH, this.game.GAME_HEIGHT);
        this.xOffset += this.game.GAME_WIDTH;  
      }
      //do the rest of x
      this.parseSection(this.game.COURSE_WIDTH - this.xOffset, this.game.GAME_HEIGHT);
      this.yOffset += this.game.GAME_HEIGHT;
    }
    //do the rest of y
    this.xOffset = 0;
    //do full widths
    while (this.xOffset + this.game.GAME_WIDTH < this.game.COURSE_WIDTH) {
      this.parseSection(this.game.GAME_WIDTH, this.game.COURSE_HEIGHT - this.yOffset);
      this.xOffset += this.game.GAME_WIDTH;  
    }
    //do the rest of x of the rest of y
    this.parseSection(this.game.COURSE_WIDTH - this.xOffset, this.game.COURSE_HEIGHT - this.yOffset);
    
    if (this.game.debug.active) this.debug();
  }
  
  debug() {
    let i;
    for (i = 1; i < this.course.tees.length; i++) {
      if (this.course.tees[i].x != -1 || this.course.tees[i].y != -1) {
        console.log(
            "Hole " + i + ":\n" +
            "  Tee:  " + this.course.tees[i].x + " " + this.course.tees[i].y + "\n" +
            "  Hole: " + this.course.holes[i].x + " " + this.course.holes[i].y
        );
      }
    }
  }
  
  parseSection(width, height) {
    //console.log("Drawing: " + this.xOffset + ", " + this.yOffset + ", " + width + ", " + height); //todo///////////////////
    this.course.drawCourse(this.CTX, this.xOffset, this.yOffset, width, height);
    this.imgData = this.CTX.getImageData(0, 0, width, height);
    this.row = 0;
    this.col = 0;
    let i;
    for (i = 0; i < this.imgData.data.length; i += 4) {
      //check rows and cols
      if (this.row >= width - 1) { this.row = 0; this.col++; }
      else { this.row++; }
      if (this.col >= height) { break; }
      //checking pixel values
      if (!this.checkTeeOrHole(this.imgData.data[i], this.imgData.data[i + 1], this.imgData.data[i + 2])) {
        this.setPixel(this.imgData.data[i], this.imgData.data[i + 1], this.imgData.data[i + 2]);
      }
    }
  }
  
  checkTeeOrHole(r, g, b) {
    //check if a tee
    if (r == 0 && g == 0) {
      if (b <= this.course.tees.length) {
        this.course.tees[b].setComponents(this.row + this.xOffset, this.col + this.yOffset);
        this.course.map[this.row + this.xOffset][this.col + this.yOffset] = this.game.ball.PIXEL_TYPE.TEE;
      }
      return true;
    }
    //check if a hole
    else if (r == 255 && g == 0) {
      if (b <= this.course.holes.length) {
        this.course.holes[b].setComponents(this.row + this.xOffset, this.col + this.yOffset);
        this.course.map[this.row + this.xOffset][this.col + this.yOffset] = this.game.ball.PIXEL_TYPE.HOLE;
      }
      return true;
    }
    return false;
  }
  
  setPixel(r, g, b) {
    let t;
    switch(this.rgbToDec(r, g, b)) {
      case this.palette.COLOR.GREEN:
        t = this.game.ball.PIXEL_TYPE.GREEN;
        break;
      case this.palette.COLOR.ROUGH:
        t = this.game.ball.PIXEL_TYPE.ROUGH;
        break;
      case this.palette.COLOR.BUNKER:
        t = this.game.ball.PIXEL_TYPE.BUNKER;
        break;
      case this.palette.COLOR.WATER:
        t = this.game.ball.PIXEL_TYPE.WATER;
        break;
      default:
        t = this.game.ball.PIXEL_TYPE.FAIRWAY;
    }
    this.course.map[this.row + this.xOffset][this.col + this.yOffset] = t;
  }
  
  rgbToDec(r, g, b) {
    return (r << 16) + (g << 8) + (b);
  }
  
  create2DArray(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr[i] = [];
    }
    return arr;
  }
  
}