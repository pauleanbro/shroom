import * as PIXI from "pixi.js";
import { IRoomPart } from "./IRoomPart";
import { RoomPartData } from "./RoomPartData";
interface Props {
    edge?: boolean;
    tileHeight: number;
    color: string;
    texture?: PIXI.Texture;
    door?: boolean;
}
export declare class Tile extends PIXI.Container implements IRoomPart {
    private props;
    private _container;
    private _sprites;
    private _texture;
    private _color;
    private _tileHeight;
    private _roomPartData;
    private _tilePositions;
    get color(): string | undefined;
    set color(value: string | undefined);
    get tilePositions(): PIXI.Point;
    set tilePositions(value: PIXI.Point);
    get tileHeight(): number;
    set tileHeight(value: number);
    constructor(props: Props);
    update(data: RoomPartData): void;
    destroy(): void;
    private _destroySprites;
    private _updateSprites;
}
export {};
