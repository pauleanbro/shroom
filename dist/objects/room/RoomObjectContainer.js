"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomObjectContainer = void 0;
class RoomObjectContainer {
    constructor() {
        this._roomObjects = new Set();
    }
    get roomObjects() {
        return this._roomObjects;
    }
    get context() {
        return this._context;
    }
    set context(value) {
        this._context = value;
    }
    addRoomObject(object) {
        if (this._context == null)
            throw new Error("Context wasn't supplied to RoomObjectContainer");
        if (this._roomObjects.has(object)) {
            // The object already exists in this room.
            return;
        }
        object.setParent(this._context);
        this._roomObjects.add(object);
    }
    removeRoomObject(object) {
        if (!this._roomObjects.has(object)) {
            return;
        }
        this._roomObjects.delete(object);
        object.destroy();
    }
}
exports.RoomObjectContainer = RoomObjectContainer;
