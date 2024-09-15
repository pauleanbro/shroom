"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarGeometryData = void 0;
const getNumberFromAttribute_1 = require("../../../util/getNumberFromAttribute");
const geometry_xml_1 = require("./static/geometry.xml");
class AvatarGeometryData {
    constructor(string) {
        this._bodypartMap = new Map();
        this._avatarSetMap = new Map();
        this._geometries = new Map();
        this._bodyPartItemMap = new Map();
        const document = new DOMParser().parseFromString(string, "text/xml");
        document
            .querySelectorAll(`canvas[scale="h"] geometry`)
            .forEach((element) => {
            const geometry = this._getGeometryFromElement(element);
            this._geometries.set(geometry.id, geometry);
        });
        document.querySelectorAll(`avatarset`).forEach((element) => {
            const avatarSetId = element.getAttribute("id");
            if (avatarSetId == null)
                return;
            const bodyParts = element.querySelectorAll(`bodypart`);
            bodyParts.forEach((bodyPart) => {
                var _a;
                const id = bodyPart.getAttribute("id");
                if (id != null) {
                    const current = (_a = this._avatarSetMap.get(avatarSetId)) !== null && _a !== void 0 ? _a : [];
                    this._avatarSetMap.set(avatarSetId, [...current, id]);
                }
            });
        });
        document.querySelectorAll(`type`).forEach((element) => {
            const typeId = element.getAttribute("id");
            if (typeId == null)
                return;
            element.querySelectorAll(`bodypart`).forEach((bodypart) => {
                const bodyPart = this._getBodyPartFromElement(bodypart);
                if (bodyPart == null)
                    return;
                const bodyPartItems = [];
                bodypart.querySelectorAll(`item`).forEach((item) => {
                    const bodyPartItem = this._getBodyPartItemFromElement(item);
                    if (bodyPartItem != null) {
                        bodyPartItems.push(bodyPartItem);
                        this._bodyPartItemMap.set(`${typeId}_${bodyPart.id}_${bodyPartItem.id}`, bodyPartItem);
                    }
                });
                this._bodypartMap.set(`${typeId}_${bodyPart.id}`, {
                    ...bodyPart,
                    items: bodyPartItems,
                });
            });
        });
    }
    static async fromUrl(url) {
        const response = await fetch(url);
        const text = await response.text();
        return new AvatarGeometryData(text);
    }
    static default() {
        return new AvatarGeometryData(atob(geometry_xml_1.geometryXml));
    }
    getBodyPartItem(geometry, bodyPartId, itemId) {
        return this._bodyPartItemMap.get(`${geometry}_${bodyPartId}_${itemId}`);
    }
    getBodyPart(geometry, bodyPartId) {
        return this._bodypartMap.get(`${geometry}_${bodyPartId}`);
    }
    getBodyParts(avaterSet) {
        var _a;
        return (_a = this._avatarSetMap.get(avaterSet)) !== null && _a !== void 0 ? _a : [];
    }
    getGeometry(geometry) {
        return this._geometries.get(geometry);
    }
    _getGeometryFromElement(element) {
        const id = element.getAttribute("id");
        const width = Number(element.getAttribute("width"));
        const height = Number(element.getAttribute("height"));
        const dx = Number(element.getAttribute("dx"));
        const dy = Number(element.getAttribute("dy"));
        if (id == null)
            throw new Error("Invalid id");
        return {
            id,
            width,
            height,
            dx,
            dy,
        };
    }
    _getBodyPartFromElement(item) {
        const id = item.getAttribute("id");
        const z = Number(item.getAttribute("z"));
        if (id == null)
            return;
        if (isNaN(z))
            return;
        return {
            id,
            z,
        };
    }
    _getBodyPartItemFromElement(item) {
        const id = item.getAttribute("id");
        const z = (0, getNumberFromAttribute_1.getNumberFromAttribute)(item.getAttribute("z"));
        const radius = (0, getNumberFromAttribute_1.getNumberFromAttribute)(item.getAttribute("radius"));
        if (id == null)
            return;
        if (z == null)
            return;
        if (radius == null)
            return;
        return {
            id,
            z,
            radius,
        };
    }
}
exports.AvatarGeometryData = AvatarGeometryData;
