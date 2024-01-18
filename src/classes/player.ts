import { Game } from "./game";
import { Unit } from "./unit";

export class Player {
  playerNum: number;
  game: Game;
  units: Unit[] = [];

  constructor(game: Game, playerNum: number) {
    this.game = game;
    this.playerNum = playerNum;
  }

  getUnits = () => {
    this.units = [];
    this.game.units.forEach(unit => {
      if (unit.playerNum === this.playerNum) {
        this.units.push(unit);
      }
    })
  }

  takeTurn = async () => {
    this.getUnits();

    const promises = this.units.map(unit => unit.takeTurn());
    await Promise.all(promises);

    return Promise.resolve();
  }
}