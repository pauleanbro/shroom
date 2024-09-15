"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FurnitureGuildCustomizedVisualization = void 0;
const getIntFromHex_1 = require("../../../util/getIntFromHex");
const AnimatedFurnitureVisualization_1 = require("./AnimatedFurnitureVisualization");
const FurnitureVisualization_1 = require("./FurnitureVisualization");
class FurnitureGuildCustomizedVisualization extends FurnitureVisualization_1.FurnitureVisualization {
    constructor(options = {}) {
        super();
        this._base = new AnimatedFurnitureVisualization_1.AnimatedFurnitureVisualization();
        this._refreshModifier = false;
        this.primaryColor = this._normalizeColor(options.primaryColor);
        this.secondaryColor = this._normalizeColor(options.secondaryColor);
    }
    get primaryColor() {
        return this._primaryColor;
    }
    set primaryColor(value) {
        this._primaryColor = value;
        this._refreshModifier = true;
    }
    get secondaryColor() {
        return this._secondaryColor;
    }
    set secondaryColor(value) {
        this._secondaryColor = value;
        this._refreshModifier = true;
    }
    isAnimated() {
        return true;
    }
    update() {
        this._base.update();
    }
    setView(view) {
        super.setView(view);
        this._base.setView(view);
    }
    destroy() {
        this._base.destroy();
    }
    updateFrame(frame) {
        if (this._refreshModifier) {
            this._refreshModifier = false;
            this._updateModifier();
        }
        this._base.updateFrame(frame);
    }
    updateDirection(direction) {
        this._base.updateDirection(direction);
    }
    updateAnimation(animation) {
        this._base.updateAnimation(animation);
    }
    _updateModifier() {
        this._base.modifier = (part) => {
            return this._modifyPart(part);
        };
    }
    _normalizeColor(color) {
        if (color == null || color.length === 0) {
            return undefined;
        }
        if (color[0] === "#") {
            return color.slice(1);
        }
        return color;
    }
    _modifyPart(part) {
        switch (part.tag) {
            case FurnitureGuildCustomizedVisualization.PRIMARY_COLOR_TAG:
                if (this._primaryColor != null) {
                    part.setColor((0, getIntFromHex_1.getIntFromHex)(this._primaryColor));
                }
                break;
            case FurnitureGuildCustomizedVisualization.SECONDARY_COLOR_TAG:
                if (this._secondaryColor != null) {
                    part.setColor((0, getIntFromHex_1.getIntFromHex)(this._secondaryColor));
                }
                break;
        }
        return part;
    }
}
exports.FurnitureGuildCustomizedVisualization = FurnitureGuildCustomizedVisualization;
FurnitureGuildCustomizedVisualization.PRIMARY_COLOR_TAG = "COLOR1";
FurnitureGuildCustomizedVisualization.SECONDARY_COLOR_TAG = "COLOR2";
