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
exports.Tile = void 0;
const PIXI = __importStar(require("pixi.js"));
const matrixes_1 = require("../matrixes");
class Tile extends PIXI.Container {
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
        this._updateSprites();
    }
    get tilePositions() {
        return this._tilePositions;
    }
    set tilePositions(value) {
        this._tilePositions = value;
        this._updateSprites();
    }
    get tileHeight() {
        return this._tileHeight;
    }
    set tileHeight(value) {
        this._tileHeight = value;
        this._updateSprites();
    }
    constructor(props) {
        super();
        this.props = props;
        this._sprites = [];
        this._tilePositions = new PIXI.Point(0, 0);
        this._texture = props.texture;
        this._color = props.color;
        this._tileHeight = props.tileHeight;
        this._updateSprites();
    }
    update(data) {
        this.tileHeight = data.tileHeight;
        this._roomPartData = data;
        this._texture = data.tileTexture;
        this._updateSprites();
    }
    destroy() {
        super.destroy();
        this._destroySprites();
    }
    _destroySprites() {
        this._sprites.forEach((sprite) => sprite.destroy());
        this._sprites = [];
    }
    _updateSprites() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        (_a = this._container) === null || _a === void 0 ? void 0 : _a.destroy();
        this._container = new PIXI.Container();
        this._destroySprites();
        const tileMatrix = (0, matrixes_1.getFloorMatrix)(0, 0);
        const tile = new PIXI.TilingSprite((_b = this._texture) !== null && _b !== void 0 ? _b : PIXI.Texture.WHITE);
        tile.tilePosition = this.tilePositions;
        tile.transform.setFromMatrix(tileMatrix);
        tile.width = 32;
        tile.height = 32;
        tile.tint = (_d = (_c = this._roomPartData) === null || _c === void 0 ? void 0 : _c.tileTopColor) !== null && _d !== void 0 ? _d : 0;
        const borderLeftMatrix = (0, matrixes_1.getLeftMatrix)(0, 0, {
            width: 32,
            height: this.tileHeight,
        });
        const borderRightMatrix = (0, matrixes_1.getRightMatrix)(0, 0, {
            width: 32,
            height: this.tileHeight,
        });
        const borderLeft = new PIXI.TilingSprite((_e = this._texture) !== null && _e !== void 0 ? _e : PIXI.Texture.WHITE);
        borderLeft.tilePosition = this.tilePositions;
        borderLeft.transform.setFromMatrix(borderLeftMatrix);
        borderLeft.width = 32;
        borderLeft.height = this.tileHeight;
        borderLeft.tint = (_g = (_f = this._roomPartData) === null || _f === void 0 ? void 0 : _f.tileLeftColor) !== null && _g !== void 0 ? _g : 0;
        const borderRight = new PIXI.TilingSprite((_h = this._texture) !== null && _h !== void 0 ? _h : PIXI.Texture.WHITE);
        borderRight.tilePosition = this.tilePositions;
        borderRight.transform.setFromMatrix(borderRightMatrix);
        borderRight.width = 32;
        borderRight.height = this.tileHeight;
        borderRight.tint = (_k = (_j = this._roomPartData) === null || _j === void 0 ? void 0 : _j.tileRightColor) !== null && _k !== void 0 ? _k : 0;
        this._sprites.push(this._container);
        this._container.addChild(borderLeft);
        this._container.addChild(borderRight);
        this._container.addChild(tile);
        this.addChild(this._container);
    }
}
exports.Tile = Tile;
