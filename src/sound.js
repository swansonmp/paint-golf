export default class Sound {
  constructor(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }
  
  play() {
    this.sound.play();
  }
  
  stop() {
    this.sound.pause();
  }
  
  increaseVolume() {
    this.sound.volume += 0.05;
    if (this.sound.volume > 1) this.sound.volume = 1;
  }
  
  decreaseVolume() {
    this.sound.volume -= 0.05;
    if (this.sound.volume < 0) this.sound.volume = 0;
  }
}