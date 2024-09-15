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
exports.HitTexture = void 0;
const PIXI = __importStar(require("pixi.js"));
const applyTextureProperties_1 = require("../../util/applyTextureProperties");
const loadImageFromBlob_1 = require("../../util/loadImageFromBlob");
class HitTexture {
    get texture() {
        return this._texture;
    }
    constructor(texture) {
        this._texture = texture;
        (0, applyTextureProperties_1.applyTextureProperties)(this._texture);
    }
    static async fromSpriteSheet(spritesheet, name) {
        const texture = spritesheet.textures[name];
        return new HitTexture(texture);
    }
    static async fromBlob(blob) {
        const url = await (0, loadImageFromBlob_1.loadImageFromBlob)(blob);
        return HitTexture.fromUrl(url);
    }
    static async fromUrl(imageUrl) {
        const image = new Image();
        // We set the crossOrigin here so the image element
        // can fetch and display images hosted on another origin.
        // Thanks to @danielsolartech for reporting.
        // TODO: Add option to configure this somewhere?
        image.crossOrigin = "anonymous";
        image.src = imageUrl;
        await new Promise((resolve, reject) => {
            image.onload = () => {
                resolve({ width: image.width, height: image.height });
            };
            image.onerror = (value) => reject(value);
        });
        const texture = PIXI.Texture.from(image);
        return new HitTexture(texture);
    }
    getHitMap() {
        return this._getHitMap();
    }
    hits(x, y, transform, options = { mirrorHorizonally: false }) {
        if (options.mirrorHorizonally) {
            x = -(x - transform.x);
        }
        else {
            x = x - transform.x;
        }
        y = y - transform.y;
        const baseTexture = this._texture.baseTexture;
        const hitmap = this._getHitMap();
        const dx = Math.round(this._texture.orig.x + x * baseTexture.resolution);
        const dy = Math.round(this._texture.orig.y + y * baseTexture.resolution);
        const ind = dx + dy * baseTexture.realWidth;
        const ind1 = ind % 32;
        const ind2 = (ind / 32) | 0;
        return (hitmap[ind2] & (1 << ind1)) !== 0;
    }
    _getHitMap() {
        var _a;
        if (this._cachedHitmap == null) {
            this._cachedHitmap = generateHitMap(this._texture.baseTexture.resource.source);
        }
        return (_a = this._cachedHitmap) !== null && _a !== void 0 ? _a : new Uint8ClampedArray();
    }
}
exports.HitTexture = HitTexture;
function generateHitMap(image) {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    if (context == null)
        throw new Error("Invalid context 2d");
    const threshold = 25;
    const w = canvas.width;
    const h = canvas.height;
    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, w, h);
    const hitmap = new Uint32Array(Math.ceil((w * h) / 32));
    for (let i = 0; i < w * h; i++) {
        const ind1 = i % 32;
        const ind2 = (i / 32) | 0;
        if (imageData.data[i * 4 + 3] >= threshold) {
            hitmap[ind2] = hitmap[ind2] | (1 << ind1);
        }
    }
    return hitmap;
}
