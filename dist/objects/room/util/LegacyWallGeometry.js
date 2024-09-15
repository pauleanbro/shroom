"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyWallGeometry = void 0;
class LegacyWallGeometry {
    constructor(_heightmap) {
        this._heightmap = _heightmap;
        this._width = _heightmap[0].length;
        this._height = _heightmap.length;
        this._scale = 64;
    }
    getLocation(roomX, roomY, offsetX, offsetY, wall) {
        let rX = roomX;
        let rY = roomY;
        let rZ = this.getHeight(roomX, roomY);
        if (wall == LegacyWallGeometry.LEFT_WALL) {
            rX = rX + (offsetX / (this._scale / 2) - 0.5);
            rY = rY + 0.5;
            rZ = rZ - (offsetY - offsetX / 2) / (this._scale / 2);
        }
        else {
            rY = rY + ((this._scale / 2 - offsetX) / (this._scale / 2) - 0.5);
            rX = rX + 0.5;
            rZ = rZ - (offsetY - (this._scale / 2 - offsetX) / 2) / (this._scale / 2);
        }
        return {
            x: rX,
            y: rY,
            z: rZ,
        };
    }
    getHeight(x, y) {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height)
            return 0;
        const row = this._heightmap[y];
        if (row == null)
            return 0;
        const cell = row[x];
        switch (cell.type) {
            case "wall":
                return cell.height;
            case "stairs":
                return cell.z;
            case "tile":
                return cell.z;
        }
        return 0;
    }
}
exports.LegacyWallGeometry = LegacyWallGeometry;
LegacyWallGeometry.RIGHT_WALL = "l";
LegacyWallGeometry.LEFT_WALL = "r";
