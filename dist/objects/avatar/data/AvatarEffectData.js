"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarEffectData = void 0;
const getNumberFromAttribute_1 = require("../../../util/getNumberFromAttribute");
class AvatarEffectData {
    constructor(string) {
        this._frameBodyParts = new Map();
        this._frameFxParts = new Map();
        this._sprites = new Map();
        this._additions = new Map();
        this._spriteDirections = new Map();
        this._frameBodyPartsById = new Map();
        this._frameBodyPartByBase = new Map();
        this._frameFxPartsById = new Map();
        const document = new DOMParser().parseFromString(string, "text/xml");
        const frameElements = document.querySelectorAll("animation > frame");
        frameElements.forEach((frame, index) => {
            frame.querySelectorAll("bodypart").forEach((bodypart) => {
                var _a;
                const bodyPart = this._getFrameBodyPartFromElement(bodypart);
                const current = (_a = this._frameBodyParts.get(index)) !== null && _a !== void 0 ? _a : [];
                this._frameBodyParts.set(index, [...current, bodyPart]);
                this._frameBodyPartsById.set(`${bodypart.id}_${index}`, bodyPart);
                if (bodyPart.base != null) {
                    this._frameBodyPartByBase.set(`${bodyPart.base}_${index}`, bodyPart);
                }
            });
            frame.querySelectorAll("fx").forEach((element) => {
                var _a;
                const fxPart = this._getFXPartFromElement(element);
                const current = (_a = this._frameFxParts.get(index)) !== null && _a !== void 0 ? _a : [];
                if (fxPart != null) {
                    this._frameFxParts.set(index, [...current, fxPart]);
                    this._frameFxPartsById.set(`${fxPart.id}_${index}`, fxPart);
                }
            });
        });
        document.querySelectorAll("sprite").forEach((element) => {
            const sprite = this._getEffectSpriteFromElement(element);
            this._sprites.set(sprite.id, sprite);
            element.querySelectorAll("direction").forEach((element) => {
                const direction = this._getDirectionSpriteFromElement(element);
                this._spriteDirections.set(`${sprite.id}_${direction.id}`, direction);
            });
        });
        document.querySelectorAll("add").forEach((element) => {
            const addition = this._getFXAddition(element);
            this._additions.set(addition.id, addition);
        });
        const directionElement = document.querySelector("animation > direction");
        if (directionElement != null) {
            this._direction = this._getDirectionFromElement(directionElement);
        }
        this._frameCount = frameElements.length;
    }
    static async fromUrl(url) {
        const response = await fetch(url);
        const text = await response.text();
        return new AvatarEffectData(text);
    }
    getFrameBodyPartByBase(bodyPartId, frame) {
        return this._frameBodyPartByBase.get(`${bodyPartId}_${frame}`);
    }
    getFrameEffectPart(id, frame) {
        return this._frameFxPartsById.get(`${id}_${frame}`);
    }
    getFrameBodyPart(bodyPartId, frame) {
        return this._frameBodyPartsById.get(`${bodyPartId}_${frame}`);
    }
    getAddtions() {
        return Array.from(this._additions.values());
    }
    getFrameEffectParts(frame) {
        var _a;
        return (_a = this._frameFxParts.get(frame)) !== null && _a !== void 0 ? _a : [];
    }
    getDirection() {
        return this._direction;
    }
    getFrameBodyParts(frame) {
        var _a;
        return (_a = this._frameBodyParts.get(frame)) !== null && _a !== void 0 ? _a : [];
    }
    getFrameCount() {
        return this._frameCount;
    }
    getSprites() {
        return Array.from(this._sprites.values());
    }
    getSpriteDirection(id, direction) {
        return this._spriteDirections.get(`${id}_${direction}`);
    }
    _getFXAddition(element) {
        var _a, _b, _c;
        const id = (_a = element.getAttribute("id")) !== null && _a !== void 0 ? _a : undefined;
        const align = (_b = element.getAttribute("align")) !== null && _b !== void 0 ? _b : undefined;
        const base = (_c = element.getAttribute("base")) !== null && _c !== void 0 ? _c : undefined;
        if (id == null)
            throw new Error("Invalid id");
        return {
            id,
            align,
            base,
        };
    }
    _getFXPartFromElement(element) {
        // action="Default" frame="0" dx="2" dy="0" dd="6"
        const action = element.getAttribute("action");
        const frame = (0, getNumberFromAttribute_1.getNumberFromAttribute)(element.getAttribute("frame"));
        const dx = (0, getNumberFromAttribute_1.getNumberFromAttribute)(element.getAttribute("dx"));
        const dy = (0, getNumberFromAttribute_1.getNumberFromAttribute)(element.getAttribute("dy"));
        const dd = (0, getNumberFromAttribute_1.getNumberFromAttribute)(element.getAttribute("dd"));
        const id = element.getAttribute("id");
        if (id == null)
            throw new Error("Invalid id");
        return {
            id,
            action: action !== null && action !== void 0 ? action : undefined,
            frame,
            dx,
            dy,
            dd,
        };
    }
    _getDirectionFromElement(element) {
        const offset = (0, getNumberFromAttribute_1.getNumberFromAttribute)(element.getAttribute("offset"));
        if (offset == null)
            return;
        return {
            offset,
        };
    }
    _getDirectionSpriteFromElement(element) {
        const id = (0, getNumberFromAttribute_1.getNumberFromAttribute)(element.getAttribute("id"));
        const dz = (0, getNumberFromAttribute_1.getNumberFromAttribute)(element.getAttribute("dz"));
        const dx = (0, getNumberFromAttribute_1.getNumberFromAttribute)(element.getAttribute("dx"));
        const dy = (0, getNumberFromAttribute_1.getNumberFromAttribute)(element.getAttribute("dy"));
        if (id == null)
            throw new Error("Invalid id");
        return {
            id,
            dz,
            dx,
            dy,
        };
    }
    _getEffectSpriteFromElement(element) {
        var _a;
        const id = element.getAttribute("id");
        const ink = (0, getNumberFromAttribute_1.getNumberFromAttribute)(element.getAttribute("ink"));
        const member = (_a = element.getAttribute("member")) !== null && _a !== void 0 ? _a : undefined;
        const staticY = (0, getNumberFromAttribute_1.getNumberFromAttribute)(element.getAttribute("staticY"));
        const directions = element.getAttribute("directions") === "1";
        if (id == null)
            throw new Error("Invalid id");
        return {
            id,
            ink,
            member,
            staticY,
            directions,
        };
    }
    _getFrameBodyPartFromElement(element) {
        var _a, _b;
        const action = (_a = element.getAttribute("action")) !== null && _a !== void 0 ? _a : undefined;
        const id = element.getAttribute("id");
        const frame = (0, getNumberFromAttribute_1.getNumberFromAttribute)(element.getAttribute("frame"));
        const dx = (0, getNumberFromAttribute_1.getNumberFromAttribute)(element.getAttribute("dx"));
        const dy = (0, getNumberFromAttribute_1.getNumberFromAttribute)(element.getAttribute("dy"));
        const dd = (0, getNumberFromAttribute_1.getNumberFromAttribute)(element.getAttribute("dd"));
        const base = (_b = element.getAttribute("base")) !== null && _b !== void 0 ? _b : undefined;
        if (id == null)
            throw new Error("Invalid id");
        return {
            action,
            frame,
            id,
            dx,
            dy,
            dd,
            base,
        };
    }
}
exports.AvatarEffectData = AvatarEffectData;
