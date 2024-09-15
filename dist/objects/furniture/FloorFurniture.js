"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorFurniture = void 0;
const RoomObject_1 = require("../RoomObject");
const getZOrder_1 = require("../../util/getZOrder");
const BaseFurniture_1 = require("./BaseFurniture");
const ObjectAnimation_1 = require("../animation/ObjectAnimation");
const getFurnitureFetch_1 = require("./util/getFurnitureFetch");
class FloorFurniture extends RoomObject_1.RoomObject {
    constructor(options) {
        var _a;
        super();
        this.placementType = "floor";
        this._animatedPosition = { roomX: 0, roomY: 0, roomZ: 0 };
        this._moving = false;
        this._highlight = false;
        this._type = options.type;
        this._id = options.id;
        this._roomX = options.roomX;
        this._roomY = options.roomY;
        this._roomZ = options.roomZ;
        this._direction = options.direction;
        this._animation = options.animation;
        if ("type" in options) {
            this._type = options.type;
        }
        this._baseFurniture = new BaseFurniture_1.BaseFurniture({
            animation: this.animation,
            direction: this.direction,
            type: (0, getFurnitureFetch_1.getFurnitureFetch)(options, "floor"),
        });
        (_a = options.behaviors) === null || _a === void 0 ? void 0 : _a.forEach((behavior) => behavior.setParent(this));
    }
    /**
     * Moves and animates the furniture to a new position.
     *
     * @param roomX New x-Position
     * @param roomY New y-Position
     * @param roomZ New z-Position
     */
    move(roomX, roomY, roomZ) {
        var _a;
        (_a = this._moveAnimation) === null || _a === void 0 ? void 0 : _a.move({ roomX: this.roomX, roomY: this.roomY, roomZ: this.roomZ }, { roomX, roomY, roomZ }, undefined);
        this._roomX = roomX;
        this._roomY = roomY;
        this._roomZ = roomZ;
    }
    /**
     * Clears the enqueued movement animations of the furniture
     */
    clearMovement() {
        var _a;
        const current = (_a = this._moveAnimation) === null || _a === void 0 ? void 0 : _a.clear();
        if (current != null) {
            this.roomX = current.roomX;
            this.roomY = current.roomY;
            this.roomZ = current.roomZ;
        }
    }
    destroyed() {
        var _a;
        this._baseFurniture.destroy();
        (_a = this._moveAnimation) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    registered() {
        this._baseFurniture.dependencies = {
            animationTicker: this.animationTicker,
            furnitureLoader: this.furnitureLoader,
            placeholder: this.configuration.placeholder,
            visualization: this.roomVisualization,
            eventManager: this.eventManager,
        };
        this._moveAnimation = new ObjectAnimation_1.ObjectAnimation(this.animationTicker, {
            onStart: () => {
                this._moving = true;
            },
            onStop: () => {
                this._moving = false;
            },
            onUpdatePosition: (position) => {
                this._animatedPosition = position;
                this._updatePosition();
            },
        }, this.configuration.furnitureMovementDuration);
        this._updatePosition();
    }
    /**
     * If set to true, displays the furniture in the highlight state.
     */
    get highlight() {
        return this._highlight;
    }
    set highlight(value) {
        this._highlight = value;
        this._updateHighlight();
    }
    /**
     * Alpha value of the furniture
     */
    get alpha() {
        return this._baseFurniture.alpha;
    }
    set alpha(value) {
        this._baseFurniture.alpha = value;
    }
    /**
     * Type of the furniture
     */
    get type() {
        return this._type;
    }
    /**
     * Callback triggered when the furniture has been clicked on.
     */
    get onClick() {
        return this._onClick;
    }
    set onClick(value) {
        this._onClick = value;
        this._baseFurniture.onClick = this.onClick;
    }
    /**
     * Callback triggered when the furniture has been double clicked on.
     */
    get onDoubleClick() {
        return this._onDoubleClick;
    }
    set onDoubleClick(value) {
        this._onDoubleClick = value;
        this._baseFurniture.onDoubleClick = this.onDoubleClick;
    }
    get onPointerDown() {
        return this._onPointerDown;
    }
    set onPointerDown(value) {
        this._onPointerDown = value;
        this._baseFurniture.onPointerDown = this.onPointerDown;
    }
    get onPointerUp() {
        return this._onPointerUp;
    }
    set onPointerUp(value) {
        this._onPointerUp = value;
        this._baseFurniture.onPointerUp = this.onPointerUp;
    }
    get onPointerOver() {
        return this._onPointerOver;
    }
    set onPointerOver(value) {
        this._onPointerOver = value;
        this._baseFurniture.onPointerOver = this.onPointerOver;
    }
    get onPointerOut() {
        return this._onPointerOut;
    }
    set onPointerOut(value) {
        this._onPointerOut = value;
        this._baseFurniture.onPointerOut = this.onPointerOut;
    }
    /**
     * ID of the furniture
     */
    get id() {
        return this._id;
    }
    /**
     * The extra data provided through the `index.bin` file of the furniture.
     * This contains the `logic` and `visualization` stings which specify some
     * furniture behavior.
     */
    get extradata() {
        return this._baseFurniture.extradata;
    }
    /**
     * Valid directions of the furniture.
     */
    get validDirections() {
        return this._baseFurniture.validDirections;
    }
    /**
     * Animation of the furniture
     */
    get animation() {
        return this._animation;
    }
    set animation(value) {
        this._animation = value;
        this._updateAnimation();
    }
    /**
     * Direction of the furniture
     */
    get direction() {
        return this._direction;
    }
    set direction(value) {
        this._direction = value;
        this._updateDirection();
    }
    /**
     * The x position of the avatar in the room.
     * The y-Axis is marked in the following graphic:
     *
     * ```
     *    |
     *    |
     *    |
     *   / \
     *  /   \   <- x-Axis
     * /     \
     * ```
     */
    get roomX() {
        return this._roomX;
    }
    set roomX(value) {
        this._roomX = value;
        this._updatePosition();
    }
    /**
     * The y position of the avatar in the room.
     * The y-Axis is marked in the following graphic:
     *
     * ```
     *              |
     *              |
     *              |
     *             / \
     * y-Axis ->  /   \
     *           /     \
     * ```
     */
    get roomY() {
        return this._roomY;
    }
    set roomY(value) {
        this._roomY = value;
        this._updatePosition();
    }
    /**
     * The z position of the avatar in the room.
     * The z-Axis is marked in the following graphic:
     *
     * ```
     *              |
     *   z-Axis ->  |
     *              |
     *             / \
     *            /   \
     *           /     \
     * ```
     */
    get roomZ() {
        return this._roomZ;
    }
    set roomZ(value) {
        this._roomZ = value;
        this._updatePosition();
    }
    get visualization() {
        return this._baseFurniture.visualization;
    }
    set visualization(value) {
        this._baseFurniture.visualization = value;
    }
    _updateDirection() {
        this._baseFurniture.direction = this.direction;
    }
    _getDisplayRoomPosition() {
        if (this._moving) {
            return this._animatedPosition;
        }
        return {
            roomX: this.roomX,
            roomY: this.roomY,
            roomZ: this.roomZ,
        };
    }
    _updatePosition() {
        const { roomX, roomY, roomZ } = this._getDisplayRoomPosition();
        const { x, y } = this.geometry.getPosition(roomX, roomY, roomZ);
        const roomXrounded = Math.round(roomX);
        const roomYrounded = Math.round(roomY);
        this._baseFurniture.x = x;
        this._baseFurniture.y = y;
        this._baseFurniture.zIndex = (0, getZOrder_1.getZOrder)(roomXrounded, roomYrounded, this.roomZ);
    }
    _updateAnimation() {
        this._baseFurniture.animation = this.animation;
    }
    _updateHighlight() {
        this._baseFurniture.highlight = this.highlight;
    }
}
exports.FloorFurniture = FloorFurniture;
