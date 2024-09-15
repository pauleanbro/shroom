"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTileInfo = exports.getNumberOfTileType = void 0;
const isTile_1 = require("./isTile");
const offsets = {
    none: { x: 0, y: 0 },
    top: { x: 0, y: -1 },
    bottom: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    topLeft: { x: -1, y: -1 },
    bottomLeft: { x: -1, y: 1 },
    right: { x: 1, y: 0 },
    topRight: { x: 1, y: -1 },
    bottomRight: { x: 1, y: 1 },
};
function getNumberOfTileType(tileType) {
    if (tileType === "x" || tileType == null)
        return "x";
    const parsedNumber = Number(tileType);
    if (isNaN(parsedNumber)) {
        const offset = 9;
        return tileType.charCodeAt(0) - 96 + offset;
    }
    return parsedNumber;
}
exports.getNumberOfTileType = getNumberOfTileType;
const getTile = (tiles, x, y, offset = "none") => {
    x = x + offsets[offset].x;
    y = y + offsets[offset].y;
    if (tiles[y] == null)
        return "x";
    if (tiles[y][x] == null)
        return "x";
    return getNumberOfTileType(tiles[y][x]);
};
function getTileInfo(tiles, x, y) {
    const type = getTile(tiles, x, y);
    const leftType = getTile(tiles, x - 1, y);
    const topType = getTile(tiles, x, y - 1);
    const topLeftDiagonalType = getTile(tiles, x - 1, y - 1);
    const bottomLeftDiagonalType = getTile(tiles, x - 1, y + 1);
    const bottomType = getTile(tiles, x, y + 1);
    const rightType = getTile(tiles, x + 1, y);
    // A row door can be identified if its surrounded by nothing to the left, top and bottom.
    const rowDoor = topType === "x" &&
        leftType === "x" &&
        topLeftDiagonalType === "x" &&
        bottomType === "x" &&
        bottomLeftDiagonalType === "x" &&
        (0, isTile_1.isTile)(rightType) &&
        (0, isTile_1.isTile)(type);
    const stairs = getStairs(tiles, x, y);
    const baseHeight = (0, isTile_1.isTile)(type) ? type : undefined;
    return {
        rowEdge: leftType === "x" && (0, isTile_1.isTile)(type),
        colEdge: topType === "x" && (0, isTile_1.isTile)(type),
        innerEdge: topLeftDiagonalType === "x" &&
            (0, isTile_1.isTile)(type) &&
            (0, isTile_1.isTile)(topType) &&
            (0, isTile_1.isTile)(leftType),
        stairs: stairs,
        height: baseHeight,
        rowDoor: rowDoor,
    };
}
exports.getTileInfo = getTileInfo;
/**
 * Get stair information for the tile at the given x/y position.
 */
function getStairs(tiles, x, y) {
    const type = getTile(tiles, x, y);
    const topType = getTile(tiles, x, y, "top");
    const leftType = getTile(tiles, x, y, "left");
    const rightType = getTile(tiles, x, y, "right");
    const topLeftType = getTile(tiles, x, y, "topLeft");
    const bottomLeftType = getTile(tiles, x, y, "bottomLeft");
    const topRightType = getTile(tiles, x, y, "topRight");
    if ((0, isTile_1.isTile)(topType) && (0, isTile_1.isTile)(type)) {
        const diff = Number(topType) - Number(type);
        if (diff === 1) {
            return { direction: 0 };
        }
    }
    if ((0, isTile_1.isTile)(leftType) && (0, isTile_1.isTile)(type)) {
        const diff = Number(leftType) - Number(type);
        if (diff === 1) {
            return { direction: 2 };
        }
    }
    if ((0, isTile_1.isTile)(bottomLeftType) && (0, isTile_1.isTile)(type) && (leftType === 'x' || Number(leftType) <= Number(type))) {
        const diff = Number(bottomLeftType) - Number(type);
        if (diff === 1) {
            return { cornerType: 'left', isCorner: true };
        }
    }
    if ((0, isTile_1.isTile)(topRightType) && (0, isTile_1.isTile)(type) && (rightType === 'x' || Number(rightType) <= Number(type))) {
        const diff = Number(topRightType) - Number(type);
        if (diff === 1) {
            return { cornerType: 'right', isCorner: true };
        }
    }
    if ((0, isTile_1.isTile)(topLeftType) && (0, isTile_1.isTile)(type) && (leftType === 'x' || Number(leftType) <= Number(type))) {
        const diff = Number(topLeftType) - Number(type);
        if (diff === 1) {
            return { cornerType: 'front', isCorner: true };
        }
    }
}
