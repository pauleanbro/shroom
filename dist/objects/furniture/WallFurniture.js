"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WallFurniture = void 0;
const RoomObject_1 = require("../RoomObject");
const getZOrder_1 = require("../../util/getZOrder");
const BaseFurniture_1 = require("./BaseFurniture");
const getMaskId_1 = require("../room/util/getMaskId");
const getFurnitureFetch_1 = require("./util/getFurnitureFetch");
const LegacyWallGeometry_1 = require("../room/util/LegacyWallGeometry");
class WallFurniture extends RoomObject_1.RoomObject {
    constructor(options) {
        super();
        this.placementType = "wall";
        this._offsetX = 0;
        this._offsetY = 0;
        this._highlight = false;
        this._type = options.type;
        this._id = options.id;
        this._roomX = options.roomX;
        this._roomY = options.roomY;
        this._animation = options.animation;
        this._direction = options.direction;
        this._offsetX = options.offsetX;
        this._offsetY = options.offsetY;
        this._baseFurniture = new BaseFurniture_1.BaseFurniture({
            animation: this.animation,
            direction: this.direction,
            type: (0, getFurnitureFetch_1.getFurnitureFetch)(options, "wall"),
            getMaskId: (direction) => (0, getMaskId_1.getMaskId)(direction, this.roomX, this.roomY),
        });
    }
    get extradata() {
        return this._baseFurniture.extradata;
    }
    get validDirections() {
        return this._baseFurniture.validDirections;
    }
    get id() {
        return this._id;
    }
    get highlight() {
        return this._highlight;
    }
    set highlight(value) {
        this._highlight = value;
        this._updateHighlight();
    }
    get alpha() {
        return this._baseFurniture.alpha;
    }
    set alpha(value) {
        this._baseFurniture.alpha = value;
    }
    get type() {
        return this._type;
    }
    get animation() {
        return this._animation;
    }
    set animation(value) {
        this._animation = value;
        this._updateAnimation();
    }
    get direction() {
        return this._direction;
    }
    set direction(value) {
        this._direction = value;
        this._updateDirection();
    }
    get roomX() {
        return this._roomX;
    }
    set roomX(value) {
        this._roomX = value;
        this._updatePosition();
    }
    get roomY() {
        return this._roomY;
    }
    set roomY(value) {
        this._roomY = value;
        this._updatePosition();
    }
    get offsetX() {
        return this._offsetX;
    }
    set offsetX(value) {
        this._offsetX = value;
        this._updatePosition();
    }
    get offsetY() {
        return this._offsetY;
    }
    set offsetY(value) {
        this._offsetY = value;
        this._updatePosition();
    }
    get visualization() {
        return this._baseFurniture.visualization;
    }
    set visualization(value) {
        this._baseFurniture.visualization = value;
    }
    get onClick() {
        return this._baseFurniture.onClick;
    }
    set onClick(value) {
        this._baseFurniture.onClick = value;
    }
    get onDoubleClick() {
        return this._baseFurniture.onDoubleClick;
    }
    set onDoubleClick(value) {
        this._baseFurniture.onDoubleClick = value;
    }
    get onPointerDown() {
        return this._baseFurniture.onPointerDown;
    }
    set onPointerDown(value) {
        this._baseFurniture.onPointerDown = value;
    }
    get onPointerUp() {
        return this._baseFurniture.onPointerUp;
    }
    set onPointerUp(value) {
        this._baseFurniture.onPointerUp = value;
    }
    destroyed() {
        this._baseFurniture.destroy();
    }
    registered() {
        this._baseFurniture.dependencies = {
            animationTicker: this.animationTicker,
            furnitureLoader: this.furnitureLoader,
            placeholder: undefined,
            visualization: this.roomVisualization,
            eventManager: this.eventManager,
        };
        this._updatePosition();
    }
    _updateAnimation() {
        this._baseFurniture.animation = this.animation;
    }
    _updateDirection() {
        this._baseFurniture.direction = this.direction;
    }
    _updateHighlight() {
        this._baseFurniture.highlight = this.highlight;
    }
    _getOffsets(direction) {
        const geo = new LegacyWallGeometry_1.LegacyWallGeometry(this.room.getParsedTileTypes());
        const roomPosition = geo.getLocation(this.roomX, this.roomY, this._offsetX, this._offsetY, direction === 2 ? "l" : "r");
        if (direction === 2) {
            const position = this.room.getPosition(roomPosition.x, roomPosition.y, roomPosition.z * 2 - 0.5);
            return {
                x: position.x,
                y: position.y - this.room.wallHeight,
            };
        }
        else {
            const position = this.room.getPosition(roomPosition.x, roomPosition.y - 0.5, roomPosition.z * 2 - 0.5);
            return {
                x: position.x,
                y: position.y - this.room.wallHeight,
            };
        }
    }
    _updatePosition() {
        const offsets = this._getOffsets(this.direction);
        if (offsets == null)
            return;
        const position = this._getOffsets(this.direction);
        this._baseFurniture.x = position.x;
        this._baseFurniture.y = position.y;
        this._baseFurniture.maskId = (direction) => (0, getMaskId_1.getMaskId)(direction, this.roomX, this.roomY);
        this._baseFurniture.zIndex = (0, getZOrder_1.getZOrder)(this.roomX, this.roomY, 0) - 1;
    }
}
exports.WallFurniture = WallFurniture;
