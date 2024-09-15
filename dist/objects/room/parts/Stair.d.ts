import * as PIXI from "pixi.js";
import { IRoomPart } from "./IRoomPart";
import { RoomPartData } from "./RoomPartData";
interface Props {
    tileHeight: number;
    direction: 0 | 2;
    texture?: PIXI.Texture;
}
export declare class Stair extends PIXI.Container implements IRoomPart {
    private _props;
    private _texture;
    private _tileHeight;
    private _tileLeftColor;
    private _tileRightColor;
    private _tileTopColor;
    constructor(_props: Props);
    update(data: RoomPartData): void;
    updateSprites(): void;
    _createStairBoxDirection0(index: number): PIXI.TilingSprite[];
    _createStairBoxDirection2(index: number): PIXI.TilingSprite[];
    destroy(): void;
}
export {};
