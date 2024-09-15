"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarBodyPartList = void 0;
const associateBy_1 = require("../../../util/associateBy");
const notNullOrUndefined_1 = require("../../../util/notNullOrUndefined");
const AvatarAdditionPart_1 = require("./AvatarAdditionPart");
const AvatarBodyPart_1 = require("./AvatarBodyPart");
class AvatarBodyPartList {
    constructor(_bodyParts, { actionsData, offsetsData, partSetsData, }) {
        this._bodyParts = _bodyParts;
        this._bodyPartsById = new Map();
        this._additions = new Map();
        this._additionsArr = [];
        this._bodyPartsById = (0, associateBy_1.associateBy)(this._bodyParts, (bodyPart) => bodyPart.id);
        this._actionsData = actionsData;
        this._offsetsData = offsetsData;
        this._partSetsData = partSetsData;
    }
    static create(partList, hasItem, { geometry, partSetsData, actionsData, offsetsData, }) {
        const bodyPartIds = [...geometry.getBodyParts("full")];
        if (hasItem) {
            bodyPartIds.push("rightitem");
        }
        const bodyParts = bodyPartIds
            .map((id) => geometry.getBodyPart("vertical", id))
            .filter(notNullOrUndefined_1.notNullOrUndefined)
            .map((bodyPart) => new AvatarBodyPart_1.AvatarBodyPart(bodyPart, partList.getPartsForBodyBart(bodyPart), partSetsData, actionsData, geometry))
            .sort((a, b) => a.z - b.z);
        return new AvatarBodyPartList(bodyParts, {
            actionsData,
            offsetsData,
            partSetsData,
        });
    }
    applyActions(actions) {
        actions.forEach((action) => {
            this._bodyParts.forEach((bodyPart) => {
                bodyPart.setActiveAction(action);
            });
        });
    }
    applyEffectAdditions(effect) {
        effect.getAddtions().forEach((sprite) => {
            var _a;
            const bodyPart = sprite.align != null ? this._getBodyPartById(sprite.align) : undefined;
            if (bodyPart != null) {
                const current = (_a = this._additions.get(bodyPart)) !== null && _a !== void 0 ? _a : [];
                const additionPart = new AvatarAdditionPart_1.AvatarAdditionPart(sprite, this._actionsData, this._offsetsData, this._partSetsData);
                this._additions.set(bodyPart, [...current, additionPart]);
                this._additionsArr.push(additionPart);
                bodyPart.addAddition(additionPart);
            }
        });
    }
    setEffectFrame(effect, frame) {
        this._bodyParts.forEach((bodyPart) => {
            bodyPart.setEffectFrame(effect, frame);
            bodyPart.setFrameRepeat(2);
        });
        this._additionsArr.forEach((addition) => {
            addition.setEffectFrame(effect, frame);
        });
    }
    setAvatarOffsets(avatarFrameData, frame) {
        this._bodyParts.forEach((bodyPart) => bodyPart.setAvatarOffsets(avatarFrameData, frame));
    }
    setAdditionsDirection(direction) {
        this._additionsArr.forEach((addition) => addition.setDirection(direction));
    }
    setDirectionOffset(offset) {
        this._additionsArr.forEach((addition) => addition.setDirectionOffset(offset));
        this._bodyParts.forEach((bodyPart) => bodyPart.setDirectionOffset(offset));
    }
    setBodyPartDirection(direction, headDirection) {
        this._bodyParts.forEach((bodyPart) => {
            if (bodyPart.id === "head") {
                bodyPart.setDirection(headDirection !== null && headDirection !== void 0 ? headDirection : direction);
            }
            else {
                bodyPart.setDirection(direction);
            }
        });
    }
    getBodyPartById(id) {
        return this._getBodyPartById(id);
    }
    _getBodyPartById(id) {
        return this._bodyPartsById.get(id);
    }
}
exports.AvatarBodyPartList = AvatarBodyPartList;
