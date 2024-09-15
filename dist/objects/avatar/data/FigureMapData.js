"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FigureMapData = void 0;
const AvatarData_1 = require("./AvatarData");
function _getLibraryForPartKey(id, type) {
    return `${id}_${type}`;
}
class FigureMapData extends AvatarData_1.AvatarData {
    constructor(xml) {
        super(xml);
        this._libraryForPartMap = new Map();
        this._allLibraries = [];
        this._cacheData();
    }
    static async fromUrl(url) {
        const response = await fetch(url);
        const text = await response.text();
        return new FigureMapData(text);
    }
    getLibraryOfPart(id, type) {
        const typeProcessed = type === "hrb" ? "hr" : type;
        return this._libraryForPartMap.get(_getLibraryForPartKey(id, typeProcessed));
    }
    getLibraries() {
        return this._allLibraries;
    }
    _cacheData() {
        const allLibraries = this.querySelectorAll(`lib`);
        allLibraries.forEach((element) => {
            const libraryId = element.getAttribute("id");
            if (libraryId == null)
                return;
            this._allLibraries.push(libraryId);
            const parts = Array.from(element.querySelectorAll("part"));
            parts.forEach((part) => {
                const partId = part.getAttribute("id");
                const partType = part.getAttribute("type");
                if (partId == null)
                    return;
                if (partType == null)
                    return;
                this._libraryForPartMap.set(_getLibraryForPartKey(partId, partType), libraryId);
            });
        });
    }
}
exports.FigureMapData = FigureMapData;
