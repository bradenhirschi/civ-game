import * as PIXI from 'pixi.js';
import { Container } from "pixi.js";
import { Game } from "./game";
import { Unit } from "./units/unit";
import { HEX_HEIGHT, HEX_WIDTH } from './constants';
import { convertOffsetToAxial } from './utils';
import City from './city';

export class Hex extends Container {
  game;
  row;
  col;
  hexImageSrc;
  sprite: PIXI.Sprite;
  units: Unit[] = [];
  city: City;

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

    // Interactivity
    this.sprite.eventMode = 'dynamic';

    this.addChild(this.sprite);

    // this.getUnits();

    // this.units.forEach(unit => {
    //   this.addChild(unit);
    // });
  }

  generateRandomImageSrc = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    switch (randomNumber) {
      case 1:
        return 'https://exfuptdlhimdvtecgddo.supabase.co/storage/v1/object/public/civ-game/grass.png?t=2024-01-16T04%3A02%3A18.596Z';
        return 'grass.png';
      case 2:
        return 'https://exfuptdlhimdvtecgddo.supabase.co/storage/v1/object/public/civ-game/clay.png?t=2024-01-16T04%3A02%3A30.970Z';
        return 'clay.png';
      case 3:
        return 'https://exfuptdlhimdvtecgddo.supabase.co/storage/v1/object/public/civ-game/desert.png?t=2024-01-16T12%3A35%3A28.921Z';
        return 'desert.png';
    }
    return '';
  };

  addUnit = (unit: Unit) => {
    this.units.push(unit);
  };

  getUnits = () => {
    this.units = this.game.units.filter(unit => unit.row === this.row && unit.col === this.col);
  };

  getCity = () => {
    this.city = this.game.cities.find(city => city.row === this.row && city.col === this.col);
  };

  checkIfActiveUnitCanMoveHere = () => {
    const {q: aq, r: ar} = convertOffsetToAxial(this.col, this.row);
    const {q: bq, r: br} = convertOffsetToAxial(this.game.activeUnit.col, this.game.activeUnit.row);

    const distance = (Math.abs(aq - bq) + Math.abs(aq + ar - bq - br) + Math.abs(ar - br)) / 2;

    // console.log(distance);

    if (!this.game.activeUnit) return false;

    if (distance > this.game.activeUnit.movementPoints) return false;

    // console.log('hex position', this.row, this.col);
    // console.log('active unit position', this.game.activeUnit.row, this.game.activeUnit.col);

    const neighborLocations = [
      {}
    ]

    return true;
  };

  onRightClick = () => {
    console.log('right click hex');

    let wonBattle = 1;

    // TODO don't run this again, it already runs in the hex update loops
    const activeUnitCanMoveHere = this.checkIfActiveUnitCanMoveHere();

    // Check if there's an active unit trying to move here
    if (!this.game.activeUnit || !activeUnitCanMoveHere) return;

    // Check if there's already a unit here and if so, initiate combat
    if (this.units.length) {
      // TODO change this when we add more units. It shouldn't be units[0]
      wonBattle = this.game.activeUnit.attack(this.units[0]);
    }

    if (wonBattle) {
      // Find previous location of active unit and remove unit from that hex
      // const prevHex = this.game.hexes.find(hex => hex.row === this.game.activeUnit.row && hex.col === this.game.activeUnit.col);
      // prevHex.removeChild(this.game.activeUnit);

      // Update position of activeUnit
      this.game.activeUnit.row = this.row;
      this.game.activeUnit.col = this.col;
    }

    // Remove 'active' indicator from unit and set game active unit to null
    this.game.activeUnit.removeChild(this.game.activeUnit.graphics);
    this.game.activeUnit = null;

    // Dispatch event to let unit know it has moved
    document.dispatchEvent(new Event('movedActiveUnit'));

    // Update hex and remove right click listener
    this.update();
    this.sprite.removeAllListeners();
  }

  update = () => {
    // UI changes and click listener for when a unit is moving
    if (this.game.activeUnit && this.checkIfActiveUnitCanMoveHere()) {
      this.sprite.cursor = 'pointer';

      // TODO change this, we shouldn't need to remove listeners and reapply every update (every frame)
      this.sprite.removeAllListeners();
      this.sprite.on('rightclick', () => {
        this.onRightClick();
      });
    } else {
      this.sprite.cursor = 'default';
      this.sprite.removeAllListeners();
    }

    // Remove all units and fetch current units
    // this.units.forEach(unit => {
    //   this.removeChild(unit);
    // })
    // this.getUnits();
    // this.units.forEach(unit => {
    //   this.addChild(unit);
    // });

    // Remove all cities and fetch current cities
    if (this.city) {
      this.removeChild(this.city);
    }
    this.getCity();
    if (this.city) {
      this.addChild(this.city);
    }
  }
}