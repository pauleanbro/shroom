"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarEffectMap = void 0;
class AvatarEffectMap {
    constructor(string) {
        this._effects = new Map();
        this._effectsArray = [];
        const document = new DOMParser().parseFromString(string, "text/xml");
        document.querySelectorAll("effect").forEach((element) => {
            const effect = this._getEffectFromElement(element);
            this._effects.set(effect.id, effect);
            this._effectsArray.push(effect);
        });
    }
    getEffects() {
        return this._effectsArray;
    }
    getEffectInfo(id) {
        return this._effects.get(id);
    }
    _getEffectFromElement(element) {
        const id = element.getAttribute("id");
        const lib = element.getAttribute("lib");
        const type = element.getAttribute("type");
        if (lib == null)
            throw new Error("Invalid lib for effect");
        if (type == null)
            throw new Error("Invalid type for effect");
        if (id == null)
            throw new Error("Invalid id");
        return {
            id,
            lib,
            type,
        };
    }
}
exports.AvatarEffectMap = AvatarEffectMap;
