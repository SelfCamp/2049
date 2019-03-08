function Tile(selector, currentValue=null, isCurrentValueFromMerge=false, previousValueMoveDirection=null, previousValueMoveLength=null ) {
  this.currentValue = currentValue;
  this.isCurrentValueFromMerge = isCurrentValueFromMerge;
  this.previousValueMoveDirection = previousValueMoveDirection;
  this.previousValueMvLen = previousValueMoveLength;
  this.selector = selector
}

const boardHistory = [];
const moveDirectionHistory = [];

const board = [];
for (let row = 0; row < 4; row++) {
  board[row] = [];
  for (let column = 0; column < 4; column++) {
    board[row].push(new Tile(`#r${row}c${column}`));
  }
}

boardHistory.push(board);

let currentBoard = boardHistory[boardHistory.length-1];
let lastMoveDirection = moveDirectionHistory[moveDirectionHistory.length-1];

console.log(boardHistory);
console.log(currentBoard);
console.log(currentBoard[2]);
