export default class MainState {
  constructor(game, menuState) {
    this.game = game;
    this.menuState = menuState;
    
    this.index = 0;
    this.name = "Main";
    this.items = [
      "Play",
      "Select",
      "Settings"
    ];
  }
  
  update(deltaTime) { }
  draw(ctx) { }
  
  handleConfirm() {
    switch (this.index) {
      case 0:
        this.game.setState(this.game.getLoadState());
        break;
      case 1:
        this.menuState.setState(this.menuState.getSelectState());
        break;
      case 2:
        this.menuState.setState(this.menuState.getSettingsState());
        break;
      default:
        this.menuState.setState(this.menuState.getTitleState());
    }
  }
  
  handleBack() {
    this.menuState.setState(this.menuState.getTitleState());
  }
  
  handleIncrement() { }
  handleDecrement() { }

}