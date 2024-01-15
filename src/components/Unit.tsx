import { Sprite } from '@pixi/react';
import { Component } from 'react';
import { ColorMatrixFilter } from 'pixi.js';

interface UnitProps {
  player: number,
}

interface UnitState {
  row: number,
  col: number,
}

class Unit extends Component<UnitProps, UnitState> {

  private colorMatrixFilter;

  constructor(props: UnitProps) {
    super(props);

    this.colorMatrixFilter = new ColorMatrixFilter();

    if (props.player === 0) {
      this.colorMatrixFilter.greyscale(0.5, false);
    } else {
      this.colorMatrixFilter.browni(false);
    }
  }  

  render() {
    return <Sprite
      x={15}
      y={15}
      image={'infantry.png'}
      height={35}
      width={20}
      filters={[this.colorMatrixFilter]}
    />
  }
}

export default Unit;