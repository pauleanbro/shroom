"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FigureData = void 0;
const AvatarData_1 = require("./AvatarData");
const _getColorKey = (paletteId, colorId) => {
    return `${paletteId}_${colorId}`;
};
const _getPartsKey = (setType, id) => {
    return `${setType}_${id}`;
};
class FigureData extends AvatarData_1.AvatarData {
    constructor(xml) {
        super(xml);
        this._parts = new Map();
        this._paletteIdForSetType = new Map();
        this._colors = new Map();
        this._hiddenLayers = new Map();
        this._cacheData();
    }
    static async fromUrl(url) {
        const response = await fetch(url);
        const text = await response.text();
        return new FigureData(text);
    }
    getColor(setType, colorId) {
        const paletteId = this._paletteIdForSetType.get(setType);
        if (paletteId == null)
            return;
        return this._colors.get(_getColorKey(paletteId, colorId));
    }
    getParts(setType, id) {
        return this._parts.get(_getPartsKey(setType, id));
    }
    getHiddenLayers(setType, id) {
        var _a;
        return (_a = this._hiddenLayers.get(_getPartsKey(setType, id))) !== null && _a !== void 0 ? _a : [];
    }
    _cacheData() {
        const setTypes = this.querySelectorAll("sets settype");
        const palettes = this.querySelectorAll("colors palette");
        palettes.forEach((palette) => {
            const paletteId = palette.getAttribute("id");
            if (paletteId == null)
                return;
            const colors = Array.from(palette.querySelectorAll("color"));
            colors.forEach((color) => {
                const colorId = color.getAttribute("id");
                if (colorId != null) {
                    this._colors.set(_getColorKey(paletteId, colorId), color.innerHTML);
                }
            });
        });
        setTypes.forEach((element) => {
            const setType = element.getAttribute("type");
            const paletteId = element.getAttribute("paletteid");
            const sets = this.querySelectorAll("set");
            if (setType == null)
                return;
            if (paletteId != null) {
                this._paletteIdForSetType.set(setType, paletteId);
            }
            sets.forEach((set) => {
                const setId = set.getAttribute("id");
                if (setId == null)
                    return;
                const parts = Array.from(set.querySelectorAll("part"));
                const partArr = [];
                const hiddenLayers = [];
                set
                    .querySelectorAll(`hiddenlayers layer`)
                    .forEach((hiddenLayerElement) => {
                    const partType = hiddenLayerElement.getAttribute("parttype");
                    if (partType != null) {
                        hiddenLayers.push(partType);
                    }
                });
                this._hiddenLayers.set(_getPartsKey(setType, setId), hiddenLayers);
                parts
                    .map((part) => {
                    const id = part.getAttribute("id");
                    const type = part.getAttribute("type");
                    const colorable = part.getAttribute("colorable");
                    let index = Number(part.getAttribute("index"));
                    if (isNaN(index)) {
                        index = 0;
                    }
                    if (id == null)
                        throw new Error("Invalid id");
                    if (type == null)
                        throw new Error("Invalid type");
                    return {
                        id,
                        type,
                        colorable: colorable === "1" ? true : false,
                        index,
                    };
                })
                    .forEach((part) => {
                    partArr.push(part);
                });
                this._parts.set(_getPartsKey(setType, setId), partArr);
            });
        });
    }
}
exports.FigureData = FigureData;
