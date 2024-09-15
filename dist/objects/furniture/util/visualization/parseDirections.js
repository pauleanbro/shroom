"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDirections = void 0;
function parseDirections(visualization, set) {
    const directions = visualization.directions[0].direction;
    const validDirections = [];
    for (let i = 0; i < directions.length; i++) {
        const layerMap = new Map();
        const directionNumber = Number(directions[i]["$"].id);
        const directionLayers = directions[i].layer || [];
        validDirections.push(directionNumber);
        for (let j = 0; j < directionLayers.length; j++) {
            const layer = directionLayers[j]["$"];
            layerMap.set(layer.id, {
                zIndex: layer != null && layer.z != null ? Number(layer.z) : undefined,
                tag: undefined,
                ink: undefined,
                alpha: undefined,
                ignoreMouse: undefined,
            });
        }
        set(directionNumber, layerMap);
    }
    return {
        validDirections,
    };
}
exports.parseDirections = parseDirections;
