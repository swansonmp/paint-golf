export default class GameData {
  constructor(game) {
    this.game = game;
    this.init();
  }
  
  init() {
    this.strokes = 0;
    this.holeNum = 0;
  }
  
  getStrokes() { return this.strokes; }
  resetStrokes() { this.strokes = 0; }
  incStrokes() { this.strokes++; }
  
  getHoleNum() { return this.holeNum; }
  resetHoleNum() { this.holeNum = 1; }
  incHoleNum() { this.holeNum++; }
  
}