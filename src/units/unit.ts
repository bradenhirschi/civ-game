import { Container, Sprite, Graphics } from 'pixi.js';

import { Game } from "../game";
import { Player } from "../player";

export class Unit extends Container {
  game: Game;
  player: Player;
  row: number;
  col: number;
  type: string;

  maxHitPoints: number = 100;
  maxCombatStrength: number = 20;

  hitPoints: number = 100;
  movementPoints: number = 3;
  combatStrength: number = 20;

  imageSrc: string;
  sprite: Sprite;
  graphics: Graphics;

  constructor(game: Game, player: Player, row: number, col: number, imageSrc: string) {
    super();

    this.game = game;
    this.player = player;
    this.row = row;
    this.col = col;
    this.x = 15;
    this.y = 15;

    this.imageSrc = imageSrc;

    this.sprite = this.createSprite();
    this.addChild(this.sprite);
  }

  createSprite = () => {
    const sprite = Sprite.from(this.imageSrc);
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
    this.game.currentPlayer = this.player;
    // TODO Move these to some sort of game 'set active unit' function to handle side effects
    this.game.activeUnit = this;

    this.game.updatecurrentUnitTypeDisplay();

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

  attack = (defendingUnit: Unit) => {
    console.log(`Player ${this.player.playerNum} unit attacking`);

    const defeated = defendingUnit.defend(this);

    this.game.updatecurrentUnitTypeDisplay();

    return defeated;
  }

  defend = (attackingUnit: Unit) => {
    console.log(`Player ${this.player.playerNum} unit defending`);

    const strengthDifference = attackingUnit.combatStrength - this.combatStrength;
    const randomNumber = 0.8 + Math.random() * 0.4; // Between .8 and 1.2
    const damage = Math.round(30 * (Math.E ** (0.04 * strengthDifference)) * randomNumber);

    this.hitPoints -= damage;

    console.log(`Player ${this.player.playerNum} unit has ${this.hitPoints} hit points remaining`);

    if (this.hitPoints <= 0) {
      this.destroy();
      return 1;
    }
    return 0;
  }

  destroy = () => {
    const idx = this.game.units.indexOf(this);
    this.game.units.splice(idx, 1);

    console.log(`Player ${this.player.playerNum}'s unit has been destroyed`);
  }
}