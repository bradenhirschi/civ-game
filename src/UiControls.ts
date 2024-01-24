import City from './City';
import { Game } from './Game';
import { Settler } from './units/Settler';
import { Unit } from './units/Unit';
// @ts-ignore
import Sandal from './assets/sandal.svg';
// @ts-ignore
import CrossedSwords from './assets/crossed-swords.svg';

class UiControls {
  game: Game;
  currentActionDescription: HTMLDivElement;
  currentUnitTypeDisplay: HTMLDivElement;
  currentUnitHitPointsDisplay: HTMLDivElement;
  currentUnitMovementPointsDisplay: HTMLDivElement;
  currentUnitActionBtn1: HTMLButtonElement;

  hpIcon: HTMLImageElement;
  mpIcon: HTMLImageElement;

  constructor(game: Game) {
    this.game = game;

    this.currentActionDescription = document.querySelector('#current-action-description');
    this.currentUnitTypeDisplay = document.querySelector('#current-unit-type');
    this.currentUnitHitPointsDisplay = document.querySelector('#current-unit-hit-points');
    this.currentUnitMovementPointsDisplay = document.querySelector('#current-unit-movement-points');
    this.currentUnitActionBtn1 = document.querySelector('#current-unit-action-btn-1');
    this.currentUnitActionBtn1.onclick = () => {
      if (this.game.activeUnit instanceof Settler) {
        this.game.activeUnit.foundCity();
      }
    };

    this.hpIcon = document.querySelector('#hp-icon');
    this.hpIcon.src = CrossedSwords;

    this.mpIcon = document.querySelector('#mp-icon');
    this.mpIcon.src = Sandal;
  }

  setActiveDisplay = (active: Unit | City) => {
    if (active instanceof City) {
      
    }
  }
}

export default UiControls;
