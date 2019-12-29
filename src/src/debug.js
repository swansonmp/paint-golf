export default class Debug {
  constructor(game) {
    this.game = game;
    this.dt = 0;
    this.active = false;
  }
  
  toggleDebug() {
    this.active = !this.active;
  }
  
  update(deltaTime) {
    this.dt = deltaTime;
  }
  
  draw(ctx) {
    if (this.active) {
      this.drawFPS(ctx);
    }
  }
  
  drawFPS(ctx) {
    ctx.font = "bold 50px monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = "yellow";
    ctx.fillText(
        (1000 / this.dt).toFixed(0),
        this.game.GAME_WIDTH / 2,
        70
    );
  }
}