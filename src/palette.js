const PIXEL_TYPE = {
  TEE: 0,
  HOLE: 1,
  GREEN: 2,
  FAIRWAY: 3,
  ROUGH: 4,
  BUNKER: 5,
  WATER: 6
};

export default class Palette {
  constructor() {
    this.COLOR = {
      TEE: 0x000000,
      HOLE: 0xed1c24,
      GREEN: 0xb5e61d,
      FAIRWAY: 0xb5e61d,
      ROUGH: 0x22b14c,
      BUNKER: 0xefe5b0,
      WATER: 0x00a2e8
    };
    
    this.HEX_COLOR = {
      TEE: "#000000",
      HOLE: "#ed1c24",
      GREEN: "#b5e61d",
      FAIRWAY: "#b5e61d",
      ROUGH: "#22b14c",
      BUNKER: "#efe5b0",
      WATER: "#00a2e8"
    };
  }
  
  getHexColor(lie) {
    switch (lie) {
      case PIXEL_TYPE.TEE:
        return this.HEX_COLOR.TEE;
      case PIXEL_TYPE.HOLE:
        return this.HEX_COLOR.HOLE;
      case PIXEL_TYPE.GREEN:
        return this.HEX_COLOR.GREEN;
      case PIXEL_TYPE.FAIRWAY:
        return this.HEX_COLOR.FAIRWAY;
      case PIXEL_TYPE.ROUGH:
        return this.HEX_COLOR.ROUGH;
      case PIXEL_TYPE.BUNKER:
        return this.HEX_COLOR.BUNKER;
      case PIXEL_TYPE.WATER:
        return this.HEX_COLOR.WATER;
      default:
        return "#000000";
    }
  }
}