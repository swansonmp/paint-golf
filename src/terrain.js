import Palette from "./palette.js";

export default class Terrain {
  constructor(game) {
    this.game = game;
    this.palette = new Palette();
    
    this.TYPE = {
      TEE:     0,
      HOLE:    1,
      GREEN:   2,
      FAIRWAY: 3,
      ROUGH:   4,
      BUNKER:  5,
      WATER:   6
    };
    
    this.LIE_RATE = {
      TEE:     1.00,
      HOLE:    0.00,
      GREEN:   0.99,
      FAIRWAY: 0.98,
      ROUGH:   0.80,
      BUNKER:  0.60,
      WATER:   0.15
    };
    
    this.BOUNCE_RATE = {
      TEE:     1.00,
      HOLE:    0.00,
      GREEN:   1.00,
      FAIRWAY: 0.98,
      ROUGH:   0.80,
      BUNKER:  0.50,
      WATER:   0.00
    };
    
    this.FRICTION_RATE = {
      TEE:     0.99,
      HOLE:    0.00,
      GREEN:   0.99,
      FAIRWAY: 0.98,
      ROUGH:   0.85,
      BUNKER:  0.75,
      WATER:   0.00
    };
  }
  
  colorToTerrainType(x) {
    switch(x) {
      case this.palette.COLOR.GREEN:
        return this.TYPE.GREEN;
      case this.palette.COLOR.ROUGH:
        return this.TYPE.ROUGH;
      case this.palette.COLOR.BUNKER:
        return this.TYPE.BUNKER;
      case this.palette.COLOR.WATER:
        return this.TYPE.WATER;
      default:
        return this.TYPE.FAIRWAY;
    }
  }
  
  getTeeTerrain() { return this.TYPE.TEE; }
  getHoleTerrain() { return this.TYPE.HOLE; }
  getWaterTerrain() { return this.TYPE.WATER; }
  
  getLieRate(lie) {
    switch (lie) {
      case this.TYPE.TEE:
        return this.LIE_RATE.TEE;
      case this.TYPE.HOLE:
        return this.LIE_RATE.HOLE;
      case this.TYPE.GREEN:
        return this.LIE_RATE.GREEN;
      case this.TYPE.ROUGH:
        return this.LIE_RATE.ROUGH;
      case this.TYPE.BUNKER:
        return this.LIE_RATE.BUNKER;
      case this.TYPE.WATER:
        return this.LIE_RATE.WATER;
      default:
        return this.LIE_RATE.FAIRWAY;
    }
  }
  
  getBounceRate(lie) {
    switch (lie) {
      case this.TYPE.TEE:
        return this.BOUNCE_RATE.TEE;
      case this.TYPE.HOLE:
        return this.BOUNCE_RATE.HOLE;
      case this.TYPE.GREEN:
        return this.BOUNCE_RATE.GREEN;
      case this.TYPE.ROUGH:
        return this.BOUNCE_RATE.ROUGH;
      case this.TYPE.BUNKER:
        return this.BOUNCE_RATE.BUNKER;
      case this.TYPE.WATER:
        return this.BOUNCE_RATE.WATER;
      default:
        return this.BOUNCE_RATE.FAIRWAY;
    }
  }
  
  getFrictionRate(lie) {
    switch (lie) {
      case this.TYPE.TEE:
        return this.FRICTION_RATE.TEE;
      case this.TYPE.HOLE:
        return this.FRICTION_RATE.HOLE;
      case this.TYPE.GREEN:
        return this.FRICTION_RATE.GREEN;
      case this.TYPE.ROUGH:
        return this.FRICTION_RATE.ROUGH;
      case this.TYPE.BUNKER:
        return this.FRICTION_RATE.BUNKER;
      case this.TYPE.WATER:
        return this.FRICTION_RATE.WATER;
      default:
        return this.FRICTION_RATE.FAIRWAY;
    }
  }
}