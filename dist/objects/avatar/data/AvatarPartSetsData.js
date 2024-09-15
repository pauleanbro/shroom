"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarPartSetsData = void 0;
const AvatarData_1 = require("./AvatarData");
const partsets_xml_1 = require("./static/partsets.xml");
class AvatarPartSetsData extends AvatarData_1.AvatarData {
    constructor(xml) {
        super(xml);
    }
    static async fromUrl(url) {
        const response = await fetch(url);
        const text = await response.text();
        return new AvatarPartSetsData(text);
    }
    static default() {
        return new AvatarPartSetsData(atob(partsets_xml_1.partsetsXml));
    }
    getPartInfo(id) {
        var _a, _b;
        const element = this.querySelector(`partSet part[set-type="${id}"]`);
        if (element == null)
            return;
        return {
            flippedSetType: (_a = element.getAttribute("flipped-set-type")) !== null && _a !== void 0 ? _a : undefined,
            removeSetType: (_b = element.getAttribute("remove-set-type")) !== null && _b !== void 0 ? _b : undefined,
        };
    }
    getActivePartSet(id) {
        const partSet = this.querySelectorAll(`activePartSet[id="${id}"] activePart`);
        return new Set(partSet.map((value) => {
            const setType = value.getAttribute("set-type");
            if (setType == null)
                throw new Error("Invalid set type");
            return setType;
        }));
    }
}
exports.AvatarPartSetsData = AvatarPartSetsData;
