"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickHandler = void 0;
class ClickHandler {
    constructor() {
        this._map = new Map();
    }
    get onClick() {
        return this._onClick;
    }
    set onClick(value) {
        this._onClick = value;
    }
    get onDoubleClick() {
        return this._onDoubleClick;
    }
    set onDoubleClick(value) {
        this._onDoubleClick = value;
    }
    get onPointerDown() {
        return this._onPointerDown;
    }
    set onPointerDown(value) {
        this._onPointerDown = value;
    }
    get onPointerUp() {
        return this._onPointerUp;
    }
    set onPointerUp(value) {
        this._onPointerUp = value;
    }
    handleClick(event) {
        if (this._doubleClickInfo == null) {
            this.onClick && this.onClick(event);
            if (this.onDoubleClick != null) {
                this._startDoubleClick(event);
            }
        }
        else {
            event.stopPropagation();
            this._performDoubleClick(event);
        }
    }
    handlePointerDown(event) {
        this.onPointerDown && this.onPointerDown(event);
    }
    handlePointerUp(event) {
        this.onPointerUp && this.onPointerUp(event);
    }
    _performDoubleClick(event) {
        if (this._doubleClickInfo == null)
            return;
        this.onDoubleClick &&
            this.onDoubleClick(this._doubleClickInfo.initialEvent);
        setTimeout(() => {
            this._resetDoubleClick();
        });
    }
    _resetDoubleClick() {
        if (this._doubleClickInfo == null)
            return;
        clearTimeout(this._doubleClickInfo.timeout);
        this._doubleClickInfo = undefined;
    }
    _startDoubleClick(event) {
        this._doubleClickInfo = {
            initialEvent: event,
            timeout: window.setTimeout(() => this._resetDoubleClick(), 350),
        };
    }
}
exports.ClickHandler = ClickHandler;
