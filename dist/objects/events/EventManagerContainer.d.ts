import * as PIXI from "pixi.js";
import { EventManager } from "./EventManager";
export declare class EventManagerContainer {
    private _application;
    private _eventManager;
    private _box;
    constructor(_application: PIXI.Application, _eventManager: EventManager);
    destroy(): void;
    private _updateRectangle;
}
