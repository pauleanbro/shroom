"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseVisualization = void 0;
const parseAnimations_1 = require("./parseAnimations");
const parseColors_1 = require("./parseColors");
const parseDirections_1 = require("./parseDirections");
const parseLayers_1 = require("./parseLayers");
function parseVisualization(xml) {
    const visualizations = xml["visualizationData"]["graphics"][0]["visualization"];
    let parsedValidDirections = [];
    for (let i = 0; i < visualizations.length; i++) {
        const visualization = visualizations[i];
        if (visualization["$"]["size"] == "64") {
            const layerMap = new Map();
            const colorMap = new Map();
            const animationMap = new Map();
            const directionMap = new Map();
            const { validDirections } = (0, parseDirections_1.parseDirections)(visualization, (direction, layerMap) => directionMap.set(direction, layerMap));
            parsedValidDirections = validDirections;
            (0, parseAnimations_1.parseAnimations)(visualization, (id, data) => animationMap.set(id, data));
            (0, parseColors_1.parseColors)(visualization, (id, colorLayersMap) => colorMap.set(id, colorLayersMap));
            (0, parseLayers_1.parseLayers)(visualization, (id, layer) => layerMap.set(id, layer));
            return {
                layerCount: Number(visualization["$"]["layerCount"]),
                getColor: (colorId, layer) => { var _a; return (_a = colorMap === null || colorMap === void 0 ? void 0 : colorMap.get(colorId)) === null || _a === void 0 ? void 0 : _a.get(layer); },
                getAnimation: (animationId, layerId) => {
                    var _a, _b;
                    const frameInfo = (_b = (_a = animationMap
                        .get(animationId)) === null || _a === void 0 ? void 0 : _a.layerToFrames) === null || _b === void 0 ? void 0 : _b.get(layerId);
                    return frameInfo;
                },
                getFrameCount: (animationId) => { var _a; return (_a = animationMap.get(animationId)) === null || _a === void 0 ? void 0 : _a.frameCount; },
                getLayer: (layerId) => layerMap.get(layerId),
                getDirectionLayerOverride: (direction, layerId) => { var _a; return (_a = directionMap.get(direction)) === null || _a === void 0 ? void 0 : _a.get(layerId); },
                getAnimationDatas: () => Array.from(animationMap).map(([animationId, data]) => ({
                    id: animationId,
                    data,
                })),
                directions: parsedValidDirections,
            };
        }
    }
    throw new Error("No visualization found");
}
exports.parseVisualization = parseVisualization;
