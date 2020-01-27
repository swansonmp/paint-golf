export default class Palette {
  constructor(game) {
    this.game = game;
    
    this.COLOR = {
      TEE: 0x000001,
      HOLE: 0xed1c24,
      GREEN: 0xb5e61d,
      FAIRWAY: 0xb5e61d,
      ROUGH: 0x22b14c,
      BUNKER: 0xefe4b0,
      WATER: 0x00a2e8
    };
    
    this.HEX_COLOR = {
      TEE: this.toHexString(this.COLOR.TEE),
      HOLE: this.toHexString(this.COLOR.HOLE),
      GREEN: this.toHexString(this.COLOR.GREEN),
      FAIRWAY: this.toHexString(this.COLOR.FAIRWAY),
      ROUGH: this.toHexString(this.COLOR.ROUGH),
      BUNKER: this.toHexString(this.COLOR.BUNKER),
      WATER: this.toHexString(this.COLOR.WATER)
    };
  }
  
  toHexString(n) {
    let str = (n).toString(16);
    return "#" + "0".repeat(6 - str.length) + str;
  }
  
  getHexColor(lie) {
    switch (lie) {
      case this.game.course.terrain.TYPE.TEE:
        return this.HEX_COLOR.TEE;
      case this.game.course.terrain.TYPE.HOLE:
        return this.HEX_COLOR.HOLE;
      case this.game.course.terrain.TYPE.GREEN:
        return this.HEX_COLOR.GREEN;
      case this.game.course.terrain.TYPE.FAIRWAY:
        return this.HEX_COLOR.FAIRWAY;
      case this.game.course.terrain.TYPE.ROUGH:
        return this.HEX_COLOR.ROUGH;
      case this.game.course.terrain.TYPE.BUNKER:
        return this.HEX_COLOR.BUNKER;
      case this.game.course.terrain.TYPE.WATER:
        return this.HEX_COLOR.WATER;
      default:
        return "#ff00ff";
    }
  }
}