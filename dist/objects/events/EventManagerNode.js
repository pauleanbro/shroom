"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManagerNode = void 0;
class EventManagerNode {
    get minX() {
        if (this._rectangle == null)
            throw new Error("Rectangle wasn't set");
        return this._rectangle.x;
    }
    get maxX() {
        if (this._rectangle == null)
            throw new Error("Rectangle wasn't set");
        return this._rectangle.x + this._rectangle.width;
    }
    get minY() {
        if (this._rectangle == null)
            throw new Error("Rectangle wasn't set");
        return this._rectangle.y;
    }
    get maxY() {
        if (this._rectangle == null)
            throw new Error("Rectangle wasn't set");
        return this._rectangle.y + this._rectangle.height;
    }
    constructor(target, _bush) {
        this.target = target;
        this._bush = _bush;
        this._subscription = target.getRectangleObservable().subscribe((value) => {
            this._updateRectangle(value);
        });
    }
    destroy() {
        if (this._rectangle != null) {
            this._bush.remove(this);
        }
        this._subscription.unsubscribe();
    }
    _updateRectangle(rectangle) {
        if (this._rectangle != null) {
            this._bush.remove(this);
        }
        this._rectangle = rectangle;
        if (rectangle != null) {
            this._bush.insert(this);
        }
    }
}
exports.EventManagerNode = EventManagerNode;
