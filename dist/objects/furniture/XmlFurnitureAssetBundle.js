"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlFurnitureAssetBundle = void 0;
const HitTexture_1 = require("../hitdetection/HitTexture");
const FurnitureAssetsData_1 = require("./data/FurnitureAssetsData");
const FurnitureIndexData_1 = require("./data/FurnitureIndexData");
const FurnitureVisualizationData_1 = require("./data/FurnitureVisualizationData");
class XmlFurnitureAssetBundle {
    constructor(_type, _assetBundle) {
        this._type = _type;
        this._assetBundle = _assetBundle;
    }
    async getAssets() {
        const data = await this._assetBundle.getString(`${this._type}_assets.bin`);
        return new FurnitureAssetsData_1.FurnitureAssetsData(data);
    }
    async getVisualization() {
        const data = await this._assetBundle.getString(`${this._type}_visualization.bin`);
        return new FurnitureVisualizationData_1.FurnitureVisualizationData(data);
    }
    async getTexture(name) {
        const blob = await this._assetBundle.getBlob(`${name}.png`);
        return HitTexture_1.HitTexture.fromBlob(blob);
    }
    async getIndex() {
        const data = await this._assetBundle.getString(`index.bin`);
        return new FurnitureIndexData_1.FurnitureIndexData(data);
    }
}
exports.XmlFurnitureAssetBundle = XmlFurnitureAssetBundle;
