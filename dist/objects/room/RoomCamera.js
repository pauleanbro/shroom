"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomCamera = void 0;
const PIXI = __importStar(require("pixi.js"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TWEEN = require("tween.js");
class RoomCamera extends PIXI.Container {
    constructor(_room, _parentBounds, _options) {
        var _a, _b, _c;
        super();
        this._room = _room;
        this._parentBounds = _parentBounds;
        this._options = _options;
        this._state = { type: "WAITING" };
        this._offsets = { x: 0, y: 0 };
        this._animatedOffsets = { x: 0, y: 0 };
        this._handlePointerUp = (event) => {
            if (this._state.type === "WAITING" || this._state.type === "ANIMATE_ZERO")
                return;
            if (this._state.pointerId !== event.pointerId)
                return;
            let animatingBack = false;
            if (this._state.type === "DRAGGING") {
                animatingBack = this._stopDragging(this._state);
            }
            if (!animatingBack) {
                this._resetDrag();
            }
        };
        this._handlePointerDown = (event) => {
            const position = event.data.getLocalPosition(this.parent);
            if (this._state.type === "WAITING") {
                this._enterWaitingForDistance(position, event.data.pointerId);
            }
            else if (this._state.type === "ANIMATE_ZERO") {
                this._changingDragWhileAnimating(position, event.data.pointerId);
            }
        };
        this._handlePointerMove = (event) => {
            const box = this._room.application.view.getBoundingClientRect();
            const position = new PIXI.Point(event.clientX - box.x - this.parent.worldTransform.tx, event.clientY - box.y - this.parent.worldTransform.tx);
            switch (this._state.type) {
                case "WAIT_FOR_DISTANCE": {
                    this._tryUpgradeWaitForDistance(this._state, position, event.pointerId);
                    break;
                }
                case "DRAGGING": {
                    this._updateDragging(this._state, position, event.pointerId);
                    break;
                }
            }
        };
        const target = (_b = (_a = this._options) === null || _a === void 0 ? void 0 : _a.target) !== null && _b !== void 0 ? _b : window;
        this._target = target;
        this._parentContainer = new PIXI.Container();
        this._parentContainer.hitArea = this._parentBounds();
        this._parentContainer.interactive = true;
        this._container = new PIXI.Container();
        this._container.addChild(this._room);
        this._parentContainer.addChild(this._container);
        this._followAvatar = (_c = _options === null || _options === void 0 ? void 0 : _options.followAvatar) !== null && _c !== void 0 ? _c : false;
        this._avatar = _options === null || _options === void 0 ? void 0 : _options.avatar;
        this.addChild(this._parentContainer);
        // Activation of the camera is only triggered by a down event on the parent container.
        this._parentContainer.addListener("pointerdown", this._handlePointerDown);
        this._target.addEventListener("pointermove", this._handlePointerMove);
        this._target.addEventListener("pointerup", this._handlePointerUp);
        let last;
        this._room.application.ticker.add(() => {
            if (last == null)
                last = performance.now();
            const value = performance.now() - last;
            TWEEN.update(value);
        });
    }
    static forScreen(room, options) {
        return new RoomCamera(room, () => room.application.screen, options);
    }
    destroy() {
        this._parentContainer.removeListener("pointerdown", this._handlePointerDown);
        this._target.removeEventListener("pointermove", this._handlePointerMove);
        this._target.removeEventListener("pointerup", this._handlePointerUp);
    }
    setFollowAvatar(value, avatar) {
        this._followAvatar = value;
        this._avatar = avatar;
    }
    _updatePosition() {
        if (this._followAvatar && this._avatar && this._state.type === "WAITING") {
            const avatarPos = this._avatar.screenPosition;
            if (avatarPos) {
                const newX = -avatarPos.x + this._parentBounds().width / 2;
                const newY = -avatarPos.y + this._parentBounds().height / 2;
                this._offsets.x = Math.min(0, Math.max(newX, -(this._room.roomWidth - this._parentBounds().width)));
                this._offsets.y = Math.min(0, Math.max(newY, -(this._room.roomHeight - this._parentBounds().height)));
                this._container.x = this._offsets.x;
                this._container.y = this._offsets.y;
            }
        }
        else {
            switch (this._state.type) {
                case "DRAGGING": {
                    const diffX = this._state.currentX - this._state.startX;
                    const diffY = this._state.currentY - this._state.startY;
                    this._container.x = this._offsets.x + diffX;
                    this._container.y = this._offsets.y + diffY;
                    break;
                }
                case "ANIMATE_ZERO": {
                    this._container.x = this._animatedOffsets.x;
                    this._container.y = this._animatedOffsets.y;
                    break;
                }
                default: {
                    this._container.x = this._offsets.x;
                    this._container.y = this._offsets.y;
                }
            }
        }
    }
    _isOutOfBounds(offsets) {
        const roomX = this.parent.transform.position.x + this._room.x;
        const roomY = this.parent.transform.position.y + this._room.y;
        if (roomX + this._room.roomWidth + offsets.x <= 0) {
            // The room is out of bounds to the left side.
            return true;
        }
        if (roomX + offsets.x >= this._parentBounds().width) {
            // The room is out of bounds to the right side.
            return true;
        }
        if (roomY + this._room.roomHeight + offsets.y <= 0) {
            // The room is out of bounds to the top side.
            return true;
        }
        if (roomY + offsets.y >= this._parentBounds().height) {
            // The room is out of bounds to the botoom side.
            return true;
        }
        return false;
    }
    _returnToZero(state, current) {
        var _a, _b;
        this._state = {
            ...state,
            type: "ANIMATE_ZERO",
        };
        const duration = (_b = (_a = this._options) === null || _a === void 0 ? void 0 : _a.duration) !== null && _b !== void 0 ? _b : 500;
        this._animatedOffsets = current;
        this._offsets = { x: 0, y: 0 };
        const newPos = { ...this._animatedOffsets };
        const tween = new TWEEN.Tween(newPos)
            .to({ x: 0, y: 0 }, duration)
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            .onUpdate((value) => {
            this._animatedOffsets = newPos;
            if (value >= 1) {
                this._state = { type: "WAITING" };
            }
            this._updatePosition();
        })
            .start();
        this._tween = tween;
        this._updatePosition();
    }
    _stopDragging(state) {
        const diffX = state.currentX - state.startX;
        const diffY = state.currentY - state.startY;
        const currentOffsets = {
            x: this._offsets.x + diffX,
            y: this._offsets.y + diffY,
        };
        if (this._isOutOfBounds(currentOffsets) ||
            (state.skipBoundsCheck != null && state.skipBoundsCheck)) {
            this._returnToZero(state, currentOffsets);
            return true;
        }
        else {
            this._offsets = currentOffsets;
        }
        return false;
    }
    _resetDrag() {
        this._state = { type: "WAITING" };
        this._updatePosition();
    }
    _changingDragWhileAnimating(position, pointerId) {
        this._offsets = this._animatedOffsets;
        this._animatedOffsets = { x: 0, y: 0 };
        this._tween.stop();
        this._state = {
            currentX: position.x,
            currentY: position.y,
            startX: position.x,
            startY: position.y,
            pointerId: pointerId,
            type: "DRAGGING",
            skipBoundsCheck: true,
        };
        this._updatePosition();
    }
    _enterWaitingForDistance(position, pointerId) {
        this._state = {
            type: "WAIT_FOR_DISTANCE",
            pointerId: pointerId,
            startX: position.x,
            startY: position.y,
        };
    }
    _tryUpgradeWaitForDistance(state, position, pointerId) {
        if (state.pointerId !== pointerId)
            return;
        const distance = Math.sqrt((position.x - state.startX) ** 2 + (position.y - state.startY) ** 2);
        // When the distance of the pointer travelled more than 10px, start dragging.
        if (distance >= 10) {
            this._state = {
                currentX: position.x,
                currentY: position.y,
                startX: position.x,
                startY: position.y,
                pointerId: pointerId,
                type: "DRAGGING",
            };
            this._updatePosition();
        }
    }
    _updateDragging(state, position, pointerId) {
        if (state.pointerId !== pointerId)
            return;
        this._state = {
            ...state,
            currentX: position.x,
            currentY: position.y,
        };
        this._updatePosition();
    }
}
exports.RoomCamera = RoomCamera;
