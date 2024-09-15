"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarAssetLibraryCollection = void 0;
const NO_ASSET = Symbol("NO_ASSET");
class AvatarAssetLibraryCollection {
    constructor() {
        this._assets = new Map();
        this._libraries = new Map();
        this._opened = new Set();
        this._loadTextures = new Map();
        this._textures = new Map();
    }
    async open(bundle) {
        if (this._opened.has(bundle))
            return;
        this._opened.add(bundle);
        const manifest = await bundle.getManifest();
        await Promise.all(manifest.getAssets().map(async (asset) => {
            this._assets.set(asset.name, asset);
            this._libraries.set(asset.name, bundle);
        }));
        await Promise.all(manifest.getAliases().map((alias) => {
            const base = manifest.getAssetByName(alias.link);
            if (base != null) {
                this._assets.set(alias.name, {
                    ...base,
                    flipH: alias.fliph,
                    flipV: alias.flipv,
                });
                this._libraries.set(alias.name, bundle);
            }
        }));
    }
    async loadTextures(ids) {
        return Promise.all(ids.map((id) => this._loadTexture(id)));
    }
    getOffsets(fileName) {
        const asset = this._assets.get(fileName);
        if (asset == null)
            return;
        return {
            offsetX: asset.x,
            offsetY: asset.y,
        };
    }
    getTexture(fileName) {
        const texture = this._textures.get(fileName);
        if (texture === NO_ASSET)
            return;
        return texture;
    }
    _loadTexture(id) {
        var _a, _b;
        const current = this._loadTextures.get(id);
        if (current != null)
            return current;
        const actualId = (_b = (_a = this._assets.get(id)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : id;
        const manifestLibrary = this._libraries.get(id);
        if (manifestLibrary == null)
            throw new Error(`Couldn't find library for ${id}`);
        const promise = manifestLibrary.getTexture(actualId).then((value) => {
            this._textures.set(id, value !== null && value !== void 0 ? value : NO_ASSET);
            return value !== null && value !== void 0 ? value : NO_ASSET;
        });
        this._loadTextures.set(id, promise);
        return promise;
    }
}
exports.AvatarAssetLibraryCollection = AvatarAssetLibraryCollection;
