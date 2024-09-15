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
exports.EventManagerContainer = void 0;
const PIXI = __importStar(require("pixi.js"));
class EventManagerContainer {
    constructor(_application, _eventManager) {
        this._application = _application;
        this._eventManager = _eventManager;
        this._updateRectangle = () => {
            //this._box?.destroy();
            const renderer = this._application.renderer;
            const width = renderer.width / renderer.resolution;
            const height = renderer.height / renderer.resolution;
            this._box = new PIXI.TilingSprite(PIXI.Texture.WHITE, width, height);
            this._box.alpha = 0.3;
            //this._application.stage.addChild(this._box);
        };
        this._updateRectangle();
        _application.ticker.add(this._updateRectangle);
        const interactionManager = this._application
            .renderer.plugins.interaction;
        interactionManager.addListener("pointermove", (event) => {
            const position = event.data.getLocalPosition(this._application.stage);
            this._eventManager.move(event, position.x, position.y);
        }, true);
        interactionManager.addListener("pointerup", (event) => {
            const position = event.data.getLocalPosition(this._application.stage);
            this._eventManager.pointerUp(event, position.x, position.y);
        }, true);
        interactionManager.addListener("pointerdown", (event) => {
            const position = event.data.getLocalPosition(this._application.stage);
            this._eventManager.pointerDown(event, position.x, position.y);
        }, true);
    }
    destroy() {
        this._application.ticker.remove(this._updateRectangle);
    }
}
exports.EventManagerContainer = EventManagerContainer;
