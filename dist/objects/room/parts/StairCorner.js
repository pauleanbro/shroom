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
exports.StairCorner = void 0;
const PIXI = __importStar(require("pixi.js"));
const matrixes_1 = require("../matrixes");
class StairCorner extends PIXI.Container {
    constructor(_props) {
        super();
        this._props = _props;
        this._tileHeight = 0;
        this._tileLeftColor = 0;
        this._tileRightColor = 0;
        this._tileTopColor = 0;
        this.sortableChildren = true;
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
        const { type } = this._props;
        for (let i = 0; i < 4; i++) {
            if (type === "front") {
                this.addChild(...this._createStairBoxFront(3 - i));
            }
            else if (type === "left") {
                this.addChild(...this._createStairBoxLeft(3 - i));
            }
            else if (type === "right") {
                this.addChild(...this._createStairBoxRight(3 - i));
            }
        }
    }
    destroySprites() {
        var _a;
        (_a = this._container) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    destroy() {
        super.destroy();
        this.destroySprites();
    }
    _createStairBoxFront(index) {
        const baseXLeft = +stairBase * index;
        const baseYLeft = -stairBase * index * 1.5;
        const baseXRight = 0;
        const baseYRight = -stairBase * index * 2;
        const texture = this._texture;
        function createSprite(matrix, tint, tilePosition) {
            const tile = new PIXI.TilingSprite(texture !== null && texture !== void 0 ? texture : PIXI.Texture.WHITE);
            tile.tilePosition = tilePosition;
            tile.transform.setFromMatrix(matrix);
            tile.tint = tint;
            return tile;
        }
        const tileLeft = createSprite((0, matrixes_1.getFloorMatrix)(baseXLeft, baseYLeft), this._tileTopColor, new PIXI.Point());
        tileLeft.width = 32 - 8 * index;
        tileLeft.height = 8;
        const tileRight = createSprite((0, matrixes_1.getFloorMatrix)(baseXRight + 32 - stairBase, baseYRight + stairBase * 1.5), this._tileTopColor, new PIXI.Point(0, 0));
        tileRight.width = stairBase;
        tileRight.height = 32 - 8 * index;
        const borderLeft = createSprite((0, matrixes_1.getLeftMatrix)(baseXLeft - 8 * index, baseYLeft - 8 * index * 0.5, {
            width: 32,
            height: this._tileHeight,
        }), this._tileLeftColor, new PIXI.Point(0, 0));
        borderLeft.width = 32 - 8 * index;
        borderLeft.height = this._tileHeight;
        const borderRight = createSprite((0, matrixes_1.getRightMatrix)(baseXRight - stairBase * index, -stairBase * index * 1.5, {
            width: 32,
            height: this._tileHeight,
        }), this._tileRightColor, new PIXI.Point(0, 0));
        borderRight.width = 32 - 8 * index;
        borderRight.height = this._tileHeight;
        return [borderLeft, borderRight, tileLeft, tileRight];
    }
    _createStairBoxLeft(index) {
        const baseX = -stairBase * index;
        const baseY = -stairBase * index * 1.5;
        const texture = this._texture;
        function createSprite(matrix, tint, tilePosition) {
            const tile = new PIXI.TilingSprite(texture !== null && texture !== void 0 ? texture : PIXI.Texture.WHITE);
            tile.tilePosition = tilePosition;
            tile.transform.setFromMatrix(matrix);
            tile.tint = tint;
            return tile;
        }
        const tileRight = createSprite((0, matrixes_1.getFloorMatrix)(baseX + 32 - stairBase, baseY + stairBase * 1.5), this._tileTopColor, new PIXI.Point(0, 0));
        tileRight.width = stairBase;
        tileRight.height = 32 - 8 * index;
        tileRight.zIndex = 2;
        const borderRight = createSprite((0, matrixes_1.getRightMatrix)(baseX - stairBase * index, -stairBase * index, {
            width: 32,
            height: this._tileHeight,
        }), this._tileRightColor, new PIXI.Point(0, 0));
        borderRight.width = 32 - 8 * index;
        borderRight.height = this._tileHeight;
        borderRight.zIndex = 1;
        if (index == 0) {
            const cornerOne = createSprite((0, matrixes_1.getFloorMatrix)(baseX + 40, -4), this._tileTopColor, new PIXI.Point(0, 0));
            cornerOne.width = 8;
            cornerOne.height = 8;
            cornerOne.zIndex = 0;
            const cornerTwo = createSprite((0, matrixes_1.getFloorMatrix)(baseX + 24, -12), this._tileTopColor, new PIXI.Point(0, 0));
            cornerTwo.width = 8;
            cornerTwo.height = 8;
            cornerTwo.zIndex = 0;
            return [tileRight, borderRight, cornerOne, cornerTwo];
        }
        else {
            return [tileRight, borderRight];
        }
    }
    _createStairBoxRight(index) {
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
        const tile = createSprite((0, matrixes_1.getFloorMatrix)(baseX + 8 * index, baseY + 8 * index * 0.5), this._tileTopColor, new PIXI.Point(0, 0));
        tile.width = 32 - 8 * index;
        tile.height = 8;
        tile.zIndex = 2;
        const borderLeft = createSprite((0, matrixes_1.getLeftMatrix)(baseX, baseY, { width: 32, height: this._tileHeight }), this._tileLeftColor, new PIXI.Point(0, 0));
        borderLeft.width = 32 - 8 * index;
        borderLeft.height = this._tileHeight;
        borderLeft.zIndex = 1;
        if (index == 0) {
            const cornerOne = createSprite((0, matrixes_1.getFloorMatrix)(baseX + 8, -4), this._tileTopColor, new PIXI.Point(0, 0));
            cornerOne.width = 8;
            cornerOne.height = 8;
            cornerOne.zIndex = 0;
            const cornerTwo = createSprite((0, matrixes_1.getFloorMatrix)(baseX + 24, -12), this._tileTopColor, new PIXI.Point(0, 0));
            cornerTwo.width = 8;
            cornerTwo.height = 8;
            cornerTwo.zIndex = 0;
            return [tile, borderLeft, cornerOne, cornerTwo];
        }
        else {
            return [tile, borderLeft];
        }
    }
}
exports.StairCorner = StairCorner;
const stairBase = 8;
