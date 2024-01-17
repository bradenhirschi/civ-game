import { Container } from "pixi.js";
import { Hex } from "./hex";
import { Player } from "./player";
import { Unit } from "./unit";
import { NUM_COLS, NUM_ROWS } from "../constants";

export class Game extends Container {
  gameContainer;
  players = [new Player(this, 0), new Player(this, 1)];
  currentPlayer: number = 0;
  hexes: Hex[] = [];
  units: Unit[] = [];
  activeUnit?: Unit = null;
  currentPlayerDisplay;

  constructor () {
    super();

    this.gameContainer = document.querySelector('#board-container');

    for (let i=0; i<this.players.length; i++) {
      this.spawnUnitInRandomPosition(i);
    }

    this.currentPlayerDisplay = document.querySelector('#current-player');
    this.currentPlayerDisplay!.textContent = `Player ${this.currentPlayer + 1} Turn`;
  }

  spawnUnitInRandomPosition = (playerNum: number) => {
    const randomRow = Math.floor(Math.random() * NUM_ROWS);
    const randomCol = Math.floor(Math.random() * NUM_COLS);
    // TODO make sure units can't spawn in the same place
    const unit = new Unit(this, playerNum, randomRow, randomCol);
    this.units.push(unit);
    console.log(unit);
  }

  init = () => {
    for (let row=0; row<NUM_ROWS; row++) {
      for (let col=0; col<NUM_COLS; col++) {
        const hex = new Hex(this, row, col);
        this.addChild(hex)
      }
    }

    this.currentPlayerDisplay!.textContent = `Player ${this.currentPlayer + 1} Turn`;
  }
}