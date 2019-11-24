import Club from "./club.js";

export default class Bag {
  constructor(game) {
    this.game = game;
    
    this.bag = [
        new Club("P", 5, 0.05),
        new Club("LW", 2, 1.825),
        new Club("PW", 3, 1.75),
        new Club("9I", 4, 1.7),
        new Club("7I", 4.5, 1.65),
        new Club("5I", 5, 1.625),
        new Club("3I", 5.5, 1.6),
        new Club("3W", 6.625, 1.5125),
        new Club("1W", 6.825, 1.5) 
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
    ctx.strokeText(this.getClub().name, PADDING, this.game.GAME_HEIGHT - PADDING);
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(this.getClub().name, PADDING, this.game.GAME_HEIGHT - PADDING);
    
  }
}