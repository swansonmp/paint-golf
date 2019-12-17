export default class LocalState {
  constructor(game, menuState) {
    this.game = game;
    this.menuState = menuState;
    
    this.index = 0;
    this.name = "Upload";
    this.items = [
      "Browse",
      "Upload"
    ];
    
    this.img = new Image();
  }
  
  update(deltaTime) { }
  draw(ctx) { }
  
  handleConfirm() {
    switch (this.index) {
      case 0:
        this.browse();
        break;
      case 1:
        this.upload();
        break;
      default:
        this.menuState.setState(this.menuState.getTitleState());
    }
  }
  
  browse() {
    var input = document.createElement('input');
    input.type = 'file';
    
    input.addEventListener('change', function(e) {
      let file = input.files[0];
      let imageType = /image.*/;
      if (file.type.match(imageType)) {
          let reader = new FileReader();
          reader.onload = function(e) {
            this.img = new Image();
            document.getElementById("custom").src = reader.result;
          }
          reader.readAsDataURL(file);  
      }
      else {
        console.error("File type not supported.");
      }
    });
    
    input.click();
  }
  
  upload() {
    if (document.getElementById("custom").src != "") {
      this.game.getCustomCourse();
      this.menuState.setState(this.menuState.getMainState());
    }
  }
  
  handleBack() {
    this.menuState.setState(this.menuState.getSelectState());
  }
  
  handleIncrement() { }
  handleDecrement() { }
  
}