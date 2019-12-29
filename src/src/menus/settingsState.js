export default class SettingsState {
  constructor(game, menuState) {
    this.game = game;
    this.menuState = menuState;
    
    this.index = 0;
    this.name = "Settings";
    this.items = [
      "Scale",
      "Game speed",
    ];
    this.values = [
      this.game.ball.scale,
      this.game.ball.rate
    ];
  }
  
  update(deltaTime) {
    this.game.ball.scale = this.values[0];
    this.game.ball.rate = this.values[1];
  }
  draw(ctx) { 
    this.menuState.drawValues(ctx, this);
  }
  
  handleConfirm() {

  }
  
  handleBack() {
    this.menuState.setState(this.menuState.getMainState());
  }
  
  handleIncrement() { this.values[this.index]++; }
  handleDecrement() { this.values[this.index]--; }

}