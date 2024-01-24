import { Game } from "../Game";
import { Player } from "../Player";
import { Unit } from "./Unit";

export class Warrior extends Unit {
  type = 'WARRIOR';

  constructor(game: Game, player: Player, row: number, col: number) {

    const imageSrc = 'https://exfuptdlhimdvtecgddo.supabase.co/storage/v1/object/public/civ-game/infantry.png?t=2024-01-16T13%3A15%3A02.170Z';

    super(game, player, row, col, imageSrc)
  }

}