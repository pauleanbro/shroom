"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padTileMap = void 0;
function padTileMap(tilemap) {
    const firstRow = tilemap[0];
    if (firstRow == null)
        throw new Error("Invalid row");
    let offsetY = 0;
    let offsetX = 0;
    if (firstRow.some((type) => type !== "x")) {
        tilemap = [firstRow.map(() => "x"), ...tilemap];
        offsetY += 1;
    }
    const nonPrefixedRows = tilemap.filter((row) => row[0] !== "x");
    if (nonPrefixedRows.length > 1) {
        tilemap = tilemap.map((row) => ["x", ...row]);
        offsetX += 1;
    }
    return {
        tilemap,
        offsetX,
        offsetY,
    };
}
exports.padTileMap = padTileMap;
