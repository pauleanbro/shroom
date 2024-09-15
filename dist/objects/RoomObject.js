"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomObject = void 0;
class RoomObject {
    constructor() {
        this._isDestroyed = false;
    }
    setParent(room) {
        if (this._context != null)
            throw new Error("RoomObject already provided with a context.");
        this._isDestroyed = false;
        this._context = room;
        this.registered();
    }
    destroy() {
        if (this._isDestroyed)
            return;
        // Important: set isDestroyed to true so this doesn't infinite loop.
        this._isDestroyed = true;
        this.roomObjectContainer.removeRoomObject(this);
        this._context = undefined;
        this.destroyed();
    }
    getRoomContext() {
        if (this._context == null)
            throw new Error("Invalid context");
        return this._context;
    }
    get mounted() {
        return this._context != null;
    }
    get room() {
        return this.getRoomContext().room;
    }
    get configuration() {
        return this.getRoomContext().configuration;
    }
    get furnitureLoader() {
        return this.getRoomContext().furnitureLoader;
    }
    get animationTicker() {
        return this.getRoomContext().animationTicker;
    }
    get roomVisualization() {
        return this.getRoomContext().visualization;
    }
    get geometry() {
        return this.getRoomContext().geometry;
    }
    get roomObjectContainer() {
        return this.getRoomContext().roomObjectContainer;
    }
    get avatarLoader() {
        return this.getRoomContext().avatarLoader;
    }
    get eventManager() {
        return this.getRoomContext().eventManager;
    }
    get tilemap() {
        return this.getRoomContext().tilemap;
    }
    get landscapeContainer() {
        return this.getRoomContext().landscapeContainer;
    }
    get application() {
        return this.getRoomContext().application;
    }
}
exports.RoomObject = RoomObject;
