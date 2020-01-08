import Sound from "./sound.js";

export default class GameSounds {
  constructor(game) {
    this.game = game;
    this.volume = 100;
    this.path = "./../assets/sounds/";
    this.goodStrike = new Sound(this.path + "goodStrike.wav");
    this.okayStrike = new Sound(this.path + "okayStrike.wav");
    this.badStrike = new Sound(this.path + "badStrike.wav");
    this.click = new Sound(this.path + "click.wav");
  }
  
  setVolume(volume) {
    this.goodStrike.setVolume(volume);
    this.okayStrike.setVolume(volume);
    this.badStrike.setVolume(volume);
    this.click.setVolume(volume);
  }
}