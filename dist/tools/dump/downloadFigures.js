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
exports.downloadFigures = void 0;
const FigureMapData_1 = require("../../objects/avatar/data/FigureMapData");
const path = __importStar(require("path"));
const downloadFile_1 = require("./downloadFile");
const downloadMultipleFiles_1 = require("./downloadMultipleFiles");
async function downloadFigures({ file, downloadPath, gordonUrl, }, logger) {
    if (file.type !== "SUCCESS")
        return;
    const text = await file.text();
    const figureMap = new FigureMapData_1.FigureMapData(text);
    const libraries = figureMap.getLibraries();
    return (0, downloadMultipleFiles_1.downloadMultipleFiles)({
        data: libraries,
        concurrency: 30,
        logger,
        name: "Figure Libraries",
    }, async (library, view) => {
        const request = {
            url: `${gordonUrl}/${library}.swf`,
            savePath: path.join(downloadPath, `figure`, `${library}.swf`),
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
exports.downloadFigures = downloadFigures;
