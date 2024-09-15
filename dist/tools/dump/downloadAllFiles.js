"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadAllFiles = void 0;
const path_1 = __importDefault(require("path"));
const downloadEffects_1 = require("./downloadEffects");
const downloadFigures_1 = require("./downloadFigures");
const downloadFileWithMessage_1 = require("./downloadFileWithMessage");
const downloadFurnitures_1 = require("./downloadFurnitures");
async function downloadAllFiles(downloadPath, { figureDataUrl, figureMapUrl, furniDataUrl, hofFurniUrl, effectMapUrl, gordonUrl, }, logger) {
    await (0, downloadFileWithMessage_1.downloadFileWithMessage)({
        url: figureDataUrl,
        savePath: path_1.default.join(downloadPath, "figuredata.xml"),
    }, logger);
    const figureMap = await (0, downloadFileWithMessage_1.downloadFileWithMessage)({
        url: figureMapUrl,
        savePath: path_1.default.join(downloadPath, "figuremap.xml"),
    }, logger);
    const furniData = await (0, downloadFileWithMessage_1.downloadFileWithMessage)({ url: furniDataUrl, savePath: path_1.default.join(downloadPath, "furnidata.xml") }, logger);
    const effectMap = await (0, downloadFileWithMessage_1.downloadFileWithMessage)({ url: effectMapUrl, savePath: path_1.default.join(downloadPath, "effectmap.xml") }, logger);
    await (0, downloadFigures_1.downloadFigures)({ gordonUrl, file: figureMap, downloadPath }, logger);
    await (0, downloadFurnitures_1.downloadFurnitures)({ downloadPath, file: furniData, hofFurniUrl }, logger);
    await (0, downloadEffects_1.downloadEffects)({ gordonUrl, downloadPath, effectMapDownload: effectMap }, logger);
}
exports.downloadAllFiles = downloadAllFiles;
