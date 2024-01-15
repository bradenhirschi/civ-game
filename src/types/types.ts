export interface Player {
  units: any[];
}

export interface Unit {
  x: number,
  y: number,
}

export interface Hex {
  x: number,
  y: number,
  unit: Unit,
}