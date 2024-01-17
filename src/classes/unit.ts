import { Game } from "./game";
import { Container, Sprite, Graphics } from 'pixi.js';

export class Unit extends Container {
  game: Game;
  playerNum: number;
  row: number;
  col: number;
  imageSrc: string = 'https://exfuptdlhimdvtecgddo.supabase.co/storage/v1/object/public/civ-game/infantry.png?t=2024-01-16T13%3A15%3A02.170Z';
  sprite: Sprite;
  graphics: Graphics;

  constructor(game: Game, playerNum: number, row: number, col: number) {
    super();

    this.game = game;
    this.playerNum = playerNum;
    this.row = row;
    this.col = col;
    this.x = 15;
    this.y = 15;

    this.sprite = this.createSprite();
    this.addChild(this.sprite);
  }

  createSprite = () => {
    const sprite = Sprite.from(this.imageSrc);
    sprite.width = 30;
    sprite.height = 45;
    // sprite.tint = this.playerNum === this.game.currentPlayer ? 0x00ff00 : 0xff0000;

    // Interactivity
    sprite.eventMode = 'dynamic';
    sprite.cursor = 'pointer';

    // Click listener
    sprite.on('click', () => {
      this.onClick(0);
    });

    // if (unit === this.game.activeUnit) {
    //   unitSprite.tint = 0x0000ff;
    // }

    return sprite;
  }

  onClick = (currentPlayerNum: number) => {
    // if (currentPlayerNum === this.playerNum) {
    //   this.game.activeUnit = this;
    // }

    this.graphics = new Graphics();

    const cornerRadius = 10;
    this.graphics.lineStyle(2, 0xFFFFFF); // Set line style (2 pixels width, white color in this example)
    this.graphics.drawCircle(0, 15, this.sprite.width);
    this.graphics.endFill();

    this.graphics.position.set(this.x, this.y);


    this.addChild(this.graphics);

    // this.removeChildren();

    // this.sprite = Sprite.from('https://exfuptdlhimdvtecgddo.supabase.co/storage/v1/object/public/civ-game/desert.png?t=2024-01-16T12%3A35%3A28.921Z');
    // this.addChild(this.sprite);
  }
}