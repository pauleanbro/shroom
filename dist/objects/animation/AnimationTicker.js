"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationTicker = void 0;
const ANIM_FPS = 24;
const TARGET_FPS = 60;
class AnimationTicker {
    constructor(application) {
        this._frame = 0;
        this._idCounter = 0;
        this._subscriptions = new Map();
        application.ticker.maxFPS = TARGET_FPS;
        application.ticker.minFPS = ANIM_FPS;
        application.ticker.add(() => this._increment());
    }
    static create(application) {
        return new AnimationTicker(application);
    }
    subscribe(cb) {
        const id = this._idCounter++;
        this._subscriptions.set(id, cb);
        return () => this._subscriptions.delete(id);
    }
    current() {
        return this._getNormalizedFrame(this._frame).rounded;
    }
    _getNormalizedFrame(frame) {
        const factor = ANIM_FPS / TARGET_FPS;
        const calculatedFrame = frame * factor;
        return { rounded: Math.floor(calculatedFrame), pure: calculatedFrame };
    }
    _increment() {
        this._frame += 1;
        const data = this._getNormalizedFrame(this._frame);
        this._subscriptions.forEach((cb) => cb(data.rounded, data.pure));
    }
}
exports.AnimationTicker = AnimationTicker;
