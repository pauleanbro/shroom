"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomLandscapeMaskSprite = void 0;
const PIXI = __importStar(require("pixi.js"));
const negativeFilter = new PIXI.filters.ColorMatrixFilter();
negativeFilter.negative(false);
/**
 * This class enables us to create a mask which
 * consists of multiple different sprites.
 *
 * This is important for correctly displaying
 * window furniture with landscapes.
 *
 * Windows usually provide a black mask image. This mask image is used
 * to only display the landscape in the area of the mask image.
 *
 * Since there can be multiple windows, and because of that multiple masks,
 * we need a sprite which is able to combine multiple sprites into a single
 * sprite.
 *
 * This Sprite renders its sub-sprites through `PIXI.RenderTexture`
 * into a single texture, and uses that as a texture for itself.
 */
class RoomLandscapeMaskSprite extends PIXI.Sprite {
    constructor({ roomBounds, renderer, }) {
        super();
        this._sprites = new Set();
        this._roomBounds = roomBounds;
        this._roomWidth = roomBounds.maxX - roomBounds.minX;
        this._roomHeight = roomBounds.maxY - roomBounds.minY;
        this._renderer = renderer;
    }
    addSprite(element) {
        this._sprites.add(element);
        this._updateTexture();
    }
    updateSprite(element) {
        if (!this._sprites.has(element))
            return;
        this._updateTexture();
    }
    removeSprite(element) {
        this._sprites.delete(element);
        this._updateTexture();
    }
    _updateTexture() {
        const texture = PIXI.RenderTexture.create({
            width: this._roomWidth * 2,
            height: this._roomHeight,
        });
        const container = new PIXI.Container();
        this._sprites.forEach((sprite) => {
            // We apply a negative filter to the mask sprite, because the mask assets
            // of the furniture are usually completly black. `pixi.js` requires white
            // images to mask an image.
            sprite.filters = [negativeFilter];
            container.addChild(sprite);
        });
        container.y = -this._roomBounds.minY;
        this.y = this._roomBounds.minY;
        container.x = -this._roomBounds.minX;
        this.x = this._roomBounds.minX;
        this._renderer.render(container, texture);
        this.texture = texture;
    }
}
exports.RoomLandscapeMaskSprite = RoomLandscapeMaskSprite;
