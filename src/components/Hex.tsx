import { Component, ReactNode, RefObject } from 'react';
import { Container, Sprite } from '@pixi/react';
import Unit from './Unit';

interface HexProps {
  imageSrc: string;
  row: number;
  col: number;
  unitRefs: RefObject<Unit>[];
  units: any[];
}

interface HexState {
}

class Hex extends Component<HexProps, HexState> {
  private tileWidth: number = 86;
  private tileHeight: number = 100;
  public row: number;
  public col: number;
  public units: ReactNode[] = [];

  constructor(props: HexProps) {
    super(props);

    this.row = props.row;
    this.col = props.col;
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

  render() {
    const { imageSrc, units, unitRefs } = this.props;
    const { x, y } = this.calculatePosition();

    const unitsToRender: ReactNode[] = [];

    console.log(this.props);

    // console.log(this.row)
    // console.log(this.col)
    // console.log(this.props.unitRefs[0].current?.state.row)
    // console.log(this.props.unitRefs[0].current?.state.col)

    // for (let i=0; i<this.props.units.length; i++) {
    //   if (this.props.unitRefs[i].current?.state.row === this.row && this.props.unitRefs[i].current?.state.col === this.col) {
    //     unitsToRender.push(this.props.units[i]);
    //   }
    // }

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
        {unitsToRender.map((unit, index) => (
          <Container key={index}>
            {unit}
          </Container>
        ))}
      </Container>
    )
  }
}

export default Hex;
