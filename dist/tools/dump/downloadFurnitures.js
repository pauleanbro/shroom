"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFurnitures = void 0;
const path_1 = __importDefault(require("path"));
const FurnitureData_1 = require("../../objects/furniture/FurnitureData");
const downloadFile_1 = require("./downloadFile");
const downloadMultipleFiles_1 = require("./downloadMultipleFiles");
async function downloadFurnitures({ downloadPath, hofFurniUrl, file, }, logger) {
    if (file.type !== "SUCCESS") {
        logger.info("Skipping downloading furniture, since we couldn't download the furniture data.");
        return;
    }
    const furniData = new FurnitureData_1.FurnitureData(() => file.text());
    const infos = await furniData.getInfos();
    const furnitureRequests = infos.map(([key, info]) => {
        return {
            type: key.split("*")[0],
            revision: info.revision,
        };
    });
    const downloadingTypes = new Set();
    const furnitureRequestsDeduplicated = [];
    furnitureRequests.forEach((element) => {
        const downloadId = `${element.revision}/${element.type}`;
        if (downloadingTypes.has(downloadId))
            return;
        downloadingTypes.add(downloadId);
        furnitureRequestsDeduplicated.push(element);
    });
    await (0, downloadMultipleFiles_1.downloadMultipleFiles)({
        data: furnitureRequestsDeduplicated,
        concurrency: 30,
        logger,
        name: "Furnitures",
    }, async (element, view) => {
        var _a;
        const swfPath = element.revision != null
            ? `${element.revision}/${element.type}.swf`
            : `${element.type}.swf`;
        const request = {
            url: `${hofFurniUrl}${swfPath}`,
            savePath: path_1.default.join(downloadPath, "hof_furni", swfPath),
        };
        const id = `Revision: ${(_a = element.revision) !== null && _a !== void 0 ? _a : "-"}, Type: ${element.type}`;
        const result = await (0, downloadFile_1.downloadFile)(request);
        switch (result.type) {
            case "SUCCESS":
                if (element.revision != null) {
                    view.reportSuccess(id);
                }
                else {
                    view.reportSuccess(id);
                }
                break;
            case "FAILED_TO_WRITE":
            case "HTTP_ERROR":
                view.reportError(id, request, result);
                break;
        }
    });
}
exports.downloadFurnitures = downloadFurnitures;
