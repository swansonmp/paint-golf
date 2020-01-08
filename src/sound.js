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
    this.sound.currentTime = 0;
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
  
  setVolume(volume) {
    if (volume < 0) this.sound.volume = 0;
    else if (volume > 1) this.sound.volume = 1;
    else this.sound.volume = volume;
  }
}