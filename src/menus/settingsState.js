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
        ),
        new MenuItem(menuState,
            "Inaccuracy",
            new Function( '' ),
            this.menuState.game.ball.inaccuracyRate,
            new Function ( 'n', 'return n * 4/3' ),
            new Function ( 'n', 'return n * 3/4' ),
            new Function ( 'this.menuState.game.ball.setInaccuracyRate(this.value)' )
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