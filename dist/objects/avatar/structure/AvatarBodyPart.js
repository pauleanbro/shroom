"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarBodyPart = void 0;
const notNullOrUndefined_1 = require("../../../util/notNullOrUndefined");
/**
 * A bodypart of the avatar. A bodypart manages multiple `AvatarPart` objects.
 */
class AvatarBodyPart {
    constructor(_bodyPart, _parts, _partSets, _actions, _geometry) {
        this._bodyPart = _bodyPart;
        this._parts = _parts;
        this._partSets = _partSets;
        this._actions = _actions;
        this._geometry = _geometry;
        this._additions = [];
    }
    get z() {
        return this._bodyPart.z;
    }
    get id() {
        return this._bodyPart.id;
    }
    get parts() {
        return this._parts;
    }
    addAddition(addition) {
        this._additions.push(addition);
    }
    getSortedParts(geometry) {
        const baseParts = this._parts
            .map((part) => {
            const item = this._geometry.getBodyPartItem(geometry, this._bodyPart.id, part.type);
            if (item == null)
                return;
            return { part, item };
        })
            .filter(notNullOrUndefined_1.notNullOrUndefined)
            .sort((a, b) => a.item.radius - b.item.radius)
            .map((bodyPartItem) => {
            return bodyPartItem.part;
        });
        return [...baseParts, ...this._additions];
    }
    setActiveAction(action) {
        if (action.activepartset == null)
            return;
        const activePart = this._partSets.getActivePartSet(action.activepartset);
        this._parts.forEach((part) => {
            if (!activePart.has(part.type))
                return;
            part.setActiveAction(action);
        });
    }
    setDirection(direction) {
        this._parts.forEach((part) => {
            part.setDirection(direction);
        });
    }
    setDirectionOffset(offset) {
        this._parts.forEach((part) => {
            part.setDirectionOffset(offset);
        });
    }
    setFrameRepeat(frameRepeat) {
        this._parts.forEach((part) => {
            part.setFrameRepeat(frameRepeat);
        });
    }
    setEffectFrame(effect, frame) {
        const effectBodyPart = effect.getFrameBodyPart(this.id, frame);
        if (effectBodyPart == null)
            return;
        const action = this._actions.getAction(effectBodyPart.action);
        this._parts.forEach((part) => {
            var _a;
            if (action != null) {
                part.addCustomFrame({
                    action,
                    frame: (_a = effectBodyPart.frame) !== null && _a !== void 0 ? _a : 0,
                    dd: effectBodyPart.dd,
                    dx: effectBodyPart.dx,
                    dy: effectBodyPart.dy,
                });
            }
        });
    }
    setAvatarOffsets(avatarFrame, frame) {
        this._parts.forEach((part) => {
            part.setAvatarOffsets(avatarFrame, frame);
        });
        this._additions.forEach((addition) => {
            addition.setAvatarOffsets(avatarFrame, frame);
        });
    }
}
exports.AvatarBodyPart = AvatarBodyPart;
