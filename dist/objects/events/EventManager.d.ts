import { IEventManagerNode } from "./interfaces/IEventManagerNode";
import { IEventTarget } from "./interfaces/IEventTarget";
import { IEventManager } from "./interfaces/IEventManager";
import { InteractionEvent } from "pixi.js";
export declare class EventManager {
    private _nodes;
    private _bush;
    private _currentOverElements;
    private _pointerDownElements;
    click(event: InteractionEvent, x: number, y: number): void;
    pointerDown(event: InteractionEvent, x: number, y: number): void;
    pointerUp(event: InteractionEvent, x: number, y: number): void;
    move(event: InteractionEvent, x: number, y: number): void;
    register(target: IEventTarget): IEventManagerNode;
    remove(target: IEventTarget): void;
    private _performHitTest;
}
export declare const NOOP_EVENT_MANAGER: IEventManager;
