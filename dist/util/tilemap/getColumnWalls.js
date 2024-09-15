"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumnWalls = void 0;
const getTileInfo_1 = require("../getTileInfo");
function getColumnWalls(tilemap) {
    var _a;
    let lastX = tilemap[0].length - 1;
    let wallEndX;
    let wallStartX;
    let height;
    const walls = [];
    for (let y = 0; y < tilemap.length; y++) {
        for (let x = lastX; x >= 0; x--) {
            const current = (0, getTileInfo_1.getTileInfo)(tilemap, x, y);
            if (current.colEdge && !current.rowDoor) {
                if (wallEndX == null) {
                    wallEndX = x;
                }
                wallStartX = x;
                lastX = x - 1;
                if (height == null || ((_a = current.height) !== null && _a !== void 0 ? _a : 0) < height) {
                    height = current.height;
                }
            }
            else {
                if (wallEndX != null && wallStartX != null) {
                    walls.push({
                        startX: wallStartX,
                        endX: wallEndX,
                        y: y - 1,
                        height: height !== null && height !== void 0 ? height : 0,
                    });
                    wallEndX = undefined;
                    wallStartX = undefined;
                    height = undefined;
                }
            }
        }
    }
    return walls;
}
exports.getColumnWalls = getColumnWalls;
