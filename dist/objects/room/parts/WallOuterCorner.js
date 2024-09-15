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
exports.WallOuterCorner = void 0;
const PIXI = __importStar(require("pixi.js"));
class WallOuterCorner extends PIXI.Container {
    constructor() {
        super();
        this._borderWidth = 0;
        this._wallHeight = 0;
        this._roomZ = 0;
        this._wallTopColor = 0;
    }
    get roomZ() {
        return this._roomZ;
    }
    set roomZ(value) {
        this._roomZ = value;
        this._update();
    }
    get wallY() {
        return -this._wallHeight;
    }
    update(data) {
        this._borderWidth = data.borderWidth;
        this._wallHeight = data.wallHeight;
        this._wallTopColor = data.wallTopColor;
        this._update();
    }
    _createTopSprite() {
        const border = new PIXI.TilingSprite(PIXI.Texture.WHITE, this._borderWidth, this._borderWidth);
        border.transform.setFromMatrix(new PIXI.Matrix(1, 0.5, 1, -0.5));
        border.tint = this._wallTopColor;
        border.x = -this._borderWidth;
        border.y =
            -this._wallHeight +
                this.roomZ * 32 -
                32 / 2 +
                this._borderWidth / 2 +
                (32 - this._borderWidth);
        return border;
    }
    _update() {
        this.removeChildren();
        this.addChild(this._createTopSprite());
    }
}
exports.WallOuterCorner = WallOuterCorner;
