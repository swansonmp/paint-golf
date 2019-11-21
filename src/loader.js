import Palette from "./palette.js";

export default class Loader {
  constructor(GAME_WIDTH, GAME_HEIGHT, ctx) {
    this.GAME_WIDTH = GAME_WIDTH;
    this.GAME_HEIGHT = GAME_HEIGHT;
    this.CTX = ctx;
    this.palette = new Palette();
    
    this.holeMap = this.create2DArray(this.GAME_WIDTH);
  }
  
  loadHole() {
    let imgData = this.CTX.getImageData(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
    let i;
    for (i = 0; i < imgData.data.length; i += 4) {
      //let row = / 4;
      //let col = ;
      switch(this.rgbToDec(imgData.data[i], imgData.data[i + 1], imgData.data[i + 2])) {
        case 0:
          //
          break;
        default:
          //
      }
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