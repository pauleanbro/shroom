"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarDrawDefinition = void 0;
const notNullOrUndefined_1 = require("../../../util/notNullOrUndefined");
const AvatarAction_1 = require("../enum/AvatarAction");
const getAvatarDirection_1 = require("../util/getAvatarDirection");
const getDrawOrderForActions_1 = require("../util/getDrawOrderForActions");
const AvatarBodyPartList_1 = require("./AvatarBodyPartList");
const AvatarEffectPart_1 = require("./AvatarEffectPart");
const AvatarPartList_1 = require("./AvatarPartList");
const BodyPartDrawOrder_1 = require("./BodyPartDrawOrder");
class AvatarDrawDefinition {
    constructor(_options, { figureData, actionsData, geometry, partSetsData, animationData, offsetsData, figureMap, }) {
        var _a, _b;
        this._options = _options;
        this._directionOffset = 0;
        this._drawParts = undefined;
        this._direction = _options.direction;
        this._figureData = figureData;
        this._actionsData = actionsData;
        this._geometry = geometry;
        this._partSetsData = partSetsData;
        this._animationData = animationData;
        this._offsetsData = offsetsData;
        this._figureMap = figureMap;
        const effect = _options.effect;
        const partList = this._getPartsForLook(_options.look);
        const bodyParts = AvatarBodyPartList_1.AvatarBodyPartList.create(partList, this._options.item != null, { actionsData, geometry, partSetsData, offsetsData });
        const activeActions = this._getActiveActions();
        this._bodyParts = bodyParts;
        bodyParts.applyActions(activeActions);
        bodyParts.setBodyPartDirection(this._options.direction, this._options.headDirection);
        const effectParts = new Map();
        this._effectParts = [];
        if (effect != null) {
            bodyParts.applyEffectAdditions(effect);
            effect.getSprites().forEach((sprite) => {
                if (sprite.id === "avatar") {
                    effectParts.set(sprite.id, this);
                    return;
                }
                const effectPart = new AvatarEffectPart_1.AvatarEffectPart(sprite, this._actionsData, this._offsetsData, effect);
                effectParts.set(sprite.id, effectPart);
                this._effectParts.push(effectPart);
            });
            for (let i = 0; i < effect.getFrameCount(); i++) {
                bodyParts.setEffectFrame(effect, i);
                effectParts.forEach((effectPart) => effectPart.setEffectFrame(effect, i));
            }
            effectParts.forEach((effectPart) => {
                effectPart.setEffectFrameDefaultIfNotSet();
                effectPart.setDirection(_options.direction);
            });
            bodyParts.setAdditionsDirection(_options.direction);
        }
        const directionOffset = (_b = (_a = effect === null || effect === void 0 ? void 0 : effect.getDirection()) === null || _a === void 0 ? void 0 : _a.offset) !== null && _b !== void 0 ? _b : 0;
        if (directionOffset != null) {
            effectParts.forEach((part) => {
                part.setDirectionOffset(directionOffset);
            });
            bodyParts.setDirectionOffset(directionOffset);
        }
        this._activeActions = activeActions;
        this._partList = partList;
    }
    setDirection(direction) {
        this._direction = direction;
    }
    setDirectionOffset(offset) {
        this._directionOffset = offset;
    }
    setEffectFrame(effect, frame) {
        const avatarFrameData = effect.getFrameEffectPart("avatar", frame);
        if (avatarFrameData == null)
            return;
        this._bodyParts.setAvatarOffsets(avatarFrameData, frame);
        this._effectParts.forEach((effectPart) => {
            effectPart.setAvatarOffsets(avatarFrameData, frame);
        });
    }
    setEffectFrameDefaultIfNotSet() {
        // Do nothing
    }
    getDrawDefinition() {
        if (this._drawParts != null)
            return this._drawParts;
        const drawOrderId = (0, getDrawOrderForActions_1.getDrawOrderForActions)(this._activeActions, {
            hasItem: this._options.item != null,
        });
        const drawOrderDirection = (0, getAvatarDirection_1.getAvatarDirection)(this._direction + this._directionOffset);
        const drawOrderBodyParts = BodyPartDrawOrder_1.BodyPartDrawOrder.getDrawOrder(drawOrderDirection, drawOrderId);
        if (drawOrderBodyParts == null)
            return [];
        const sortedParts = drawOrderBodyParts
            .map((id) => this._bodyParts.getBodyPartById(id))
            .filter(notNullOrUndefined_1.notNullOrUndefined)
            .flatMap((bodyPart) => {
            return bodyPart.getSortedParts("vertical");
        });
        const drawParts = sortedParts
            .map((part) => part.getDrawDefinition())
            .filter(notNullOrUndefined_1.notNullOrUndefined);
        const effectDrawParts = this._effectParts
            .map((part) => part.getDrawDefinition())
            .filter(notNullOrUndefined_1.notNullOrUndefined);
        const sortedDrawParts = [...drawParts, ...effectDrawParts].sort((a, b) => a.z - b.z);
        this._drawParts = sortedDrawParts;
        return sortedDrawParts;
    }
    _getPartsForLook(look) {
        const avatarList = new AvatarPartList_1.AvatarPartList(look, this._options.item, {
            figureData: this._figureData,
            animationData: this._animationData,
            figureMap: this._figureMap,
            offsetsData: this._offsetsData,
            partSetsData: this._partSetsData,
        });
        return avatarList;
    }
    _getActiveActions() {
        const actions = new Set(this._options.actions).add(AvatarAction_1.AvatarAction.Default);
        return this._actionsData
            .getActions()
            .filter((info) => actions.has(info.id))
            .sort((a, b) => {
            if (a.precedence < b.precedence)
                return 1;
            if (a.precedence > b.precedence)
                return -1;
            return 0;
        });
    }
}
exports.AvatarDrawDefinition = AvatarDrawDefinition;
