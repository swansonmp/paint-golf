import Club from "./club.js";

export default class Bag {
  constructor(game) {
    this.game = game;
    
    this.bag = [
        new Club("P", 200, 0, 50),
        new Club("LW", 30, 10, 75),
        new Club("SW", 48, 10.125, 105),
        new Club("9I", 80, 11, 140),
        new Club("5I", 140, 12, 180),
        new Club("1W", 315, 17.5, 250)
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
    this.game.drawUtil.drawText( ctx,
        this.getClub().name, 
        this.game.drawUtil.getPadding(),
        this.game.GAME_HEIGHT - this.game.drawUtil.getPadding(),
        "left",
        this.game.drawUtil.getDefaultTextSize(),
        this.game.drawUtil.getDefaultStrokeWidth(),
        true
    );
  }
}