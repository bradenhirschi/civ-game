import * as PIXI from 'pixi.js';
import { Container } from "pixi.js";
import { Game } from "./Game";
import { Unit } from "./units/Unit";
import { HEX_HEIGHT, HEX_SIZE, HEX_WIDTH } from './constants';
import { convertOffsetToAxial } from './utils';
import City from './City';

export class Hex extends Container {
  game;
  row;
  col;
  hexImageSrc;
  sprite: PIXI.Sprite;
  unit: Unit;
  city: City;
  graphics: PIXI.Graphics;

  constructor(game: Game, row: number, col: number) {
    super();

    this.game = game;
    this.row = row;
    this.col = col;
    this.hexImageSrc = this.generateRandomImageSrc();

    this.x = col * HEX_WIDTH;
    this.y = row * HEX_HEIGHT * 0.75;
    if (row % 2) {
      this.x += HEX_WIDTH / 2;
    }

    // Hex sprite styling and positioning
    this.sprite = PIXI.Sprite.from(this.hexImageSrc);
    this.sprite.width = HEX_WIDTH;
    this.sprite.height = HEX_HEIGHT;

    // Create graphics circle for onMouseDown
    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(2, 0xFFFFFF);
    this.graphics.drawCircle(HEX_WIDTH / 2, HEX_HEIGHT / 2, HEX_WIDTH / 2.5);

    // Interactivity
    this.sprite.eventMode = 'dynamic';
    this.sprite.on('rightdown', () => {
        this.onRightDown();
      });
      this.sprite.on('rightup', () => {
        this.onRightUp();
      });
    this.sprite.on('rightclick', () => {
        this.onRightClick();
      });

    this.addChild(this.sprite);
  }

  generateRandomImageSrc = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    switch (randomNumber) {
      case 1:
        return 'https://exfuptdlhimdvtecgddo.supabase.co/storage/v1/object/public/civ-game/grass.png?t=2024-01-16T04%3A02%3A18.596Z';
      case 2:
        return 'https://exfuptdlhimdvtecgddo.supabase.co/storage/v1/object/public/civ-game/clay.png?t=2024-01-16T04%3A02%3A30.970Z';
      case 3:
        return 'https://exfuptdlhimdvtecgddo.supabase.co/storage/v1/object/public/civ-game/desert.png?t=2024-01-16T12%3A35%3A28.921Z';
    }
    return '';
  };

  addUnit = (unit: Unit) => {
    this.unit = unit;
  };

  getUnits = () => {
    this.unit = this.game.units.find(unit => unit.row === this.row && unit.col === this.col);
  };

  getCity = () => {
    this.city = this.game.cities.find(city => city.row === this.row && city.col === this.col);
  };

  checkIfActiveUnitCanMoveHere = () => {
    const {q: aq, r: ar} = convertOffsetToAxial(this.col, this.row);
    const {q: bq, r: br} = convertOffsetToAxial(this.game.activeUnit.col, this.game.activeUnit.row);

    const distance = (Math.abs(aq - bq) + Math.abs(aq + ar - bq - br) + Math.abs(ar - br)) / 2;

    if (!this.game.activeUnit) return false;

    if (distance > 1) return false;

    return true;
  };

  onRightDown = () => {
    console.log('donw')
    this.addChild(this.graphics);
  }

  onRightUp = () => {
    console.log('op')
    this.removeChild(this.graphics);
  }

  onRightClick = () => {
    console.log('right click hex');

    let wonBattle = true;

    // Check if there's an active unit trying to move here
    if (!this.game.activeUnit || !this.checkIfActiveUnitCanMoveHere()) return;

    // Check if there's already a unit here and if so, initiate combat
    this.getUnits();
    if (this.unit) {
      if (this.unit.type === 'SETTLER') {
        this.unit.player = this.game.activeUnit.player;
        wonBattle = true;
      } else {
        wonBattle = this.game.activeUnit.attack(this.unit);
      }     
    }

    if (wonBattle) {
      // Update position of activeUnit
      this.game.activeUnit.changePosition(this.row, this.col);
    }

    this.game.activeUnit.movementPoints -= 1;

    if (this.game.activeUnit.movementPoints <= 0) {
      // Dispatch event to let unit know it has moved
      document.dispatchEvent(new Event('movedActiveUnit'));

      // Remove 'active' indicator from unit and set game active unit to null
      this.game.activeUnit.removeChild(this.game.activeUnit.graphics);
      this.game.activeUnit = null;
    }
  }
}