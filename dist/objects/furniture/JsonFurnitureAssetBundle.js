"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFurnitureAssetBundle = void 0;
const PIXI = __importStar(require("pixi.js"));
const loadImageFromBlob_1 = require("../../util/loadImageFromBlob");
const loadImageFromUrl_1 = require("../../util/loadImageFromUrl");
const HitTexture_1 = require("../hitdetection/HitTexture");
const JsonFurnitureAssetsData_1 = require("./data/JsonFurnitureAssetsData");
const JsonFurnitureVisualizationData_1 = require("./data/JsonFurnitureVisualizationData");
class JsonFurnitureAssetBundle {
    constructor(_assetBundle) {
        this._assetBundle = _assetBundle;
        this._data = this._load();
    }
    async getAssets() {
        const { assets } = await this._data;
        return assets;
    }
    async getVisualization() {
        const { visualization } = await this._data;
        return visualization;
    }
    async getTexture(name) {
        const { spritesheet } = await this._data;
        return HitTexture_1.HitTexture.fromSpriteSheet(spritesheet, name);
    }
    async getIndex() {
        const { index } = await this._data;
        return index;
    }
    async _load() {
        const json = JSON.parse(await this._assetBundle.getString("index.json"));
        const blob = await this._assetBundle.getBlob("spritesheet.png");
        const imageUrl = await (0, loadImageFromBlob_1.loadImageFromBlob)(blob);
        const baseTextureImage = await (0, loadImageFromUrl_1.loadImageFromUrl)(imageUrl);
        const baseTexture = PIXI.BaseTexture.from(baseTextureImage);
        const spritesheet = new PIXI.Spritesheet(baseTexture, json.spritesheet);
        await new Promise((resolve) => {
            spritesheet.parse(() => {
                resolve();
            });
        });
        return {
            assets: new JsonFurnitureAssetsData_1.JsonFurnitureAssetsData(json.assets),
            visualization: new JsonFurnitureVisualizationData_1.JsonFurnitureVisualizationData(json.visualization),
            index: json.index,
            spritesheet,
        };
    }
}
exports.JsonFurnitureAssetBundle = JsonFurnitureAssetBundle;
