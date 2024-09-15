"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FurnitureVisualizationData = void 0;
const XmlData_1 = require("../../../data/XmlData");
const notNullOrUndefined_1 = require("../../../util/notNullOrUndefined");
class FurnitureVisualizationData extends XmlData_1.XmlData {
    constructor(xml) {
        super(xml);
    }
    static async fromUrl(url) {
        const response = await fetch(url);
        const text = await response.text();
        return new FurnitureVisualizationData(text);
    }
    getFrameCountWithoutRepeat(size, animationId) {
        const frameSequences = this.querySelectorAll(`visualization[size="${size}"] animation[id="${animationId}"] frameSequence`);
        let count;
        frameSequences.forEach((element) => {
            const value = element.children.length;
            if (count == null || value > count) {
                count = value;
            }
        });
        return count;
    }
    getTransitionForAnimation(size, transitionTo) {
        var _a;
        const animation = this.querySelector(`visualization[size="${size}"] animations animation[transitionTo="${transitionTo}"]`);
        const animationId = Number((_a = animation === null || animation === void 0 ? void 0 : animation.getAttribute("id")) !== null && _a !== void 0 ? _a : undefined);
        if (isNaN(animationId)) {
            return;
        }
        return {
            id: animationId,
            transitionTo,
        };
    }
    getAnimation(size, animationId) {
        var _a;
        const animation = this.querySelector(`visualization[size="${size}"] animations animation[id="${animationId}"]`);
        if (animation == null)
            return;
        const transitionAnimationId = Number((_a = animation === null || animation === void 0 ? void 0 : animation.getAttribute("transitionTo")) !== null && _a !== void 0 ? _a : undefined);
        return {
            id: animationId,
            transitionTo: isNaN(transitionAnimationId)
                ? undefined
                : transitionAnimationId,
        };
    }
    getColor(size, colorId, layerId) {
        var _a;
        const colorElement = this.querySelector(`visualization[size="${size}"] colors color[id="${colorId}"] colorLayer[id="${layerId}"]`);
        return (_a = colorElement === null || colorElement === void 0 ? void 0 : colorElement.getAttribute("color")) !== null && _a !== void 0 ? _a : undefined;
    }
    getFrameCount(size, animationId) {
        const frameSequences = this.querySelectorAll(`visualization[size="${size}"] animation[id="${animationId}"] frameSequence`);
        let count;
        frameSequences.forEach((element) => {
            var _a;
            const parent = element.parentElement;
            const multiplier = Number((_a = parent === null || parent === void 0 ? void 0 : parent.getAttribute("frameRepeat")) !== null && _a !== void 0 ? _a : "1");
            const value = element.children.length * multiplier;
            if (count == null || value > count) {
                count = value;
            }
        });
        return count;
    }
    getAnimationIds(size) {
        const animations = this.querySelectorAll(`visualization[size="${size}"] animations animation`);
        return animations
            .map((element) => element.getAttribute("id"))
            .filter(notNullOrUndefined_1.notNullOrUndefined)
            .map((id) => Number(id));
    }
    getAnimationLayer(size, animationId, id) {
        var _a, _b;
        const animationLayer = this.querySelector(`visualization[size="${size}"] animations animation[id="${animationId}"] animationLayer[id="${id}"]`);
        if (animationLayer == null)
            return;
        const frameRepeat = Number((_a = animationLayer.getAttribute("frameRepeat")) !== null && _a !== void 0 ? _a : undefined);
        const loopCount = Number((_b = animationLayer.getAttribute("loopCount")) !== null && _b !== void 0 ? _b : undefined);
        const frames = Array.from(animationLayer.querySelectorAll(`frameSequence frame`));
        return {
            id: animationId,
            frames: frames.map((element) => { var _a; return Number((_a = element.getAttribute("id")) !== null && _a !== void 0 ? _a : undefined); }),
            frameRepeat: isNaN(frameRepeat) ? undefined : frameRepeat,
            loopCount: isNaN(loopCount) ? undefined : loopCount,
        };
    }
    getDirections(size) {
        const directions = this.querySelectorAll(`visualization[size="${size}"] directions direction`);
        return directions.map((element) => {
            var _a;
            const id = (_a = element.getAttribute("id")) !== null && _a !== void 0 ? _a : undefined;
            return Number(id);
        });
    }
    getDirectionLayer(size, direction, layerId) {
        const directionLayer = this.querySelector(`visualization[size="${size}"] directions direction[id="${direction}"] layer[id="${layerId}"]`);
        if (directionLayer == null)
            return;
        const z = this._getNumberFromAttributeValue(directionLayer.getAttribute("z"));
        const x = this._getNumberFromAttributeValue(directionLayer.getAttribute("x"));
        const y = this._getNumberFromAttributeValue(directionLayer.getAttribute("y"));
        return {
            z: z,
            x: x,
            y: y,
        };
    }
    getLayerCount(size) {
        var _a;
        const visualization = this.querySelector(`visualization[size="${size}"]`);
        if (visualization == null)
            throw new Error("Invalid visualization");
        return Number((_a = visualization.getAttribute("layerCount")) !== null && _a !== void 0 ? _a : undefined);
    }
    getLayer(size, layerId) {
        var _a, _b, _c, _d, _e, _f;
        const layerElement = this.querySelector(`visualization[size="${size}"] layers layer[id="${layerId}"]`);
        if (layerElement == null)
            return;
        const id = (_a = layerElement.getAttribute("id")) !== null && _a !== void 0 ? _a : undefined;
        const z = (_b = layerElement.getAttribute("z")) !== null && _b !== void 0 ? _b : undefined;
        const tag = (_c = layerElement.getAttribute("tag")) !== null && _c !== void 0 ? _c : undefined;
        const alpha = (_d = layerElement.getAttribute("alpha")) !== null && _d !== void 0 ? _d : undefined;
        const ink = (_e = layerElement.getAttribute("ink")) !== null && _e !== void 0 ? _e : undefined;
        const ignoreMouse = (_f = layerElement.getAttribute("ignoreMouse")) !== null && _f !== void 0 ? _f : undefined;
        const idNumber = Number(id);
        const zNumber = Number(z);
        const alphaNumber = Number(alpha);
        if (isNaN(idNumber))
            throw new Error("Invalid layer id");
        return {
            id: idNumber,
            z: isNaN(zNumber) ? 0 : zNumber,
            alpha: isNaN(alphaNumber) ? undefined : alphaNumber,
            tag: tag !== null && tag !== void 0 ? tag : undefined,
            ink: ink !== null && ink !== void 0 ? ink : undefined,
            ignoreMouse: ignoreMouse != null ? ignoreMouse === "1" : undefined,
        };
    }
    toJson() {
        return {
            ...this._getJsonForSize(64),
        };
    }
    _toJsonMap(arr, getKey) {
        const map = {};
        arr.forEach((value) => {
            const key = getKey(value);
            if (key != null) {
                map[key] = value;
            }
        });
        return map;
    }
    _getJsonAnimations(size) {
        const arr = Array.from(this.document.querySelectorAll(`visualization[size="${size}"] animations animation`))
            .map((element) => {
            const layers = Array.from(element.querySelectorAll(`animationLayer`))
                .map((element) => {
                const id = this._getNumberFromAttributeValue(element.getAttribute("id"));
                const frames = Array.from(element.querySelectorAll(`frame`))
                    .map((element) => element.getAttribute("id"))
                    .filter(notNullOrUndefined_1.notNullOrUndefined)
                    .map((id) => Number(id));
                const frameRepeat = this._getNumberFromAttributeValue(element.getAttribute("frameRepeat"));
                const loopCount = this._getNumberFromAttributeValue(element.getAttribute("loopCount"));
                const random = this._getNumberFromAttributeValue(element.getAttribute("random")) === 1;
                if (id == null)
                    return;
                return {
                    id,
                    frames,
                    frameRepeat,
                    loopCount,
                    random,
                };
            })
                .filter(notNullOrUndefined_1.notNullOrUndefined);
            const animationId = this._getNumberFromAttributeValue(element.getAttribute("id"));
            const transitionTo = this._getNumberFromAttributeValue(element.getAttribute("transitionTo"));
            if (animationId == null)
                return null;
            return {
                id: animationId,
                layers: this._toJsonMap(layers, (layer) => layer.id.toString()),
                transitionTo,
            };
        })
            .filter(notNullOrUndefined_1.notNullOrUndefined);
        return this._toJsonMap(arr, (element) => element.id.toString());
    }
    _getJsonColors(size) {
        const arr = Array.from(this.document.querySelectorAll(`visualization[size="${size}"] colors color`)).map((element) => {
            const colorId = element.getAttribute("id");
            const colorLayers = Array.from(element.querySelectorAll("colorLayer")).map((element) => {
                const layerId = element.getAttribute("id");
                const color = element.getAttribute("color");
                if (color == null)
                    throw new Error("Invalid color");
                return {
                    id: layerId,
                    color,
                };
            });
            return {
                id: colorId,
                layers: this._toJsonMap(colorLayers, (layer) => layer.id),
            };
        });
        return this._toJsonMap(arr, (value) => value.id);
    }
    _getDirections(size) {
        const arr = Array.from(this.document.querySelectorAll(`visualization[size="${size}"] directions direction`)).map((element) => {
            const id = element.getAttribute("id");
            const layers = Array.from(element.querySelectorAll("layer")).map((element) => {
                const id = element.getAttribute("id");
                const x = this._getNumberFromAttributeValue(element.getAttribute("x"));
                const y = this._getNumberFromAttributeValue(element.getAttribute("y"));
                const z = this._getNumberFromAttributeValue(element.getAttribute("z"));
                return {
                    id,
                    x,
                    y,
                    z,
                };
            });
            return {
                id,
                layers: this._toJsonMap(layers, (layer) => layer.id),
            };
        });
        return this._toJsonMap(arr, (direction) => direction.id);
    }
    _getLayers(size) {
        const arr = Array.from(this.document.querySelectorAll(`visualization[size="${size}"] layers layer`)).map((element) => {
            var _a, _b;
            const id = this._getNumberFromAttributeValue(element.getAttribute("id"));
            const ink = (_a = element.getAttribute("ink")) !== null && _a !== void 0 ? _a : undefined;
            const alpha = this._getNumberFromAttributeValue(element.getAttribute("alpha"));
            const z = this._getNumberFromAttributeValue(element.getAttribute("z"));
            const ignoreMouse = this._getNumberFromAttributeValue(element.getAttribute("ignoreMouse")) === 1;
            const tag = (_b = element.getAttribute("tag")) !== null && _b !== void 0 ? _b : undefined;
            if (id == null)
                throw new Error("Invalid id");
            return {
                id,
                z: z !== null && z !== void 0 ? z : 0,
                alpha,
                ignoreMouse,
                ink,
                tag,
            };
        });
        return this._toJsonMap(arr, (layer) => layer.id.toString());
    }
    _getJsonForSize(size) {
        return {
            [size.toString()]: {
                layerCount: this.getLayerCount(size),
                animations: this._getJsonAnimations(size),
                colors: this._getJsonColors(size),
                directions: this._getDirections(size),
                layers: this._getLayers(size),
            },
        };
    }
    _getNumberFromAttributeValue(value) {
        if (value == null)
            return undefined;
        const numberValue = Number(value);
        if (isNaN(numberValue))
            return undefined;
        return numberValue;
    }
}
exports.FurnitureVisualizationData = FurnitureVisualizationData;
