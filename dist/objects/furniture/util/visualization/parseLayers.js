"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLayers = void 0;
function parseLayers(visualization, set) {
    if (visualization.layers != null) {
        const layers = visualization.layers[0].layer;
        const layersLength = layers == null ? 0 : layers.length;
        for (let i = 0; i < layersLength; i++) {
            const layer = layers[i]["$"];
            set(layer.id, {
                zIndex: layer != null && layer.z != null ? Number(layer.z) : 0,
                tag: layer.tag,
                ink: layer.ink,
                alpha: layer.alpha != null ? Number(layer.alpha) : undefined,
                ignoreMouse: layer.ignoreMouse,
            });
        }
    }
}
exports.parseLayers = parseLayers;
