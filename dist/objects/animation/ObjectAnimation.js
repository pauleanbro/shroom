"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectAnimation = void 0;
class ObjectAnimation {
    constructor(_animationTicker, _callbacks, _duration = 500) {
        this._animationTicker = _animationTicker;
        this._callbacks = _callbacks;
        this._duration = _duration;
        this._start = 0;
        this._enqueued = [];
        this._destroyed = false;
    }
    clear() {
        this._enqueued = [];
        return this._nextPosition;
    }
    destroy() {
        this._destroyed = true;
        if (this._cancelTicker != null) {
            this._cancelTicker();
        }
    }
    move(currentPos, newPos, data) {
        if (this._finishCurrent != null) {
            this._finishCurrent();
            this._finishCurrent = undefined;
        }
        this._callbacks.onStart(data);
        this._current = currentPos;
        this._diff = {
            roomX: newPos.roomX - currentPos.roomX,
            roomY: newPos.roomY - currentPos.roomY,
            roomZ: newPos.roomZ - currentPos.roomZ,
        };
        this._nextPosition = newPos;
        this._start = performance.now();
        const handleFinish = () => {
            this._diff = undefined;
            this._current = undefined;
            const next = this._enqueued.shift();
            if (next != null) {
                this.move(next.currentPosition, next.newPosition, next.data);
            }
            else {
                this._callbacks.onStop(data);
            }
            cancel();
        };
        this._finishCurrent = handleFinish;
        this._callbacks.onUpdatePosition({
            roomX: this._current.roomX,
            roomY: this._current.roomY,
            roomZ: this._current.roomZ,
        }, data);
        const cancel = this._animationTicker.subscribe(() => {
            if (this._destroyed)
                return;
            const timeDiff = performance.now() - this._start;
            let factor = timeDiff / this._duration;
            const current = this._current;
            const diff = this._diff;
            if (factor > 1) {
                factor = 1;
            }
            if (current != null && diff != null) {
                this._callbacks.onUpdatePosition({
                    roomX: current.roomX + diff.roomX * factor,
                    roomY: current.roomY + diff.roomY * factor,
                    roomZ: current.roomZ + diff.roomZ * factor,
                }, data);
            }
            if (factor >= 1) {
                handleFinish();
                return;
            }
        });
        this._cancelTicker = cancel;
    }
}
exports.ObjectAnimation = ObjectAnimation;
