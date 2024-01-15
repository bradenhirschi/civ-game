import Board from './Board';
import Unit from './Unit';

interface PlayerProps {
  playerNumber: number;
  board: Board
}

class Player {
  private units: Unit[] = [];

  constructor(props: PlayerProps) {
    this.createUnits(props);
  }

  createUnits = (props: PlayerProps) => {
    const { playerNumber } = props;
    for (let i = 0; i < 3; i++) {
      this.units.push(
        new Unit({ player: playerNumber })
      );
    }
  };
}

export default Player;
