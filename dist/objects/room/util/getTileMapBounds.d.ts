import { ParsedTileType } from "../../../util/parseTileMap";
export declare function getTileMapBounds(tilemap: ParsedTileType[][], wallOffsets: {
    x: number;
    y: number;
}): {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
};
