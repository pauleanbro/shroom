"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTileMapString = void 0;
function toTileType(str) {
    return str;
}
function parseTileMapString(str) {
    // Thanks @Fusion for this code to sanitize the tilemap string into a readable format.
    str = str.replace(/\r/g, "\n");
    str = str.replace(/ /g, "");
    return str
        .split("\n")
        .map((row) => row.trim())
        .filter((row) => row.length > 0)
        .map((row) => row.split("").map(toTileType));
}
exports.parseTileMapString = parseTileMapString;
