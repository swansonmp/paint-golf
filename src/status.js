import Flag from "./ui/flag.js";
import HoleInfo from "./ui/holeInfo.js";
import LieInfo from "./ui/lieInfo.js";
import StrokeInfo from "./ui/strokeInfo.js";

export default class Status {
  constructor(game) {
    this.elements = [
        new Flag(game),
        new HoleInfo(game),
        new LieInfo(game),
        new StrokeInfo(game)
    ];
  }
  
  draw(ctx) {
    this.elements.forEach(element => element.draw(ctx));
  }
  
  update(deltaTime) {
    this.elements.forEach(element => element.update(deltaTime));
  }
}