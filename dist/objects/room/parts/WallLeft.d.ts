import * as PIXI from "pixi.js";
import { IRoomPart } from "./IRoomPart";
import { RoomPartData } from "./RoomPartData";
export declare class WallLeft extends PIXI.Container implements IRoomPart {
    private props;
    protected _offsets: {
        x: number;
        y: number;
    };
    protected _borderWidth: number;
    protected _wallHeight: number;
    protected _wallWidth: number;
    protected _tileHeight: number;
    protected _wallLeftColor: number;
    protected _wallRightColor: number;
    protected _wallTopColor: number;
    protected _wallTexture: PIXI.Texture | undefined;
    private _drawHitArea;
    private _hideBorder;
    private _roomZ;
    private _hitAreaElement;
    constructor(props: WallProps);
    get roomZ(): number;
    set roomZ(value: number);
    private get wallY();
    private get wallHeight();
    update(data: RoomPartData): void;
    destroy(): void;
    protected _update(): void;
    private _getDisplayPoints;
    private _getOffsetX;
    private _createPrimarySprite;
    private _createBorderSprite;
    private _createTopSprite;
}
export interface WallProps {
    hideBorder: boolean;
    hitAreaContainer: PIXI.Container;
    onMouseMove: (event: {
        offsetX: number;
        offsetY: number;
    }) => void;
    onMouseOut: () => void;
    cutawayHeight?: number;
}
