export default class SelectState {
  constructor(game, menuState) {
    this.game = game;
    this.menuState = menuState;
    
    this.index = 0;
    this.name = "Select";
    this.items = [
      "Local",
      "Upload"
    ];
  }
  
  update(deltaTime) { }
  draw(ctx) { }
  
  handleConfirm() {
    switch (this.index) {
      case 0:
        this.menuState.setState(this.menuState.getLocalState());
        break;
      case 1:
        this.menuState.setState(this.menuState.getUploadState());
        break;
      default:
        this.menuState.setState(this.menuState.getTitleState());
    }
  }
  
  handleBack() {
    this.menuState.setState(this.menuState.getMainState());
  }
  
  handleIncrement() { }
  handleDecrement() { }
  
}