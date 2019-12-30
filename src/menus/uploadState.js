import MenuItem from "./menuItem.js";

export default class LocalState {
  constructor(game, menuState) {
    this.game = game;
    this.menuState = menuState;
    
    this.index = 0;
    this.name = "Upload";
    this.items = [
        new MenuItem(menuState, "Browse", 
            this.browse ),
        new MenuItem(menuState, "Upload",
            this.upload )
    ];
  }
  
  handleConfirm() { this.items[this.index].execute(); }
  handleBack() { this.menuState.setState(this.menuState.getSelectState()); }
  handleIncrement() { }
  handleDecrement() { }
  
  browse() {
    var input = document.createElement('input');
    input.type = 'file';
    let caller = this;
    input.addEventListener('change', function(e) {
      let file = input.files[0];
      let imageType = /image.*/;
      if (file.type.match(imageType)) {
          let reader = new FileReader();
          reader.onload = function(e) {
            this.img = new Image();
            document.getElementById("custom").src = reader.result;
            caller.value = file.name;  
          }
          reader.readAsDataURL(file);       
      }
      else {
        caller.value = "Invalid file type"; 
      }
    });
    
    input.click();
  }
  
  upload() {
    if (document.getElementById("custom").src != "") {
      this.menuState.game.getCustomCourse();
      this.menuState.setState(this.menuState.getMainState());
    }
  }
  
}