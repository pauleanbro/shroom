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
exports.TileCursor = void 0;
const PIXI = __importStar(require("pixi.js"));
const rxjs_1 = require("rxjs");
const isPointInside_1 = require("../../../util/isPointInside");
const IEventGroup_1 = require("../../events/interfaces/IEventGroup");
class TileCursor extends PIXI.Container {
    constructor(_eventManager, _position, onClick, onOver, onOut) {
        super();
        this._eventManager = _eventManager;
        this._position = _position;
        this.onClick = onClick;
        this.onOver = onOver;
        this.onOut = onOut;
        this._hover = false;
        this._subject = new rxjs_1.BehaviorSubject(undefined);
        this._roomX = _position.roomX;
        this._roomY = _position.roomY;
        this._roomZ = _position.roomZ;
        this._graphics = this._createGraphics();
        this._updateGraphics();
        this.addChild(this._graphics);
        this._eventManager.register(this);
    }
    getEventGroupIdentifier() {
        return IEventGroup_1.TILE_CURSOR;
    }
    getGroup() {
        return this;
    }
    getRectangleObservable() {
        return this._subject;
    }
    getEventZOrder() {
        return -1000;
    }
    triggerPointerTargetChanged(event) { }
    triggerClick(event) {
        this.onClick({
            roomX: this._roomX,
            roomY: this._roomY,
            roomZ: this._roomZ,
        });
    }
    triggerPointerDown(event) { }
    triggerPointerUp(event) { }
    triggerPointerOver(event) {
        this._updateHover(true);
        this.onOver({ roomX: this._roomX, roomY: this._roomY, roomZ: this._roomZ });
    }
    triggerPointerOut(event) {
        this._updateHover(false);
        this.onOut({ roomX: this._roomX, roomY: this._roomY, roomZ: this._roomZ });
    }
    createDebugSprite() {
        return undefined;
    }
    hits(x, y) {
        const pos = this.getGlobalPosition();
        const diffX = x - pos.x;
        const diffY = y - pos.y;
        return this._pointInside([diffX, diffY], [
            [points.p1.x, points.p1.y],
            [points.p2.x, points.p2.y],
            [points.p3.x, points.p3.y],
            [points.p4.x, points.p4.y],
        ]);
    }
    getHitDetectionZIndex() {
        return -1000;
    }
    destroy() {
        super.destroy();
        this._graphics.destroy();
        this._eventManager.remove(this);
    }
    updateTransform() {
        super.updateTransform();
        this._subject.next(this._getCurrentRectangle());
    }
    _getCurrentRectangle() {
        const position = this.getGlobalPosition();
        return {
            x: position.x,
            y: position.y,
            width: 64,
            height: 32,
        };
    }
    _createGraphics() {
        const graphics = new PIXI.Graphics();
        return graphics;
    }
    _updateGraphics() {
        const graphics = this._graphics;
        if (graphics == null)
            return;
        graphics.clear();
        if (this._hover) {
            drawBorder(graphics, 0x000000, 0.33, 0);
            drawBorder(graphics, 0xa7d1e0, 1, -2);
            drawBorder(graphics, 0xffffff, 1, -3);
        }
    }
    _updateHover(hover) {
        if (this._hover === hover)
            return;
        this._hover = hover;
        this._updateGraphics();
        if (hover) {
            this.onOver(this._position);
        }
        else {
            this.onOut(this._position);
        }
    }
    _pointInside(point, vs) {
        return (0, isPointInside_1.isPointInside)(point, vs);
    }
}
exports.TileCursor = TileCursor;
const points = {
    p1: { x: 0, y: 16 },
    p2: { x: 32, y: 0 },
    p3: { x: 64, y: 16 },
    p4: { x: 32, y: 32 },
};
function drawBorder(graphics, color, alpha = 1, offsetY) {
    graphics.beginFill(color, alpha);
    graphics.moveTo(points.p1.x, points.p1.y + offsetY);
    graphics.lineTo(points.p2.x, points.p2.y + offsetY);
    graphics.lineTo(points.p3.x, points.p3.y + offsetY);
    graphics.lineTo(points.p4.x, points.p4.y + offsetY);
    graphics.endFill();
    graphics.beginHole();
    graphics.moveTo(points.p1.x + 6, points.p1.y + offsetY);
    graphics.lineTo(points.p2.x, points.p2.y + 3 + offsetY);
    graphics.lineTo(points.p3.x - 6, points.p3.y + offsetY);
    graphics.lineTo(points.p4.x, points.p4.y - 3 + offsetY);
    graphics.endHole();
}
