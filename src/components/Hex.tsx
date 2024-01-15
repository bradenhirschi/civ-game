import { Component, RefObject, createRef } from 'react';
import { Container, Sprite } from '@pixi/react';
import Unit from './Unit';

interface HexProps {
  imageSrc: string;
  row: number;
  col: number;
}

interface HexState {
  unitRefs: RefObject<Unit>[];
  units: any[];
}

class Hex extends Component<HexProps, HexState> {
  private tileWidth: number = 86;
  private tileHeight: number = 100;
  public row: number;
  public col: number;

  constructor(props: any) {
    super(props);

    this.row = props.row;
    this.col = props.col;

    this.state = {
      unitRefs: [],
      units: [],
    };
  }

  calculatePosition = () => {
    const { col, row } = this.props;
    let x = col * this.tileWidth;
    let y = row * (this.tileHeight * 0.75);
    if (row % 2) {
      x += this.tileWidth / 2;
    }
    return { x, y };
  };

  addUnit = (player: number) => {
    const newUnitRef = createRef<Unit>();

    this.setState(
      (prevState) => ({
        unitRefs: [...prevState.unitRefs, newUnitRef],
        units: [...prevState.units, <Unit player={player} ref={newUnitRef} />],
      })
    );

    return newUnitRef;
  };

  render() {
    const { imageSrc } = this.props;
    const { units } = this.state;
    const { x, y } = this.calculatePosition();

    return (
      <Container
        x={x}
        y={y}
      >
        <Sprite
          image={imageSrc}
          width={86.6}
          height={100}
        />
        {units.map((unit, index) => (
          <Container key={index}>
            {unit}
          </Container>
        ))}
      </Container>
    )
  }
}

export default Hex;
