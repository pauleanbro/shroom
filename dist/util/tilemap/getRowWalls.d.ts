import { TileType } from "../../types/TileType";
export type RowWall = {
    startY: number;
    endY: number;
    x: number;
    height: number;
};
export declare function getRowWalls(tilemap: TileType[][]): RowWall[];
