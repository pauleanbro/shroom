"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarEffectBundle = void 0;
const HitTexture_1 = require("../hitdetection/HitTexture");
const AvatarEffectData_1 = require("./data/AvatarEffectData");
const AvatarManifestData_1 = require("./data/AvatarManifestData");
class AvatarEffectBundle {
    constructor(_bundle) {
        this._bundle = _bundle;
        this._textures = new Map();
        this._data = _bundle
            .getString(`animation.bin`)
            .then((xml) => new AvatarEffectData_1.AvatarEffectData(xml));
        this._manifest = _bundle
            .getString(`manifest.bin`)
            .then((xml) => new AvatarManifestData_1.AvatarManifestData(xml));
    }
    async getData() {
        return this._data;
    }
    async getTexture(name) {
        const current = this._textures.get(name);
        if (current != null)
            return current;
        const blob = await this._bundle.getBlob(`${name}.png`);
        const texture = HitTexture_1.HitTexture.fromBlob(blob);
        this._textures.set(name, texture);
        return texture;
    }
    async getManifest() {
        return this._manifest;
    }
}
exports.AvatarEffectBundle = AvatarEffectBundle;
