import State from "./state.js";

export default class ActionState extends State {
  constructor(game) {
    super(game);
  }
  
  draw(ctx) {
    this.transformViewport(ctx);
    this.drawDynamicElements(ctx);
    this.resetViewport(ctx);
    this.drawStaticElements(ctx);
  }
  
  transformViewport(ctx) {
    ctx.setTransform(1,0,0,1,0,0);  //reset transform matrix
    ctx.clearRect(0, 0, this.game.GAME_WIDTH, this.game.GAME_HEIGHT); //clear viewport after matrix reset
    ctx.scale(this.game.view.scale, this.game.view.scale);
    ctx.translate(
        this.clamp(-this.game.ball.getScaledPosition().x + this.game.GAME_WIDTH / 2, 
            this.game.GAME_WIDTH - this.game.COURSE_WIDTH, 0) - this.game.view.offset.x,
        this.clamp(-this.game.ball.getScaledPosition().y + this.game.GAME_HEIGHT / 2, 
            this.game.GAME_HEIGHT - this.game.COURSE_HEIGHT, 0) - this.game.view.offset.y
    );
  }
  
  resetViewport(ctx) {
    ctx.setTransform(1,0,0,1,0,0);
  }
  
  drawDynamicElements(ctx) { }  
  drawStaticElements(ctx) { }
  
  clamp(n, min, max) {
    return Math.min(Math.max(n, min), max);
  }
  
}