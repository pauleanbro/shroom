import * as PIXI from "pixi.js";
import { IRoomPart } from "./IRoomPart";
import { RoomPartData } from "./RoomPartData";
export declare class WallOuterCorner extends PIXI.Container implements IRoomPart {
    private _borderWidth;
    private _wallHeight;
    private _roomZ;
    private _wallTopColor;
    constructor();
    get roomZ(): number;
    set roomZ(value: number);
    get wallY(): number;
    update(data: RoomPartData): void;
    private _createTopSprite;
    private _update;
}
