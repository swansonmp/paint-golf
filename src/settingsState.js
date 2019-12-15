export default class SettingsState {
  constructor(game, menuState) {
    this.game = game;
    this.menuState = menuState;
    
    this.index = 0;
    this.name = "Settings";
    this.items = [
      "Scale",
      "Another Setting",
    ];
    this.values = [
      this.game.ball.scale,
      0
    ];
  }
  
  update(deltaTime) {
    this.game.ball.scale = this.values[0];
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