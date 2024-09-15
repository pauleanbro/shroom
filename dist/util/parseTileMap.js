"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTileMap = void 0;
const getTileInfo_1 = require("./getTileInfo");
const getColumnWalls_1 = require("./tilemap/getColumnWalls");
const getRowWalls_1 = require("./tilemap/getRowWalls");
const padTileMap_1 = require("./tilemap/padTileMap");
/**
 * Parses the standard tilemap format into a format with the following meta data:
 * - Walls
 * - Door
 * - Stairs
 * @param tilemap
 */
function parseTileMap(tilemap) {
    var _a;
    const wallInfo = new Walls((0, getRowWalls_1.getRowWalls)(tilemap), (0, getColumnWalls_1.getColumnWalls)(tilemap));
    (0, padTileMap_1.padTileMap)(tilemap);
    const result = tilemap.map((row) => row.map(() => ({ type: "hidden" })));
    let lowestTile;
    let highestTile;
    let hasDoor = false;
    function applyHighLowTile(current) {
        if (highestTile == null || current > highestTile) {
            highestTile = current;
        }
        if (lowestTile == null || current < lowestTile) {
            lowestTile = current;
        }
    }
    for (let y = 0; y < tilemap.length; y++) {
        for (let x = 0; x < tilemap[y].length; x++) {
            const resultX = x;
            const resultY = y;
            const tileInfo = (0, getTileInfo_1.getTileInfo)(tilemap, x, y);
            const tileInfoBelow = (0, getTileInfo_1.getTileInfo)(tilemap, x, y + 1);
            const tileInfoRight = (0, getTileInfo_1.getTileInfo)(tilemap, x + 1, y);
            const wall = wallInfo.getWall(x, y);
            if (wall != null) {
                switch (wall.kind) {
                    case "column": {
                        const colWallHeightDiff = tileInfoBelow.height != null
                            ? Math.abs(tileInfoBelow.height - wall.height)
                            : 0;
                        result[resultY][resultX] = {
                            kind: "colWall",
                            type: "wall",
                            height: wall.height,
                            hideBorder: colWallHeightDiff > 0,
                        };
                        break;
                    }
                    case "row": {
                        const rowWallHeightDiff = tileInfoRight.height != null
                            ? Math.abs(tileInfoRight.height - wall.height)
                            : 0;
                        result[resultY][resultX] = {
                            kind: "rowWall",
                            type: "wall",
                            height: wall.height,
                            hideBorder: tileInfoBelow.rowDoor || rowWallHeightDiff > 0,
                        };
                        break;
                    }
                    case "innerCorner": {
                        result[resultY][resultX] = {
                            kind: "innerCorner",
                            type: "wall",
                            height: wall.height,
                        };
                        break;
                    }
                    case "outerCorner": {
                        result[resultY][resultX] = {
                            kind: "outerCorner",
                            type: "wall",
                            height: wall.height,
                        };
                        break;
                    }
                }
            }
            if (!tileInfo.rowDoor || hasDoor) {
                if (tileInfo.stairs != null && tileInfo.height != null) {
                    if (tileInfo.stairs.isCorner) {
                        result[resultY][resultX] = {
                            type: "stairCorner",
                            kind: tileInfo.stairs.cornerType,
                            z: tileInfo.height,
                        };
                    }
                    else if (tileInfo.stairs.direction != null) {
                        result[resultY][resultX] = {
                            type: "stairs",
                            kind: tileInfo.stairs.direction,
                            z: tileInfo.height,
                        };
                    }
                    applyHighLowTile(tileInfo.height);
                }
                else if (tileInfo.height != null) {
                    result[resultY][resultX] = { type: "tile", z: tileInfo.height };
                    applyHighLowTile(tileInfo.height);
                }
            }
            else {
                hasDoor = true;
                result[resultY][resultX] = { type: "door", z: (_a = tileInfo.height) !== null && _a !== void 0 ? _a : 0 };
            }
        }
    }
    let largestDiff = 0;
    if (lowestTile != null && highestTile != null) {
        largestDiff = highestTile - lowestTile;
    }
    const wallOffsets = {
        x: 1,
        y: 1,
    };
    return {
        tilemap: result,
        largestDiff,
        wallOffsets,
        // When the tilemap has a door, we offset the objects in the room by one in the x direction.
        // This makes it so objects appear at the same position, for a room without a door
        // and for a room with a door.
        positionOffsets: { x: 0, y: 0 },
        maskOffsets: { x: -wallOffsets.x, y: -wallOffsets.y },
    };
}
exports.parseTileMap = parseTileMap;
class Walls {
    constructor(rowWalls, colWalls) {
        this._rowWalls = new Map();
        this._colWalls = new Map();
        rowWalls.forEach((info) => {
            for (let y = info.startY; y <= info.endY; y++) {
                this._rowWalls.set(`${info.x}_${y}`, info);
            }
        });
        colWalls.forEach((info) => {
            for (let x = info.startX; x <= info.endX; x++) {
                this._colWalls.set(`${x}_${info.y}`, info);
            }
        });
    }
    getWall(x, y) {
        const rightColWall = this._getColWall(x + 1, y);
        const bottomRowWall = this._getRowWall(x, y + 1);
        if (rightColWall != null && bottomRowWall != null) {
            // This is a outer corner
            return {
                kind: "outerCorner",
                height: Math.min(rightColWall.height, bottomRowWall.height),
            };
        }
        const leftColWall = this._getColWall(x, y);
        const topRowWall = this._getRowWall(x, y);
        if (leftColWall != null && topRowWall != null) {
            return {
                kind: "innerCorner",
                height: Math.min(leftColWall.height, topRowWall.height),
            };
        }
        const rowWall = this._getRowWall(x, y);
        if (rowWall != null)
            return {
                kind: "row",
                height: rowWall.height,
            };
        const colWall = this._getColWall(x, y);
        if (colWall != null)
            return { kind: "column", height: colWall.height };
    }
    _getRowWall(x, y) {
        return this._rowWalls.get(`${x}_${y}`);
    }
    _getColWall(x, y) {
        return this._colWalls.get(`${x}_${y}`);
    }
}
