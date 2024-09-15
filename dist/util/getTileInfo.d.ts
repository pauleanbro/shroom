import { TileType } from "../types/TileType";
export type NumberOfTile = number | "x";
export declare function getNumberOfTileType(tileType: TileType): number | "x";
export declare function getTileInfo(tiles: TileType[][], x: number, y: number): {
    rowEdge: boolean;
    colEdge: boolean;
    innerEdge: boolean;
    stairs: {
        direction: 0;
        cornerType?: undefined;
        isCorner?: undefined;
    } | {
        direction: 2;
        cornerType?: undefined;
        isCorner?: undefined;
    } | {
        cornerType: "left";
        isCorner: boolean;
        direction?: undefined;
    } | {
        cornerType: "right";
        isCorner: boolean;
        direction?: undefined;
    } | {
        cornerType: "front";
        isCorner: boolean;
        direction?: undefined;
    } | undefined;
    height: number | undefined;
    rowDoor: boolean;
};
