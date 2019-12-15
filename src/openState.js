export default class OpenState {
  constructor(game, menuState) {
    this.game = game;
    this.menuState = menuState;
    
    this.index = 0;
    this.name = "Load";
    this.items = [
      "course.png",
      "test.png"
    ];
  }
  
  update(deltaTime) { }
  draw(ctx) { }
  
  handleConfirm() {
    document.getElementById("course").src = "./assets/holes/" + this.items[this.index];
    this.menuState.setState(this.menuState.getMainState());
  }
  
  handleBack() {
    this.menuState.setState(this.menuState.getMainState());
  }
  
  handleIncrement() { }
  handleDecrement() { }
  
}