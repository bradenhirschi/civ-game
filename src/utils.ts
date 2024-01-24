import { HEX_HEIGHT, HEX_WIDTH } from "./constants";

// x is col, y is row
export const convertOffsetToAxial = (x: number, y: number) => {
  const q = x - (y - (y&1)) / 2
  const r = y;
  
  return {q, r}
}

export const getHexCenterPoint = (row: number, col: number) => {
  let x = HEX_WIDTH / 2 + HEX_WIDTH * col;
  const y = HEX_HEIGHT * 3/8 + (HEX_HEIGHT * 3/4 * row);
  if (row%2) {
    x += HEX_WIDTH / 2;
  }

  return {x, y}
}