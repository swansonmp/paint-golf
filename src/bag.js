import Club from "./club.js";

export default class Bag {
  constructor(game) {
    this.game = game;
    
    this.bag = [
        new Club("P", 50, 0, 50),
        new Club("LW", 30, 10, 75),
        new Club("SW", 48, 10.125, 100),
        new Club("9I", 80, 11, 130),
        new Club("5I", 140, 12, 165),
        new Club("1W", 300, 17.5, 220)
    ];
    this.cur = this.bag.length - 1;
  }
  
  incBag() {
    this.cur += 1;
    if (this.cur >= this.bag.length)
      this.cur = 0;
  }
  
  decBag() {
    this.cur -= 1;
    if (this.cur < 0)
      this.cur = this.bag.length - 1;
  }
  
  getClub() {
    return this.bag[this.cur];
  }
  
  draw(ctx) {
    const PADDING = 20;
    
    ctx.font = "small-caps bold 50px monospace";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.textAlign = "left";
    ctx.strokeText(this.getClub().name, PADDING, this.game.GAME_HEIGHT - PADDING);
    ctx.fillStyle = "white";
    ctx.fillText(this.getClub().name, PADDING, this.game.GAME_HEIGHT - PADDING);
    
  }
}