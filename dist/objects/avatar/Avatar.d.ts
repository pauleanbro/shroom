import { RoomObject } from "../RoomObject";
import { RoomPosition } from "../../types/RoomPosition";
import { IMoveable } from "../interfaces/IMoveable";
import { AvatarAction } from "./enum/AvatarAction";
import { IScreenPositioned } from "../interfaces/IScreenPositioned";
import { HitEventHandler } from "../hitdetection/HitSprite";
export declare class Avatar extends RoomObject implements IMoveable, IScreenPositioned {
    private _avatarSprites;
    private _moveAnimation;
    private _walking;
    private _moving;
    private _frame;
    private _cancelAnimation;
    private _waving;
    private _direction;
    private _headDirection?;
    private _id?;
    private _item;
    private _look;
    private _roomX;
    private _roomY;
    private _roomZ;
    private _animatedPosition;
    private _actions;
    private _loadingAvatarSprites;
    private _placeholderSprites;
    private _loaded;
    private _effect;
    private _onClick;
    private _onDoubleClick;
    private _onPointerDown;
    private _onPointerUp;
    private _onPointerOver;
    private _onPointerOut;
    constructor({ look, roomX, roomY, roomZ, direction, headDirection, id, }: Options);
    /**
     * The look of the avatar
     */
    get look(): string;
    /**
     * Set this with a callback if you want to capture clicks on the Avatar.
     */
    get onClick(): HitEventHandler | undefined;
    set onClick(value: HitEventHandler | undefined);
    /**
     * Set this with a callback if you want to capture double clicks on the Avatar.
     */
    get onDoubleClick(): HitEventHandler | undefined;
    set onDoubleClick(value: HitEventHandler | undefined);
    get onPointerDown(): HitEventHandler | undefined;
    set onPointerDown(value: HitEventHandler | undefined);
    get onPointerUp(): HitEventHandler | undefined;
    set onPointerUp(value: HitEventHandler | undefined);
    get onPointerOver(): HitEventHandler | undefined;
    set onPointerOver(value: HitEventHandler | undefined);
    get onPointerOut(): HitEventHandler | undefined;
    set onPointerOut(value: HitEventHandler | undefined);
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
    get roomX(): number;
    set roomX(value: number);
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
    get roomY(): number;
    set roomY(value: number);
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
    get roomZ(): number;
    set roomZ(value: number);
    /**
     * Sets the item of the user. Note that this won't have an effect if you don't supply
     * an action which supports items. These are usually `CarryItem` and `UseItem`.
     */
    get item(): string | number | undefined;
    set item(value: string | number | undefined);
    get effect(): string | undefined;
    set effect(value: string | undefined);
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
    get direction(): number;
    set direction(value: number);
    get headDirection(): number | undefined;
    set headDirection(value: number | undefined);
    /**
     * If set to true, the avatar will be waving. You can
     * achieve the same behavior by adding the wave action manually
     * through `addAction`.
     */
    get waving(): boolean;
    set waving(value: boolean);
    /**
     * The active actions of the avatar.
     */
    get actions(): Set<AvatarAction>;
    set actions(value: Set<AvatarAction>);
    /**
     * The apparent position of the avatar on the screen. This is useful
     * for placing UI relative to the user.
     */
    get screenPosition(): {
        x: number;
        y: number;
    } | undefined;
    /**
     * Clears the enqueued movement of the avatar.
     */
    clearMovement(): void;
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
    walk(roomX: number, roomY: number, roomZ: number, options?: {
        direction?: number;
        headDirection?: number;
    }): void;
    /**
     * Move the user to a new position. This will smoothly animate the user to the
     * specified position.
     *
     * @param roomX New x-Position
     * @param roomY New y-Position
     * @param roomZ New z-Position
     */
    move(roomX: number, roomY: number, roomZ: number): void;
    /**
     * @deprecated Use `screenPosition` instead. This will be the actual position on the screen.
     */
    getScreenPosition(): {
        x: number;
        y: number;
    };
    registered(): void;
    /**
     * Make an action active.
     * @param action The action to add
     */
    addAction(action: AvatarAction): void;
    /**
     * Remove an action from the active actions.
     * @param action The action to remove
     */
    removeAction(action: AvatarAction): void;
    /**
     * Check if an action is active.
     * @param action The action to check
     */
    hasAction(action: AvatarAction): boolean;
    destroyed(): void;
    private _updateEventHandlers;
    private _getPlaceholderLookOptions;
    private _getCurrentLookOptions;
    private _getLookOptions;
    private _updateAvatarSprites;
    private _updateFrame;
    private _startAnimation;
    private _stopAnimation;
    private _startWalking;
    private _stopWalking;
    private _calculateZIndex;
    private _getDisplayRoomPosition;
    private _getZIndexAtPosition;
    private _updatePosition;
}
interface Options extends RoomPosition {
    /** Look of the avatar */
    look: string;
    /**
     * Direction of the avatar. Following numbers map to the
     * following directions of the avatar. The `x` would be the location of the
     * avatar and the numbers represent for which number the avatar faces in which direction.
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
    direction: number;
    headDirection?: number;
    id?: string;
}
export {};
