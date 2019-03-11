'use strict';


/* DEFINE CLASSES */

function Tile(selector, currentValue=null, isCurrentValueFromMerge=false, previousValueMoveDirection=null, previousValueMoveLength=null ) {
  this.currentValue = currentValue;
  this.isCurrentValueFromMerge = isCurrentValueFromMerge;
  this.previousValueMoveDirection = previousValueMoveDirection;
  this.previousValueMvLen = previousValueMoveLength;
  this.selector = selector
}

function Board() {
  this.matrix = [];
  for (let row = 0; row < 4; row++) {
    this.matrix[row] = [];
    for (let column = 0; column < 4; column++) {
      this.matrix[row].push(new Tile(`#r${row}c${column}`));
    }
  }
  this.spawnTiles = (howMany, isItTheOneAlready = false) => {
    for (let i = 0; i < howMany; i++) {
      let emptyTiles = [];
      for (let row of this.matrix) {
        emptyTiles.push(...row.filter(tile => !tile.currentValue))
      }
      let choiceIndex = Math.floor(Math.random() * emptyTiles.length);
      emptyTiles[choiceIndex].currentValue =
          isItTheOneAlready
              ? 1
              : Math.random() < 0.9
              ? 2
              : 4
    }
  }
}


/* DEFINE FUNCTIONS */

const isArrowPressAllowed = () => {
    if (!arrowPressHistory.length) {
      return true
    }
    let previousArrowPress = arrowPressHistory[arrowPressHistory.length-1];
    let timeSinceLastArrowPress = new Date() - previousArrowPress.timestamp;
    return timeSinceLastArrowPress > ARROW_PRESS_TIMEOUT;
};

// TODO: finish
const handleArrowPress = (key) => {
  let directions = {'ArrowUp': 'up', 'ArrowRight': 'right', 'ArrowDown': 'down', 'ArrowLeft': 'left'};
  let direction = directions[key];
  arrowPressHistory.push({direction: direction, timestamp: new Date()});
  console.log(direction);

  let currentBoard = boardHistory[boardHistory.length-1];
  let nextBoard = createNextBoard(currentBoard, direction)
  // boardHistory.push(nextBoard);
  //
  // updateMvAttributesInDOM(currentBoard, direction);
  // setTimeout(() => squashBoardInDOM(nextBoard, direction), animationDuration);
};

// TODO
// const createNextBoard = (currentBoard, direction) => {
//   let nextBoard = squashBoard(currentBoard, direction);
//   nextBoard.spawnTiles(1);
//   return nextBoard;
// };

// TODO
// const squashBoard = (currentBoard, direction) => {
//   // make a copy
//   // split into rows based on direction - keep references to tiles
//   for (row of rows) {
//     squashRow(row)  // mutates tiles in input
//   }
//   // set every object's flag back to false
// };

const propagateTile = (row, indexFrom) => {
  for (let indexTo of [3, 2, 1].filter((num => num > indexFrom))) {
    if (!row[indexTo].currentValue) {
      [row[indexFrom].currentValue, row[indexTo].currentValue] = [row[indexTo].currentValue, row[indexFrom].currentValue];
      return indexTo
    }

  }
  return indexFrom
};

const attemptMerge = (row, index) => {
  let thisTile = row[index];
  let nextTile = row[index + 1];
  if (index === 3 || nextTile.isCurrentValueFromMerge) {
    return false
  }

  if (thisTile.currentValue === nextTile.currentValue) {
    thisTile.currentValue = 0;
    nextTile.currentValue = nextTile.currentValue * 2;
    nextTile.isCurrentValueFromMerge = true;
  }
};

// TODO
const squashRow = (row) => {
  for (let index of [2, 1 ,0]) {
    if (!row[index].currentValue) {
      continue
    }
    let newIndex = propagateTile(row, index);
    attemptMerge(row, newIndex);


  }
};

// TODO: finish
const isGameOngoing = (board) => {
  return true;
  // return (maxTileValue < 2048 && !isBoardFull)
};

// TODO: finish
const handleEndOfGame = () => {

};



const updateMvAttributesInDOM = (board, direction) => {
  for (let row of board.matrix) {
    for (let tile of row) {
      let tileElement = document.querySelector(tile.selector);
      tileElement.setAttribute("data-mv-dir", direction);
      tileElement.setAttribute("data-mv-len", tile.previousValueMvLen ? tile.previousValueMvLen : "");
    }

  }
};

const squashBoardInDOM = (nextBoard) => {
  for (let row of nextBoard.matrix) {
    for (let tile of row) {
      let tileElement = document.querySelector(tile.selector);
      tileElement.setAttribute("value", tile.currentValue);
      tileElement.textContent = tile.currentValue;

    }

  }
};

const listenForArrowPress = event => {
  let isItAnArrow = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key);
  if (isItAnArrow && isArrowPressAllowed()) {
    handleArrowPress(event.key)
  }
};


/* DEFINE CONSTANTS */

const ARROW_PRESS_TIMEOUT = 2000;


/* CREATE OBJECTS */

const board = new Board();
board.spawnTiles(2);

const boardHistory = [board];
const arrowPressHistory = [];


/* GAME LOGIC */

document.addEventListener("keydown", listenForArrowPress);
while (isGameOngoing()) {
  // Listen for arrow keys
}
handleEndOfGame();


/* MOCK MAIN LOGIC */

let currentBoard = boardHistory[boardHistory.length-1];
updateMvAttributesInDOM(currentBoard, "left");
squashBoardInDOM(currentBoard);
