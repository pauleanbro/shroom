import { HitSpriteEventMap } from "../hitdetection/HitSprite";
import { EventEmitter } from "./EventEmitter";
import { IEventManagerEvent } from "./interfaces/IEventManagerEvent";
type EventOverOutCallback = (event: IEventManagerEvent) => void;
export declare class EventOverOutHandler {
    private _eventEmitters;
    private _overElements;
    private _hover;
    private _onOverCallback;
    private _onOutCallback;
    private _timeout;
    private _targetChanged;
    get onOver(): EventOverOutCallback | undefined;
    set onOver(value: EventOverOutCallback | undefined);
    get onOut(): EventOverOutCallback | undefined;
    set onOut(value: EventOverOutCallback | undefined);
    register(emitter: EventEmitter<HitSpriteEventMap>): void;
    remove(emitter: EventEmitter<HitSpriteEventMap>): void;
    private _onOver;
    private _onOut;
    private _onTargetChanged;
    private _update;
}
export {};
