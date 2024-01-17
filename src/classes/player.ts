import { Game } from "./game";
import { Unit } from "./unit";

export class Player {
  playerNum;
  game;
  units: Unit[] = [];

  constructor(game: Game, playerNum: number) {
    this.game = game;
    this.playerNum = playerNum;
  }

  getUnits = () => {
    this.game.units.forEach(unit => {
      if (unit.playerNum === this.playerNum) {
        this.units.push(unit);
      }
    })
  }

  takeTurn = () => {
    this.getUnits();

    this.units.forEach(unit => {
      this.game.activeUnit = unit;
    })
  }
}