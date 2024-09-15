import { ParsedTileType } from "../../../util/parseTileMap";
export declare class LegacyWallGeometry {
    private _heightmap;
    private static readonly RIGHT_WALL;
    private static readonly LEFT_WALL;
    private _width;
    private _height;
    private _scale;
    constructor(_heightmap: ParsedTileType[][]);
    getLocation(roomX: number, roomY: number, offsetX: number, offsetY: number, wall: string): {
        x: number;
        y: number;
        z: number;
    };
    getHeight(x: number, y: number): number;
}
