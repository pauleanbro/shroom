"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRowWalls = void 0;
const getTileInfo_1 = require("../getTileInfo");
function getRowWalls(tilemap) {
    var _a;
    let lastY = tilemap.length - 1;
    let wallEndY;
    let wallStartY;
    let height;
    const walls = [];
    for (let x = 0; x < tilemap[0].length; x++) {
        for (let y = lastY; y >= 0; y--) {
            const current = (0, getTileInfo_1.getTileInfo)(tilemap, x, y);
            if (current.rowEdge && !current.rowDoor) {
                if (wallEndY == null) {
                    wallEndY = y;
                }
                wallStartY = y;
                lastY = y - 1;
                if (height == null || ((_a = current.height) !== null && _a !== void 0 ? _a : 0) < height) {
                    height = current.height;
                }
            }
            else {
                if (wallEndY != null && wallStartY != null) {
                    walls.push({
                        startY: wallStartY,
                        endY: wallEndY,
                        x: x - 1,
                        height: height !== null && height !== void 0 ? height : 0,
                    });
                    wallEndY = undefined;
                    wallStartY = undefined;
                    height = undefined;
                }
            }
        }
    }
    return walls;
}
exports.getRowWalls = getRowWalls;
