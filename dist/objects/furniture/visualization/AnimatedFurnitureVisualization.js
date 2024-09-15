"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedFurnitureVisualization = void 0;
const FurnitureVisualization_1 = require("./FurnitureVisualization");
class AnimatedFurnitureVisualization extends FurnitureVisualization_1.FurnitureVisualization {
    constructor() {
        super();
        this._animationQueue = [];
        this._sprites = new Set();
        this._disableTransitions = false;
        this._frame = 0;
        this._changeAnimationCount = 0;
        this._lastFramePlayedMap = new Map();
        this._refreshFurniture = false;
        this._refreshFurniture = true;
    }
    get animationId() {
        if (this._overrideAnimation != null) {
            return this._overrideAnimation;
        }
        return this._currentAnimationId;
    }
    set animationId(value) {
        this._overrideAnimation = value;
        this._refreshFurniture = true;
    }
    get modifier() {
        return this._modifier;
    }
    set modifier(value) {
        this._modifier = value;
        this._updateFurniture();
    }
    setCurrentAnimation(newAnimation) {
        this._animationQueueStartFrame = undefined;
        // Skip the transitions of the initial animation change.
        this._animationQueue = this._getAnimationList(this.view.getVisualizationData(), newAnimation);
        this._disableTransitions = this._changeAnimationCount === 0;
        this._changeAnimationCount++;
        this._update();
    }
    updateAnimation(animation) {
        this._updateAnimation(this._currentTargetAnimationId, animation);
    }
    updateDirection(direction) {
        if (this._currentDirection === direction)
            return;
        this._currentDirection = direction;
        this._updateFurniture();
    }
    isLastFramePlayedForLayer(layerIndex) {
        var _a;
        return (_a = this._lastFramePlayedMap.get(layerIndex)) !== null && _a !== void 0 ? _a : false;
    }
    destroy() {
        // Do nothing
    }
    update() {
        if (this._currentDirection == null)
            return;
        this.view.setDisplayDirection(this._currentDirection);
        this.view.updateDisplay();
        this._update();
    }
    updateFrame(frame) {
        if (this._refreshFurniture) {
            this._refreshFurniture = false;
            this._updateFurniture();
        }
        if (this._animationQueueStartFrame == null) {
            this._animationQueueStartFrame = frame;
        }
        if (this._animationQueue.length > 0) {
            const progress = this._getCurrentProgress(frame);
            let frameCounter = 0;
            let animationId;
            let animationFrameCount;
            for (let i = 0; i < this._animationQueue.length; i++) {
                const animation = this._animationQueue[i];
                frameCounter += animation.frameCount;
                if (progress < frameCounter) {
                    animationId = animation.id;
                    animationFrameCount = animation.frameCount;
                    break;
                }
            }
            if (animationId == null ||
                animationFrameCount == null ||
                this._disableTransitions) {
                const animation = this._animationQueue[this._animationQueue.length - 1];
                animationId = animation.id;
                animationFrameCount = animation.frameCount;
            }
            this._setAnimation(animationId);
            this._animationFrameCount = animationFrameCount;
            this._frame = progress;
        }
        this._update(true);
    }
    isAnimated() {
        return true;
    }
    _getCurrentProgress(frame) {
        if (this._animationQueueStartFrame == null) {
            return 0;
        }
        return frame - this._animationQueueStartFrame;
    }
    _setAnimation(animation) {
        if (this._currentAnimationId === animation)
            return;
        this._currentAnimationId = animation;
        this._updateFurniture();
    }
    _updateLayers() {
        if (this.modifier != null) {
            const modifier = this.modifier;
            this.view.getLayers().forEach((layer) => modifier(layer));
        }
    }
    _updateFurniture() {
        var _a, _b;
        if (!this.mounted)
            return;
        this.view.setDisplayDirection((_a = this._currentDirection) !== null && _a !== void 0 ? _a : 0);
        this.view.setDisplayAnimation((_b = this.animationId) === null || _b === void 0 ? void 0 : _b.toString());
        this.view.updateDisplay();
        this._updateLayers();
        this._update();
    }
    _update(skipLayerUpdate = false) {
        var _a;
        const frameCount = (_a = this._animationFrameCount) !== null && _a !== void 0 ? _a : 1;
        this.view.getLayers().forEach((part) => {
            if (this.modifier != null) {
                part = this.modifier(part);
            }
            const frameProgress = this._frame % frameCount;
            let frameIndex = Math.floor(frameProgress / part.frameRepeat);
            const assetCount = part.assetCount - 1;
            if (frameIndex > assetCount) {
                frameIndex = assetCount;
            }
            if (frameProgress === frameCount - 1) {
                this._lastFramePlayedMap.set(part.layerIndex, true);
            }
            else {
                this._lastFramePlayedMap.set(part.layerIndex, false);
            }
            part.setCurrentFrameIndex(frameIndex);
        });
    }
    _getAnimationList(data, target) {
        const animations = [];
        const handleAnimation = (id) => {
            var _a;
            const transition = data.getTransitionForAnimation(64, id);
            if (transition != null) {
                handleAnimation(transition.id);
            }
            const animation = data.getAnimation(64, id);
            const frameCount = (_a = data.getFrameCount(64, id)) !== null && _a !== void 0 ? _a : 1;
            if (animation != null) {
                animations.push({ id: animation.id, frameCount });
            }
        };
        handleAnimation(target);
        if (animations.length === 0) {
            return [{ id: 0, frameCount: 1 }];
        }
        return animations;
    }
    _updateAnimation(oldAnimation, newAnimation) {
        this._currentTargetAnimationId = newAnimation;
        if (newAnimation == null) {
            this.setCurrentAnimation(0);
        }
        else if (oldAnimation == newAnimation) {
            // Do nothing
        }
        else if (oldAnimation != newAnimation) {
            this.setCurrentAnimation(Number(newAnimation));
        }
    }
}
exports.AnimatedFurnitureVisualization = AnimatedFurnitureVisualization;
const getAssetsCount = (part) => {
    if (part.assets == null)
        return 1;
    return part.assets.length;
};
