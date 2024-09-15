import { TileType } from "../../types/TileType";
export type ColumnWall = {
    startX: number;
    endX: number;
    y: number;
    height: number;
};
export declare function getColumnWalls(tilemap: TileType[][]): ColumnWall[];
