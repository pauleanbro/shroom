"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FurnitureIndexData = void 0;
class FurnitureIndexData {
    get visualization() {
        return this._visualization;
    }
    get logic() {
        return this._logic;
    }
    constructor(xml) {
        var _a, _b;
        const document = new DOMParser().parseFromString(xml, "text/xml");
        const object = document.querySelector("object");
        this._visualization = (_a = object === null || object === void 0 ? void 0 : object.getAttribute("visualization")) !== null && _a !== void 0 ? _a : undefined;
        this._logic = (_b = object === null || object === void 0 ? void 0 : object.getAttribute("logic")) !== null && _b !== void 0 ? _b : undefined;
    }
    static async fromUrl(url) {
        const response = await fetch(url);
        const text = await response.text();
        return new FurnitureIndexData(text);
    }
    toJson() {
        return this.toObject();
    }
    toObject() {
        return { visualization: this.visualization, logic: this.logic };
    }
}
exports.FurnitureIndexData = FurnitureIndexData;
