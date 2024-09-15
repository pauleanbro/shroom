"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTileMapBounds = void 0;
const getPosition_1 = require("./getPosition");
function getTileMapBounds(tilemap, wallOffsets) {
    let minX;
    let minY;
    let maxX;
    let maxY;
    tilemap.forEach((row, y) => {
        row.forEach((column, x) => {
            if (column.type !== "tile")
                return;
            const position = (0, getPosition_1.getPosition)(x, y, column.z, wallOffsets);
            const localMaxX = position.x + 64;
            const localMaxY = position.y + 32;
            if (minX == null || position.x < minX) {
                minX = position.x;
            }
            if (minY == null || position.y < minY) {
                minY = position.y;
            }
            if (maxX == null || localMaxX > maxX) {
                maxX = localMaxX;
            }
            if (maxY == null || localMaxY > maxY) {
                maxY = localMaxY;
            }
        });
    });
    if (minX == null || minY == null || maxX == null || maxY == null) {
        throw new Error("Couldnt figure out dimensions");
    }
    return {
        minX,
        minY: minY - 32,
        maxX,
        maxY: maxY - 32,
    };
}
exports.getTileMapBounds = getTileMapBounds;
