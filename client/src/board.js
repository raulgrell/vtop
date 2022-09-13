
const board = {}

const tileSize = 32;
const gutter = 2;

const gridToCanvas = (px, py) => {
  let x = (tileSize + gutter) * px;
  let y = (tileSize + gutter) * py;
  return { x, y };
};
    
export {
  gridToCanvas,
  tileSize,
  board
}
