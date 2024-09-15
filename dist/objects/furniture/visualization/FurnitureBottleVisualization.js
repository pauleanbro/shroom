"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FurnitureBottleVisualization = void 0;
const AnimatedFurnitureVisualization_1 = require("./AnimatedFurnitureVisualization");
const FurnitureVisualization_1 = require("./FurnitureVisualization");
class FurnitureBottleVisualization extends FurnitureVisualization_1.FurnitureVisualization {
    constructor() {
        super(...arguments);
        this._base = new AnimatedFurnitureVisualization_1.AnimatedFurnitureVisualization();
        this._stateQueue = [];
        this._running = false;
    }
    isAnimated() {
        return true;
    }
    destroy() {
        this._base.destroy();
    }
    update() {
        this._base.update();
    }
    setView(view) {
        super.setView(view);
        this._base.setView(view);
    }
    updateFrame(frame) {
        if (this._stateQueue.length > 0 &&
            this._base.isLastFramePlayedForLayer(0)) {
            const nextAnimation = this._stateQueue.shift();
            if (nextAnimation != null) {
                this._base.setCurrentAnimation(nextAnimation);
            }
        }
        this._base.updateFrame(frame);
    }
    updateDirection(direction) {
        this._base.updateDirection(direction);
    }
    updateAnimation(animation) {
        if (animation === FurnitureBottleVisualization.ANIMATION_ID_ROLL.toString()) {
            if (!this._running) {
                this._running = true;
                this._stateQueue.push(FurnitureBottleVisualization.ANIMATION_ID_ROLL);
                return;
            }
        }
        const animationNumber = Number(animation);
        // Animation between 0 and 7 is the final value of the bottle. This directly translates to its direction.
        if (animationNumber >= 0 && animationNumber <= 7) {
            if (this._running) {
                this._running = false;
                this._stateQueue.push(FurnitureBottleVisualization.ANIMATION_ID_OFFSET_SLOW1);
                this._stateQueue.push(FurnitureBottleVisualization.ANIMATION_ID_OFFSET_SLOW2 +
                    animationNumber);
                this._stateQueue.push(animationNumber);
                return;
            }
            this._base.updateAnimation(animation);
        }
    }
}
exports.FurnitureBottleVisualization = FurnitureBottleVisualization;
FurnitureBottleVisualization.ANIMATION_ID_OFFSET_SLOW1 = 20;
FurnitureBottleVisualization.ANIMATION_ID_OFFSET_SLOW2 = 9;
FurnitureBottleVisualization.ANIMATION_ID_ROLL = -1;
