const PADDING_X = 100;
const PADDING_Y = 30;

export default class OpenState {
  constructor(game) {
    this.game = game;
    
    this.index = 0;
    this.items = [
      "course.png",
      "test.png"
    ];
  }
  
  update(deltaTime) {

  }
  
  draw(ctx) {
    //draw background
    ctx.rect(0, 0, this.game.GAME_WIDTH, this.game.GAME_HEIGHT);
    ctx.fillStyle = "rgba(34,177,76,1)";
    ctx.fill();
    
    //draw heading
    ctx.font = "bold 96px monospace";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(
      "Load",
      PADDING_X,
      PADDING_Y + 96
    );
    
    let drawY = PADDING_Y * 2 + 96;
    
    //draw items
    let i;
    for (i = 0; i < this.items.length; i++) {
      drawY += PADDING_Y + 72;
      ctx.font = "bold 72px monospace";
      if (i == this.index) ctx.fillStyle = "white";
      else ctx.fillStyle = "DimGrey";
      ctx.fillText(
          this.items[i],
          PADDING_X * 2,
          drawY
      );
    }
  }
  
  handleConfirm() {
    document.getElementById("course").src = "./assets/holes/" + this.items[this.index];
    this.game.setState(this.game.getMainState());
  }
  handleEnter() { this.handleConfirm(); }
  handleSpace() { this.handleConfirm(); }
  handleRightArrow() { this.handleConfirm(); }
  
  handleUpArrow() {
    this.index--;
    this.index %= this.items.length; 
  }
  handleDownArrow() {
    this.index++;
    this.index %= this.items.length; 
  }
  
  handleBack() {
    this.game.setState(this.game.getMainState());
  }
  
  handleLeftArrow() { this.handleBack(); }

}