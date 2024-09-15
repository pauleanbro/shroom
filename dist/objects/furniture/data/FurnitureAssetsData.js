"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FurnitureAssetsData = void 0;
const XmlData_1 = require("../../../data/XmlData");
class FurnitureAssetsData extends XmlData_1.XmlData {
    constructor(xml) {
        super(xml);
        this._assets = new Map();
        this.querySelectorAll("asset").forEach((element) => {
            const name = element.getAttribute("name");
            const x = Number(element.getAttribute("x"));
            const y = Number(element.getAttribute("y"));
            const source = element.getAttribute("source");
            const flipH = element.getAttribute("flipH") === "1";
            if (name == null)
                throw new Error("Invalid name");
            if (isNaN(x))
                throw new Error("x is not a number");
            if (isNaN(y))
                throw new Error("y is not a number");
            this._assets.set(name, {
                x,
                y,
                source: source !== null && source !== void 0 ? source : undefined,
                flipH,
                name,
                valid: true,
            });
        });
    }
    static async fromUrl(url) {
        const response = await fetch(url);
        const text = await response.text();
        return new FurnitureAssetsData(text);
    }
    toJson() {
        const assets = this.getAssets();
        const assetsObject = {};
        assets.forEach((asset) => {
            assetsObject[asset.name] = asset;
        });
        return assetsObject;
    }
    getAsset(name) {
        return this._assets.get(name);
    }
    getAssets() {
        return Array.from(this._assets.values());
    }
}
exports.FurnitureAssetsData = FurnitureAssetsData;
