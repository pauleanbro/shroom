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
exports.dumpFigure = void 0;
const fs_1 = require("fs");
const path = __importStar(require("path"));
const ShroomAssetBundle_1 = require("../../assets/ShroomAssetBundle");
async function dumpFigure(baseName, dumpLocation, imagePaths, xmlPaths) {
    const imageFiles = await Promise.all(imagePaths.map((path) => fs_1.promises.readFile(path).then((buffer) => ({ path, buffer }))));
    const binFiles = await Promise.all(xmlPaths.map((path) => fs_1.promises.readFile(path).then((buffer) => ({ path, buffer }))));
    const file = new ShroomAssetBundle_1.ShroomAssetBundle();
    imageFiles.forEach(({ path: filePath, buffer }) => {
        const baseName = path.basename(filePath);
        file.addFile(baseName, buffer);
    });
    binFiles.forEach(({ path: filePath, buffer }) => {
        const baseName = path.basename(filePath);
        file.addFile(baseName, buffer);
    });
    await fs_1.promises.writeFile(`${dumpLocation}.shroom`, file.toBuffer());
}
exports.dumpFigure = dumpFigure;
