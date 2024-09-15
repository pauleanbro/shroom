"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FurnitureSprite = void 0;
const HitSprite_1 = require("../hitdetection/HitSprite");
class FurnitureSprite extends HitSprite_1.HitSprite {
    constructor() {
        super(...arguments);
        this._baseX = 0;
        this._baseY = 0;
        this._baseZIndex = 0;
        this._offsetX = 0;
        this._offsetY = 0;
        this._offsetZIndex = 0;
    }
    get offsetX() {
        return this._offsetX;
    }
    set offsetX(value) {
        this._offsetX = value;
        this._update();
    }
    get offsetY() {
        return this._offsetY;
    }
    set offsetY(value) {
        this._offsetY = value;
        this._update();
    }
    get offsetZIndex() {
        return this._offsetZIndex;
    }
    set offsetZIndex(value) {
        this._offsetZIndex = value;
        this._update();
    }
    get baseX() {
        return this._baseX;
    }
    set baseX(value) {
        this._baseX = value;
        this._update();
    }
    get baseY() {
        return this._baseY;
    }
    set baseY(value) {
        this._baseY = value;
        this._update();
    }
    get baseZIndex() {
        return this._baseZIndex;
    }
    set baseZIndex(value) {
        this._baseZIndex = value;
        this._update();
    }
    get assetName() {
        return this._assetName;
    }
    set assetName(value) {
        this._assetName = value;
    }
    _update() {
        this.x = this.baseX + this.offsetX;
        this.y = this.baseY + this.offsetY;
        this.zIndex = this.baseZIndex + this.offsetZIndex;
    }
}
exports.FurnitureSprite = FurnitureSprite;
