"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarAnimationData = void 0;
const animation_xml_1 = require("./static/animation.xml");
class AvatarAnimationData {
    constructor(xml) {
        this._animationFrames = new Map();
        this._animationFramesCount = new Map();
        const document = new DOMParser().parseFromString(xml, "text/xml");
        // `action[id="${id}"] part[set-type="${type}"] frame`
        document.querySelectorAll("action").forEach((action) => {
            const actionId = action.getAttribute("id");
            if (actionId == null)
                return;
            action.querySelectorAll("part").forEach((part) => {
                const setType = part.getAttribute("set-type");
                if (setType == null)
                    return;
                const frames = [];
                part.querySelectorAll("frame").forEach((frame) => {
                    const animationFrame = this._getAnimationFrameFromElement(frame);
                    frames.push(animationFrame);
                });
                this._animationFrames.set(`${actionId}_${setType}`, frames);
            });
            const partFrameCount = action.querySelectorAll("part:first-child frame")
                .length;
            const offsetsFrameCount = action.querySelectorAll(`offsets frame`).length;
            const frameCount = Math.max(partFrameCount, offsetsFrameCount);
            this._animationFramesCount.set(actionId, frameCount);
            action.querySelectorAll(`offsets frame`).forEach((frame) => {
                const frameId = frame.getAttribute("id");
                if (frameId == null)
                    return;
                frame.querySelectorAll(`directions direction`).forEach((direction) => {
                    const directionId = direction.getAttribute("id");
                    if (directionId == null)
                        return;
                    direction.querySelectorAll(`bodypart`).forEach((bodypart) => {
                        const bodyPartId = bodypart.getAttribute("id");
                        if (bodyPartId == null)
                            return;
                    });
                });
            });
        });
    }
    static async fromUrl(url) {
        const response = await fetch(url);
        const text = await response.text();
        return new AvatarAnimationData(text);
    }
    static default() {
        return new AvatarAnimationData(atob(animation_xml_1.animationXml));
    }
    getAnimationFrame(id, type, frame) {
        const frames = this._animationFrames.get(`${id}_${type}`);
        if (frames == null)
            return;
        const animationFrameElement = frames[frame];
        if (animationFrameElement == null)
            return;
        return animationFrameElement;
    }
    getAnimationFrames(id, type) {
        var _a;
        const key = `${id}_${type}`;
        return (_a = this._animationFrames.get(key)) !== null && _a !== void 0 ? _a : [];
    }
    getAnimationFramesCount(id) {
        var _a;
        return (_a = this._animationFramesCount.get(id)) !== null && _a !== void 0 ? _a : 0;
    }
    getAnimationOffset(id, geometryId, frame, direction) {
        /*
        const bodypart = this.querySelector(
          `action[id="${id}"] offsets frame[id="${frame}"] directions direction[id="${direction}"] bodypart[id="${geometryId}"]`
        );
    
        if (bodypart == null) return { x: 0, y: 0 };
    
        const dx = Number(bodypart.getAttribute("dx"));
        const dy = Number(bodypart.getAttribute("dy"));
    
        if (isNaN(dx) || isNaN(dy)) {
          return { x: 0, y: 0 };
        }
    
        return {
          x: dx,
          y: dy,
        };*/
    }
    _getAnimationOffsetFromElement(bodypart) {
        if (bodypart == null)
            return { x: 0, y: 0 };
        const dx = Number(bodypart.getAttribute("dx"));
        const dy = Number(bodypart.getAttribute("dy"));
        if (isNaN(dx) || isNaN(dy)) {
            return { x: 0, y: 0 };
        }
        return {
            x: dx,
            y: dy,
        };
    }
    _getAnimationFrameFromElement(element) {
        const number = Number(element.getAttribute("number"));
        if (isNaN(number))
            throw new Error("number was NaN");
        const repeatsString = element.getAttribute("repeats");
        let repeats = 2;
        if (repeatsString != null) {
            repeats = Number(repeatsString);
        }
        const assetpartdefinition = element.getAttribute("assetpartdefinition");
        if (assetpartdefinition == null)
            throw new Error("assetpartdefinition was null");
        return {
            number,
            assetpartdefinition,
            repeats,
        };
    }
}
exports.AvatarAnimationData = AvatarAnimationData;
