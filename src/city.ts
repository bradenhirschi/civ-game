import { Container, Sprite } from "pixi.js";
import { Player } from "./player";
import { Game } from "./game";

class City extends Container {
  game: Game;
  player: Player;
  row: number;
  col: number;
  sprite: Sprite;
  imageSrc: string = 'https://exfuptdlhimdvtecgddo.supabase.co/storage/v1/object/public/civ-game/city.png?t=2024-01-22T18%3A48%3A00.089Z';

  constructor(game: Game, player: Player, row: number, col: number) {
    super();

    this.game = game;
    this.player = player;
    this.row = row;
    this.col = col;

    this.sprite = this.createSprite();
    this.addChild(this.sprite);
  }

  createSprite = () => {
    const sprite = Sprite.from(this.imageSrc);
    sprite.anchor.set(0.5, 0.5);
    sprite.width = 30;
    sprite.height = 45;
    sprite.tint = this.player === this.game.players[0] ? 0xa0f0a0 : 0xa0a0f0;

    // Interactivity
    sprite.eventMode = 'dynamic';
    sprite.cursor = 'pointer';

    // Click listener
    sprite.on('click', () => {
      // Uncomment this to enable onClick
      // this.onClick();
    });

    return sprite;
  }
}

export default City;