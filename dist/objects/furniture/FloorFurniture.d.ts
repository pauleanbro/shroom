import { RoomObject } from "../RoomObject";
import { IFurniture, IFurnitureBehavior } from "./IFurniture";
import { HitEventHandler } from "../hitdetection/HitSprite";
import { IMoveable } from "../interfaces/IMoveable";
import { FurnitureFetchInfo } from "./FurnitureFetchInfo";
import { FurnitureId } from "../../interfaces/IFurnitureData";
export declare class FloorFurniture extends RoomObject implements IFurniture, IMoveable {
    readonly placementType = "floor";
    private _baseFurniture;
    private _moveAnimation;
    private _animatedPosition;
    private _moving;
    private readonly _id;
    private readonly _type;
    private _roomX;
    private _roomY;
    private _roomZ;
    private _direction;
    private _animation?;
    private _highlight;
    private _onClick;
    private _onDoubleClick;
    private _onPointerDown;
    private _onPointerUp;
    private _onPointerOver;
    private _onPointerOut;
    constructor(options: {
        roomX: number;
        roomY: number;
        roomZ: number;
        direction: number;
        animation?: string;
        behaviors?: IFurnitureBehavior<FloorFurniture>[];
    } & FurnitureFetchInfo);
    /**
     * Moves and animates the furniture to a new position.
     *
     * @param roomX New x-Position
     * @param roomY New y-Position
     * @param roomZ New z-Position
     */
    move(roomX: number, roomY: number, roomZ: number): void;
    /**
     * Clears the enqueued movement animations of the furniture
     */
    clearMovement(): void;
    destroyed(): void;
    registered(): void;
    /**
     * If set to true, displays the furniture in the highlight state.
     */
    get highlight(): boolean;
    set highlight(value: boolean);
    /**
     * Alpha value of the furniture
     */
    get alpha(): number;
    set alpha(value: number);
    /**
     * Type of the furniture
     */
    get type(): string | undefined;
    /**
     * Callback triggered when the furniture has been clicked on.
     */
    get onClick(): HitEventHandler | undefined;
    set onClick(value: HitEventHandler | undefined);
    /**
     * Callback triggered when the furniture has been double clicked on.
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
     * ID of the furniture
     */
    get id(): FurnitureId | undefined;
    /**
     * The extra data provided through the `index.bin` file of the furniture.
     * This contains the `logic` and `visualization` stings which specify some
     * furniture behavior.
     */
    get extradata(): Promise<import("./FurnitureExtraData").FurnitureExtraData>;
    /**
     * Valid directions of the furniture.
     */
    get validDirections(): Promise<number[]>;
    /**
     * Animation of the furniture
     */
    get animation(): string | undefined;
    set animation(value: string | undefined);
    /**
     * Direction of the furniture
     */
    get direction(): number;
    set direction(value: number);
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
    get visualization(): import("./IFurnitureVisualization").IFurnitureVisualization;
    set visualization(value: import("./IFurnitureVisualization").IFurnitureVisualization);
    private _updateDirection;
    private _getDisplayRoomPosition;
    private _updatePosition;
    private _updateAnimation;
    private _updateHighlight;
}
