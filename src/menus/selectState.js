import MenuItem from "./menuItem.js";

export default class SelectState {
  constructor(game, menuState) {
    this.game = game;
    this.menuState = menuState;
    
    this.index = 0;
    this.name = "Select";
    this.items = [
        new MenuItem(menuState, "Local", 
            new Function ( 'this.menuState.setState(this.menuState.getLocalState())' ) ),
        new MenuItem(menuState, "Upload",
            new Function ( 'this.menuState.setState(this.menuState.getUploadState())' ) )
    ];
  }
  
  handleConfirm() { this.items[this.index].execute(); }
  handleBack() { this.menuState.setState(this.menuState.getMainState()); }
  handleIncrement() { }
  handleDecrement() { }
  
}