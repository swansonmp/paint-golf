import Flag from "./ui/flag.js";
import HoleInfo from "./ui/holeInfo.js";
import LieInfo from "./ui/lieInfo.js";
import StrokeInfo from "./ui/strokeInfo.js";

export default class Status {
  constructor(game) {
    this.flag = new Flag(game);
    this.holeInfo = new HoleInfo(game);
    this.lieInfo = new LieInfo(game);
    this.strokeInfo = new StrokeInfo(game);
  }
  
  draw(ctx) {
    this.flag.draw(ctx);
    this.holeInfo.draw(ctx);
    this.lieInfo.draw(ctx);
    this.strokeInfo.draw(ctx);
  }
  
  update(deltaTime) {
    this.flag.update(deltaTime);
    this.holeInfo.update(deltaTime);
    this.lieInfo.update(deltaTime);
    this.strokeInfo.update(deltaTime);
  }
}