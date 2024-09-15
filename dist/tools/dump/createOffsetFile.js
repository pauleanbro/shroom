"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOffsetFile = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const AvatarManifestData_1 = require("../../objects/avatar/data/AvatarManifestData");
const ProgressBar_1 = require("./ProgressBar");
async function createOffsetFile(downloadPath, figureMap, logger) {
    const assets = figureMap.getLibraries();
    const object = {};
    const progress = new ProgressBar_1.ProgressBar(logger, assets.length, (current, count, data) => {
        if (data != null) {
            return `Figure Offsets: ${current} / ${count} (${data})`;
        }
        else {
            return `Figure Offsets: ${current} / ${count}`;
        }
    });
    for (const asset of assets) {
        const manifestPath = path_1.default.join(downloadPath, "figure", asset, "manifest.bin");
        const manifestFile = await fs_1.promises.readFile(manifestPath, "utf-8");
        const manifest = new AvatarManifestData_1.AvatarManifestData(manifestFile);
        manifest.getAssets().forEach((asset) => {
            object[asset.name] = { offsetX: asset.x, offsetY: asset.y };
        });
        progress.increment(asset);
    }
    progress.done();
    await fs_1.promises.writeFile(path_1.default.join(downloadPath, "offsets.json"), JSON.stringify(object));
}
exports.createOffsetFile = createOffsetFile;
