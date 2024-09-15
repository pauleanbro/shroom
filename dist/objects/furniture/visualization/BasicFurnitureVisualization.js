"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicFurnitureVisualization = exports.StaticFurnitureVisualization = void 0;
const FurnitureVisualization_1 = require("./FurnitureVisualization");
class StaticFurnitureVisualization extends FurnitureVisualization_1.FurnitureVisualization {
    constructor() {
        super(...arguments);
        this._sprites = [];
        this._refreshFurniture = false;
    }
    setView(view) {
        super.setView(view);
        this._update();
    }
    updateDirection(direction) {
        if (this._currentDirection === direction)
            return;
        this._currentDirection = direction;
        this._update();
    }
    updateAnimation(animation) {
        if (this._animationId === animation)
            return;
        this._animationId = animation;
        this._update();
    }
    updateFrame() {
        if (!this.mounted)
            return;
        if (this._refreshFurniture) {
            this._refreshFurniture = false;
            this._update();
        }
    }
    update() {
        this._update();
    }
    destroy() {
        // Do nothing
    }
    _update() {
        if (this._currentDirection == null)
            return;
        this.view.setDisplayAnimation(this._animationId);
        this.view.setDisplayDirection(this._currentDirection);
        this.view.updateDisplay();
        this.view.getLayers().forEach((layer) => layer.setCurrentFrameIndex(0));
    }
}
exports.StaticFurnitureVisualization = StaticFurnitureVisualization;
/**
 * @deprecated Use `StaticFurnitureVisualization`
 */
exports.BasicFurnitureVisualization = StaticFurnitureVisualization;
