"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avatar = void 0;
const RoomObject_1 = require("../RoomObject");
const getZOrder_1 = require("../../util/getZOrder");
const BaseAvatar_1 = require("./BaseAvatar");
const ObjectAnimation_1 = require("../animation/ObjectAnimation");
const AvatarAction_1 = require("./enum/AvatarAction");
class Avatar extends RoomObject_1.RoomObject {
    constructor({ look, roomX, roomY, roomZ, direction, headDirection, id, }) {
        super();
        this._walking = false;
        this._moving = false;
        this._frame = 0;
        this._waving = false;
        this._direction = 0;
        this._roomX = 0;
        this._roomY = 0;
        this._roomZ = 0;
        this._animatedPosition = { roomX: 0, roomY: 0, roomZ: 0 };
        this._actions = new Set();
        this._loaded = false;
        this._onClick = undefined;
        this._onDoubleClick = undefined;
        this._onPointerDown = undefined;
        this._onPointerUp = undefined;
        this._onPointerOver = undefined;
        this._onPointerOut = undefined;
        this._direction = direction;
        this._look = look;
        this._roomX = roomX;
        this._roomY = roomY;
        this._roomZ = roomZ;
        this._headDirection = headDirection;
        this._id = id;
        this._placeholderSprites = new BaseAvatar_1.BaseAvatar({
            look: this._getPlaceholderLookOptions(),
            zIndex: this._calculateZIndex(),
            position: { x: 0, y: 0 },
            onLoad: () => {
                this._updateAvatarSprites();
            },
        });
        this._placeholderSprites.alpha = 0.5;
        this._avatarSprites = this._placeholderSprites;
        this._loadingAvatarSprites = new BaseAvatar_1.BaseAvatar({
            look: this._getLookOptions(),
            position: { x: 0, y: 0 },
            zIndex: this._calculateZIndex(),
            onLoad: () => {
                this._loaded = true;
                this._updateAvatarSprites();
            },
        });
    }
    /**
     * The look of the avatar
     */
    get look() {
        return this._look;
    }
    /**
     * Set this with a callback if you want to capture clicks on the Avatar.
     */
    get onClick() {
        return this._onClick;
    }
    set onClick(value) {
        this._onClick = value;
        this._updateEventHandlers();
    }
    /**
     * Set this with a callback if you want to capture double clicks on the Avatar.
     */
    get onDoubleClick() {
        return this._onDoubleClick;
    }
    set onDoubleClick(value) {
        this._onDoubleClick = value;
        this._updateEventHandlers();
    }
    get onPointerDown() {
        return this._onPointerDown;
    }
    set onPointerDown(value) {
        this._onPointerDown = value;
        this._updateEventHandlers();
    }
    get onPointerUp() {
        return this._onPointerUp;
    }
    set onPointerUp(value) {
        this._onPointerUp = value;
        this._updateEventHandlers();
    }
    get onPointerOver() {
        return this._onPointerOver;
    }
    set onPointerOver(value) {
        this._onPointerOver = value;
        this._updateEventHandlers();
    }
    get onPointerOut() {
        return this._onPointerOut;
    }
    set onPointerOut(value) {
        this._onPointerOut = value;
        this._updateEventHandlers();
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
    /**
     * Sets the item of the user. Note that this won't have an effect if you don't supply
     * an action which supports items. These are usually `CarryItem` and `UseItem`.
     */
    get item() {
        return this._item;
    }
    set item(value) {
        this._item = value;
        this._updateAvatarSprites();
    }
    get effect() {
        return this._effect;
    }
    set effect(value) {
        this._effect = value;
        this._updateAvatarSprites();
    }
    /**
     * Sets the direction of the avatar. Following numbers map to the
     * following directions of the avatar:
     *
     * ```
     *              x-Axis
     *          x--------------
     *          |
     *          |   7  0  1
     *          |
     *  y-Axis  |   6  x  2
     *          |
     *          |   5  4  3
     *
     * ```
     */
    get direction() {
        return this._direction;
    }
    set direction(value) {
        this._direction = value;
        this._updateAvatarSprites();
    }
    get headDirection() {
        return this._headDirection;
    }
    set headDirection(value) {
        this._headDirection = value;
        this._updateAvatarSprites();
    }
    /**
     * If set to true, the avatar will be waving. You can
     * achieve the same behavior by adding the wave action manually
     * through `addAction`.
     */
    get waving() {
        return this._waving;
    }
    set waving(value) {
        this._waving = value;
        this._updateAvatarSprites();
    }
    /**
     * The active actions of the avatar.
     */
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = value;
        this._updateAvatarSprites();
    }
    /**
     * The apparent position of the avatar on the screen. This is useful
     * for placing UI relative to the user.
     */
    get screenPosition() {
        const worldTransform = this._avatarSprites.getGlobalPosition();
        if (worldTransform == null)
            return;
        return {
            x: worldTransform.x,
            y: worldTransform.y,
        };
    }
    /**
     * Clears the enqueued movement of the avatar.
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
    /**
     * Walk the user to a position. This will trigger the walking animation, change the direction
     * and smoothly move the user to its new position. Note that you have to implement
     * your own pathfinding logic on top of it.
     *
     * @param roomX New x-Position
     * @param roomY New y-Position
     * @param roomZ New z-Position
     * @param options Optionally specify the direction/headDirection of user movement
     */
    walk(roomX, roomY, roomZ, options) {
        var _a;
        (_a = this._moveAnimation) === null || _a === void 0 ? void 0 : _a.move({ roomX: this.roomX, roomY: this.roomY, roomZ: this.roomZ }, { roomX, roomY, roomZ }, {
            direction: options === null || options === void 0 ? void 0 : options.direction,
            headDirection: options === null || options === void 0 ? void 0 : options.headDirection,
            type: "walk",
        });
        this._roomX = roomX;
        this._roomY = roomY;
        this._roomZ = roomZ;
    }
    /**
     * Move the user to a new position. This will smoothly animate the user to the
     * specified position.
     *
     * @param roomX New x-Position
     * @param roomY New y-Position
     * @param roomZ New z-Position
     */
    move(roomX, roomY, roomZ) {
        var _a;
        (_a = this._moveAnimation) === null || _a === void 0 ? void 0 : _a.move({ roomX: this.roomX, roomY: this.roomY, roomZ: this.roomZ }, { roomX, roomY, roomZ }, { type: "move" });
        this._roomX = roomX;
        this._roomY = roomY;
        this._roomZ = roomZ;
    }
    /**
     * @deprecated Use `screenPosition` instead. This will be the actual position on the screen.
     */
    getScreenPosition() {
        return {
            x: this._avatarSprites.x,
            y: this._avatarSprites.y,
        };
    }
    registered() {
        if (this._placeholderSprites != null) {
            this._placeholderSprites.dependencies = {
                animationTicker: this.animationTicker,
                avatarLoader: this.avatarLoader,
                eventManager: this.eventManager,
            };
        }
        this._loadingAvatarSprites.dependencies = {
            animationTicker: this.animationTicker,
            avatarLoader: this.avatarLoader,
            eventManager: this.eventManager,
        };
        this._updateAvatarSprites();
        this._moveAnimation = new ObjectAnimation_1.ObjectAnimation(this.animationTicker, {
            onUpdatePosition: (position) => {
                this._animatedPosition = position;
                this._updatePosition();
            },
            onStart: (data) => {
                if (data.type === "walk") {
                    this._startWalking(data.direction, data.headDirection);
                    this._moving = false;
                }
                else if (data.type === "move") {
                    this._stopWalking();
                    this._moving = true;
                }
            },
            onStop: () => {
                this._stopWalking();
                this._moving = false;
            },
        }, this.configuration.avatarMovementDuration);
    }
    /**
     * Make an action active.
     * @param action The action to add
     */
    addAction(action) {
        this.actions = new Set(this._actions).add(action);
    }
    /**
     * Remove an action from the active actions.
     * @param action The action to remove
     */
    removeAction(action) {
        const newSet = new Set(this._actions);
        newSet.delete(action);
        this.actions = newSet;
    }
    /**
     * Check if an action is active.
     * @param action The action to check
     */
    hasAction(action) {
        return this.actions.has(action);
    }
    destroyed() {
        var _a, _b;
        (_a = this._avatarSprites) === null || _a === void 0 ? void 0 : _a.destroy();
        if (this._cancelAnimation != null) {
            this._cancelAnimation();
        }
        (_b = this._moveAnimation) === null || _b === void 0 ? void 0 : _b.destroy();
    }
    _updateEventHandlers() {
        if (this._placeholderSprites != null) {
            this._placeholderSprites.onClick = this._onClick;
            this._placeholderSprites.onDoubleClick = this._onDoubleClick;
            this._placeholderSprites.onPointerDown = this._onPointerDown;
            this._placeholderSprites.onPointerUp = this._onPointerUp;
            this._placeholderSprites.onPointerOut = this._onPointerOut;
            this._placeholderSprites.onPointerOver = this._onPointerOver;
        }
        this._loadingAvatarSprites.onClick = this._onClick;
        this._loadingAvatarSprites.onDoubleClick = this._onDoubleClick;
        this._loadingAvatarSprites.onPointerDown = this._onPointerDown;
        this._loadingAvatarSprites.onPointerUp = this._onPointerUp;
        this._loadingAvatarSprites.onPointerOut = this._onPointerOut;
        this._loadingAvatarSprites.onPointerOver = this._onPointerOver;
    }
    _getPlaceholderLookOptions() {
        return {
            actions: new Set(),
            direction: this.direction,
            headDirection: this.direction,
            look: "hd-99999-99999",
            effect: undefined,
            initial: false,
            item: undefined,
        };
    }
    _getCurrentLookOptions() {
        if (!this._loaded)
            return this._getPlaceholderLookOptions();
        return this._getLookOptions();
    }
    _getLookOptions() {
        const combinedActions = new Set(this.actions);
        if (this._walking) {
            combinedActions.add(AvatarAction_1.AvatarAction.Move);
        }
        if (this.waving) {
            combinedActions.add(AvatarAction_1.AvatarAction.Wave);
        }
        if (combinedActions.has(AvatarAction_1.AvatarAction.Lay) && this._walking) {
            combinedActions.delete(AvatarAction_1.AvatarAction.Lay);
        }
        return {
            actions: combinedActions,
            direction: this.direction,
            headDirection: this.headDirection,
            look: this._look,
            item: this.item,
            effect: this.effect,
        };
    }
    _updateAvatarSprites() {
        if (!this.mounted)
            return;
        if (this._loaded) {
            if (this._placeholderSprites != null) {
                this._placeholderSprites.destroy();
            }
            this._placeholderSprites = undefined;
            this._avatarSprites = this._loadingAvatarSprites;
        }
        else if (this._placeholderSprites != null) {
            this._avatarSprites = this._placeholderSprites;
        }
        const look = this._getCurrentLookOptions();
        const animating = true;
        if (animating) {
            this._startAnimation();
        }
        else {
            this._stopAnimation();
        }
        const avatarSprites = this._avatarSprites;
        if (avatarSprites != null) {
            avatarSprites.lookOptions = look;
        }
        this._updatePosition();
        this._updateEventHandlers();
    }
    _updateFrame() {
        this._avatarSprites.currentFrame = this._frame;
    }
    _startAnimation() {
        if (this._cancelAnimation != null)
            return;
        this._frame = 0;
        const start = this.animationTicker.current();
        this._cancelAnimation = this.animationTicker.subscribe((value) => {
            this._frame = value - start;
            this._updateFrame();
        });
    }
    _stopAnimation() {
        this._frame = 0;
        if (this._cancelAnimation != null) {
            this._cancelAnimation();
            this._cancelAnimation = undefined;
        }
    }
    _startWalking(direction, headDirection) {
        this._walking = true;
        if (direction != null) {
            this.direction = direction;
        }
        if (headDirection != null) {
            this.headDirection = headDirection;
        }
        this._updateAvatarSprites();
    }
    _stopWalking() {
        this._walking = false;
        this._updateAvatarSprites();
    }
    _calculateZIndex() {
        return this._getZIndexAtPosition(this.roomX, this.roomY, this.roomZ);
    }
    _getDisplayRoomPosition() {
        if (this._walking || this._moving) {
            return this._animatedPosition;
        }
        return {
            roomX: this.roomX,
            roomY: this.roomY,
            roomZ: this.roomZ,
        };
    }
    _getZIndexAtPosition(roomX, roomY, roomZ) {
        let zOffset = 1;
        if (this._getCurrentLookOptions().actions.has(AvatarAction_1.AvatarAction.Lay)) {
            zOffset += 2000;
        }
        return (0, getZOrder_1.getZOrder)(roomX, roomY, roomZ) + zOffset;
    }
    _updatePosition() {
        if (!this.mounted)
            return;
        const { roomX, roomY, roomZ } = this._getDisplayRoomPosition();
        const { x, y } = this.geometry.getPosition(roomX, roomY, roomZ);
        const roomXrounded = Math.round(roomX);
        const roomYrounded = Math.round(roomY);
        if (this._avatarSprites != null) {
            this._avatarSprites.x = Math.round(x);
            this._avatarSprites.y = Math.round(y);
            const zIndex = this._getZIndexAtPosition(roomXrounded, roomYrounded, this.roomZ);
            this._avatarSprites.zIndex = zIndex;
            this._avatarSprites.spritesZIndex = zIndex;
        }
        const item = this.tilemap.getTileAtPosition(roomXrounded, roomYrounded);
        if ((item === null || item === void 0 ? void 0 : item.type) === "door") {
            this.roomVisualization.container.removeChild(this._avatarSprites);
            this.roomVisualization.behindWallContainer.addChild(this._avatarSprites);
        }
        if (item == null || item.type !== "door") {
            this.roomVisualization.behindWallContainer.removeChild(this._avatarSprites);
            this.roomVisualization.container.addChild(this._avatarSprites);
        }
    }
}
exports.Avatar = Avatar;
