import { Container, Sprite, Graphics, ObservablePoint } from 'pixi.js';

import { Game } from "../Game";
import { Player } from "../Player";
import { HEX_HEIGHT, HEX_WIDTH } from '../constants';
import { getHexCenterPoint } from '../utils';

export class Unit extends Container {
  game: Game;
  player: Player;
  row: number;
  col: number;
  type: string;

  maxHitPoints: number = 100;
  hitPoints: number = this.maxHitPoints;

  maxCombatStrength: number = 20;
  combatStrength: number = this.maxCombatStrength;

  maxMovementPoints: number = 3;
  movementPoints: number = this.maxMovementPoints;

  imageSrc: string;
  sprite: Sprite;
  graphics: Graphics;

  constructor(game: Game, player: Player, row: number, col: number, imageSrc: string) {
    super();

    this.game = game;
    this.player = player;
    this.row = row;
    this.col = col;
    const {x, y} = getHexCenterPoint(row, col);
    this.x = x;
    this.y = y;

    console.log(this.row, this.col)

    this.imageSrc = imageSrc;

    this.sprite = this.createSprite();
    this.addChild(this.sprite);
  }

  createSprite = () => {
    const sprite = Sprite.from(this.imageSrc);
    sprite.width = 30;
    sprite.height = 45;
    sprite.anchor.set(0.5, 0.5)
    sprite.tint = this.player === this.game.players[0] ? 0xa0ffa0 : 0xa0a0f0;

    return sprite;
  }

  takeTurn = async () => {
    // TODO Move these to some sort of game 'set active unit' function to handle side effects
    this.game.activeUnit = this;
    this.game.updatecurrentUnitTypeDisplay();
    this.game.currentPlayer = this.player;
    // end TODO

    this.movementPoints = this.maxMovementPoints;

    // Draw white circle around unit
    this.graphics = new Graphics();
    this.graphics.lineStyle(2, 0xCCCCCC);
    this.graphics.drawCircle(0, 15, this.sprite.width);
    this.addChild(this.graphics);

    await new Promise<void>((resolve, reject) => {
      const handleActiveUnitMoved = () => {
        document.removeEventListener('movedActiveUnit', handleActiveUnitMoved);
        resolve();
      };

      document.addEventListener('movedActiveUnit', handleActiveUnitMoved);
    })
  }

  changePosition = (row: number, col: number) => {
    this.row = row;
    this.col = col;
    const {x, y} = getHexCenterPoint(row, col)
    this.x = x;
    this.y = y;
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
      return true;
    }
    return false;
  }

  destroy = () => {
    const idx = this.game.units.indexOf(this);
    this.game.units.splice(idx, 1);

    this.game.removeChild(this);

    console.log(`Player ${this.player.playerNum}'s unit has been destroyed`);
  }
}