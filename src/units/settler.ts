import City from "../City";
import { Game } from "../Game";
import { Player } from "../Player";
import { Unit } from "./Unit";

export class Settler extends Unit {
  type = 'SETTLER';

  constructor(game: Game, player: Player, row: number, col: number) {
    const imageSrc = 'https://exfuptdlhimdvtecgddo.supabase.co/storage/v1/object/public/civ-game/settler.png?t=2024-01-22T18%3A47%3A22.305Z';

    super(game, player, row, col, imageSrc)
  }

  foundCity = () => {
    const city = new City(this.game, this.player, this.row, this.col);
    this.game.cities.push(city);

    this.game.addChild(city);
    this.destroy();
  }
}