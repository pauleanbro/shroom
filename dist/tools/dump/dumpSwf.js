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
exports.dumpSwf = void 0;
const fs_1 = require("fs");
const path = __importStar(require("path"));
require("./types");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readFromBufferP, extractImages } = require("swf-extract");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SWFReader = require("@gizeta/swf-reader");
async function dumpSwf(swfPath, onAfter) {
    const rawData = await fs_1.promises.readFile(swfPath);
    const swfObject = SWFReader.readSync(swfPath);
    const swf = await readFromBufferP(rawData);
    const assetMap = getAssetMapFromSWF(swfObject);
    const dirName = path.dirname(swfPath);
    const baseName = path.basename(swfPath, ".swf");
    const dumpLocation = path.join(dirName, baseName);
    await fs_1.promises.mkdir(dumpLocation, { recursive: true });
    const xmlPaths = await extractXml(swfObject, assetMap, dumpLocation, baseName);
    const imagePaths = await extractSwfImages(swf, assetMap, dirName, baseName);
    const imagePathStrings = imagePaths.map(({ path }) => path);
    const xmlPathStrings = xmlPaths.map(({ path }) => path);
    await onAfter(baseName, dumpLocation, imagePathStrings, xmlPathStrings);
}
exports.dumpSwf = dumpSwf;
function getAssetMapFromSWF(swf) {
    var _a;
    const assetMap = new Map();
    for (const tag of swf.tags) {
        if (tag.header.code == 76) {
            for (const asset of tag.symbols) {
                const current = (_a = assetMap.get(asset.id)) !== null && _a !== void 0 ? _a : [];
                assetMap.set(asset.id, [...current, asset.name]);
            }
        }
    }
    return assetMap;
}
async function extractSwfImages(swf, assetMap, folderName, basename) {
    var _a;
    const images = await Promise.all(extractImages(swf.tags));
    const imagePaths = [];
    for (const image of images) {
        const assets = (_a = assetMap.get(image.characterId)) !== null && _a !== void 0 ? _a : [];
        for (const rawName of assets) {
            const fileName = rawName.substr(basename.length + 1) + ".png";
            const savePath = path.join(folderName, basename, fileName);
            await fs_1.promises.writeFile(savePath, image.imgData, "binary");
            imagePaths.push({ path: savePath, buffer: image.imgData });
        }
    }
    return imagePaths;
}
async function extractXml(swf, assetMap, folderName, basename) {
    var _a;
    const xmlPaths = [];
    for (const tag of swf.tags) {
        if (tag.header.code == 87) {
            const buffer = tag.data;
            const characterId = buffer.readUInt16LE();
            const value = (_a = assetMap.get(characterId)) !== null && _a !== void 0 ? _a : [];
            for (const rawName of value) {
                const fileName = rawName.substr(basename.length + 1) + ".bin";
                const savePath = path.join(folderName, fileName);
                const data = buffer.subarray(6);
                await fs_1.promises.writeFile(savePath, data, "binary");
                xmlPaths.push({ path: savePath, buffer: data });
            }
        }
    }
    return xmlPaths;
}
