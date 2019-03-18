'use strict';

const {Board} = require('./Board');
const {updateView} = require('./domManipulation');
const {ARROW_PRESS_TIMEOUT} = require("./constants");


/* DEFINE TOP EVENT HANDLING FUNCTIONS */

const listenForArrowPress = event => {
  let isItAValidKey = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'n', "p"].includes(event.key);
  if (isItAValidKey && isKeyPressAllowed()) {
    handleKeyPress(event.key)
  }
};

const handleKeyPress = (key) => {
  switch (key) {
    case "ArrowUp":
    case "ArrowRight":
    case "ArrowDown":
    case "ArrowLeft":
      let directions = {'ArrowUp': 'up', 'ArrowRight': 'right', 'ArrowDown': 'down', 'ArrowLeft': 'left'};
      let direction = directions[key];
      let currentBoard = boardHistory[boardHistory.length-1];
      let nextBoard = currentBoard.createNextBoard(direction);
      if (nextBoard.hasChanged()) {
        arrowPressHistory.push({direction: direction, timestamp: new Date()});
        boardHistory.push(nextBoard);
        updateView(nextBoard, direction);
      }
      break;

    case "n":
    case "p":

  }
};

const isKeyPressAllowed = () => {
    if (!arrowPressHistory.length) {
      return true
    }
    let previousArrowPress = arrowPressHistory[arrowPressHistory.length-1];
    let timeSinceLastArrowPress = new Date() - previousArrowPress.timestamp;
    return timeSinceLastArrowPress > ARROW_PRESS_TIMEOUT;
};


/* INITIALIZE OBJECTS */

const board = new Board();
board.spawnTiles(2);

board.mock("noMock");
// board.mock("almostWon");
// board.mock("almostLost");

const boardHistory = [board];
const arrowPressHistory = [];


/* MAIN LOGIC */

let currentBoard = boardHistory[boardHistory.length-1];
updateView(currentBoard);
document.addEventListener("keydown", listenForArrowPress);
