"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FurnitureLoader = void 0;
const LegacyAssetBundle_1 = require("../../assets/LegacyAssetBundle");
const ShroomAssetBundle_1 = require("../../assets/ShroomAssetBundle");
const JsonFurnitureAssetBundle_1 = require("./JsonFurnitureAssetBundle");
const loadFurni_1 = require("./util/loadFurni");
const XmlFurnitureAssetBundle_1 = require("./XmlFurnitureAssetBundle");
class FurnitureLoader {
    constructor(_options) {
        this._options = _options;
        this._furnitureCache = new Map();
        this._assetBundles = new Map();
    }
    get delay() {
        return this._artificalDelay;
    }
    set delay(value) {
        this._artificalDelay = value;
    }
    static create(furnitureData, resourcePath = "") {
        return new FurnitureLoader({
            furnitureData,
            getAssetBundle: async (type, revision) => {
                const bundle = new LegacyAssetBundle_1.LegacyAssetBundle(`${resourcePath}/hof_furni/${normalizePath(revision, type)}`);
                return new XmlFurnitureAssetBundle_1.XmlFurnitureAssetBundle(type, bundle);
            },
        });
    }
    static createForJson(furnitureData, resourcePath = "") {
        return new FurnitureLoader({
            furnitureData,
            getAssetBundle: async (type, revision) => {
                const bundle = await ShroomAssetBundle_1.ShroomAssetBundle.fromUrl(`${resourcePath}/hof_furni/${normalizePath(revision, type)}.shroom`);
                return new JsonFurnitureAssetBundle_1.JsonFurnitureAssetBundle(bundle);
            },
        });
    }
    async loadFurni(fetch) {
        if (this.delay != null) {
            await new Promise((resolve) => setTimeout(resolve, this.delay));
        }
        let typeWithColor;
        if (fetch.kind === "id") {
            const type = await this._options.furnitureData.getTypeById(fetch.id, fetch.placementType);
            if (type == null)
                throw new Error("Couldn't determine type for furniture.");
            typeWithColor = type;
        }
        else {
            typeWithColor = fetch.type;
        }
        const typeSplitted = typeWithColor.split("*");
        const type = typeSplitted[0];
        const revision = await this._options.furnitureData.getRevisionForType(typeWithColor);
        let furniture = this._furnitureCache.get(typeWithColor);
        if (furniture != null) {
            return furniture;
        }
        furniture = (0, loadFurni_1.loadFurni)(typeWithColor, await this._getAssetBundle(type, revision));
        this._furnitureCache.set(type, furniture);
        return furniture;
    }
    _getAssetBundle(type, revision) {
        const key = `${type}_${revision}`;
        const current = this._assetBundles.get(key);
        if (current != null)
            return current;
        const bundle = this._options.getAssetBundle(type, revision);
        this._assetBundles.set(key, bundle);
        return bundle;
    }
}
exports.FurnitureLoader = FurnitureLoader;
const normalizePath = (revision, type) => {
    if (revision == null)
        return type;
    return `${revision}/${type}`;
};
