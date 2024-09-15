import * as PIXI from "pixi.js";
import { Room } from "./Room";
export declare class RoomCamera extends PIXI.Container {
    private readonly _room;
    private readonly _parentBounds;
    private readonly _options?;
    private _state;
    private _offsets;
    private _animatedOffsets;
    private _container;
    private _parentContainer;
    private _tween;
    private _target;
    constructor(_room: Room, _parentBounds: () => PIXI.Rectangle, _options?: RoomCameraOptions | undefined);
    static forScreen(room: Room, options?: RoomCameraOptions): RoomCamera;
    destroy(): void;
    private _handlePointerUp;
    private _handlePointerDown;
    private _handlePointerMove;
    private _updatePosition;
    private _isOutOfBounds;
    private _returnToZero;
    private _stopDragging;
    private _resetDrag;
    private _changingDragWhileAnimating;
    private _enterWaitingForDistance;
    private _tryUpgradeWaitForDistance;
    private _updateDragging;
}
type RoomCameraOptions = {
    duration?: number;
    target?: EventTarget;
};
export {};
