export default class MenuItem {
  constructor(menuState, name, exec, value, inc, dec, setValue) {
    this.menuState = menuState;
    
    this.name = name;
    this.exec = exec;
    
    if (value == undefined) { 
      this.value = "";
    } else { 
      this.value = value;
    }
    
    this.inc = inc;
    this.dec = dec;
    this.setValue = setValue;
  }
  
  execute() {
    this.exec();
  }
  
  increment() {
    if (this.setValue != undefined) {
      this.value = this.inc(this.value);
      this.setValue();
    }
  }
  
  decrement() {
    if (this.setValue != undefined) {
      this.value = this.dec(this.value);
      this.setValue();
    }
  }
  
}