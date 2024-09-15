"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFurni = void 0;
const notNullOrUndefined_1 = require("../../../util/notNullOrUndefined");
const getFurniDrawDefinition_1 = require("./getFurniDrawDefinition");
async function loadFurni(typeWithColor, bundle) {
    const assetsData = await bundle.getAssets();
    const indexData = await bundle.getIndex();
    const visualizationData = await bundle.getVisualization();
    const validDirections = visualizationData.getDirections(64);
    const sortedDirections = [...validDirections].sort((a, b) => a - b);
    const assetMap = assetsData.getAssets();
    const loadTextures = async () => {
        const assetsToLoad = Array.from(assetMap).filter((asset) => asset.source == null || asset.source === asset.name);
        const loadedTextures = await Promise.all(assetsToLoad.map(async (asset) => {
            try {
                const image = await bundle.getTexture(asset.name);
                return [asset.name, image];
            }
            catch (e) {
                console.warn(`Failed to load furniture asset: ${asset.name}`, e);
                return null;
            }
        }));
        return new Map(loadedTextures.filter(notNullOrUndefined_1.notNullOrUndefined));
    };
    const textures = await loadTextures();
    return {
        getDrawDefinition: (direction, animation) => (0, getFurniDrawDefinition_1.getFurniDrawDefinition)({
            type: typeWithColor,
            direction,
            animation,
        }, {
            assetsData,
            visualizationData,
        }),
        getTexture: (name) => {
            const texture = textures.get(name);
            return texture;
        },
        getExtraData: () => {
            return indexData;
        },
        visualizationData,
        directions: sortedDirections,
    };
}
exports.loadFurni = loadFurni;
