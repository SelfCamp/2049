const {ANIMATION_SLIDE_DURATION} = require("./config.js");


/**
 * Updates DOM based on values defined in `config.js`
 */
const applyConfigToDOM = () => {
  let board = document.querySelector('#board');
  board.setAttribute('style', `--slide-duration: ${ANIMATION_SLIDE_DURATION}ms`);
};

/**
 * @param newBoard {object}
 * @param gameStatus {'ongoing'|'timeForTheOne'|'won'|'lost'}
 * @param sliderLength {number}
 * @param sliderPosition {number}
 * @param slide {boolean}
 * Whether slide animation should appear (may not want to slide when doing undo/redo)
 */
const updateView = (newBoard, gameStatus, sliderLength, sliderPosition, slide=true) => {
  if (!slide) {
    initiateMergeSpawnInDOM(newBoard)
  } else {
    initiateSlideInDOM(newBoard);
    setTimeout(() => initiateMergeSpawnInDOM(newBoard), ANIMATION_SLIDE_DURATION);
  }
  updateSliderInDOM(sliderLength, sliderPosition);
  displayEndOfGame(gameStatus);
};

const initiateSlideInDOM = (newBoard) => {
  for (let row of newBoard.matrix) {
    for (let tile of row) {
      let tileElement = document.querySelector(tile.selector);
      let {slideX, slideY} = tile.previousSlideCoordinates;
      let isSliding = slideX || slideY;
      tileElement.setAttribute("style", `--slide-x: ${slideX}; --slide-y: ${slideY}`);
      tileElement.setAttribute("data-state", isSliding ? 'sliding' : '');
    }
  }
};

const initiateMergeSpawnInDOM = (newBoard) => {
  for (let row of newBoard.matrix) {
    for (let tile of row) {
      let tileElement = document.querySelector(tile.selector);
      let {wasJustMerged, wasJustSpawned} = tile;
      tileElement.setAttribute("data-state",
              wasJustMerged ? 'merged'
              : wasJustSpawned ? 'spawned'
              : ''
      );
      tileElement.setAttribute("value", tile.currentValue);
      tileElement.textContent = tile.currentValue;
    }
  }
};

const displayEndOfGame = (gameStatus) => {
  switch (gameStatus) {
    case 'ongoing':
      changeBackgroundInDOM('white');
      break;
    case 'won':
      changeBackgroundInDOM('green');
      break;
    case 'lost':
      changeBackgroundInDOM('red');
      break;
  }
};

const changeBackgroundInDOM = (color) => {
  let body = document.querySelector('body');
  body.setAttribute('style', `background-color: ${color}`);
};

/**
 * Sets history slider in DOM based on 1-indexed values it receives
 *
 * @param max {!number}
 * @param value {!number}
 */
const updateSliderInDOM = (max, value) => {
  let slider = document.querySelector("#game-history");
  slider.setAttribute("max", max);
  slider.value = value;
};

module.exports = {
  applyConfigToDOM,
  updateView,
};
