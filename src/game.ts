import { Container } from "pixi.js";
import { Hex } from "./hex";
import { Player } from "./player";
import { Unit } from "./units/unit";
import { NUM_COLS, NUM_ROWS } from "./constants";
import City from "./city";
import { Settler } from "./units/settler";
import { Warrior } from "./units/warrior";

export class Game extends Container {
  players = [new Player(this, 0), new Player(this, 1)];
  currentPlayer: Player = this.players[0];
  hexes: Hex[] = [];
  units: (Unit | Settler)[] = [];
  cities: City[] = [];
  activeUnit?: Unit | Settler = null;
  currentActionDescription: HTMLDivElement;
  currentUnitTypeDisplay: HTMLDivElement;
  currentUnitHitPointsDisplay: HTMLDivElement;
  currentUnitMovementPointsDisplay: HTMLDivElement;
  currentUnitActionBtn1: HTMLButtonElement;

  constructor () {
    super();

    for (let i=0; i<this.players.length; i++) {
      this.spawnUnitInRandomPosition(this.players[i]);
    }

    for (let row=0; row<NUM_ROWS; row++) {
      for (let col=0; col<NUM_COLS; col++) {
        const hex = new Hex(this, row, col);
        this.hexes.push(hex);
        this.addChild(hex)
      }
    }

    this.currentActionDescription = document.querySelector('#current-action-description');
    this.currentUnitTypeDisplay = document.querySelector('#current-unit-type');
    this.currentUnitHitPointsDisplay = document.querySelector('#current-unit-hit-points');
    this.currentUnitMovementPointsDisplay = document.querySelector('#current-unit-movement-points');
    this.currentUnitActionBtn1 = document.querySelector('#current-unit-action-btn-1');
    this.currentUnitActionBtn1.onclick = () => {
      if (this.activeUnit instanceof Settler ) {
      this.activeUnit.foundCity();
      }
    }
  }

  spawnUnitInRandomPosition = (player: Player) => {
    const randomRow = Math.floor(Math.random() * NUM_ROWS);
    const randomCol = Math.floor(Math.random() * NUM_COLS);
    // TODO make sure units can't spawn in the same place
    const warrior = new Warrior(this, player, randomRow, randomCol);
    const settler = new Settler(this, player, randomRow+1, randomCol+1);
    this.units.push(warrior);
    // this.units.push(settler);
  }

  updatecurrentUnitTypeDisplay = () => {
    this.currentUnitTypeDisplay.textContent = this.activeUnit.type;
    this.currentUnitHitPointsDisplay.textContent = `${this.activeUnit.hitPoints.toString()} HP`;
    this.currentUnitMovementPointsDisplay.textContent = `${this.activeUnit.movementPoints.toString()} MP`;
  }

  update = () => {
    this.hexes.forEach(hex => hex.update());
  }

  init = async () => {
    // TODO What goes in constructor vs init? What's the point of init

    while (true) {
      for (const player of this.players) {
        this.currentPlayer = player;
        this.currentActionDescription.textContent = `Player ${player.playerNum + 1} Turn`;
        this.currentActionDescription.style.border = `2px solid ${player.playerNum === 0 ? 'green' : 'blue'}`;
        await player.takeTurn();
      }
    }
  }
}