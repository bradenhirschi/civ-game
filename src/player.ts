import City from "./city";
import { Game } from "./game";
import { Unit } from "./units/unit";

export class Player {
  playerNum: number;
  game: Game;
  units: Unit[] = [];
  cities: City[] = [];

  constructor(game: Game, playerNum: number) {
    this.game = game;
    this.playerNum = playerNum;
  }

  getUnits = () => {
    this.units = [];
    this.game.units.forEach(unit => {
      if (unit.player === this) {
        this.units.push(unit);
      }
    })
  }

  getCities = () => {
    this.cities = [];
    this.game.cities.forEach(city => {
      if (city.player === this) {
        this.cities.push(city);
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