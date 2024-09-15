"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFurniDrawDefinition = void 0;
const _1 = require(".");
function getFurniDrawDefinition({ type: typeWithColor, direction, animation }, { visualizationData, assetsData }) {
    var _a;
    const typeSplitted = typeWithColor.split("*");
    const type = typeSplitted[0];
    // If color is not  set, we fallback to the `0` color for the item.
    const color = (_a = typeSplitted[1]) !== null && _a !== void 0 ? _a : "0";
    const size = 64;
    const parts = [];
    const animationNumber = animation != null ? Number(animation) : undefined;
    const layerCount = visualizationData.getLayerCount(size);
    const getAssetName = (char, frame) => `${type}_${size}_${char}_${direction}_${frame}`;
    const shadow = assetsData.getAsset(getAssetName("sd", 0));
    if (shadow != null) {
        parts.push({
            assets: [shadow],
            frameRepeat: 1,
            shadow: true,
            layer: undefined,
            layerIndex: -1,
        });
    }
    const mask = assetsData.getAsset(`${type}_${size}_${direction}_mask`);
    if (mask != null) {
        parts.push({
            assets: [mask],
            frameRepeat: 1,
            layer: undefined,
            shadow: false,
            mask: true,
            layerIndex: -2,
        });
    }
    for (let layerIndex = 0; layerIndex < layerCount; layerIndex++) {
        const directionLayer = visualizationData.getDirectionLayer(size, direction, layerIndex);
        const layer = visualizationData.getLayer(size, layerIndex);
        const char = (0, _1.getCharFromLayerIndex)(layerIndex);
        const animationLayer = animationNumber != null
            ? visualizationData.getAnimationLayer(size, animationNumber, layerIndex)
            : undefined;
        const colorLayer = color != null
            ? visualizationData.getColor(size, Number(color), layerIndex)
            : undefined;
        parts.push(getDrawPart({
            layer,
            directionLayer,
            animation: animationLayer,
            assetsData: assetsData,
            color: colorLayer,
            getAssetName: (frame) => getAssetName(char, frame),
            layerIndex,
        }));
    }
    return {
        parts,
    };
}
exports.getFurniDrawDefinition = getFurniDrawDefinition;
function getDrawPart({ layerIndex, layer, animation, directionLayer, assetsData, color, getAssetName, }) {
    var _a, _b, _c, _d, _e;
    const z = (_b = (_a = directionLayer === null || directionLayer === void 0 ? void 0 : directionLayer.z) !== null && _a !== void 0 ? _a : layer === null || layer === void 0 ? void 0 : layer.z) !== null && _b !== void 0 ? _b : 0;
    const x = (_c = directionLayer === null || directionLayer === void 0 ? void 0 : directionLayer.x) !== null && _c !== void 0 ? _c : 0;
    const y = (_d = directionLayer === null || directionLayer === void 0 ? void 0 : directionLayer.y) !== null && _d !== void 0 ? _d : 0;
    const baseAsset = assetsData.getAsset(getAssetName(0));
    let assets = undefined;
    if (animation != null) {
        const repeat = 1;
        assets = animation.frames
            .flatMap((frameNumber) => new Array(repeat).fill(frameNumber))
            .map((frameNumber) => {
            const asset = assetsData.getAsset(getAssetName(frameNumber));
            if (asset == null)
                return { x: 0, y: 0, flipH: false, name: "unknown", valid: true };
            return {
                ...asset,
                x: asset.x + (asset.flipH ? x : -x),
                y: asset.y - y,
            };
        });
    }
    if ((assets == null || assets.length === 0) && baseAsset != null) {
        assets = [baseAsset];
    }
    if (assets == null) {
        assets = [];
    }
    return {
        mask: false,
        shadow: false,
        frameRepeat: (_e = animation === null || animation === void 0 ? void 0 : animation.frameRepeat) !== null && _e !== void 0 ? _e : 1,
        layer,
        z,
        tint: color,
        assets,
        loopCount: animation === null || animation === void 0 ? void 0 : animation.loopCount,
        layerIndex,
    };
}
