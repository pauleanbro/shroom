"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarAdditionPart = void 0;
const getAssetFromPartMeta_1 = require("../util/getAssetFromPartMeta");
const getAvatarDirection_1 = require("../util/getAvatarDirection");
const getEffectSprite_1 = require("../util/getEffectSprite");
class AvatarAdditionPart {
    constructor(_addition, _actionsData, _offsetsData, _partSetsData) {
        this._addition = _addition;
        this._actionsData = _actionsData;
        this._offsetsData = _offsetsData;
        this._partSetsData = _partSetsData;
        this._directionOffset = 0;
        this._customFrames = [];
        this._offsets = new Map();
    }
    getDirection(offset = 0) {
        if (this._direction == null)
            return;
        return (0, getAvatarDirection_1.getAvatarDirection)(this._direction + this._directionOffset + offset);
    }
    getDrawDefinition() {
        const assets = [];
        this._customFrames.forEach((customFrame, index) => {
            const action = customFrame.action;
            if (action == null)
                throw new Error("Invalid action");
            const direction = this.getDirection(customFrame.dd);
            if (direction == null)
                return;
            const asset = this._getAsset(direction, customFrame.frame, index, customFrame);
            if (asset != null) {
                assets.push(asset);
            }
        });
        if (assets.length === 0)
            return;
        return {
            kind: "EFFECT_DRAW_PART",
            addition: false,
            assets: assets.flatMap((asset) => [asset, asset]),
            z: 0,
        };
    }
    setEffectFrame(effect, frame) {
        const bodyPart = this._addition.base != null
            ? effect.getFrameBodyPartByBase(this._addition.base, frame)
            : undefined;
        const fx = effect.getFrameEffectPart(this._addition.id, frame);
        if (bodyPart != null) {
            this._handleBodyPart(effect, frame, bodyPart);
        }
        else if (fx != null) {
            this._handleFxPart(effect, frame, fx);
        }
    }
    setDirection(direction) {
        this._direction = direction;
    }
    setDirectionOffset(offset) {
        this._directionOffset = offset;
    }
    setAvatarOffsets(avatarFrame, frame) {
        this._offsets.set(frame, avatarFrame);
    }
    _getAsset(direction, frame, frameIndex, customFrame) {
        var _a, _b, _c, _d, _e;
        const partType = this._addition.id;
        const partInfo = this._partSetsData.getPartInfo(partType);
        const base = (_a = customFrame.base) !== null && _a !== void 0 ? _a : this._addition.base;
        const member = base != null
            ? `${customFrame.action.assetpartdefinition}_${this._addition.id}_${base}`
            : `${customFrame.action.assetpartdefinition}_${this._addition.id}_1`;
        if (member != null) {
            const { id, offsets, flip } = (0, getEffectSprite_1.getEffectSprite)(member, direction, frame, this._offsetsData, true, this._mode === "fx");
            if (offsets == null) {
                return;
            }
            const avatarOffsets = this._offsets.get(frameIndex);
            const { x, y } = (0, getAssetFromPartMeta_1.applyOffsets)({
                offsets: {
                    offsetX: offsets.offsetX,
                    offsetY: offsets.offsetY,
                },
                customOffsets: {
                    offsetX: ((_b = customFrame.dx) !== null && _b !== void 0 ? _b : 0) + ((_c = avatarOffsets === null || avatarOffsets === void 0 ? void 0 : avatarOffsets.dx) !== null && _c !== void 0 ? _c : 0),
                    offsetY: ((_d = customFrame.dy) !== null && _d !== void 0 ? _d : 0) + ((_e = avatarOffsets === null || avatarOffsets === void 0 ? void 0 : avatarOffsets.dy) !== null && _e !== void 0 ? _e : 0),
                },
                lay: false,
                flipped: flip,
            });
            return {
                fileId: id,
                library: "",
                mirror: flip,
                x,
                y,
            };
        }
    }
    _setMode(mode) {
        if (this._mode != null && this._mode !== mode) {
            throw new Error("Can't change mode once it is set.");
        }
        this._mode = mode;
    }
    _handleBodyPart(effect, frame, bodyPart) {
        var _a;
        this._setMode("bodypart");
        const action = this._actionsData.getAction(bodyPart.action);
        if (action == null)
            throw new Error("Invalid action " + bodyPart.action);
        this._customFrames.push({
            action,
            frame: (_a = bodyPart.frame) !== null && _a !== void 0 ? _a : 0,
            dd: bodyPart.dd,
            dx: bodyPart.dx,
            dy: bodyPart.dy,
        });
    }
    _handleFxPart(effect, frame, fx) {
        var _a;
        this._setMode("fx");
        const action = this._actionsData.getAction(fx.action);
        if (action == null)
            throw new Error("Invalid action " + fx.action);
        this._customFrames.push({
            action,
            frame: (_a = fx.frame) !== null && _a !== void 0 ? _a : 0,
            dd: fx.dd,
            dx: fx.dx,
            dy: fx.dy,
        });
    }
}
exports.AvatarAdditionPart = AvatarAdditionPart;
