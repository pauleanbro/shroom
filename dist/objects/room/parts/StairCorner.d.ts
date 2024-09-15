import * as PIXI from "pixi.js";
import { IRoomPart } from "./IRoomPart";
import { RoomPartData } from "./RoomPartData";
export declare class StairCorner extends PIXI.Container implements IRoomPart {
    private _props;
    private _container;
    private _texture;
    private _tileHeight;
    private _tileLeftColor;
    private _tileRightColor;
    private _tileTopColor;
    constructor(_props: {
        type: "front" | "left" | "right";
    });
    update(data: RoomPartData): void;
    updateSprites(): void;
    destroySprites(): void;
    destroy(): void;
    private _createStairBoxFront;
    private _createStairBoxLeft;
    private _createStairBoxRight;
}
