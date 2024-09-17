import * as PIXI from "pixi.js";
import { Room } from "./Room";
import { Avatar } from "../avatar/Avatar";
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
    private _followAvatar;
    private _avatar;
    constructor(_room: Room, _parentBounds: () => PIXI.Rectangle, _options?: (RoomCameraOptions & {
        followAvatar?: boolean | undefined;
        avatar?: Avatar | undefined;
    }) | undefined);
    static forScreen(room: Room, options?: RoomCameraOptions): RoomCamera;
    destroy(): void;
    setFollowAvatar(value: boolean, avatar?: Avatar): void;
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
    followAvatar?: boolean;
    avatar?: Avatar;
};
export {};
