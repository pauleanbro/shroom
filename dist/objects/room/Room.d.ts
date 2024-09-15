import * as PIXI from "pixi.js";
import { IAnimationTicker } from "../../interfaces/IAnimationTicker";
import { IAvatarLoader } from "../../interfaces/IAvatarLoader";
import { IConfiguration } from "../../interfaces/IConfiguration";
import { IFurnitureData } from "../../interfaces/IFurnitureData";
import { IFurnitureLoader } from "../../interfaces/IFurnitureLoader";
import { IRoomGeometry } from "../../interfaces/IRoomGeometry";
import { IRoomObject } from "../../interfaces/IRoomObject";
import { IRoomObjectContainer } from "../../interfaces/IRoomObjectContainer";
import { RoomPosition } from "../../types/RoomPosition";
import { TileType } from "../../types/TileType";
import { ParsedTileType } from "../../util/parseTileMap";
import { Shroom } from "../Shroom";
import { ITileMap } from "../../interfaces/ITileMap";
export interface Dependencies {
    animationTicker: IAnimationTicker;
    avatarLoader: IAvatarLoader;
    furnitureLoader: IFurnitureLoader;
    configuration: IConfiguration;
    furnitureData?: IFurnitureData;
    application: PIXI.Application;
}
type TileMap = TileType[][] | string;
interface CreateOptions {
    /**
     * A tilemap string or 2d-array. This should have the following format
     * ```
     * xxxx  <- Upper padding
     * x000  <- Tiles
     * x000
     * x000
     *
     * |
     * |
     * Side padding
     * ```
     */
    tilemap: TileMap;
}
export declare class Room extends PIXI.Container implements IRoomGeometry, IRoomObjectContainer, ITileMap {
    readonly application: PIXI.Application;
    private _roomObjectContainer;
    private _visualization;
    private _animationTicker;
    private _avatarLoader;
    private _furnitureLoader;
    private _eventManager;
    private _configuration;
    private _wallTexture;
    private _floorTexture;
    private _wallColor;
    private _floorColor;
    private _currentWallTexture;
    private _onTileClick;
    private _application;
    get onActiveTileChange(): import("rxjs").Observable<RoomPosition>;
    get onActiveWallChange(): import("rxjs").Observable<{
        roomX: number;
        roomY: number;
        offsetX: number;
        offsetY: number;
        wall: "l" | "r";
    } | undefined>;
    constructor({ animationTicker, avatarLoader, furnitureLoader, tilemap, configuration, application, }: {
        tilemap: TileMap;
    } & Dependencies);
    /**
     * Creates a new room.
     * @param shroom A shroom instance
     * @param options Room creation options
     */
    static create(shroom: Shroom, { tilemap }: CreateOptions): Room;
    /**
     * Room objects which are attached to the room.
     */
    get roomObjects(): ReadonlySet<IRoomObject>;
    /**
     * When set to true, hides the walls
     */
    get hideWalls(): boolean;
    set hideWalls(value: boolean);
    /**
     * When set to true, hide the floor. This will also hide the walls.
     */
    get hideFloor(): boolean;
    set hideFloor(value: boolean);
    get hideTileCursor(): boolean;
    set hideTileCursor(value: boolean);
    /**
     * Height of the walls in the room.
     */
    get wallHeight(): number;
    set wallHeight(value: number);
    /**
     * Height of the tile
     */
    get tileHeight(): number;
    set tileHeight(value: number);
    /**
     * Depth of the wall
     */
    get wallDepth(): number;
    set wallDepth(value: number);
    /**
     * A callback which is called with the tile position when a tile is clicked.
     */
    get onTileClick(): ((position: RoomPosition) => void) | undefined;
    set onTileClick(value: ((position: RoomPosition) => void) | undefined);
    /**
     * Texture of the wall.
     */
    get wallTexture(): PIXI.Texture | Promise<PIXI.Texture> | undefined;
    set wallTexture(value: PIXI.Texture | Promise<PIXI.Texture> | undefined);
    /**
     * Texture of the floor.
     */
    get floorTexture(): PIXI.Texture | Promise<PIXI.Texture> | undefined;
    set floorTexture(value: PIXI.Texture | Promise<PIXI.Texture> | undefined);
    /**
     * Color of the wall.
     */
    get wallColor(): string | undefined;
    set wallColor(value: string | undefined);
    /**
     * Color of the floor.
     */
    get floorColor(): string | undefined;
    set floorColor(value: string | undefined);
    /**
     * Height of the room.
     */
    get roomHeight(): number;
    /**
     * Width of the room.
     */
    get roomWidth(): number;
    getParsedTileTypes(): ParsedTileType[][];
    /**
     * Adds and registers a room object to a room.
     * @param object The room object to attach
     */
    addRoomObject(object: IRoomObject): void;
    /**
     * Removes and destroys a room object from the room.
     * @param object The room object to remove
     */
    removeRoomObject(object: IRoomObject): void;
    getPosition(roomX: number, roomY: number, roomZ: number): {
        x: number;
        y: number;
    };
    getTileAtPosition(roomX: number, roomY: number): ParsedTileType | undefined;
    destroy(): void;
    private _getObjectPositionWithOffset;
    private _loadWallTextures;
    private _loadFloorTextures;
    private _updateWallColor;
    private _updateTileColor;
    private _getWallColor;
}
export {};
