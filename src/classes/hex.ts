import * as PIXI from 'pixi.js';
import { Container } from "pixi.js";
import { Game } from "./game";
import { Unit } from "./unit";
import { HEX_HEIGHT, HEX_WIDTH } from '../constants';

export class Hex extends Container {
  game;
  row;
  col;
  hexImageSrc;
  units: Unit[] = [];

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
    let hexSprite = PIXI.Sprite.from(this.hexImageSrc);
    hexSprite.width = HEX_WIDTH;
    hexSprite.height = HEX_HEIGHT;

    // Hex sprite hover listener
    (hexSprite as any).on('mouseover', () => {
      if (this.game.activeUnit) {
        document.body.style.cursor = 'pointer';
      }
    });
      (hexSprite as any).on('mouseleave', () => {
        document.body.style.cursor = 'default';
    });

    // Hex sprite click listener
    (hexSprite as any).eventMode = 'dynamic';
    
    (hexSprite as any).buttonMode = true;
    (hexSprite as any).on('rightclick', () => {
      this.onRightClick();
    });

    this.addChild(hexSprite);

    const units = this.getUnits();
    units.forEach(unit => {
      this.addChild(unit);
    });
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
  }

  getUnits = () => {
    return this.game.units.filter(unit => unit.row === this.row && unit.col === this.col);
  }

  onRightClick = () => {
    const activeUnit = this.game.activeUnit;

    if (activeUnit) {
      const prevHex = this.game.hexes.find(hex => hex.row === activeUnit.row && hex.col === activeUnit.col);
      prevHex!.removeChildren();
      activeUnit.row = this.row;
      activeUnit.col = this.col;
    }
    this.game.activeUnit = null;
  }
}