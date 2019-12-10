import Club from "./club.js";

export default class Bag {
  constructor(game) {
    this.game = game;
    
    this.bag = [
        new Club("1W", 35, 10) 
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