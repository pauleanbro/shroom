"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseColors = void 0;
function parseColors(visualization, set) {
    const colors = visualization.colors && visualization.colors[0].color;
    if (colors != null) {
        colors.forEach(color => {
            const id = color["$"].id;
            const colorLayersMap = new Map();
            const colorLayers = color.colorLayer;
            colorLayers.forEach(layer => {
                const layerId = layer["$"].id;
                const color = layer["$"].color;
                colorLayersMap.set(layerId, color);
            });
            set(id, colorLayersMap);
        });
    }
}
exports.parseColors = parseColors;
