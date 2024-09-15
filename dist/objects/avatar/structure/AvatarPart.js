"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarPart = void 0;
const getAvatarDirection_1 = require("../util/getAvatarDirection");
const getAssetForFrame_1 = require("../util/getAssetForFrame");
class AvatarPart {
    constructor(_figureDataPart, _color, { animationData, figureData, figureMap, offsetsData, partSetsData, }) {
        this._figureDataPart = _figureDataPart;
        this._color = _color;
        this._directionOffset = 0;
        this._assets = [];
        this._customFrames = [];
        this._frameRepeat = 1;
        this._offsets = new Map();
        this._animationData = animationData;
        this._figureData = figureData;
        this._figureMap = figureMap;
        this._offsetsData = offsetsData;
        this._partSetsData = partSetsData;
    }
    get type() {
        return this._figureDataPart.type;
    }
    get index() {
        return this._figureDataPart.index;
    }
    setFrameRepeat(value) {
        this._frameRepeat = value;
    }
    setActiveAction(action) {
        this._action = action;
    }
    setDirection(direction) {
        this._direction = (0, getAvatarDirection_1.getAvatarDirection)(direction);
    }
    addCustomFrame(customFrame) {
        this._customFrames.push(customFrame);
    }
    setDirectionOffset(offset) {
        this._directionOffset = offset;
    }
    setAvatarOffsets(avatarFrame, frame) {
        this._offsets.set(frame, avatarFrame);
    }
    getDirection(offset = 0) {
        if (this._direction == null)
            return;
        return (0, getAvatarDirection_1.getAvatarDirection)(this._direction + this._directionOffset + offset);
    }
    /**
     * Gets the draw definition for this specific part.
     * This is a description how this part is drawn on the screen.
     */
    getDrawDefinition() {
        this._update();
        if (this._assets.length === 0) {
            return;
        }
        return {
            assets: this._assets.flatMap((asset) => new Array(this._frameRepeat).fill(0).map(() => asset)),
            color: this._figureDataPart.colorable ? `#${this._color}` : undefined,
            index: this._figureDataPart.index,
            kind: "AVATAR_DRAW_PART",
            mode: this._figureDataPart.type !== "ey" && this._figureDataPart.colorable
                ? "colored"
                : "just-image",
            type: this._figureDataPart.type,
            z: 0,
        };
    }
    _getOffsetForFrame(frame) {
        var _a, _b;
        const data = this._offsets.get(frame);
        if (data == null)
            return { x: 0, y: 0 };
        return {
            x: (_a = data.dx) !== null && _a !== void 0 ? _a : 0,
            y: (_b = data.dy) !== null && _b !== void 0 ? _b : 0,
        };
    }
    _update() {
        const partInfo = this._partSetsData.getPartInfo(this.type);
        this._assets = [];
        // If any custom frames are set, use them instead of the default animation behavior.
        // This is usually used when effects override certain body parts and their actions/animations.
        if (this._customFrames.length > 0) {
            this._customFrames.forEach((customFrame, i) => {
                var _a, _b;
                const action = customFrame.action;
                const direction = this.getDirection(customFrame.dd);
                if (direction == null)
                    throw new Error("Invalid direction");
                const frame = this._animationData.getAnimationFrame(action.id, this.type, customFrame.frame);
                const offset = this._getOffsetForFrame(i);
                const asset = (0, getAssetForFrame_1.getAssetForFrame)({
                    animationFrame: frame,
                    actionData: action,
                    direction: direction,
                    offsetsData: this._offsetsData,
                    partId: this._figureDataPart.id,
                    partType: this._figureDataPart.type,
                    partTypeFlipped: partInfo === null || partInfo === void 0 ? void 0 : partInfo.flippedSetType,
                    offsetX: ((_a = customFrame.dx) !== null && _a !== void 0 ? _a : 0) + offset.x,
                    offsetY: ((_b = customFrame.dy) !== null && _b !== void 0 ? _b : 0) + offset.y,
                });
                if (asset != null) {
                    this._assets.push(asset);
                }
            });
            return;
        }
        const action = this._action;
        const direction = this.getDirection();
        if (action == null)
            return;
        if (direction == null)
            return;
        const frames = this._animationData.getAnimationFrames(action.id, this.type);
        let framesIndexed = frames.flatMap((frame) => new Array(frame.repeats).fill(frame));
        if (framesIndexed.length === 0) {
            framesIndexed = [undefined];
        }
        if (this._offsets.size > 0) {
            this._offsets.forEach((offset) => {
                var _a;
                const animationFrame = this._animationData.getAnimationFrame(action.id, this.type, (_a = offset.frame) !== null && _a !== void 0 ? _a : 0);
                const asset = (0, getAssetForFrame_1.getAssetForFrame)({
                    animationFrame: animationFrame,
                    actionData: action,
                    direction: direction,
                    offsetsData: this._offsetsData,
                    partId: this._figureDataPart.id,
                    partType: this._figureDataPart.type,
                    partTypeFlipped: partInfo === null || partInfo === void 0 ? void 0 : partInfo.flippedSetType,
                    offsetX: offset.dx,
                    offsetY: offset.dy,
                });
                if (asset != null) {
                    this._assets.push(asset);
                }
            });
        }
        else {
            for (let i = 0; i < framesIndexed.length; i++) {
                const frame = framesIndexed[i];
                const asset = (0, getAssetForFrame_1.getAssetForFrame)({
                    animationFrame: frame,
                    actionData: action,
                    direction: direction,
                    offsetsData: this._offsetsData,
                    partId: this._figureDataPart.id,
                    partType: this._figureDataPart.type,
                    partTypeFlipped: partInfo === null || partInfo === void 0 ? void 0 : partInfo.flippedSetType,
                });
                if (asset != null) {
                    this._assets.push(asset);
                }
            }
        }
    }
}
exports.AvatarPart = AvatarPart;
