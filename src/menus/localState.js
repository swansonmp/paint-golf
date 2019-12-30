import MenuItem from "./menuItem.js";

export default class LocalState {
  constructor(game, menuState) {
    this.game = game;
    this.menuState = menuState;
    
    this.index = 0;
    this.name = "Local";
    this.items = [
        new MenuItem(menuState, "course"),
        new MenuItem(menuState, "test")
    ];
  }
  
  handleConfirm() {
    this.menuState.game.getCourse(this.items[this.index].name);
    this.menuState.setState(this.menuState.getMainState());
  }
  
  handleBack() {
    this.menuState.setState(this.menuState.getSelectState());
  }
  
  handleIncrement() { }
  handleDecrement() { }
  
}