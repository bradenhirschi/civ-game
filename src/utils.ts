// x is col, y is row
export const convertOffsetToAxial = (x: number, y: number) => {
  const q = x - (y - (y&1)) / 2
  const r = y;
  
  return {q, r}
}