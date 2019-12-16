import Palette from "./palette.js";

export default class Loader {
  constructor(game, CTX) {
    this.game = game;
    this.CTX = CTX;
  }
  
  loadHole(course) {
    this.courseMap = this.create2DArray(this.game.COURSE_WIDTH);
    
    course.drawCourse(this.CTX);
    
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
      if (row >= this.game.COURSE_WIDTH - 1) {
        row = 0;
        col++;
      }
      else {
        row++;
      }
      
      if (col >= this.game.COURSE_HEIGHT) {
        break;
      }

      //check if a tee
      if (imgData.data[i] == 0 && imgData.data[i + 1] == 0) {
        if (imgData.data[i + 2] <= course.tees.length) {
          course.tees[imgData.data[i + 2]] = { x: row, y: col };
          this.courseMap[row][col] = PIXEL_TYPE.TEE;
        }
      }
      //check if a hole
      else if (imgData.data[i] == 255 && imgData.data[i + 1] == 0) {
        if (imgData.data[i + 2] <= course.holes.length) {
          course.holes[imgData.data[i + 2]] = { x: row, y: col };
          this.courseMap[row][col] = PIXEL_TYPE.HOLE;
        }
      }
      else {
        switch(this.rgbToDec(imgData.data[i], imgData.data[i + 1], imgData.data[i + 2])) {
          case palette.COLOR.GREEN:
            this.courseMap[row][col] = PIXEL_TYPE.GREEN;
            break;
          case palette.COLOR.ROUGH:
            this.courseMap[row][col] = PIXEL_TYPE.ROUGH;
            break;
          case palette.COLOR.BUNKER:
            this.courseMap[row][col] = PIXEL_TYPE.BUNKER;
            break;
          case palette.COLOR.WATER:
            this.courseMap[row][col] = PIXEL_TYPE.WATER;
            break;
          default:
            this.courseMap[row][col] = PIXEL_TYPE.FAIRWAY;
        }
      }
    }
    
    course.map = this.courseMap;
  }
  
  debug(course) {
    let i;
    for (i = 0; i < course.tees.length; i++) {
      console.log(
          "Hole " + i + ":\n" +
          "    Tee:  " + course.tees[i].x + " " + course.tees[i].y + "\n" +
          "    Hole: " + course.holes[i].x + " " + course.holes[i].y
      );
    }
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