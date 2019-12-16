import HoleInfo from "./holeInfo.js";
import LieInfo from "./lieInfo.js";

export default class Status {
  constructor(game) {
    this.game = game;
    
    this.holeInfo = new HoleInfo(game);
    this.lieInfo = new LieInfo(game);
  }
  
  draw(ctx) {
    /*
    //draw strokes
    ctx.font = "small-caps bold 50px monospace";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.strokeText(this.game.strokes, this.game.GAME_WIDTH - PADDING * 4, this.game.GAME_HEIGHT - PADDING);
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(this.game.strokes, this.game.GAME_WIDTH - PADDING * 4, this.game.GAME_HEIGHT - PADDING);
    */
    
    this.holeInfo.draw(ctx);
    this.lieInfo.draw(ctx);
  }
  
  update(deltaTime) {
    this.holeInfo.update(deltaTime);
    this.lieInfo.update(deltaTime);
  }
}