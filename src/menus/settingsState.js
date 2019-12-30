import MenuItem from "./menuItem.js";

export default class SettingsState {
  constructor(game, menuState) {
    this.game = game;
    this.menuState = menuState;
    
    this.index = 0;
    this.name = "Settings";
    this.items = [
        new MenuItem(menuState,
            "Scale", 
            new Function ( '' ),
            this.menuState.game.ball.scale,
            this.inc,
            this.dec,
            new Function ( 'this.menuState.game.ball.setScale(this.value)' )
        ),
        new MenuItem(menuState,
            "Game Speed",
            new Function( '' ),
            this.menuState.game.ball.rate,
            this.inc,
            this.dec,
            new Function ( 'this.menuState.game.ball.setRate(this.value)' )
        )
    ];
  }
  
  handleConfirm() { }
  handleBack() { this.menuState.setState(this.menuState.getMainState()); }
  handleIncrement() { this.items[this.index].increment(); }
  handleDecrement() { this.items[this.index].decrement(); }
  
  inc(n) { return n + 1; }
  dec(n) { return n - 1; }
  
}