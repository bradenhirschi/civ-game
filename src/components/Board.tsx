import { Component, createRef } from 'react';
import { Stage } from '@pixi/react';
import Hex from './Hex';

interface BoardState {
  hexes: React.RefObject<Hex>[];
}

class Board extends Component<{}, BoardState> {
  private numRows: number = 6;
  private numCols: number = 8;
  private numHexes: number = this.numRows * this.numCols;
  private hexWidth: number = 86;
  private hexHeight: number = 100;

  constructor(props: {}) {
    super(props);

    this.state = {
      hexes: Array.from({ length: this.numHexes }, () => createRef<Hex>()),
    };
  }

  componentDidMount() {
    // console.log(this.state)
    this.spawnUnitInRandomPosition();
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
  }

  spawnUnitInRandomPosition = () => {
    const randomNumber = Math.floor(Math.random() * this.state.hexes.length);
    
    setTimeout(() => {
      this.state.hexes[randomNumber].current?.addUnit(0);
      this.state.hexes[randomNumber+1].current?.addUnit(1);
    }, 1000)
  }

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
          />
        ))}
      </Stage>
    );
  }
}

export default Board;
