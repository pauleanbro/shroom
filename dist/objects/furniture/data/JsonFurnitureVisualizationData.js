"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFurnitureVisualizationData = void 0;
class JsonFurnitureVisualizationData {
    constructor(_furniture) {
        this._furniture = _furniture;
    }
    getLayerCount(size) {
        return this._getVisualization(size).layerCount;
    }
    getLayer(size, layerId) {
        return this._getVisualization(size).layers[layerId.toString()];
    }
    getDirections(size) {
        return Object.keys(this._getVisualization(size).directions).map((direction) => Number(direction));
    }
    getDirectionLayer(size, direction, layerId) {
        var _a;
        return (_a = this._getVisualization(size).directions[direction.toString()]) === null || _a === void 0 ? void 0 : _a.layers[layerId.toString()];
    }
    getAnimationLayer(size, animationId, id) {
        var _a;
        return (_a = this._getVisualization(size).animations[animationId.toString()]) === null || _a === void 0 ? void 0 : _a.layers[id.toString()];
    }
    getFrameCountWithoutRepeat(size, animationId) {
        var _a;
        let count = 1;
        Object.values((_a = this._getVisualization(size).animations[animationId.toString()]) !== null && _a !== void 0 ? _a : {}).forEach((layers) => {
            Object.values(layers !== null && layers !== void 0 ? layers : {}).forEach((layer) => {
                var _a;
                const frameCount = (_a = layer === null || layer === void 0 ? void 0 : layer.frames.length) !== null && _a !== void 0 ? _a : 0;
                const value = frameCount;
                if (value > count) {
                    count = value;
                }
            });
        });
        return count;
    }
    getFrameCount(size, animationId) {
        var _a;
        let count = 1;
        Object.values((_a = this._getVisualization(size).animations[animationId.toString()]) !== null && _a !== void 0 ? _a : {}).forEach((layers) => {
            Object.values(layers !== null && layers !== void 0 ? layers : {}).forEach((layer) => {
                var _a, _b;
                const frameCount = (_a = layer === null || layer === void 0 ? void 0 : layer.frames.length) !== null && _a !== void 0 ? _a : 0;
                const multiplier = (_b = layer === null || layer === void 0 ? void 0 : layer.frameRepeat) !== null && _b !== void 0 ? _b : 1;
                const value = frameCount * multiplier;
                if (value > count) {
                    count = value;
                }
            });
        });
        return count;
    }
    getColor(size, colorId, layerId) {
        var _a, _b;
        return (_b = (_a = this._getVisualization(size).colors[colorId.toString()]) === null || _a === void 0 ? void 0 : _a.layers[layerId.toString()]) === null || _b === void 0 ? void 0 : _b.color;
    }
    getAnimation(size, animationId) {
        const animation = this._getVisualization(size).animations[animationId.toString()];
        if (animation != null) {
            return {
                transitionTo: animation.transitionTo,
                id: animationId,
            };
        }
    }
    getTransitionForAnimation(size, transitionTo) {
        const animations = Object.entries(this._getVisualization(size).animations);
        const animationTransitionTo = animations.find(([id, animation]) => (animation === null || animation === void 0 ? void 0 : animation.transitionTo) === transitionTo);
        if (animationTransitionTo != null) {
            const animationId = Number(animationTransitionTo[0]);
            return {
                id: animationId,
                transitionTo,
            };
        }
    }
    _getVisualization(size) {
        const visualization = this._furniture[size.toString()];
        if (visualization == null) {
            throw new Error("Invalid visualization");
        }
        return visualization;
    }
}
exports.JsonFurnitureVisualizationData = JsonFurnitureVisualizationData;
