"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTilePositionForTile = void 0;
const getTilePosition_1 = require("./getTilePosition");
function getTilePositionForTile(roomX, roomY) {
    return {
        top: (0, getTilePosition_1.getTilePosition)(roomX, roomY),
        left: (0, getTilePosition_1.getTilePosition)(roomX, roomY + 1),
        right: (0, getTilePosition_1.getTilePosition)(roomX + 1, roomY),
    };
}
exports.getTilePositionForTile = getTilePositionForTile;
