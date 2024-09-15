"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
class EventEmitter {
    constructor() {
        this._map = new Map();
    }
    addEventListener(name, callback) {
        var _a;
        const key = name.toString();
        const currentEventCallbackSet = (_a = this._map.get(key)) !== null && _a !== void 0 ? _a : new Set();
        currentEventCallbackSet.add(callback);
        this._map.set(key, currentEventCallbackSet);
    }
    removeEventListener(name, callback) {
        const key = name.toString();
        const currentEventCallbackSet = this._map.get(key);
        if (currentEventCallbackSet != null) {
            currentEventCallbackSet.delete(callback);
        }
    }
    trigger(name, value) {
        const key = name.toString();
        const currentEventCallbackSet = this._map.get(key);
        currentEventCallbackSet === null || currentEventCallbackSet === void 0 ? void 0 : currentEventCallbackSet.forEach((callback) => callback(value));
    }
}
exports.EventEmitter = EventEmitter;
window.addEventListener;
