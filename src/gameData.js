export default class GameData {
  constructor(game) {
    this.game = game;
    this.init();
  }
  
  init() {
    this.strokes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.holeNum = 1;
  }
  
  getStrokes() { return this.strokes[this.holeNum]; }
  incStrokes() { this.strokes[this.holeNum]++; }
  getHoleNum() { return this.holeNum; }
  incHoleNum() { this.holeNum++; }
  
}