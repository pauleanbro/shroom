import { TileType } from "../../types/TileType";
export declare class ParsedTileMap {
    private tilemap;
    private _data;
    get largestDiff(): number;
    get parsedTileTypes(): import("../../util/parseTileMap").ParsedTileType[][];
    get wallOffsets(): {
        x: number;
        y: number;
    };
    constructor(tilemap: TileType[][]);
}
