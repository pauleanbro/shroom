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
exports.HitSprite = void 0;
const PIXI = __importStar(require("pixi.js"));
const rxjs_1 = require("rxjs");
const EventEmitter_1 = require("../events/EventEmitter");
class HitSprite extends PIXI.Sprite {
    get events() {
        return this._eventEmitter;
    }
    constructor({ eventManager, mirrored = false, getHitmap, tag, group, }) {
        super();
        this._ignore = false;
        this._ignoreMouse = false;
        this._rectangleSubject = new rxjs_1.BehaviorSubject(undefined);
        this._eventEmitter = new EventEmitter_1.EventEmitter();
        this._group = group;
        this._mirrored = mirrored;
        this._getHitmap = getHitmap;
        this._tag = tag;
        this.mirrored = this._mirrored;
        this._eventManager = eventManager;
        eventManager.register(this);
    }
    getGroup() {
        return this._group;
    }
    getRectangleObservable() {
        return this._rectangleSubject;
    }
    getEventZOrder() {
        return this.zIndex;
    }
    triggerPointerTargetChanged(event) {
        event.tag = this._tag;
        this._eventEmitter.trigger("pointertargetchanged", event);
    }
    triggerClick(event) {
        event.tag = this._tag;
        this._eventEmitter.trigger("click", event);
    }
    triggerPointerDown(event) {
        event.tag = this._tag;
        this._eventEmitter.trigger("pointerdown", event);
    }
    triggerPointerUp(event) {
        event.tag = this._tag;
        this._eventEmitter.trigger("pointerup", event);
    }
    triggerPointerOver(event) {
        event.tag = this._tag;
        this._eventEmitter.trigger("pointerover", event);
    }
    triggerPointerOut(event) {
        event.tag = this._tag;
        this._eventEmitter.trigger("pointerout", event);
    }
    createDebugSprite() {
        if (this._hitTexture == null)
            return;
        const hitMap = this._hitTexture.getHitMap();
        if (hitMap == null)
            return;
        const sprite = new PIXI.TilingSprite(PIXI.Texture.WHITE, this._hitTexture.texture.width, this._hitTexture.texture.height);
        sprite.alpha = 0.1;
        sprite.x = this.getGlobalPosition().x;
        sprite.y = this.getGlobalPosition().y;
        return sprite;
    }
    get ignoreMouse() {
        return this._ignoreMouse;
    }
    set ignoreMouse(value) {
        this._ignoreMouse = value;
    }
    get group() {
        return this._group;
    }
    get ignore() {
        return this._ignore;
    }
    set ignore(value) {
        this._ignore = value;
    }
    get mirrored() {
        return this._mirrored;
    }
    set mirrored(value) {
        this._mirrored = value;
        this.scale.x = this._mirrored ? -1 : 1;
    }
    get hitTexture() {
        return this._hitTexture;
    }
    set hitTexture(value) {
        if (value != null) {
            this.texture = value.texture;
            this._hitTexture = value;
            this._getHitmap = () => (x, y, transform) => value.hits(x, y, transform, {
                mirrorHorizonally: this._mirrored,
            });
        }
    }
    getHitDetectionZIndex() {
        return this.zIndex;
    }
    destroy() {
        super.destroy();
        this._eventManager.remove(this);
    }
    getHitBox() {
        const pos = this.getGlobalPosition();
        if (this._mirrored) {
            return {
                x: pos.x - this.texture.width,
                y: pos.y,
                width: this.texture.width,
                height: this.texture.height,
            };
        }
        return {
            x: pos.x,
            y: pos.y,
            width: this.texture.width,
            height: this.texture.height,
        };
    }
    hits(x, y) {
        if (this._getHitmap == null)
            return false;
        if (this.ignore)
            return false;
        if (this.ignoreMouse)
            return false;
        const hitBox = this.getHitBox();
        const inBoundsX = hitBox.x <= x && x <= hitBox.x + hitBox.width;
        const inBoundsY = hitBox.y <= y && y <= hitBox.y + hitBox.height;
        if (inBoundsX && inBoundsY) {
            const hits = this._getHitmap();
            return hits(x, y, {
                x: this.getGlobalPosition().x,
                y: this.getGlobalPosition().y,
            });
        }
        return false;
    }
    updateTransform() {
        super.updateTransform();
        this._rectangleSubject.next(this.getHitBox());
    }
}
exports.HitSprite = HitSprite;
