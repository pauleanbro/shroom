import { RoomObject } from "../RoomObject";
import { FurnitureFetchInfo } from "./FurnitureFetchInfo";
import { FurnitureId } from "../../interfaces/IFurnitureData";
export declare class WallFurniture extends RoomObject {
    readonly placementType = "wall";
    private _baseFurniture;
    private readonly _type;
    private readonly _id;
    private _roomX;
    private _roomY;
    private _offsetX;
    private _offsetY;
    private _animation;
    private _direction;
    private _highlight;
    constructor(options: {
        roomX: number;
        roomY: number;
        offsetX: number;
        offsetY: number;
        direction: number;
        animation?: string;
    } & FurnitureFetchInfo);
    get extradata(): Promise<import("./FurnitureExtraData").FurnitureExtraData>;
    get validDirections(): Promise<number[]>;
    get id(): FurnitureId | undefined;
    get highlight(): boolean;
    set highlight(value: boolean);
    get alpha(): number;
    set alpha(value: number);
    get type(): string | undefined;
    get animation(): string | undefined;
    set animation(value: string | undefined);
    get direction(): number;
    set direction(value: number);
    get roomX(): number;
    set roomX(value: number);
    get roomY(): number;
    set roomY(value: number);
    get offsetX(): number;
    set offsetX(value: number);
    get offsetY(): number;
    set offsetY(value: number);
    get visualization(): import("./IFurnitureVisualization").IFurnitureVisualization;
    set visualization(value: import("./IFurnitureVisualization").IFurnitureVisualization);
    get onClick(): import("../hitdetection/HitSprite").HitEventHandler | undefined;
    set onClick(value: import("../hitdetection/HitSprite").HitEventHandler | undefined);
    get onDoubleClick(): import("../hitdetection/HitSprite").HitEventHandler | undefined;
    set onDoubleClick(value: import("../hitdetection/HitSprite").HitEventHandler | undefined);
    get onPointerDown(): import("../hitdetection/HitSprite").HitEventHandler | undefined;
    set onPointerDown(value: import("../hitdetection/HitSprite").HitEventHandler | undefined);
    get onPointerUp(): import("../hitdetection/HitSprite").HitEventHandler | undefined;
    set onPointerUp(value: import("../hitdetection/HitSprite").HitEventHandler | undefined);
    destroyed(): void;
    registered(): void;
    private _updateAnimation;
    private _updateDirection;
    private _updateHighlight;
    private _getOffsets;
    private _updatePosition;
}
