import RBush from "rbush";
import { IEventManagerNode } from "./interfaces/IEventManagerNode";
import { IEventTarget } from "./interfaces/IEventTarget";
export declare class EventManagerNode implements IEventManagerNode {
    readonly target: IEventTarget;
    private _bush;
    private _rectangle;
    private _subscription;
    get minX(): number;
    get maxX(): number;
    get minY(): number;
    get maxY(): number;
    constructor(target: IEventTarget, _bush: RBush<EventManagerNode>);
    destroy(): void;
    private _updateRectangle;
}
