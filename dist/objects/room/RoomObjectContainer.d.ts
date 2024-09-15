import { IRoomContext } from "../../interfaces/IRoomContext";
import { IRoomObject } from "../../interfaces/IRoomObject";
import { IRoomObjectContainer } from "../../interfaces/IRoomObjectContainer";
export declare class RoomObjectContainer implements IRoomObjectContainer {
    private _roomObjects;
    private _context;
    get roomObjects(): ReadonlySet<IRoomObject>;
    get context(): IRoomContext | undefined;
    set context(value: IRoomContext | undefined);
    addRoomObject(object: IRoomObject): void;
    removeRoomObject(object: IRoomObject): void;
}
