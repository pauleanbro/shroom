"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEffectSprite = void 0;
const getFlippedMetaData_1 = require("./getFlippedMetaData");
const AvatarEffectPart_1 = require("../structure/AvatarEffectPart");
function getEffectSprite(member, direction, frame, offsetsData, hasDirection, handleFlipped) {
    let id = (0, AvatarEffectPart_1.getSpriteId)(member, direction, frame);
    let offsets = offsetsData.getOffsets(id);
    let flip = false;
    if (handleFlipped && offsets == null) {
        const flippedMeta = (0, getFlippedMetaData_1.getBasicFlippedMetaData)(direction);
        id = (0, AvatarEffectPart_1.getSpriteId)(member, flippedMeta.direction, frame);
        offsets = offsetsData.getOffsets(id);
        flip = flippedMeta.flip;
    }
    if (!hasDirection) {
        id = (0, AvatarEffectPart_1.getSpriteId)(member, 0, frame);
        if (offsets == null) {
            offsets = offsetsData.getOffsets(id);
        }
    }
    return {
        id,
        offsets,
        flip,
    };
}
exports.getEffectSprite = getEffectSprite;
