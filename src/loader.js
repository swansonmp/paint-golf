import Palette from "./palette.js";

export default class Loader {
  constructor(game, CTX) {
    this.game = game;
    this.CTX = CTX;
    
    this.holeMap = this.create2DArray(this.game.COURSE_WIDTH);
  }
  
  loadHole(hole) {
    hole.drawCourse(this.CTX);
    
    let palette = new Palette();
    const PIXEL_TYPE = {
      TEE: 0,
      HOLE: 1,
      GREEN: 2,
      FAIRWAY: 3,
      ROUGH: 4,
      BUNKER: 5,
      WATER: 6
    };
    
    let imgData = this.CTX.getImageData(0, 0, this.game.COURSE_WIDTH, this.game.COURSE_HEIGHT);
    let i;
    let row = 0;
    let col = 0;
    for (i = 0; i < imgData.data.length; i += 4) {
      if (col >= this.game.COURSE_HEIGHT) {
        hole.map = this.holeMap;
        return;
      }
      if (row >= this.game.COURSE_WIDTH - 1) {
        row = 0;
        col++;
      }
      else {
        row++;
      }
      switch(this.rgbToDec(imgData.data[i], imgData.data[i + 1], imgData.data[i + 2])) {
        case palette.COLOR.TEE:
          hole.tee.x = row;
          hole.tee.y = col;
          break;
        case palette.COLOR.HOLE:
          this.holeMap[row][col] = PIXEL_TYPE.HOLE;
          break;
        case palette.COLOR.GREEN:
          this.holeMap[row][col] = PIXEL_TYPE.GREEN;
          break;
        case palette.COLOR.ROUGH:
          this.holeMap[row][col] = PIXEL_TYPE.ROUGH;
          break;
        case palette.COLOR.BUNKER:
          this.holeMap[row][col] = PIXEL_TYPE.BUNKER;
          break;
        case palette.COLOR.WATER:
          this.holeMap[row][col] = PIXEL_TYPE.WATER;
          break;
        default:
          this.holeMap[row][col] = PIXEL_TYPE.FAIRWAY;
      }
    }
    
    //error checking
    if (hole.tee.x == -1 && hole.tee.y == -1) {
      console.log("ERROR: TEE NOT FOUND");
      hole.tee.x = 0;
      hole.tee.y = 0;
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