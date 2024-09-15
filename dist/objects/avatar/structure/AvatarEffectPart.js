"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpriteId = exports.AvatarEffectPart = void 0;
const AvatarAction_1 = require("../enum/AvatarAction");
const getAssetFromPartMeta_1 = require("../util/getAssetFromPartMeta");
const getAvatarDirection_1 = require("../util/getAvatarDirection");
const getEffectSprite_1 = require("../util/getEffectSprite");
class AvatarEffectPart {
    constructor(_sprite, _actionsData, _offsetsData, _effectData) {
        this._sprite = _sprite;
        this._actionsData = _actionsData;
        this._offsetsData = _offsetsData;
        this._effectData = _effectData;
        this._directionOffset = 0;
        this._offsets = new Map();
        this._customFrames = [];
    }
    setDirection(direction) {
        this._direction = direction;
    }
    setDirectionOffset(offset) {
        this._directionOffset = offset;
    }
    getDirection(offset = 0) {
        if (this._direction == null)
            return;
        if (!this._sprite.directions) {
            return 0;
        }
        return (0, getAvatarDirection_1.getAvatarDirection)(this._direction + this._directionOffset + offset);
    }
    setEffectFrame(effect, frame) {
        const part = effect.getFrameEffectPart(this._sprite.id, frame);
        if (part != null) {
            let actionData = part.action != null
                ? this._actionsData.getAction(part.action)
                : undefined;
            if (actionData == null) {
                actionData = this._actionsData.getAction(AvatarAction_1.AvatarAction.Default);
            }
            this._customFrames.push({
                action: actionData,
                frame: part.frame,
                dd: part.dd,
                dx: part.dx,
                dy: part.dy,
            });
        }
    }
    setAvatarOffsets(avatarFrame, frame) {
        this._offsets.set(frame, avatarFrame);
    }
    setEffectFrameDefaultIfNotSet() {
        if (this._customFrames.length > 0)
            return;
        const action = this._actionsData.getAction(AvatarAction_1.AvatarAction.Default);
        this._customFrames.push({
            action,
        });
    }
    getDrawDefinition() {
        var _a;
        const assets = [];
        const directionData = this._direction != null
            ? this._effectData.getSpriteDirection(this._sprite.id, this._direction)
            : undefined;
        this._customFrames.forEach((customFrame) => {
            var _a;
            const action = customFrame.action;
            if (action == null)
                throw new Error("Invalid action");
            const direction = this.getDirection(customFrame.dd);
            if (direction == null)
                return;
            const asset = this._getAvatarAsset(direction, (_a = customFrame.frame) !== null && _a !== void 0 ? _a : 0, customFrame, directionData);
            if (asset != null) {
                assets.push(asset);
            }
        });
        if (assets.length === 0)
            return;
        return {
            assets: assets.flatMap((asset) => [asset, asset]),
            addition: false,
            kind: "EFFECT_DRAW_PART",
            z: (_a = directionData === null || directionData === void 0 ? void 0 : directionData.dz) !== null && _a !== void 0 ? _a : 0,
            ink: this._sprite.ink,
        };
    }
    _getAvatarAsset(direction, frame, customFrame, directionData) {
        var _a, _b, _c, _d;
        if (this._sprite.member != null) {
            const { id, offsets, flip } = (0, getEffectSprite_1.getEffectSprite)(this._sprite.member, direction, frame, this._offsetsData, this._sprite.directions, false);
            if (offsets == null) {
                return;
            }
            const { x, y } = (0, getAssetFromPartMeta_1.applyOffsets)({
                offsets,
                customOffsets: {
                    offsetX: (_a = customFrame.dx) !== null && _a !== void 0 ? _a : 0 - ((_b = directionData === null || directionData === void 0 ? void 0 : directionData.dx) !== null && _b !== void 0 ? _b : 0),
                    offsetY: (_c = customFrame.dy) !== null && _c !== void 0 ? _c : 0 + ((_d = directionData === null || directionData === void 0 ? void 0 : directionData.dy) !== null && _d !== void 0 ? _d : 0),
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
}
exports.AvatarEffectPart = AvatarEffectPart;
const getSpriteId = (member, direction, frame) => `h_${member}_${direction}_${frame}`;
exports.getSpriteId = getSpriteId;
