import Palette from "./palette.js";

export default class Terrain {
  constructor(game) {
    this.game = game;
    this.palette = new Palette();
    
    this.PIXEL_TYPE = {
      TEE: 0,
      HOLE: 1,
      GREEN: 2,
      FAIRWAY: 3,
      ROUGH: 4,
      BUNKER: 5,
      WATER: 6
    };
    this.PIXEL_RATE = {
      TEE: 1,
      HOLE: 0,
      GREEN: 0.99,
      FAIRWAY: 0.98,
      ROUGH: 0.8,
      BUNKER: 0.6,
      WATER: 0.1
    };
  }
  
  colorToTerrainType(x) {
    switch(x) {
      case this.palette.COLOR.GREEN:
        return this.PIXEL_TYPE.GREEN;
      case this.palette.COLOR.ROUGH:
        return this.PIXEL_TYPE.ROUGH;
      case this.palette.COLOR.BUNKER:
        return this.PIXEL_TYPE.BUNKER;
      case this.palette.COLOR.WATER:
        return this.PIXEL_TYPE.WATER;
      default:
        return this.PIXEL_TYPE.FAIRWAY;
    }
  }
  
  getTeeTerrain() { return this.PIXEL_TYPE.TEE; }
  getHoleTerrain() { return this.PIXEL_TYPE.HOLE; }
  getWaterTerrain() { return this.PIXEL_TYPE.WATER; }
  
  getLieRate(lie) {
    switch (lie) {
      case this.PIXEL_TYPE.TEE:
        return this.PIXEL_RATE.TEE;
      case this.PIXEL_TYPE.HOLE:
        return this.PIXEL_RATE.HOLE;
      case this.PIXEL_TYPE.GREEN:
        return this.PIXEL_RATE.GREEN;
      case this.PIXEL_TYPE.ROUGH:
        return this.PIXEL_RATE.ROUGH;
      case this.PIXEL_TYPE.BUNKER:
        return this.PIXEL_RATE.BUNKER;
      case this.PIXEL_TYPE.WATER:
        return this.PIXEL_RATE.WATER;
      default:
        return this.PIXEL_RATE.FAIRWAY;
    }
  }
}