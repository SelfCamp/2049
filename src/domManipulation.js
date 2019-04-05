const {ANIMATION_SLIDE_DURATION, ANIMATION_SPAWN_DURATION, ANIMATION_NEEDED} = require("./config.js");


/**
 * Updates DOM based on values defined in `config.js`
 */
const applyConfigToDOM = () => {
  let board = document.querySelector('#board');
  board.setAttribute('style', `--slide-duration: ${ANIMATION_SLIDE_DURATION}ms;--spawn-duration: ${ANIMATION_SPAWN_DURATION}ms`);
};

/**
 * @param newBoard {object}
 * @param gameStatus {'ongoing'|'timeForTheOne'|'won'|'lost'}
 * @param sliderLength {number}
 * @param sliderPosition {number}
 * @param slide {boolean}
 * @param score (number)
 * Whether slide animation should appear (may not want to slide when doing undo/redo)
 */
const updateView = (newBoard, gameStatus, sliderLength, sliderPosition, slide=true, score=0) => {
  if (!slide) {
    initiateMergeSpawnInDOM(newBoard)
  } else {
    if (ANIMATION_NEEDED) {
      initiateSlideInDOM(newBoard);
    }
    setTimeout(() => initiateMergeSpawnInDOM(newBoard, ANIMATION_NEEDED), ANIMATION_SLIDE_DURATION);
  }
  updateSliderInDOM(sliderLength, sliderPosition);
  updateScoreInDOM(score);
  handleGameEvent(gameStatus);
};

const initiateSlideInDOM = (newBoard) => {
  for (let tile of newBoard.tiles()) {
    let tileElement = document.querySelector(tile.selector);
    let {slideX, slideY} = tile.previousSlideCoordinates;
    let isSliding = slideX || slideY;
    tileElement.setAttribute("style", `--slide-x: ${slideX}; --slide-y: ${slideY}`);
    tileElement.setAttribute("data-state", isSliding ? 'sliding' : '');
  }
};

const initiateMergeSpawnInDOM = (newBoard, ANIMATION_NEEDED=false) => {
  for (let tile of newBoard.tiles()) {
    let tileElement = document.querySelector(tile.selector);
    if (ANIMATION_NEEDED) {
      let {wasJustMerged, wasJustSpawned} = tile;
      tileElement.setAttribute("data-state",
          wasJustMerged ? 'merged'
              : wasJustSpawned ? 'spawned'
              : ''
      );
    }
    tileElement.setAttribute("value", tile.currentValue);
    tileElement.textContent = tile.currentValue;
  }
};

const handleGameEvent = (gameStatus) => {
  switch (gameStatus) {
    case 'ongoing':
      changeBackgroundInDOM();
      break;
    case 'won':
      gameWon();
      break;
    case 'lost':
      gameLost();
      break;
  }
};

const gameLost = () => {
  setTimeout(() => changeBackgroundInDOM('red'), ANIMATION_SLIDE_DURATION + ANIMATION_SPAWN_DURATION);
  setTimeout(() => showPageInDOM("defeat"), ANIMATION_SLIDE_DURATION + ANIMATION_SPAWN_DURATION);
};

const gameWon = () => {
  setTimeout(() => changeBackgroundInDOM('green'), ANIMATION_SLIDE_DURATION + ANIMATION_SPAWN_DURATION);
  setTimeout(() => showPageInDOM("victory"), ANIMATION_SLIDE_DURATION + ANIMATION_SPAWN_DURATION);
};

const changeBackgroundInDOM = (color) => {
  let body = document.querySelector('body');
  color ? body.setAttribute('style', `background-color: ${color}`) : body.removeAttribute('style');
};

/**
 * Sets history slider in DOM based on 1-indexed values it receives
 *
 * @param max {!number}
 * @param value {!number}
 */
const updateSliderInDOM = (max, value) => {
  let slider = document.querySelector("#game-history-slider");
  slider.setAttribute("max", max);
  slider.value = value;
};

const updateTimerInDOM = (gameTime, color="white") => {
  let timer = document.querySelector("#time");
  timer.innerHTML = gameTime;
  switch (color) {
    case "white":
      timer.setAttribute("style", "color: #FFC9A4");
      break;
    case "red":
      timer.setAttribute("style", "color: #FF001E");
      break;
  }

};

const updateScoreInDOM = (score) => {
  let scoreTab = document.querySelector("#score");
  scoreTab.innerHTML = score
};

const showPageInDOM = (newDisplay) => {
  let rulesElement = document.querySelector("#rules");
  let aboutElement =  document.querySelector("#about");
  switch (newDisplay) {
    case "game":
      rulesElement.setAttribute("style", "visibility: hidden");
      aboutElement.setAttribute("style", "visibility: hidden");
      break;
    case "about":
      rulesElement.setAttribute("style", "visibility: hidden");
      aboutElement.setAttribute("style", "visibility: visible");
      break;
    case "rules":
      rulesElement.setAttribute("style", "visibility: visible");
      aboutElement.setAttribute("style", "visibility: hidden");
      break;
  }
};


module.exports = {
  applyConfigToDOM,
  updateView,
  updateTimerInDOM,
  showPageInDOM,
};
