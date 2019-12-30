import MenuItem from "./menuItem.js";

export default class MainState {
  constructor(game, menuState) {
    this.game = game;
    this.menuState = menuState;
    
    this.index = 0;
    this.name = "Main";
    this.items = [
        new MenuItem(menuState, "Play", 
            new Function ( 'this.menuState.game.setState(this.menuState.game.getLoadState())' ), ),
        new MenuItem(menuState, "Select",
            new Function ( 'this.menuState.setState(this.menuState.getSelectState())' ) ),
        new MenuItem(menuState, "Settings",
            new Function ( 'this.menuState.setState(this.menuState.getSettingsState())' ) )
    ];
  }
  
  handleConfirm() { this.items[this.index].execute(); }
  handleBack() { this.menuState.setState(this.menuState.getTitleState()); }
  handleIncrement() { }
  handleDecrement() { }

}