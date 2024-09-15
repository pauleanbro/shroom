"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadEffects = void 0;
const path_1 = __importDefault(require("path"));
const AvatarEffectMap_1 = require("../../objects/avatar/data/AvatarEffectMap");
const downloadFile_1 = require("./downloadFile");
const downloadMultipleFiles_1 = require("./downloadMultipleFiles");
async function downloadEffects({ downloadPath, gordonUrl, effectMapDownload, }, logger) {
    if (effectMapDownload.type !== "SUCCESS") {
        logger.info("Skipping downloading furniture, since we couldn't download the furniture data.");
        return;
    }
    const effectMap = new AvatarEffectMap_1.AvatarEffectMap(await effectMapDownload.text());
    const libs = effectMap.getEffects().map((effect) => effect.lib);
    await (0, downloadMultipleFiles_1.downloadMultipleFiles)({ data: libs, name: "Effects", concurrency: 30, logger }, async (library, view) => {
        const request = {
            url: `${gordonUrl}/${library}.swf`,
            savePath: path_1.default.join(downloadPath, `effects`, `${library}.swf`),
        };
        const result = await (0, downloadFile_1.downloadFile)(request);
        switch (result.type) {
            case "SUCCESS":
                view.reportSuccess(library);
                break;
            case "HTTP_ERROR":
            case "FAILED_TO_WRITE":
                view.reportError(library, request, result);
                break;
        }
    });
}
exports.downloadEffects = downloadEffects;
