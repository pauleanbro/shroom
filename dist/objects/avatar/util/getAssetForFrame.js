"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetForFrame = void 0;
const getFlippedMetaData_1 = require("./getFlippedMetaData");
const getAssetFromPartMeta_1 = require("./getAssetFromPartMeta");
function getAssetForFrame({ animationFrame, actionData, partTypeFlipped, direction, partType, partId, offsetsData, offsetX = 0, offsetY = 0, }) {
    const avatarFlipped = getFlippedMetaData_1.DIRECTION_IS_FLIPPED[direction];
    let assetPartDefinition = actionData.assetpartdefinition;
    let frameNumber = 0;
    if (animationFrame != null) {
        frameNumber = animationFrame.number;
        if (animationFrame.assetpartdefinition &&
            animationFrame.assetpartdefinition !== "") {
            assetPartDefinition = animationFrame.assetpartdefinition;
        }
    }
    const flippedMeta = (0, getFlippedMetaData_1.getFlippedMetaData)({
        assetPartDefinition,
        flippedPartType: partTypeFlipped,
        direction: direction,
        partType: partType,
    });
    let assetId = generateAssetName(assetPartDefinition, flippedMeta.partType, partId, flippedMeta.direction, frameNumber);
    let offset = offsetsData.getOffsets(assetId);
    if (offset == null) {
        assetId = generateAssetName("std", flippedMeta.partType, partId, flippedMeta.direction, 0);
        offset = offsetsData.getOffsets(assetId);
    }
    if (offset != null) {
        let flipH = flippedMeta.flip;
        if (avatarFlipped) {
            flipH = !flipH;
        }
        const asset = (0, getAssetFromPartMeta_1.getAssetFromPartMeta)(assetPartDefinition, { flipped: flipH, swapped: false, asset: assetId }, offsetsData, { offsetX, offsetY });
        if (asset != null) {
            return asset;
        }
    }
}
exports.getAssetForFrame = getAssetForFrame;
function generateAssetName(assetPartDef, partType, partId, direction, frame) {
    return `h_${assetPartDef}_${partType}_${partId}_${direction}_${frame}`;
}
