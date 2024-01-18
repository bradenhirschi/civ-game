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
    sprite.tint = this.playerNum === 0 ? 0xa0f0a0 : 0xa0a0f0;

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

  // onClick is temporarily disabled
  // onClick = () => {
  //   if (this.game.currentPlayer !== this.playerNum) {
  //     return;
  //   }

  //   this.game.activeUnit = this;

  //   // Draw white circle around unit
  //   this.graphics = new Graphics();
  //   this.graphics.lineStyle(2, 0xFFFFFF);
  //   this.graphics.drawCircle(0, 15, this.sprite.width);
  //   this.graphics.endFill();
  //   this.graphics.position.set(this.x, this.y);
  //   this.addChild(this.graphics);
  // }

  takeTurn = async () => {
    this.game.currentPlayer = this.playerNum;
    this.game.activeUnit = this;

    // Draw white circle around unit
    this.graphics = new Graphics();
    this.graphics.lineStyle(2, 0xFFFFFF);
    this.graphics.drawCircle(0, 15, this.sprite.width);
    this.graphics.endFill();
    this.graphics.position.set(this.x, this.y);
    this.addChild(this.graphics);

    await new Promise<void>((resolve, reject) => {
      const handleActiveUnitMoved = () => {
        document.removeEventListener('movedActiveUnit', handleActiveUnitMoved);
        resolve();
      };

      document.addEventListener('movedActiveUnit', handleActiveUnitMoved);
    })
  }

  attack = () => {
    console.log(`Player ${this.playerNum} unit attacking`)
  }

  defend = () => {
    console.log(`Player ${this.playerNum} unit defending`)
  }
}