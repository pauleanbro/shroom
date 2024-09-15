import { TileType } from "../types/TileType";
export type ParsedTileWall = {
    type: "wall";
    kind: "colWall" | "rowWall" | "innerCorner" | "outerCorner";
    height: number;
    hideBorder?: boolean;
};
export type ParsedTileType = ParsedTileWall | {
    type: "tile";
    z: number;
} | {
    type: "hidden";
} | {
    type: "stairs";
    kind: 0 | 2;
    z: number;
} | {
    type: "stairCorner";
    kind: "left" | "right" | "front";
    z: number;
} | {
    type: "door";
    z: number;
};
/**
 * Parses the standard tilemap format into a format with the following meta data:
 * - Walls
 * - Door
 * - Stairs
 * @param tilemap
 */
export declare function parseTileMap(tilemap: TileType[][]): {
    tilemap: ParsedTileType[][];
    largestDiff: number;
    wallOffsets: {
        x: number;
        y: number;
    };
    positionOffsets: {
        x: number;
        y: number;
    };
    maskOffsets: {
        x: number;
        y: number;
    };
};
