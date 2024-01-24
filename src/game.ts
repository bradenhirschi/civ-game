import { Container } from "pixi.js";
import { Hex } from "./Hex";
import { Player } from "./Player";
import { Unit } from "./units/Unit";
import { NUM_COLS, NUM_ROWS } from "./constants";
import City from "./City";
import { Settler } from "./units/Settler";
import { Warrior } from "./units/Warrior";
import UiControls from "./UiControls";

export class Game extends Container {
  players = [new Player(this, 0), new Player(this, 1)];
  currentPlayer: Player = this.players[0];
  hexes: Hex[] = [];
  units: (Unit | Settler)[] = [];
  cities: City[] = [];
  activeUnit?: Unit | Settler = null;
  uiControls: UiControls;
  currentActionDescription: HTMLDivElement;
  currentUnitTypeDisplay: HTMLDivElement;
  currentUnitHitPointsDisplay: HTMLDivElement;
  currentUnitMovementPointsDisplay: HTMLDivElement;

  constructor () {
    super();

    for (let row=0; row<NUM_ROWS; row++) {
      for (let col=0; col<NUM_COLS; col++) {
        const hex = new Hex(this, row, col);
        this.hexes.push(hex);
        this.addChild(hex)
      }
    } 

    for (let i=0; i<this.players.length; i++) {
      this.spawnUnitInRandomPosition(this.players[i]);
    }

    this.uiControls = new UiControls(this);

    this.currentActionDescription = document.querySelector('#current-action-description');
    this.currentUnitTypeDisplay = document.querySelector('#current-unit-type');
    this.currentUnitHitPointsDisplay = document.querySelector('#current-unit-hit-points');
    this.currentUnitMovementPointsDisplay = document.querySelector('#current-unit-movement-points');
  }

  spawnUnitInRandomPosition = (player: Player) => {
    // TODO make sure units can't spawn in the same place
    // TODO make warrior spawn close to settler

    const settlerRow = Math.floor(Math.random() * NUM_ROWS);
    const settlerCol = Math.floor(Math.random() * NUM_COLS);
    const settler = new Settler(this, player, settlerRow, settlerCol);
    this.units.push(settler);
    this.addChild(settler);

    const warriorRow = Math.floor(Math.random() * NUM_ROWS);
    const warriorCol = Math.floor(Math.random() * NUM_COLS);
    const warrior = new Warrior(this, player, warriorRow, warriorCol);
    this.units.push(warrior);
    this.addChild(warrior);
  }

  updatecurrentUnitTypeDisplay = () => {
    this.currentUnitTypeDisplay.textContent = this.activeUnit.type;
    this.currentUnitHitPointsDisplay.textContent = `${this.activeUnit.hitPoints.toString()} HP`;
    this.currentUnitMovementPointsDisplay.textContent = `${this.activeUnit.movementPoints.toString()} MP`;
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