import Club from "./club.js";

export default class Bag {
  constructor() {
    this.bag = [
        new Club("PW", 3, 14),
        new Club("5I", 5, 12),
        new Club("1W", 8, 10) 
    ];
    this.cur = this.bag.length - 1;;
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
}