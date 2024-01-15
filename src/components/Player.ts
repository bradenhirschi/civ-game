import { RefObject } from 'react';
import Unit from './Unit';

class Player {
  private unitRefs: RefObject<Unit>[] = [];

  addUnitRef = (unitRef: RefObject<Unit>) => {

    this.unitRefs.push(unitRef);
  }
}

export default Player;
