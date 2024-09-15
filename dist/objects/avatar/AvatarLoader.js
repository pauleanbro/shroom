"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarLoader = void 0;
const util_1 = require("./util");
const bluebird_1 = __importDefault(require("bluebird"));
const AvatarAnimationData_1 = require("./data/AvatarAnimationData");
const FigureMapData_1 = require("./data/FigureMapData");
const AvatarPartSetsData_1 = require("./data/AvatarPartSetsData");
const FigureData_1 = require("./data/FigureData");
const AvatarActionsData_1 = require("./data/AvatarActionsData");
const AvatarGeometryData_1 = require("./data/AvatarGeometryData");
const LegacyAssetBundle_1 = require("../../assets/LegacyAssetBundle");
const ShroomAssetBundle_1 = require("../../assets/ShroomAssetBundle");
const AvatarEffectMap_1 = require("./data/AvatarEffectMap");
const AvatarEffectBundle_1 = require("./AvatarEffectBundle");
const getLibrariesForLook_1 = require("./util/getLibrariesForLook");
const parseLookString_1 = require("./util/parseLookString");
const AvatarAssetLibraryCollection_1 = require("./AvatarAssetLibraryCollection");
const ManifestLibrary_1 = require("./data/ManifestLibrary");
function _getLookOptionsString(lookOptions) {
    const parts = [];
    if (lookOptions.actions.size > 0) {
        const actionString = Array.from(lookOptions.actions)
            .map((action) => action)
            .join(",");
        parts.push(`actions(${actionString})`);
    }
    parts.push(`direction(${lookOptions.direction})`);
    parts.push(`headdirection(${lookOptions.headDirection})`);
    if (lookOptions.item != null) {
        parts.push(`item(${lookOptions.item})`);
    }
    if (lookOptions.look != null) {
        parts.push(`look(${lookOptions.look})`);
    }
    if (lookOptions.effect != null) {
        parts.push(`effect(${lookOptions.effect})`);
    }
    return parts.join(",");
}
class AvatarLoader {
    constructor(_options) {
        this._options = _options;
        this._effectCache = new Map();
        this._lookOptionsCache = new Map();
        this._assetBundles = new Map();
        this._offsets = new AvatarAssetLibraryCollection_1.AvatarAssetLibraryCollection();
        this._dependencies = this._options.createDependencies();
        this._lookServer = this._dependencies
            .then(async (dependencies) => {
            return (0, util_1.createLookServer)({
                ...dependencies,
                offsetsData: this._offsets,
            });
        })
            .then(async (server) => {
            // Wait for the placeholder model to load
            await this._getAvatarDrawDefinition(server, {
                direction: 0,
                headDirection: 0,
                actions: new Set(),
                look: "hd-99999-99999",
            });
            return server;
        });
        this._effectMap = this._options.getEffectMap();
    }
    static create(resourcePath = "") {
        return new AvatarLoader({
            createDependencies: () => initializeDefaultAvatarDependencies(resourcePath),
            getAssetBundle: async (library) => {
                return new LegacyAssetBundle_1.LegacyAssetBundle(`${resourcePath}/figure/${library}`);
            },
            getEffectMap: async () => {
                const response = await fetch(`${resourcePath}/effectmap.xml`);
                const text = await response.text();
                return new AvatarEffectMap_1.AvatarEffectMap(text);
            },
            getEffectBundle: async (effect) => {
                const data = await ShroomAssetBundle_1.ShroomAssetBundle.fromUrl(`${resourcePath}/effects/${effect.lib}.shroom`);
                return new AvatarEffectBundle_1.AvatarEffectBundle(data);
            },
        });
    }
    static createForAssetBundle(resourcePath = "") {
        return new AvatarLoader({
            createDependencies: () => initializeDefaultAvatarDependencies(resourcePath),
            getAssetBundle: async (library) => {
                return ShroomAssetBundle_1.ShroomAssetBundle.fromUrl(`${resourcePath}/figure/${library}.shroom`);
            },
            getEffectMap: async () => {
                const response = await fetch(`${resourcePath}/effectmap.xml`);
                const text = await response.text();
                return new AvatarEffectMap_1.AvatarEffectMap(text);
            },
            getEffectBundle: async (effect) => {
                const data = await ShroomAssetBundle_1.ShroomAssetBundle.fromUrl(`${resourcePath}/effects/${effect.lib}.shroom`);
                return new AvatarEffectBundle_1.AvatarEffectBundle(data);
            },
        });
    }
    async getAvatarDrawDefinition(options) {
        const getDrawDefinition = await this._lookServer;
        return this._getAvatarDrawDefinition(getDrawDefinition, options);
    }
    async _getAvatarDrawDefinition(getDrawDefinition, options) {
        var _a;
        const { effect } = options;
        let effectData;
        let effectBundle;
        // If an effect is set, try to load it
        if (effect != null) {
            const effectCache = await this._loadEffectCached(effect);
            if (effectCache != null) {
                effectData = effectCache.effectData;
                effectBundle = effectCache.effectBundle;
            }
        }
        const { figureData, figureMap } = await this._dependencies;
        // Open the effect library
        if (effectBundle != null) {
            await this._offsets.open(effectBundle);
        }
        // Get the required libraries for the look
        const libs = (0, getLibrariesForLook_1.getLibrariesForLook)((0, parseLookString_1.parseLookString)(options.look), {
            figureData: figureData,
            figureMap: figureMap,
        });
        // Open the required libraries for the look
        await Promise.all(Array.from(libs).map((lib) => this._getAssetBundle(lib).then((bundle) => this._offsets.open(bundle))));
        // Get asset ids for the look
        const fileIds = (_a = getDrawDefinition(options, effectData)) === null || _a === void 0 ? void 0 : _a.getDrawDefinition().flatMap((part) => part.assets).map((asset) => asset.fileId);
        // Load the required textures for the look
        if (fileIds != null) {
            await this._offsets.loadTextures(fileIds);
        }
        return {
            getDrawDefinition: (options) => {
                const result = this._getDrawDefinitionCached(getDrawDefinition, options, effectData);
                if (result == null)
                    throw new Error("Invalid look");
                return result;
            },
            getTexture: (id) => {
                const texture = this._offsets.getTexture(id);
                if (texture == null) {
                    console.error("Texture not found in", this._offsets);
                    throw new Error(`Invalid texture: ${id}`);
                }
                return texture;
            },
        };
    }
    async _loadEffectCached(effect) {
        const current = this._effectCache.get(effect);
        if (current != null)
            return current;
        const promise = this._loadEffect(effect);
        this._effectCache.set(effect, promise);
        return promise;
    }
    async _loadEffect(effect) {
        const effectMap = await this._effectMap;
        const effectInfo = effectMap.getEffectInfo(effect);
        if (effectInfo != null) {
            const effectBundle = await this._options.getEffectBundle(effectInfo);
            const effectData = await effectBundle.getData();
            return {
                effectBundle,
                effectData,
            };
        }
    }
    async _getAssetBundle(library) {
        const current = this._assetBundles.get(library);
        if (current != null)
            return current;
        const bundle = this._options
            .getAssetBundle(library)
            .then((bundle) => new ManifestLibrary_1.ManifestLibrary(bundle));
        this._assetBundles.set(library, bundle);
        return bundle;
    }
    _getDrawDefinitionCached(getAvatarDrawDefinition, lookOptions, effect) {
        const key = _getLookOptionsString(lookOptions);
        const existing = this._lookOptionsCache.get(key);
        if (existing != null) {
            return existing;
        }
        const drawDefinition = getAvatarDrawDefinition(lookOptions, effect);
        if (drawDefinition == null)
            return;
        this._lookOptionsCache.set(key, drawDefinition);
        return drawDefinition;
    }
}
exports.AvatarLoader = AvatarLoader;
async function initializeDefaultAvatarDependencies(resourcePath) {
    const { animationData, figureMap, figureData, partSetsData, actionsData, geometry, } = await bluebird_1.default.props({
        animationData: AvatarAnimationData_1.AvatarAnimationData.default(),
        figureData: FigureData_1.FigureData.fromUrl(`${resourcePath}/figuredata.xml`),
        figureMap: FigureMapData_1.FigureMapData.fromUrl(`${resourcePath}/figuremap.xml`),
        partSetsData: AvatarPartSetsData_1.AvatarPartSetsData.default(),
        actionsData: AvatarActionsData_1.AvatarActionsData.default(),
        geometry: AvatarGeometryData_1.AvatarGeometryData.default(),
    });
    return {
        animationData,
        figureData,
        figureMap,
        partSetsData,
        actionsData,
        geometry,
    };
}
