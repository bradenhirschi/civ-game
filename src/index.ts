import { Game } from "./game";
import { HEX_HEIGHT, HEX_WIDTH, NUM_COLS, NUM_ROWS } from "./constants";
import './styles.css';
import * as PIXI from 'pixi.js';

// Disable context menu opening on right click
window.addEventListener("contextmenu", e => e.preventDefault());

const app = new PIXI.Application<HTMLCanvasElement>({
      width: HEX_WIDTH * NUM_COLS + HEX_WIDTH / 2,
      height: HEX_HEIGHT * NUM_ROWS - ((NUM_ROWS - 1) * HEX_HEIGHT * .25),
      backgroundColor: 0xebd5b3 });

const gameContainer = document.querySelector('#game-container');
gameContainer.appendChild(app.view);

const game = new Game();

app.stage.addChild(game);
app.ticker.add(() => {
  game.update();
})

game.init();