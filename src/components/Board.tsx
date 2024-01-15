import { Component, RefObject, createRef } from 'react';
import { Stage } from '@pixi/react';
import Hex from './Hex';
import Player from './Player';
import Unit from './Unit';

interface BoardProps {
  players: Player[];
}

interface BoardState {
  hexes: React.RefObject<Hex>[];
  unitRefs: RefObject<Unit>[];
  units: any[];
}

class Board extends Component<BoardProps, BoardState> {
  private numRows: number = 6;
  private numCols: number = 8;
  private numHexes: number = this.numRows * this.numCols;
  private hexWidth: number = 86;
  private hexHeight: number = 100;
  private players: Player[] = [];

  constructor(props: BoardProps) {
    super(props);

    this.players = props.players;

    this.state = {
      hexes: Array.from({ length: this.numHexes }, () => createRef<Hex>()),
      unitRefs: [],
      units: [],
    };
  }

  componentDidMount() {
    let newUnitRef;
    // Spawn each player's initial units
    this.players.forEach(async (_, i) => {
      newUnitRef = await this.spawnUnitInRandomPosition(i);
      if (newUnitRef) {
        this.players[i].addUnitRef(newUnitRef);
      } else {
        console.error('Error creating initial units');
      }
    });
  }

  generateImageSrc = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    switch (randomNumber) {
      case 1:
        return 'grass.png';
      case 2:
        return 'clay.png';
      case 3:
        return 'desert.png';
    }
    return '';
  };

  spawnUnitInRandomPosition = async (playerNum: number) => {
    const randomNumber = Math.floor(Math.random() * this.state.hexes.length);
    const hexRef = this.state.hexes[randomNumber];

    console.log(randomNumber);

    // Wait for hexRef.current to be set
    await new Promise<void>((resolve) => {
      const checkRef = () => {
        if (hexRef.current) {
          resolve();
        } else {
          setTimeout(checkRef, 10); // Check again in 10 milliseconds
        }
      };

      checkRef();
    });

    const newUnitRef = createRef<Unit>();

    this.setState(
      (prevState) => ({
        unitRefs: [...prevState.unitRefs, newUnitRef],
        units: [
          ...prevState.units,
          <Unit
            player={playerNum}
            ref={newUnitRef}
            initialRow={0}
            initialCol={0}
          />,
        ],
      }),
    );

    return newUnitRef;
  };

  render() {
    const { hexes } = this.state;

    return (
      <Stage
        width={this.numCols * this.hexWidth + this.hexWidth / 2}
        height={this.numRows * (this.hexHeight * 0.75) + this.hexHeight * 0.25}
      >
        {hexes.map((hexRef, index) => (
          <Hex
            key={index}
            ref={hexRef}
            imageSrc={this.generateImageSrc()}
            row={Math.floor(index / this.numCols)}
            col={index % this.numCols}
            unitRefs={this.state.unitRefs}
            units={this.state.units}
          />
        ))}
      </Stage>
    );
  }
}

export default Board;
