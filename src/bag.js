import Club from "./club.js";

export default class Bag {
  constructor() {
    this.cur = 0;
    //this.bag = [new Club(), new Club, new Club()];
  }
  
  inc() {
    cur += 1;
	//if (cur >= bag.length)
	//  cur = 0;
  }
  
  dec() {
    cur -= 1;
	//if (cur < 0)
	//  cur = bag.length - 1;
  }
  
  getClub() {
    //return bag[cur];
  }
}