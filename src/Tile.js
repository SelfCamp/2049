/**
 * @param selector {string}
 * @param currentValue {number|object}
 * @param wasJustMerged {boolean}
 * @param wasJustSpawned {boolean}
 * @param previousValueMvLen {number|object}
 * @constructor
 */
function Tile(selector, currentValue=null, wasJustMerged=false, wasJustSpawned=false, previousValueMvLen=null) {
  this.currentValue = currentValue || null;  // Turns `0` argument into `null`
  this.wasJustMerged = wasJustMerged;
  this.wasJustSpawned = wasJustSpawned;
  this.previousValueMvLen = previousValueMvLen || null;  // Turns `0` argument into `null`
  this.selector = selector;
}

module.exports = {
  Tile,
};
