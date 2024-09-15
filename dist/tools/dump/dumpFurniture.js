"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpFurniture = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const createSpritesheet_1 = require("./createSpritesheet");
const FurnitureVisualizationData_1 = require("../../objects/furniture/data/FurnitureVisualizationData");
const FurnitureIndexData_1 = require("../../objects/furniture/data/FurnitureIndexData");
const FurnitureAssetsData_1 = require("../../objects/furniture/data/FurnitureAssetsData");
const ShroomAssetBundle_1 = require("../../assets/ShroomAssetBundle");
async function dumpFurniture(baseName, dumpLocation, imagePaths) {
    const { json, image } = await (0, createSpritesheet_1.createSpritesheet)(imagePaths, {
        outputFormat: "png",
    });
    const visualizationData = await fs_1.promises.readFile(path_1.default.join(dumpLocation, `${baseName}_visualization.bin`), "utf-8");
    const indexData = await fs_1.promises.readFile(path_1.default.join(dumpLocation, `index.bin`), "utf-8");
    const assetsData = await fs_1.promises.readFile(path_1.default.join(dumpLocation, `${baseName}_assets.bin`), "utf-8");
    const visualization = new FurnitureVisualizationData_1.FurnitureVisualizationData(visualizationData);
    const index = new FurnitureIndexData_1.FurnitureIndexData(indexData);
    const assets = new FurnitureAssetsData_1.FurnitureAssetsData(assetsData);
    const data = {
        spritesheet: json,
        visualization: visualization.toJson(),
        index: index.toJson(),
        assets: assets.toJson(),
    };
    const jsonString = JSON.stringify(data);
    const encoder = new TextEncoder();
    const furnitureFile = new ShroomAssetBundle_1.ShroomAssetBundle();
    furnitureFile.addFile("index.json", encoder.encode(jsonString));
    furnitureFile.addFile("spritesheet.png", image);
    await fs_1.promises.writeFile(`${dumpLocation}.shroom`, furnitureFile.toBuffer());
}
exports.dumpFurniture = dumpFurniture;
