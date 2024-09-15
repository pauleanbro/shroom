"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarPartList = exports.basePartSet = void 0;
const AvatarFigurePartType_1 = require("../enum/AvatarFigurePartType");
const AvatarPart_1 = require("./AvatarPart");
exports.basePartSet = new Set([
    AvatarFigurePartType_1.AvatarFigurePartType.LeftHand,
    AvatarFigurePartType_1.AvatarFigurePartType.RightHand,
    AvatarFigurePartType_1.AvatarFigurePartType.Body,
    AvatarFigurePartType_1.AvatarFigurePartType.Head,
]);
class AvatarPartList {
    constructor(look, itemId, _deps) {
        this._deps = _deps;
        this._parts = [];
        this._hiddenLayers = new Set();
        this._partsByType = new Map();
        const { figureData } = _deps;
        look.forEach(({ setId, colorId }, setType) => {
            const parts = figureData.getParts(setType, setId.toString());
            const colorValue = figureData.getColor(setType, colorId.toString());
            const hiddenLayers = figureData.getHiddenLayers(setType, setId.toString());
            hiddenLayers.forEach((layer) => this._hiddenLayers.add(layer));
            if (parts != null && parts.length > 0) {
                parts.forEach((part) => {
                    const avatarPart = new AvatarPart_1.AvatarPart(part, colorValue, _deps);
                    this._registerPart(avatarPart);
                });
            }
        });
        if (itemId != null) {
            this._addItem(itemId);
        }
        exports.basePartSet.forEach((partType) => {
            const partsForType = this._partsByType.get(partType);
            if (partsForType == null || partsForType.length === 0) {
                this._registerPart(new AvatarPart_1.AvatarPart({
                    id: "1",
                    type: partType,
                    colorable: false,
                    index: 0,
                }, undefined, _deps));
            }
        });
    }
    getPartsForBodyBart(bodyPart) {
        return bodyPart.items
            .flatMap((bodyPartItem) => {
            var _a;
            return ((_a = this._partsByType.get(bodyPartItem.id)) !== null && _a !== void 0 ? _a : []);
        })
            .filter((part) => !this._hiddenLayers.has(part.type));
    }
    getPartsForType(type) {
        const parts = this._partsByType.get(type);
        if (parts == null)
            return [];
        const sortedParts = [...parts].sort((a, b) => a.index - b.index);
        return sortedParts;
    }
    get parts() {
        return this._parts;
    }
    _addItem(itemId) {
        this._registerPart(new AvatarPart_1.AvatarPart({
            type: "ri",
            colorable: false,
            id: itemId.toString(),
            index: 0,
        }, undefined, this._deps));
    }
    _registerPart(avatarPart) {
        var _a;
        const type = avatarPart.type;
        this._parts.push(avatarPart);
        const current = (_a = this._partsByType.get(type)) !== null && _a !== void 0 ? _a : [];
        this._partsByType.set(type, [...current, avatarPart]);
    }
}
exports.AvatarPartList = AvatarPartList;
