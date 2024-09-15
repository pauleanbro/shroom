"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsedTileMap = void 0;
const parseTileMap_1 = require("../../util/parseTileMap");
class ParsedTileMap {
    get largestDiff() {
        return this._data.largestDiff;
    }
    get parsedTileTypes() {
        return this._data.tilemap;
    }
    get wallOffsets() {
        return this._data.wallOffsets;
    }
    constructor(tilemap) {
        this.tilemap = tilemap;
        this._data = (0, parseTileMap_1.parseTileMap)(tilemap);
    }
}
exports.ParsedTileMap = ParsedTileMap;
