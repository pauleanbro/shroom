"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventOverOutHandler = void 0;
class EventOverOutHandler {
    constructor() {
        this._eventEmitters = new Map();
        this._overElements = new Set();
        this._hover = false;
        this._targetChanged = false;
        this._onOver = (emitter, event) => {
            this._overElements.add(emitter);
            this._update(event);
        };
        this._onOut = (emitter, event) => {
            this._overElements.delete(emitter);
            this._update(event);
        };
        this._onTargetChanged = (emitter, event) => {
            this._overElements.delete(emitter);
            this._targetChanged = true;
            this._update(event);
        };
    }
    get onOver() {
        return this._onOverCallback;
    }
    set onOver(value) {
        this._onOverCallback = value;
    }
    get onOut() {
        return this._onOutCallback;
    }
    set onOut(value) {
        this._onOutCallback = value;
    }
    register(emitter) {
        if (this._eventEmitters.has(emitter))
            return;
        this._eventEmitters.set(emitter, new RegisteredOverOutHandler(emitter, this._onOver, this._onOut, this._onTargetChanged));
    }
    remove(emitter) {
        const handler = this._eventEmitters.get(emitter);
        if (handler == null)
            return;
        this._eventEmitters.delete(emitter);
        this._overElements.delete(emitter);
        handler.destroy();
    }
    _update(event) {
        if (this._overElements.size > 0 && !this._hover) {
            this._hover = true;
            if (!this._targetChanged) {
                this.onOver && this.onOver(event);
            }
            this._targetChanged = false;
        }
        if (this._overElements.size < 1 && this._hover) {
            this._hover = false;
            if (!this._targetChanged) {
                this.onOut && this.onOut(event);
            }
        }
    }
}
exports.EventOverOutHandler = EventOverOutHandler;
class RegisteredOverOutHandler {
    constructor(emitter, onOver, onOut, onTargetChanged) {
        this.emitter = emitter;
        this.onOver = onOver;
        this.onOut = onOut;
        this.onTargetChanged = onTargetChanged;
        this._handlePointerOut = (event) => {
            this.onOut(this.emitter, event);
        };
        this._handlePointerOver = (event) => {
            this.onOver(this.emitter, event);
        };
        this._handlePointerTargetChanged = (event) => {
            this.onTargetChanged(this.emitter, event);
        };
        emitter.addEventListener("pointerout", this._handlePointerOut);
        emitter.addEventListener("pointerover", this._handlePointerOver);
        emitter.addEventListener("pointertargetchanged", this._handlePointerTargetChanged);
    }
    destroy() {
        this.emitter.removeEventListener("pointerout", this._handlePointerOut);
        this.emitter.removeEventListener("pointerover", this._handlePointerOver);
        this.emitter.removeEventListener("pointertargetchanged", this._handlePointerTargetChanged);
    }
}
