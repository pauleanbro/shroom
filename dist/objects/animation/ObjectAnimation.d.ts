import { IAnimationTicker } from "../../interfaces/IAnimationTicker";
import { RoomPosition } from "../../types/RoomPosition";
export declare class ObjectAnimation<T> {
    private _animationTicker;
    private _callbacks;
    private _duration;
    private _current;
    private _diff;
    private _start;
    private _enqueued;
    private _nextPosition;
    private _finishCurrent;
    private _destroyed;
    private _cancelTicker;
    constructor(_animationTicker: IAnimationTicker, _callbacks: {
        onUpdatePosition: (position: RoomPosition, data: T) => void;
        onStart: (data: T) => void;
        onStop: (data: T) => void;
    }, _duration?: number);
    clear(): RoomPosition | undefined;
    destroy(): void;
    move(currentPos: {
        roomX: number;
        roomY: number;
        roomZ: number;
    }, newPos: {
        roomX: number;
        roomY: number;
        roomZ: number;
    }, data: T): void;
}
