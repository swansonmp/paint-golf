import TitleState from "./../menus/titleState.js";
import MainState from "./../menus/mainState.js";
import SelectState from "./../menus/selectState.js";
import LocalState from "./../menus/localState.js";
import UploadState from "./../menus/uploadState.js";
import SettingsState from "./../menus/settingsState.js";

const RATE = 50;
const BALL_SIZE = 8;
const PADDING_X = 100;
const PADDING_Y = 25;
const HEADING_SIZE = 80;
const ITEM_SIZE = 50;
const TAB = 600;

export default class MenuState {
  constructor(game) {
    this.game = game;
    
    this.titleState = new TitleState(game, this);
    this.mainState = new MainState(game, this);
    this.selectState = new SelectState(game, this);
    this.localState = new LocalState(game, this);
    this.uploadState = new UploadState(game, this);
    this.settingsState = new SettingsState(game, this);
    
    this.setState(this.getTitleState());
    
    this.ballX = 0;
    this.ballY = this.game.GAME_HEIGHT / 2 - BALL_SIZE / 2;
  }
  
  getTitleState() { return this.titleState; }
  getMainState() { return this.mainState; }
  getSelectState() { return this.selectState; }
  getLocalState() { return this.localState; }
  getUploadState() { return this.uploadState; }
  getSettingsState() { return this.settingsState; }
  
  setState(state) {
    this.state = state;
  }
  
  update(deltaTime) {
    this.state.update(deltaTime);
    
    deltaTime /= RATE;
    this.ballX += deltaTime;
    if (this.ballX >= this.game.GAME_WIDTH) {
      this.ballY = Math.floor(Math.random() * this.game.GAME_HEIGHT);
      this.ballX %= this.game.GAME_WIDTH;
    }
  }
  
  drawHeading(ctx) {
    ctx.font = "bold " + HEADING_SIZE + "px monospace";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(
      this.state.name,
      PADDING_X,
      PADDING_Y + HEADING_SIZE
    );
  }
  
  drawItems(ctx) {
    let drawY = PADDING_Y * 2 + HEADING_SIZE;
    let i;
    for (i = 0; i < this.state.items.length; i++) {
      drawY += PADDING_Y + ITEM_SIZE;
      ctx.font = "bold " + ITEM_SIZE + "px monospace";
      if (i == this.state.index) ctx.fillStyle = "white";
      else ctx.fillStyle = "DimGrey";
      ctx.fillText(
          this.state.items[i],
          PADDING_X * 2,
          drawY
      );
    }
  }
  
  drawValues(ctx, state) {
    let drawY = PADDING_Y * 2 + HEADING_SIZE;
    let i;
    for (i = 0; i < this.state.items.length; i++) {
      drawY += PADDING_Y + ITEM_SIZE;
      ctx.font = "bold " + ITEM_SIZE + "px monospace";
      if (i == this.state.index) ctx.fillStyle = "white";
      else ctx.fillStyle = "DimGrey";
      ctx.fillText(
          this.state.values[i],
          TAB,
          drawY
      );
    }
  }
  
  draw(ctx) {
    //draw background
    ctx.rect(0, 0, this.game.GAME_WIDTH, this.game.GAME_HEIGHT);
    ctx.fillStyle = "rgba(34,177,76,1)";
    ctx.fill();
    
    //draw ball
    ctx.drawImage(
      this.game.ball.image,
      this.ballX,
      this.ballY,
      BALL_SIZE,
      BALL_SIZE
    );
    
    if (this.state != this.getTitleState()) {
      this.drawHeading(ctx);
      this.drawItems(ctx);
    }
    
    this.state.draw(ctx);
  }
  
  handleEnter() { this.state.handleConfirm(); }
  handleSpace() { this.state.handleConfirm(); }
  handleEscape() { this.state.handleBack(); }
  handleRightArrow() { this.state.handleIncrement(); }
  handleLeftArrow() { this.state.handleDecrement(); }
  handleUpArrow() {
    this.state.index--;
    if (this.state.index < 0) this.state.index = this.state.items.length - 1;
  }
  handleDownArrow() {
    this.state.index++;
    if (this.state.index >= this.state.items.length) this.state.index = 0; 
  }
  handleWKey() { this.handleUpArrow(); }
  handleAKey() { this.state.handleDecrement(); }
  handleSKey() { this.handleDownArrow(); }
  handleDKey() { this.state.handleIncrement(); }
  
}