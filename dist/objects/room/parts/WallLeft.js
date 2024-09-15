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
exports.WallLeft = void 0;
const PIXI = __importStar(require("pixi.js"));
class WallLeft extends PIXI.Container {
    constructor(props) {
        super();
        this.props = props;
        this._offsets = { x: 0, y: 0 };
        this._borderWidth = 0;
        this._wallHeight = 0;
        this._wallWidth = 32;
        this._tileHeight = 0;
        this._wallLeftColor = 0;
        this._wallRightColor = 0;
        this._wallTopColor = 0;
        this._drawHitArea = false;
        this._hideBorder = false;
        this._roomZ = 0;
        this._hideBorder = props.hideBorder;
        //this._update();
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
    get wallHeight() {
        if (this.props.cutawayHeight != null) {
            return this._wallHeight - this.props.cutawayHeight;
        }
        return this._wallHeight;
    }
    update(data) {
        this._borderWidth = data.borderWidth;
        this._wallHeight = data.wallHeight - this.roomZ * 32;
        this._tileHeight = data.tileHeight;
        this._wallLeftColor = data.wallLeftColor;
        this._wallRightColor = data.wallRightColor;
        this._wallTopColor = data.wallTopColor;
        this._wallTexture = data.wallTexture;
        this._update();
    }
    destroy() {
        var _a;
        super.destroy();
        (_a = this._hitAreaElement) === null || _a === void 0 ? void 0 : _a.destroy();
        this.removeChildren();
    }
    _update() {
        if (this._hitAreaElement != null) {
            this.props.hitAreaContainer.removeChild(this._hitAreaElement);
            this._hitAreaElement = undefined;
        }
        this.removeChildren();
        const hitArea = new PIXI.Polygon(this._getDisplayPoints());
        this.hitArea = hitArea;
        const primary = this._createPrimarySprite();
        const border = this._createBorderSprite();
        const top = this._createTopSprite();
        this.addChild(primary);
        if (!this._hideBorder) {
            this.addChild(border);
        }
        this.addChild(top);
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xff00ff);
        graphics.drawPolygon(hitArea);
        graphics.alpha = this._drawHitArea ? 1 : 0;
        graphics.endFill();
        const handleMoveEvent = (event) => {
            if (event.target === graphics) {
                const position = event.data.getLocalPosition(graphics);
                this.props.onMouseMove({ offsetX: position.x, offsetY: position.y });
            }
        };
        graphics.addListener("mousemove", handleMoveEvent);
        graphics.addListener("mouseover", handleMoveEvent);
        graphics.addListener("mouseout", () => {
            this.props.onMouseOut();
        });
        graphics.interactive = true;
        this._hitAreaElement = graphics;
        this._hitAreaElement.x = this.x;
        this._hitAreaElement.y = this.y;
        this._hitAreaElement.scale = this.scale;
        this.props.hitAreaContainer.addChild(this._hitAreaElement);
    }
    _getDisplayPoints() {
        var _a, _b;
        return [
            new PIXI.Point(this._getOffsetX() + this._borderWidth, this._wallWidth / 2 - ((_a = this.props.cutawayHeight) !== null && _a !== void 0 ? _a : 0)),
            new PIXI.Point(this._getOffsetX() + this._wallWidth + this._borderWidth, -((_b = this.props.cutawayHeight) !== null && _b !== void 0 ? _b : 0)),
            new PIXI.Point(this._getOffsetX() + this._wallWidth + this._borderWidth, -this._wallHeight),
            new PIXI.Point(this._getOffsetX() + this._borderWidth, -this._wallHeight + this._wallWidth / 2),
        ];
    }
    _getOffsetX() {
        return this.scale.x * this._offsets.x - this._borderWidth;
    }
    _createPrimarySprite() {
        var _a;
        const sprite = new PIXI.TilingSprite((_a = this._wallTexture) !== null && _a !== void 0 ? _a : PIXI.Texture.WHITE, this._wallWidth, this.wallHeight);
        sprite.transform.setFromMatrix(new PIXI.Matrix(-1, 0.5, 0, 1));
        sprite.x = this._getOffsetX() + this._borderWidth + this._wallWidth;
        sprite.y = this.wallY;
        sprite.tint = this._wallLeftColor;
        return sprite;
    }
    _createBorderSprite() {
        const border = new PIXI.TilingSprite(PIXI.Texture.WHITE, this._borderWidth, this._wallHeight + this._tileHeight);
        border.transform.setFromMatrix(new PIXI.Matrix(-1, -0.5, 0, 1));
        border.y = this.wallY + this._wallWidth / 2;
        border.x = this._getOffsetX() + this._borderWidth;
        border.tint = this._wallRightColor;
        return border;
    }
    _createTopSprite() {
        const border = new PIXI.TilingSprite(PIXI.Texture.WHITE, this._borderWidth, this._wallWidth);
        border.transform.setFromMatrix(new PIXI.Matrix(1, 0.5, 1, -0.5));
        border.x = this._getOffsetX() + 0;
        border.y = this.wallY + this._wallWidth / 2 - this._borderWidth / 2;
        border.tint = this._wallTopColor;
        return border;
    }
}
exports.WallLeft = WallLeft;
