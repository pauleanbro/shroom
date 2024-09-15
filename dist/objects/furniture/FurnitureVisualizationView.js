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
exports.FurnitureVisualizationView = void 0;
const PIXI = __importStar(require("pixi.js"));
const IEventGroup_1 = require("../events/interfaces/IEventGroup");
const HighlightFilter_1 = require("./filter/HighlightFilter");
const FurnitureSprite_1 = require("./FurnitureSprite");
const highlightFilter = new HighlightFilter_1.HighlightFilter(0x999999, 0xffffff);
class FurnitureVisualizationView {
    get x() {
        if (this._x == null)
            throw new Error("x not set");
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        if (this._y == null)
            throw new Error("y not set");
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    get zIndex() {
        if (this._zIndex == null)
            throw new Error("zIndex not set");
        return this._zIndex;
    }
    set zIndex(value) {
        this._zIndex = value;
    }
    get alpha() {
        if (this._alpha == null)
            throw new Error("alpha not set");
        return this._alpha;
    }
    set alpha(value) {
        this._alpha = value;
    }
    get highlight() {
        if (this._highlight == null)
            throw new Error("highlight not set");
        return this._highlight;
    }
    set highlight(value) {
        this._highlight = value;
    }
    constructor(_eventManager, _clickHandler, _overOutHandler, _container, _furniture) {
        this._eventManager = _eventManager;
        this._clickHandler = _clickHandler;
        this._overOutHandler = _overOutHandler;
        this._container = _container;
        this._furniture = _furniture;
        this._cache = new Map();
    }
    getEventGroupIdentifier() {
        return IEventGroup_1.FURNITURE;
    }
    getLayers() {
        if (this._layers == null)
            throw new Error("Layers not set yet. Call `updateDisplay` before accessing the layers.");
        return this._layers;
    }
    getVisualizationData() {
        return this._furniture.visualizationData;
    }
    setDisplayAnimation(animation) {
        this._animation = animation;
    }
    setDisplayDirection(direction) {
        this._direction = direction;
    }
    updateLayers() {
        var _a;
        (_a = this._layers) === null || _a === void 0 ? void 0 : _a.forEach((layer) => {
            layer.x = this.x;
            layer.y = this.y;
            layer.zIndex = this.zIndex;
            layer.alpha = this.alpha;
            layer.highlight = this.highlight;
            layer.update();
        });
    }
    updateDisplay() {
        var _a;
        if (this._direction == null)
            throw new Error("Direction was not set");
        const direction = this._direction;
        const animation = this._animation;
        (_a = this._layers) === null || _a === void 0 ? void 0 : _a.forEach((layer) => layer.destroy());
        this._layers = this._getDrawDefinition(direction, animation).parts.map((part) => new FurnitureVisualizationLayer(this, this._container, part, this._eventManager, this._clickHandler, this._overOutHandler, (id) => this._furniture.getTexture(id)));
        this.updateLayers();
    }
    destroy() {
        var _a;
        (_a = this._layers) === null || _a === void 0 ? void 0 : _a.forEach((layer) => layer.destroy());
    }
    _getDrawDefinition(direction, animation) {
        animation = animation !== null && animation !== void 0 ? animation : "undefined";
        const key = `${direction}_${animation}`;
        const current = this._cache.get(key);
        if (current != null)
            return current;
        const definition = this._furniture.getDrawDefinition(direction, animation);
        this._cache.set(key, definition);
        return definition;
    }
}
exports.FurnitureVisualizationView = FurnitureVisualizationView;
class FurnitureVisualizationLayer {
    get highlight() {
        if (this._highlight == null)
            throw new Error("highlight not set");
        return this._highlight;
    }
    set highlight(value) {
        if (value === this._highlight)
            return;
        this._highlight = value;
        this._spritesChanged = true;
    }
    get alpha() {
        if (this._alpha == null)
            throw new Error("alpha not set");
        return this._alpha;
    }
    set alpha(value) {
        if (value === this._alpha)
            return;
        this._alpha = value;
        this._spritesChanged = true;
    }
    get x() {
        if (this._x == null)
            throw new Error("x not set");
        return this._x;
    }
    set x(value) {
        if (value === this._x)
            return;
        this._x = value;
        this._spritePositionChanged = true;
    }
    get y() {
        if (this._y == null)
            throw new Error("y not set");
        return this._y;
    }
    set y(value) {
        if (this._y === value)
            return;
        this._y = value;
        this._spritePositionChanged = true;
    }
    get zIndex() {
        if (this._zIndex == null)
            throw new Error("zIndex not set");
        return this._zIndex;
    }
    set zIndex(value) {
        if (this._zIndex === value)
            return;
        this._zIndex = value;
        this._spritePositionChanged = true;
    }
    get tag() {
        var _a;
        return (_a = this._part.layer) === null || _a === void 0 ? void 0 : _a.tag;
    }
    constructor(_parent, _container, _part, _eventManager, _clickHandler, _overOutHandler, _getTexture) {
        this._parent = _parent;
        this._container = _container;
        this._part = _part;
        this._eventManager = _eventManager;
        this._clickHandler = _clickHandler;
        this._overOutHandler = _overOutHandler;
        this._getTexture = _getTexture;
        this._sprites = new Map();
        this._spritePositionChanged = false;
        this._spritesChanged = false;
        this._frameIndex = 0;
        this._mountedSprites = new Set();
        this.frameRepeat = _part.frameRepeat;
        this.layerIndex = _part.layerIndex;
        this.assetCount = _part.assets.length;
    }
    setColor(color) {
        if (this._color === color)
            return;
        this._color = color;
        this._spritesChanged = true;
    }
    setCurrentFrameIndex(value) {
        const previousFrameIndex = this._frameIndex;
        this._frameIndex = value;
        const previousFrame = this._getSprite(previousFrameIndex);
        if (previousFrame != null) {
            this._setSpriteVisible(previousFrame, false);
        }
        const newFrame = this._getSprite(this._frameIndex);
        if (newFrame != null) {
            this._setSpriteVisible(newFrame, true);
            this._addSprite(newFrame);
            if (this._color != null) {
                newFrame.tint = this._color;
            }
        }
    }
    update() {
        if (this._spritePositionChanged) {
            this._spritePositionChanged = false;
            this._updateSpritesPosition();
        }
        if (this._spritesChanged) {
            this._spritesChanged = false;
            this._destroySprites();
            this._updateSprites();
        }
    }
    destroy() {
        this._destroySprites();
    }
    _updateSpritePosition(sprite) {
        sprite.baseX = this.x;
        sprite.baseY = this.y;
        sprite.baseZIndex = this.zIndex;
    }
    _addSprite(sprite) {
        if (this._mountedSprites.has(sprite))
            return;
        this._mountedSprites.add(sprite);
        this._container.addChild(sprite);
        this._overOutHandler.register(sprite.events);
    }
    _destroySprites() {
        this._sprites.forEach((sprite) => {
            this._container.removeChild(sprite);
            this._overOutHandler.remove(sprite.events);
            sprite.destroy();
        });
        this._sprites = new Map();
        this._mountedSprites = new Set();
    }
    _setSpriteVisible(sprite, visible) {
        if (visible) {
            sprite.ignore = false;
            sprite.visible = true;
        }
        else {
            sprite.ignore = true;
            sprite.visible = false;
        }
    }
    _updateSprites() {
        const frameIndex = this._frameIndex;
        const sprite = this._getSprite(frameIndex);
        this._sprites.forEach((sprite) => this._setSpriteVisible(sprite, false));
        if (sprite != null) {
            this._addSprite(sprite);
            this._setSpriteVisible(sprite, true);
        }
    }
    _updateSpritesPosition() {
        this._sprites.forEach((sprite) => {
            this._updateSpritePosition(sprite);
        });
    }
    _getSpriteInfo(frameIndex) {
        const asset = this._part.assets[frameIndex];
        if (asset == null)
            return;
        const texture = this._getTexture(getAssetTextureName(asset));
        return {
            asset,
            texture,
        };
    }
    _getSprite(frameIndex) {
        const current = this._sprites.get(frameIndex);
        if (current != null) {
            return current;
        }
        const spriteInfo = this._getSpriteInfo(frameIndex);
        if (spriteInfo == null)
            return;
        const { z, layer, shadow, mask, tint } = this._part;
        const { asset, texture } = spriteInfo;
        const zIndex = z !== null && z !== void 0 ? z : 0;
        const sprite = new FurnitureSprite_1.FurnitureSprite({
            eventManager: this._eventManager,
            mirrored: asset.flipH,
            tag: layer === null || layer === void 0 ? void 0 : layer.tag,
            group: this._parent,
        });
        const ignoreMouse = (layer === null || layer === void 0 ? void 0 : layer.ignoreMouse) != null && layer.ignoreMouse;
        sprite.ignoreMouse = ignoreMouse;
        sprite.events.addEventListener("click", (event) => {
            this._clickHandler.handleClick(event);
        });
        sprite.events.addEventListener("pointerup", (event) => {
            this._clickHandler.handlePointerUp(event);
        });
        sprite.events.addEventListener("pointerdown", (event) => {
            this._clickHandler.handlePointerDown(event);
        });
        sprite.hitTexture = texture;
        // Apply asset styling
        const highlight = this._highlight && (layer === null || layer === void 0 ? void 0 : layer.ink) == null && !shadow && !mask;
        if (highlight) {
            sprite.filters = [highlightFilter];
        }
        else {
            sprite.filters = [];
        }
        const scaleX = asset.flipH ? -1 : 1;
        const offsetX = +(32 - asset.x * scaleX);
        const offsetY = -asset.y + 16;
        sprite.offsetX = offsetX;
        sprite.offsetY = offsetY;
        sprite.offsetZIndex = zIndex;
        sprite.baseX = this.x;
        sprite.baseY = this.y;
        sprite.baseZIndex = this.zIndex;
        if (shadow) {
            sprite.baseZIndex = this.zIndex;
            sprite.offsetZIndex = -this.zIndex;
        }
        if (tint != null) {
            sprite.tint = parseInt(tint, 16);
        }
        const alpha = this._getAlpha({
            baseAlpha: this.alpha,
            layerAlpha: layer === null || layer === void 0 ? void 0 : layer.alpha,
        });
        if (layer != null) {
            if (layer.ink != null) {
                if (this.highlight) {
                    sprite.visible = false;
                }
                sprite.blendMode =
                    layer.ink === "ADD" ? PIXI.BLEND_MODES.ADD : PIXI.BLEND_MODES.NORMAL;
            }
        }
        if (shadow) {
            if (this.highlight) {
                sprite.visible = false;
                sprite.alpha = 0;
            }
            else {
                sprite.visible = true;
                sprite.alpha = alpha / 5;
            }
        }
        else {
            sprite.visible = true;
            sprite.alpha = alpha;
        }
        if (mask) {
            sprite.tint = 0xffffff;
        }
        if (this._color != null) {
            sprite.tint = this._color;
        }
        this._setSpriteVisible(sprite, false);
        this._sprites.set(frameIndex, sprite);
        this._overOutHandler.register(sprite.events);
        return sprite;
    }
    _getAlpha({ layerAlpha, baseAlpha, }) {
        if (layerAlpha != null)
            return (layerAlpha / 255) * baseAlpha;
        return baseAlpha;
    }
}
const getAssetTextureName = (asset) => { var _a; return (_a = asset.source) !== null && _a !== void 0 ? _a : asset.name; };
