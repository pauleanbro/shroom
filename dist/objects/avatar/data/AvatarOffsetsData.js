"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarOffsetsData = void 0;
class AvatarOffsetsData {
    constructor(_json) {
        this._json = _json;
    }
    static async fromUrl(url) {
        const response = await fetch(url);
        const json = await response.json();
        return new AvatarOffsetsData(json);
    }
    getOffsets(fileName) {
        return this._json[fileName];
    }
}
exports.AvatarOffsetsData = AvatarOffsetsData;
