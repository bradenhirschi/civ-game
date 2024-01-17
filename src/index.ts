import { Game } from "./classes/game";
import { Unit } from "./classes/unit";
import { HEX_HEIGHT, HEX_WIDTH, NUM_COLS, NUM_ROWS } from "./constants";
import './styles.css';
import * as PIXI from 'pixi.js';

// Disable context menu opening on right click
window.addEventListener("contextmenu", e => e.preventDefault());

const gameContainer = document.createElement('div');
gameContainer.id = 'board-container';
document.body.appendChild(gameContainer);

const currentPlayer = document.createElement('div');
currentPlayer.id = 'current-player';
document.body.appendChild(currentPlayer);

const app = new PIXI.Application<HTMLCanvasElement>({
      width: HEX_WIDTH * NUM_COLS + HEX_WIDTH / 2,
      height: HEX_HEIGHT * NUM_ROWS - ((NUM_ROWS - 1) * HEX_HEIGHT * .25),
      backgroundColor: 0xffffff });

document.body.appendChild(app.view);

const game = new Game();

app.stage.addChild(game);

game.init();