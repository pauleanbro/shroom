"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarManifestData = void 0;
const AvatarData_1 = require("./AvatarData");
class AvatarManifestData extends AvatarData_1.AvatarData {
    constructor(xml) {
        super(xml);
        this._assets = [];
        this._assetbyName = new Map();
        this._aliases = [];
        this._cacheData();
    }
    getAliases() {
        return this._aliases;
    }
    getAssets() {
        return this._assets;
    }
    getAssetByName(name) {
        return this._assetbyName.get(name);
    }
    _cacheData() {
        const assets = this.querySelectorAll(`assets asset`);
        const aliases = this.querySelectorAll(`aliases alias`);
        for (const asset of assets) {
            const offsetParam = asset.querySelector(`param[key="offset"]`);
            const value = offsetParam === null || offsetParam === void 0 ? void 0 : offsetParam.getAttribute("value");
            const name = asset.getAttribute("name");
            if (value != null && name != null) {
                const offsets = value.split(",");
                const x = Number(offsets[0]);
                const y = Number(offsets[1]);
                const asset = { name, x, y, flipH: false, flipV: false };
                this._assets.push(asset);
                this._assetbyName.set(name, asset);
            }
        }
        for (const alias of aliases) {
            const name = alias.getAttribute("name");
            const link = alias.getAttribute("link");
            const fliph = alias.getAttribute("fliph") === "1";
            const flipv = alias.getAttribute("flipv") === "1";
            if (name != null && link != null) {
                const alias = {
                    name,
                    link,
                    fliph,
                    flipv,
                };
                this._aliases.push(alias);
            }
        }
    }
}
exports.AvatarManifestData = AvatarManifestData;
