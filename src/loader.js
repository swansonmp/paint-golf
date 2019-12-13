import Palette from "./palette.js";

export default class Loader {
  constructor(COURSE_WIDTH, COURSE_HEIGHT, ctx) {
    this.COURSE_WIDTH = COURSE_WIDTH;
    this.COURSE_HEIGHT = COURSE_HEIGHT;
    this.CTX = ctx;
    
    this.holeMap = this.create2DArray(this.COURSE_WIDTH);
  }
  
  loadHole(hole) {
    hole.drawCourse(this.CTX);
    
    //let palette = new Palette();
    const PIXEL_COLOR = {
      TEE: 0x000001,
      HOLE: 0xed1c24,
      GREEN: 0xb5e61d,
      ROUGH: 0x22b14c,
      BUNKER: 0xefe4b0,
      WATER: 0x00a2e8
    };
    const PIXEL_TYPE = {
      TEE: 0,
      HOLE: 1,
      GREEN: 2,
      FAIRWAY: 3,
      ROUGH: 4,
      BUNKER: 5,
      WATER: 6
    };
    
    let imgData = this.CTX.getImageData(0, 0, this.COURSE_WIDTH, this.COURSE_HEIGHT);
    let i;
    let row = 0;
    let col = 0;
    for (i = 0; i < imgData.data.length; i += 4) {
      if (col >= this.COURSE_HEIGHT) {
        hole.map = this.holeMap;
        return;
      }
      if (row >= this.COURSE_WIDTH - 1) {
        row = 0;
        col++;
      }
      else {
        row++;
      }
      switch(this.rgbToDec(imgData.data[i], imgData.data[i + 1], imgData.data[i + 2])) {
        case PIXEL_COLOR.TEE:
          hole.tee.x = row;
          hole.tee.y = col;
          break;
        case PIXEL_COLOR.HOLE:
          this.holeMap[row][col] = PIXEL_TYPE.HOLE;
          break;
        case PIXEL_COLOR.GREEN:
          this.holeMap[row][col] = PIXEL_TYPE.GREEN;
          break;
        case PIXEL_COLOR.ROUGH:
          this.holeMap[row][col] = PIXEL_TYPE.ROUGH;
          break;
        case PIXEL_COLOR.BUNKER:
          this.holeMap[row][col] = PIXEL_TYPE.BUNKER;
          break;
        case PIXEL_COLOR.WATER:
          this.holeMap[row][col] = PIXEL_TYPE.WATER;
          break;
        default:
          this.holeMap[row][col] = PIXEL_TYPE.FAIRWAY;
      }
    }
    
    hole.map = this.holeMap;
  }

  create2DArray(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr[i] = [];
    }
    return arr;
  }
  
  rgbToDec(r, g, b) {
    return (r << 16) + (g << 8) + (b);
  }
}