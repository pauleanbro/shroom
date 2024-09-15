"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyAssetBundle = void 0;
class LegacyAssetBundle {
    constructor(_folderUrl) {
        this._folderUrl = _folderUrl;
        this._blobs = new Map();
        this._strings = new Map();
    }
    async getBlob(name) {
        const current = this._blobs.get(name);
        if (current != null)
            return current;
        const imageUrl = `${this._folderUrl}/${name}`;
        const blob = fetch(imageUrl).then((response) => response.blob());
        this._blobs.set(name, blob);
        return blob;
    }
    async getString(name) {
        const current = this._strings.get(name);
        if (current != null)
            return current;
        const imageUrl = `${this._folderUrl}/${name}`;
        const string = fetch(imageUrl).then((response) => response.text());
        this._strings.set(name, string);
        return string;
    }
}
exports.LegacyAssetBundle = LegacyAssetBundle;
