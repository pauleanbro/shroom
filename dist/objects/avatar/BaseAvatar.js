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
exports.BaseAvatar = void 0;
const PIXI = __importStar(require("pixi.js"));
const ClickHandler_1 = require("../hitdetection/ClickHandler");
const HitSprite_1 = require("../hitdetection/HitSprite");
const isSetEqual_1 = require("../../util/isSetEqual");
const AvatarFigurePartType_1 = require("./enum/AvatarFigurePartType");
const EventManager_1 = require("../events/EventManager");
const IEventGroup_1 = require("../events/interfaces/IEventGroup");
const EventOverOutHandler_1 = require("../events/EventOverOutHandler");
const bodyPartTypes = new Set([
    AvatarFigurePartType_1.AvatarFigurePartType.Head,
    AvatarFigurePartType_1.AvatarFigurePartType.Body,
    AvatarFigurePartType_1.AvatarFigurePartType.LeftHand,
    AvatarFigurePartType_1.AvatarFigurePartType.RightHand,
]);
const headPartTypes = new Set([
    AvatarFigurePartType_1.AvatarFigurePartType.Head,
    AvatarFigurePartType_1.AvatarFigurePartType.Face,
    AvatarFigurePartType_1.AvatarFigurePartType.Eyes,
    AvatarFigurePartType_1.AvatarFigurePartType.EyeAccessory,
    AvatarFigurePartType_1.AvatarFigurePartType.Hair,
    AvatarFigurePartType_1.AvatarFigurePartType.HairBig,
    AvatarFigurePartType_1.AvatarFigurePartType.FaceAccessory,
    AvatarFigurePartType_1.AvatarFigurePartType.HeadAccessory,
    AvatarFigurePartType_1.AvatarFigurePartType.HeadAccessoryExtra,
]);
class BaseAvatar extends PIXI.Container {
    /**
     * Sprite Z-Index for hit detection
     */
    get spritesZIndex() {
        return this._spritesZIndex;
    }
    set spritesZIndex(value) {
        this._spritesZIndex = value;
        this._updateSpritesZIndex();
    }
    get dependencies() {
        if (this._dependencies == null)
            throw new Error("Invalid dependencies in BaseAvatar");
        return this._dependencies;
    }
    set dependencies(value) {
        this._dependencies = value;
        this._handleDependenciesSet();
    }
    get mounted() {
        return this._dependencies != null;
    }
    get onClick() {
        return this._clickHandler.onClick;
    }
    set onClick(value) {
        this._clickHandler.onClick = value;
    }
    get onDoubleClick() {
        return this._clickHandler.onDoubleClick;
    }
    set onDoubleClick(value) {
        this._clickHandler.onDoubleClick = value;
    }
    get onPointerDown() {
        return this._clickHandler.onPointerDown;
    }
    set onPointerDown(value) {
        this._clickHandler.onPointerDown = value;
    }
    get onPointerUp() {
        return this._clickHandler.onPointerUp;
    }
    set onPointerUp(value) {
        this._clickHandler.onPointerUp = value;
    }
    get onPointerOut() {
        return this._overOutHandler.onOut;
    }
    set onPointerOut(value) {
        this._overOutHandler.onOut = value;
    }
    get onPointerOver() {
        return this._overOutHandler.onOver;
    }
    set onPointerOver(value) {
        this._overOutHandler.onOver = value;
    }
    get lookOptions() {
        if (this._nextLookOptions != null) {
            return this._nextLookOptions;
        }
        if (this._lookOptions == null)
            throw new Error("Invalid look options");
        return this._lookOptions;
    }
    set lookOptions(lookOptions) {
        this._updateLookOptions(this._lookOptions, lookOptions);
    }
    get currentFrame() {
        return this._currentFrame;
    }
    set currentFrame(value) {
        if (value === this._currentFrame) {
            return;
        }
        this._currentFrame = value;
        this._refreshFrame = true;
    }
    constructor(options) {
        var _a, _b, _c;
        super();
        this._avatarDestroyed = false;
        this._currentFrame = 0;
        this._clickHandler = new ClickHandler_1.ClickHandler();
        this._overOutHandler = new EventOverOutHandler_1.EventOverOutHandler();
        this._refreshFrame = false;
        this._refreshLook = false;
        this._sprites = new Map();
        this._updateId = 0;
        this._spritesZIndex = 0;
        this.x = options.position.x;
        this.y = options.position.y;
        this.zIndex = options.zIndex;
        this.spritesZIndex = options.zIndex;
        this._nextLookOptions = options.look;
        this._onLoad = options.onLoad;
        this._skipBodyParts = (_a = options.skipBodyParts) !== null && _a !== void 0 ? _a : false;
        this._headOnly = (_b = options.headOnly) !== null && _b !== void 0 ? _b : false;
        this._skipCaching = (_c = options.skipCaching) !== null && _c !== void 0 ? _c : false;
    }
    static fromShroom(shroom, options) {
        const avatar = new BaseAvatar({ ...options });
        avatar.dependencies = {
            ...shroom.dependencies,
            eventManager: EventManager_1.NOOP_EVENT_MANAGER,
        };
        return avatar;
    }
    getEventGroupIdentifier() {
        return IEventGroup_1.AVATAR;
    }
    destroy() {
        super.destroy();
        this._destroyAssets();
        if (this._cancelTicker != null) {
            this._cancelTicker();
        }
    }
    _destroyAssets() {
        var _a;
        this._sprites.forEach((sprite) => {
            this._overOutHandler.remove(sprite.events);
            sprite.destroy();
        });
        this._sprites = new Map();
        (_a = this._container) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    _updateSpritesZIndex() {
        this._sprites.forEach((sprite) => {
            sprite.zIndex = this.spritesZIndex;
        });
    }
    _updateLookOptions(oldLookOptions, newLookOptions) {
        if (oldLookOptions == null ||
            !(0, isSetEqual_1.isSetEqual)(oldLookOptions.actions, newLookOptions.actions) ||
            oldLookOptions.look != newLookOptions.look ||
            oldLookOptions.item != newLookOptions.item ||
            oldLookOptions.effect != newLookOptions.effect ||
            oldLookOptions.direction != newLookOptions.direction ||
            oldLookOptions.headDirection != newLookOptions.headDirection) {
            this._nextLookOptions = newLookOptions;
            this._refreshLook = true;
        }
    }
    _updatePosition(definition) {
        if (this._container == null)
            return;
        this._container.x = 0;
        this._container.y = 0;
    }
    _updateSprites() {
        if (this._avatarLoaderResult == null)
            return;
        if (this._lookOptions == null)
            return;
        const definition = this._avatarLoaderResult.getDrawDefinition(this._lookOptions);
        this._avatarDrawDefinition = definition;
        this._updateSpritesWithAvatarDrawDefinition(definition, this.currentFrame);
        this._updatePosition(definition);
    }
    _updateSpritesWithAvatarDrawDefinition(drawDefinition, currentFrame) {
        var _a;
        if (this._destroyed)
            throw new Error("BaseAvatar was destroyed already");
        if (!this.mounted)
            return;
        this._sprites.forEach((value) => {
            value.visible = false;
            value.ignore = true;
        });
        (_a = this._container) === null || _a === void 0 ? void 0 : _a.destroy();
        this._container = new PIXI.Container();
        this._container.sortableChildren = true;
        drawDefinition.getDrawDefinition().forEach((part) => {
            var _a, _b;
            if (part.kind === "AVATAR_DRAW_PART") {
                const figurePart = part.type;
                if (this._skipBodyParts && bodyPartTypes.has(figurePart)) {
                    return;
                }
                if (this._headOnly && !headPartTypes.has(figurePart)) {
                    return;
                }
                const frame = currentFrame % part.assets.length;
                const asset = part.assets[frame];
                let sprite = this._sprites.get(asset.fileId);
                if (sprite == null) {
                    sprite = this._createAsset(part, asset);
                    if (sprite != null) {
                        this._overOutHandler.register(sprite.events);
                    }
                }
                if (sprite == null)
                    return;
                sprite.x = asset.x;
                sprite.y = asset.y;
                sprite.visible = true;
                sprite.mirrored = asset.mirror;
                sprite.ignore = false;
                sprite.zIndex = this.spritesZIndex + part.z;
                this._sprites.set(asset.fileId, sprite);
                (_a = this._container) === null || _a === void 0 ? void 0 : _a.addChild(sprite);
            }
            else if (part.kind === "EFFECT_DRAW_PART") {
                const frame = currentFrame % part.assets.length;
                const asset = part.assets[frame];
                let sprite = this._sprites.get(asset.fileId);
                if (sprite == null) {
                    sprite = this._createAsset(part, asset);
                    if (sprite != null) {
                        this._overOutHandler.register(sprite.events);
                    }
                }
                if (sprite == null)
                    return;
                switch (part.ink) {
                    case 33:
                        sprite.blendMode = PIXI.BLEND_MODES.ADD;
                        break;
                }
                sprite.x =
                    asset.x +
                        (asset.substractWidth != null && asset.substractWidth
                            ? sprite.texture.width
                            : 0);
                sprite.y = asset.y;
                sprite.visible = true;
                sprite.mirrored = asset.mirror;
                sprite.ignore = false;
                sprite.zIndex = this.spritesZIndex + part.z;
                this._sprites.set(asset.fileId, sprite);
                (_b = this._container) === null || _b === void 0 ? void 0 : _b.addChild(sprite);
            }
        });
        this.addChild(this._container);
    }
    _createAsset(part, asset) {
        if (this._avatarLoaderResult == null)
            throw new Error("Cant create asset when avatar loader result not present");
        const texture = this._avatarLoaderResult.getTexture(asset.fileId);
        if (texture == null)
            return;
        const sprite = new HitSprite_1.HitSprite({
            eventManager: this.dependencies.eventManager,
            mirrored: asset.mirror,
            group: this,
        });
        sprite.hitTexture = texture;
        sprite.x = asset.x;
        sprite.y = asset.y;
        sprite.events.addEventListener("click", (event) => {
            this._clickHandler.handleClick(event);
        });
        sprite.events.addEventListener("pointerdown", (event) => {
            this._clickHandler.handlePointerDown(event);
        });
        sprite.events.addEventListener("pointerup", (event) => {
            this._clickHandler.handlePointerUp(event);
        });
        if (part.kind === "AVATAR_DRAW_PART" &&
            part.color != null &&
            part.mode === "colored") {
            sprite.tint = parseInt(part.color.slice(1), 16);
        }
        else {
            sprite.tint = 0xffffff;
        }
        return sprite;
    }
    _reloadLook() {
        if (!this.mounted)
            return;
        const lookOptions = this._nextLookOptions;
        if (lookOptions != null) {
            const requestId = ++this._updateId;
            this.dependencies.avatarLoader
                .getAvatarDrawDefinition({
                ...lookOptions,
                initial: true,
                skipCaching: this._skipCaching,
            })
                .then((result) => {
                if (this._destroyed)
                    return;
                if (requestId !== this._updateId)
                    return;
                this._avatarLoaderResult = result;
                this._lookOptions = lookOptions;
                this._nextLookOptions = undefined;
                // Clear sprite cache, since colors could have changed
                this._destroyAssets();
                this._updateSprites();
                this._onLoad && this._onLoad();
            });
        }
    }
    _updateFrame() {
        if (this._avatarDrawDefinition == null)
            return;
        this._updateSpritesWithAvatarDrawDefinition(this._avatarDrawDefinition, this.currentFrame);
        this._updatePosition(this._avatarDrawDefinition);
    }
    _handleDependenciesSet() {
        this._reloadLook();
        if (this._cancelTicker != null) {
            this._cancelTicker();
        }
        if (this._cancelTicker != null) {
            this._cancelTicker();
        }
        this._cancelTicker = this.dependencies.animationTicker.subscribe(() => {
            if (this._refreshLook) {
                this._refreshLook = false;
                this._reloadLook();
            }
            if (this._refreshFrame) {
                this._refreshFrame = false;
                this._updateFrame();
            }
        });
    }
}
exports.BaseAvatar = BaseAvatar;
