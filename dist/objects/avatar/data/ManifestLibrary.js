"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManifestLibrary = void 0;
const HitTexture_1 = require("../../hitdetection/HitTexture");
const AvatarManifestData_1 = require("./AvatarManifestData");
class ManifestLibrary {
    constructor(_bundle) {
        this._bundle = _bundle;
        this._map = new Map();
        this._manifest = _bundle.getString("manifest.bin").then((manifest) => {
            return new AvatarManifestData_1.AvatarManifestData(manifest);
        });
    }
    async getManifest() {
        return this._manifest;
    }
    async getTexture(name) {
        const current = this._map.get(name);
        if (current != null)
            return current;
        const value = this._bundle
            .getBlob(`${name}.png`)
            .then((blob) => HitTexture_1.HitTexture.fromBlob(blob))
            .catch(() => undefined);
        this._map.set(name, value);
        return value;
    }
}
exports.ManifestLibrary = ManifestLibrary;
