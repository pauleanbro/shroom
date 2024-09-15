"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFurnitureAssetsData = void 0;
const notNullOrUndefined_1 = require("../../../util/notNullOrUndefined");
class JsonFurnitureAssetsData {
    constructor(_assets) {
        this._assets = _assets;
    }
    getAsset(name) {
        return this._assets[name];
    }
    getAssets() {
        return Object.values(this._assets).filter(notNullOrUndefined_1.notNullOrUndefined);
    }
}
exports.JsonFurnitureAssetsData = JsonFurnitureAssetsData;
