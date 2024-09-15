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
exports.Stair = void 0;
const PIXI = __importStar(require("pixi.js"));
const matrixes_1 = require("../matrixes");
class Stair extends PIXI.Container {
    constructor(_props) {
        super();
        this._props = _props;
        this._tileHeight = 0;
        this._tileLeftColor = 0;
        this._tileRightColor = 0;
        this._tileTopColor = 0;
        this._tileHeight = _props.tileHeight;
        this.updateSprites();
    }
    update(data) {
        this._tileHeight = data.tileHeight;
        this._tileLeftColor = data.tileLeftColor;
        this._tileRightColor = data.tileRightColor;
        this._tileTopColor = data.tileTopColor;
        this._texture = data.tileTexture;
        this.updateSprites();
    }
    updateSprites() {
        this.removeChildren();
        const { direction } = this._props;
        for (let i = 0; i < 4; i++) {
            if (direction === 0) {
                this.addChild(...this._createStairBoxDirection0(3 - i));
            }
            else if (direction === 2) {
                this.addChild(...this._createStairBoxDirection2(3 - i));
            }
        }
    }
    _createStairBoxDirection0(index) {
        const baseX = +stairBase * index;
        const baseY = -stairBase * index * 1.5;
        const texture = this._texture;
        function createSprite(matrix, tint, tilePosition) {
            const tile = new PIXI.TilingSprite(texture !== null && texture !== void 0 ? texture : PIXI.Texture.WHITE);
            tile.tilePosition = tilePosition;
            tile.transform.setFromMatrix(matrix);
            tile.tint = tint;
            return tile;
        }
        const tile = createSprite((0, matrixes_1.getFloorMatrix)(baseX, baseY), this._tileTopColor, new PIXI.Point(0, 0));
        tile.width = 32;
        tile.height = 8;
        const borderLeft = createSprite((0, matrixes_1.getLeftMatrix)(baseX, baseY, { width: 32, height: this._tileHeight }), this._tileLeftColor, new PIXI.Point(0, 0));
        borderLeft.width = 32;
        borderLeft.height = this._tileHeight;
        const borderRight = createSprite((0, matrixes_1.getRightMatrix)(baseX, baseY, { width: 8, height: this._tileHeight }), this._tileRightColor, new PIXI.Point(0, 0));
        borderRight.width = 8;
        borderRight.height = this._tileHeight;
        return [borderLeft, borderRight, tile];
    }
    _createStairBoxDirection2(index) {
        const baseX = -stairBase * index;
        const baseY = -stairBase * index * 1.5;
        const texture = this._texture;
        function createSprite(matrix, tint) {
            const tile = new PIXI.TilingSprite(texture !== null && texture !== void 0 ? texture : PIXI.Texture.WHITE);
            tile.tilePosition = new PIXI.Point(0, 0);
            tile.transform.setFromMatrix(matrix);
            tile.tint = tint;
            return tile;
        }
        const tile = createSprite((0, matrixes_1.getFloorMatrix)(baseX + 32 - stairBase, baseY + stairBase * 1.5), this._tileTopColor);
        tile.width = stairBase;
        tile.height = 32;
        const borderLeft = createSprite((0, matrixes_1.getLeftMatrix)(baseX + 32 - stairBase, baseY + stairBase * 1.5, {
            width: stairBase,
            height: this._tileHeight,
        }), this._tileLeftColor);
        borderLeft.width = stairBase;
        borderLeft.height = this._tileHeight;
        const borderRight = createSprite((0, matrixes_1.getRightMatrix)(baseX, baseY, { width: 32, height: this._tileHeight }), this._tileRightColor);
        borderRight.width = 32;
        borderRight.height = this._tileHeight;
        return [borderLeft, borderRight, tile];
    }
    destroy() {
        super.destroy();
        this.removeChildren();
    }
}
exports.Stair = Stair;
const stairBase = 8;
