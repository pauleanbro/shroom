"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartFlippedMetaData = exports.getBasicFlippedMetaData = exports.getFlippedMetaData = exports.DIRECTION_IS_FLIPPED = void 0;
const AvatarFigurePartType_1 = require("../enum/AvatarFigurePartType");
exports.DIRECTION_IS_FLIPPED = [
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    false,
];
function getFlippedMetaData({ assetPartDefinition, direction, partType, flippedPartType, }) {
    const directionFlipped = exports.DIRECTION_IS_FLIPPED[direction];
    if (!directionFlipped) {
        return { direction, flip: false, partType, swapped: false };
    }
    if (assetPartDefinition === "wav" &&
        (partType == AvatarFigurePartType_1.AvatarFigurePartType.LeftHand ||
            partType == AvatarFigurePartType_1.AvatarFigurePartType.LeftSleeve ||
            partType == AvatarFigurePartType_1.AvatarFigurePartType.LeftCoatSleeve)) {
        return { direction, flip: true, partType, swapped: false };
    }
    if (assetPartDefinition == "drk" &&
        (partType == AvatarFigurePartType_1.AvatarFigurePartType.RightHand ||
            partType == AvatarFigurePartType_1.AvatarFigurePartType.RightSleeve ||
            partType == AvatarFigurePartType_1.AvatarFigurePartType.RightCoatSleeve)) {
        return { direction, flip: true, partType, swapped: false };
    }
    if (assetPartDefinition == "blw" &&
        partType == AvatarFigurePartType_1.AvatarFigurePartType.RightHand) {
        return { direction, flip: true, partType, swapped: false };
    }
    if (assetPartDefinition == "sig" &&
        partType == AvatarFigurePartType_1.AvatarFigurePartType.LeftHand) {
        return { direction, flip: true, partType, swapped: false };
    }
    if (assetPartDefinition == "respect" &&
        partType == AvatarFigurePartType_1.AvatarFigurePartType.LeftHand) {
        return { direction, flip: true, partType, swapped: false };
    }
    if (partType == AvatarFigurePartType_1.AvatarFigurePartType.RightHandItem) {
        return { direction, flip: true, partType, swapped: false };
    }
    if (partType == AvatarFigurePartType_1.AvatarFigurePartType.LeftHandItem) {
        return { direction, flip: true, partType, swapped: false };
    }
    if (partType == AvatarFigurePartType_1.AvatarFigurePartType.ChestPrint) {
        return { direction, flip: true, partType, swapped: false };
    }
    const overrideDirection = getBasicFlippedMetaData(direction);
    if (flippedPartType != partType) {
        return {
            direction: overrideDirection.direction,
            flip: false,
            partType: flippedPartType !== null && flippedPartType !== void 0 ? flippedPartType : partType,
            swapped: true,
        };
    }
    return { direction: overrideDirection.direction, flip: false, partType };
}
exports.getFlippedMetaData = getFlippedMetaData;
function getBasicFlippedMetaData(direction) {
    let overrideDirection = direction;
    let flipped = false;
    if (direction === 4) {
        overrideDirection = 2;
        flipped = true;
    }
    if (direction === 5) {
        overrideDirection = 1;
        flipped = true;
    }
    if (direction === 6) {
        overrideDirection = 0;
        flipped = true;
    }
    return { direction: overrideDirection, flip: flipped };
}
exports.getBasicFlippedMetaData = getBasicFlippedMetaData;
function getPartFlippedMetaData(direction, { partType, flippedPartType, }) {
    const overrideDirection = getBasicFlippedMetaData(direction);
    if (flippedPartType != partType) {
        return {
            direction: overrideDirection.direction,
            flip: false,
            partType: flippedPartType !== null && flippedPartType !== void 0 ? flippedPartType : partType,
            swapped: true,
        };
    }
    return { direction: overrideDirection.direction, flip: false, partType };
}
exports.getPartFlippedMetaData = getPartFlippedMetaData;
