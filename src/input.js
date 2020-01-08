export default class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 13:
          game.state.handleEnter();
          break;
        case 27:
          game.state.handleEscape();
          break;
        case 32:
          game.state.handleSpace();
          break;
        case 37:
          game.state.handleLeftArrow();
          break;
        case 38:
          game.state.handleUpArrow();
          break;
        case 39:
          game.state.handleRightArrow();
          break;
        case 40:
          game.state.handleDownArrow();
          break;
        case 65:
          game.state.handleAKey();
          break;
        case 68:
          game.state.handleDKey();
          break;
        case 83:
          game.state.handleSKey();
          break;
        case 87:
          game.state.handleWKey();
          break;
        case 187:
          game.state.handleEqualKey();
          break;
        case 189:
          game.state.handleMinusKey();
          break;
        case 192:
          game.debug.toggleDebug();
          break;
        default:
      }
    });
    
    //holds the current touches
    this.currentTouches = [];
    
    window.addEventListener("resize", resize => {
      let c = document.getElementById("gameScreen");
      c.width = document.body.clientWidth;
      c.height = document.body.clientHeight;
      game.setGameSize(c.width, c.height);
    });
    
    //Touch start event listener
    window.addEventListener("touchstart", e => {
      let touches = e.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        //console.log("touchstart: " + i + "...");
        this.currentTouches.push(this.copyTouch(touches[i]));
        //console.log("touchstart: " + i + " " + touches[i].pageX + "," + touches[i].pageY);
        
        game.state.handleTouchDown(touches[i]);
      }
    });
    
    //Touch move event listener
    window.addEventListener("touchmove", e => {
      let touches = e.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        let index = this.currentTouchIndexById(touches[i].identifier);
        if (index >= 0) {
          //console.log("continuing touch " + index);
          //console.log(this.currentTouches[index].pageX + "," + this.currentTouches[index].pageY);
          //console.log(touches[i].pageX + "," + touches[i].pageY);
          this.currentTouches.splice(index, 1, this.copyTouch(touches[i]));  // swap in the new touch record
        }
        else {
          console.log("Error: Can't find which touch to continue");
        }
      }
    });
    
    //Touch end event listener
    window.addEventListener("touchend", e => {
      let touches = e.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        let index = this.currentTouchIndexById(touches[i].identifier);
        if (index >= 0) {
          //console.log(this.currentTouches[index].pageX + "," + this.currentTouches[index].pageY);
          //console.log(touches[i].pageX + "," + touches[i].pageY);
          this.currentTouches.splice(index, 1);  // remove it; we're done
        } 
        else {
          console.log("Error: Can't find which touch to end");
        }
      }
    });
    
    window.addEventListener("touchcancel", e => {
      console.log("Touch cancel: ");
    });
    
  }
  
  copyTouch({ identifier, pageX, pageY }) {
    return { identifier, pageX, pageY };
  }
  
  currentTouchIndexById(key) {
    for (let i = 0; i < this.currentTouches.length; i++) {
      if (this.currentTouches[i].identifier == key) {
        return i;
      }
    }
    return -1;    // not found
  }
}
