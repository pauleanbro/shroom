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
exports.BaseFurniture = void 0;
const PIXI = __importStar(require("pixi.js"));
const ClickHandler_1 = require("../hitdetection/ClickHandler");
const HighlightFilter_1 = require("./filter/HighlightFilter");
const FurnitureSprite_1 = require("./FurnitureSprite");
const AnimatedFurnitureVisualization_1 = require("./visualization/AnimatedFurnitureVisualization");
const getDirectionForFurniture_1 = require("./util/getDirectionForFurniture");
const IEventGroup_1 = require("../events/interfaces/IEventGroup");
const EventManager_1 = require("../events/EventManager");
const FurnitureVisualizationView_1 = require("./FurnitureVisualizationView");
const EventOverOutHandler_1 = require("../events/EventOverOutHandler");
const highlightFilter = new HighlightFilter_1.HighlightFilter(0x999999, 0xffffff);
class BaseFurniture {
    constructor({ type, direction, animation = "0", getMaskId = () => undefined, dependencies, onLoad, }) {
        this._sprites = new Map();
        this._x = 0;
        this._y = 0;
        this._zIndex = 0;
        this._direction = 0;
        this._clickHandler = new ClickHandler_1.ClickHandler();
        this._overOutHandler = new EventOverOutHandler_1.EventOverOutHandler();
        this._fallbackVisualization = new AnimatedFurnitureVisualization_1.AnimatedFurnitureVisualization();
        this._refreshPosition = false;
        this._refreshFurniture = false;
        this._refreshZIndex = false;
        this._highlight = false;
        this._alpha = 1;
        this._destroyed = false;
        this._maskNodes = [];
        this._maskSprites = [];
        this._cancelTicker = undefined;
        this._onTicker = () => {
            if (this._refreshFurniture) {
                this._refreshFurniture = false;
                this._updateFurniture();
            }
            if (this._refreshPosition) {
                this._refreshPosition = false;
                this._updatePosition();
            }
            if (this._refreshZIndex) {
                this._refreshZIndex = false;
                this._updateZIndex();
            }
        };
        this._direction = direction;
        this._animation = animation;
        this._type = type;
        this._getMaskId = getMaskId;
        this._onLoad = onLoad;
        if (dependencies != null) {
            this.dependencies = dependencies;
        }
        PIXI.Ticker.shared.add(this._onTicker);
        this._loadFurniResultPromise = new Promise((resolve) => {
            this._resolveLoadFurniResult = resolve;
        });
    }
    static fromRoomContext(context, props) {
        return new BaseFurniture({
            dependencies: {
                placeholder: context.configuration.placeholder,
                animationTicker: context.animationTicker,
                furnitureLoader: context.furnitureLoader,
                visualization: context.visualization,
                application: context.application,
                eventManager: context.eventManager,
            },
            ...props,
        });
    }
    static fromShroom(shroom, container, props) {
        return new BaseFurniture({
            dependencies: {
                animationTicker: shroom.dependencies.animationTicker,
                furnitureLoader: shroom.dependencies.furnitureLoader,
                placeholder: shroom.dependencies.configuration.placeholder,
                application: shroom.dependencies.application,
                eventManager: EventManager_1.NOOP_EVENT_MANAGER,
                visualization: {
                    container,
                    addMask: () => {
                        return {
                            remove: () => {
                                // Do nothing
                            },
                            update: () => {
                                // Do nothing
                            },
                            sprite: null,
                        };
                    },
                },
            },
            ...props,
        });
    }
    get dependencies() {
        if (this._dependencies == null)
            throw new Error("Invalid dependencies");
        return this._dependencies;
    }
    set dependencies(value) {
        this._dependencies = value;
        this._loadFurniture();
    }
    get visualization() {
        if (this._visualization == null)
            return this._fallbackVisualization;
        return this._visualization;
    }
    set visualization(value) {
        var _a;
        (_a = this._visualization) === null || _a === void 0 ? void 0 : _a.destroy();
        this._visualization = value;
        this._updateFurniture();
    }
    get mounted() {
        return this._dependencies != null;
    }
    get extradata() {
        return this._loadFurniResultPromise.then((result) => {
            return result.getExtraData();
        });
    }
    get validDirections() {
        return this._loadFurniResultPromise.then((result) => {
            return result.directions;
        });
    }
    get highlight() {
        return this._highlight;
    }
    set highlight(value) {
        this._highlight = value;
        this._refreshFurniture = true;
    }
    get alpha() {
        return this._alpha;
    }
    set alpha(value) {
        this._alpha = value;
        this._refreshFurniture = true;
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
    get x() {
        return this._x;
    }
    set x(value) {
        if (value !== this.x) {
            this._x = value;
            this._refreshPosition = true;
        }
    }
    get y() {
        return this._y;
    }
    set y(value) {
        if (value !== this.y) {
            this._y = value;
            this._refreshPosition = true;
        }
    }
    get zIndex() {
        return this._zIndex;
    }
    set zIndex(value) {
        if (value !== this.zIndex) {
            this._zIndex = value;
            this._refreshZIndex = true;
        }
    }
    get direction() {
        return this._direction;
    }
    set direction(value) {
        this._direction = value;
        this._updateDirection();
    }
    get animation() {
        return this._animation;
    }
    set animation(value) {
        this._animation = value;
        if (this.mounted) {
            this.visualization.updateAnimation(this.animation);
            this._handleAnimationChange();
        }
    }
    get maskId() {
        return this._getMaskId;
    }
    set maskId(value) {
        this._getMaskId = value;
    }
    getEventGroupIdentifier() {
        return IEventGroup_1.FURNITURE;
    }
    destroy() {
        var _a;
        this._destroySprites();
        this._destroyed = true;
        PIXI.Ticker.shared.remove(this._onTicker);
        this._cancelTicker && this._cancelTicker();
        this._cancelTicker = undefined;
        (_a = this._view) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    _updateDirection() {
        if (!this.mounted)
            return;
        if (this._validDirections != null) {
            this.visualization.updateDirection((0, getDirectionForFurniture_1.getDirectionForFurniture)(this.direction, this._validDirections));
        }
    }
    _updateSprites(cb) {
        this._sprites.forEach(cb);
        if (this._unknownSprite != null) {
            cb(this._unknownSprite);
        }
    }
    _updateZIndex() {
        this._updateSprites((element) => {
            element.baseZIndex = this.zIndex;
        });
    }
    _updatePosition() {
        this._updateSprites((element) => {
            element.baseX = this.x;
            element.baseY = this.y;
        });
        if (this._view == null)
            return;
        this._view.x = this.x;
        this._view.y = this.y;
        this._view.zIndex = this.zIndex;
        this._view.updateLayers();
    }
    _updateFurniture() {
        if (!this.mounted)
            return;
        if (this._loadFurniResult != null) {
            this._updateFurnitureSprites(this._loadFurniResult);
        }
        else {
            this._updateUnknown();
        }
    }
    _updateUnknown() {
        if (!this.mounted)
            return;
        if (this._unknownSprite == null) {
            this._unknownSprite = new FurnitureSprite_1.FurnitureSprite({
                eventManager: this.dependencies.eventManager,
                group: this,
            });
            this._unknownSprite.baseX = this.x;
            this._unknownSprite.baseY = this.y;
            this._unknownSprite.offsetY = -32;
            if (this._unknownTexture != null) {
                this._unknownSprite.texture = this._unknownTexture;
            }
            this._unknownSprite.zIndex = this.zIndex;
            this.dependencies.visualization.container.addChild(this._unknownSprite);
            this._updatePosition();
        }
    }
    _createNewView(loadFurniResult) {
        var _a, _b, _c;
        (_a = this._view) === null || _a === void 0 ? void 0 : _a.destroy();
        const view = new FurnitureVisualizationView_1.FurnitureVisualizationView(this.dependencies.eventManager, this._clickHandler, this._overOutHandler, this.dependencies.visualization.container, loadFurniResult);
        view.x = this.x;
        view.y = this.y;
        view.zIndex = this.zIndex;
        view.alpha = (_b = this.alpha) !== null && _b !== void 0 ? _b : 1;
        view.highlight = (_c = this.highlight) !== null && _c !== void 0 ? _c : false;
        this._view = view;
        return view;
    }
    _updateFurnitureSprites(loadFurniResult) {
        var _a;
        if (!this.mounted)
            return;
        this._maskNodes.forEach((node) => node.remove());
        this._maskNodes = [];
        (_a = this._unknownSprite) === null || _a === void 0 ? void 0 : _a.destroy();
        this._unknownSprite = undefined;
        this.visualization.setView(this._createNewView(loadFurniResult));
        this.visualization.update(this);
        this._validDirections = loadFurniResult.directions;
        this._updateDirection();
        this.visualization.updateAnimation(this.animation);
        this.visualization.updateFrame(this.dependencies.animationTicker.current());
        this._handleAnimationChange();
        this._updatePosition();
    }
    _destroySprites() {
        var _a;
        this._sprites.forEach((sprite) => sprite.destroy());
        this._maskNodes.forEach((node) => node.remove());
        (_a = this._unknownSprite) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sprites = new Map();
    }
    _loadFurniture() {
        var _a;
        if (!this.mounted)
            return;
        this._unknownTexture = (_a = this.dependencies.placeholder) !== null && _a !== void 0 ? _a : undefined;
        this.dependencies.furnitureLoader.loadFurni(this._type).then((result) => {
            if (this._destroyed)
                return;
            this._loadFurniResult = result;
            this._resolveLoadFurniResult && this._resolveLoadFurniResult(result);
            this._updateFurniture();
            this._onLoad && this._onLoad();
        });
        this._updateFurniture();
    }
    _handleAnimationChange() {
        if (this.visualization.isAnimated(this.animation) &&
            this._cancelTicker == null) {
            this._cancelTicker = this.dependencies.animationTicker.subscribe((frame) => {
                this.visualization.updateFrame(frame);
            });
            this.visualization.update(this);
            this.visualization.updateFrame(this.dependencies.animationTicker.current());
        }
        if (!this.visualization.isAnimated(this.animation) &&
            this._cancelTicker != null) {
            this._cancelTicker();
            this._cancelTicker = undefined;
            this.visualization.update(this);
            this.visualization.updateFrame(this.dependencies.animationTicker.current());
        }
    }
    static async showAllFurni(shroom, container, furnitureLoader // Passar o furnitureLoader explicitamente
    ) {
        try {
            // Chama o método listarMobis (listFurni) do FurnitureLoader
            const allFurnis = await furnitureLoader.listFurni();
            allFurnis.forEach(({ type }, index) => {
                // Cria e posiciona os móveis no palco
                const furniture = BaseFurniture.fromShroom(shroom, container, {
                    direction: 2,
                    type: { kind: "type", type },
                    animation: "0",
                });
                // Posiciona as mobílias no palco com base no índice
                furniture.x = (index % 5) * 150;
                furniture.y = Math.floor(index / 5) * 150;
                // Converter para 'unknown' antes de 'PIXI.DisplayObject'
                container.addChild(furniture);
            });
        }
        catch (error) {
            console.error("Erro ao carregar mobílias: ", error);
        }
    }
    _getAlpha({ layerAlpha, baseAlpha, }) {
        if (layerAlpha != null)
            return (layerAlpha / 255) * baseAlpha;
        return baseAlpha;
    }
}
exports.BaseFurniture = BaseFurniture;
