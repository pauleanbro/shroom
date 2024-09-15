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
exports.Room = void 0;
const PIXI = __importStar(require("pixi.js"));
const parseTileMapString_1 = require("../../util/parseTileMapString");
const RoomObjectContainer_1 = require("./RoomObjectContainer");
const RoomModelVisualization_1 = require("./RoomModelVisualization");
const ParsedTileMap_1 = require("./ParsedTileMap");
const getTileColors_1 = require("./util/getTileColors");
const EventManager_1 = require("../events/EventManager");
class Room extends PIXI.Container {
    get onActiveTileChange() {
        return this._visualization.onActiveTileChange;
    }
    get onActiveWallChange() {
        return this._visualization.onActiveWallChange;
    }
    constructor({ animationTicker, avatarLoader, furnitureLoader, tilemap, configuration, application, }) {
        super();
        const normalizedTileMap = typeof tilemap === "string" ? (0, parseTileMapString_1.parseTileMapString)(tilemap) : tilemap;
        this._application = application;
        this._animationTicker = animationTicker;
        this._furnitureLoader = furnitureLoader;
        this._avatarLoader = avatarLoader;
        this._eventManager = new EventManager_1.EventManager();
        this._configuration = configuration;
        this.application = application;
        this._visualization = new RoomModelVisualization_1.RoomModelVisualization(this._eventManager, this.application, new ParsedTileMap_1.ParsedTileMap(normalizedTileMap));
        this._roomObjectContainer = new RoomObjectContainer_1.RoomObjectContainer();
        this._roomObjectContainer.context = {
            geometry: this,
            visualization: this._visualization,
            animationTicker: this._animationTicker,
            furnitureLoader: this._furnitureLoader,
            roomObjectContainer: this,
            avatarLoader: this._avatarLoader,
            eventManager: this._eventManager,
            configuration: this._configuration,
            tilemap: this,
            landscapeContainer: this._visualization,
            application: this._application,
            room: this,
        };
        this.addChild(this._visualization);
        this._visualization.onTileClick.subscribe((value) => {
            this.onTileClick && this.onTileClick(value);
        });
    }
    /**
     * Creates a new room.
     * @param shroom A shroom instance
     * @param options Room creation options
     */
    static create(shroom, { tilemap }) {
        return new Room({ ...shroom.dependencies, tilemap });
    }
    /**
     * Room objects which are attached to the room.
     */
    get roomObjects() {
        return this._roomObjectContainer.roomObjects;
    }
    /**
     * When set to true, hides the walls
     */
    get hideWalls() {
        return this._visualization.hideWalls;
    }
    set hideWalls(value) {
        this._visualization.hideWalls = value;
    }
    /**
     * When set to true, hide the floor. This will also hide the walls.
     */
    get hideFloor() {
        return this._visualization.hideFloor;
    }
    set hideFloor(value) {
        this._visualization.hideFloor = value;
    }
    get hideTileCursor() {
        return this._visualization.hideTileCursor;
    }
    set hideTileCursor(value) {
        this._visualization.hideTileCursor = value;
    }
    /**
     * Height of the walls in the room.
     */
    get wallHeight() {
        return this._visualization.wallHeight;
    }
    set wallHeight(value) {
        this._visualization.wallHeight = value;
    }
    /**
     * Height of the tile
     */
    get tileHeight() {
        return this._visualization.tileHeight;
    }
    set tileHeight(value) {
        this._visualization.tileHeight = value;
    }
    /**
     * Depth of the wall
     */
    get wallDepth() {
        return this._visualization.wallDepth;
    }
    set wallDepth(value) {
        this._visualization.wallDepth = value;
    }
    /**
     * A callback which is called with the tile position when a tile is clicked.
     */
    get onTileClick() {
        return this._onTileClick;
    }
    set onTileClick(value) {
        this._onTileClick = value;
    }
    /**
     * Texture of the wall.
     */
    get wallTexture() {
        return this._wallTexture;
    }
    set wallTexture(value) {
        this._wallTexture = value;
        this._loadWallTextures();
    }
    /**
     * Texture of the floor.
     */
    get floorTexture() {
        return this._floorTexture;
    }
    set floorTexture(value) {
        this._floorTexture = value;
        this._loadFloorTextures();
    }
    /**
     * Color of the wall.
     */
    get wallColor() {
        return this._wallColor;
    }
    set wallColor(value) {
        this._wallColor = value;
        this._updateWallColor();
    }
    /**
     * Color of the floor.
     */
    get floorColor() {
        return this._floorColor;
    }
    set floorColor(value) {
        this._floorColor = value;
        this._updateTileColor();
    }
    /**
     * Height of the room.
     */
    get roomHeight() {
        return this._visualization.rectangle.height;
    }
    /**
     * Width of the room.
     */
    get roomWidth() {
        return this._visualization.rectangle.width;
    }
    getParsedTileTypes() {
        return this._visualization.parsedTileMap.parsedTileTypes;
    }
    /**
     * Adds and registers a room object to a room.
     * @param object The room object to attach
     */
    addRoomObject(object) {
        this._roomObjectContainer.addRoomObject(object);
    }
    /**
     * Removes and destroys a room object from the room.
     * @param object The room object to remove
     */
    removeRoomObject(object) {
        this._roomObjectContainer.removeRoomObject(object);
    }
    getPosition(roomX, roomY, roomZ) {
        return this._visualization.getScreenPosition(roomX, roomY, roomZ);
    }
    getTileAtPosition(roomX, roomY) {
        const { x, y } = this._getObjectPositionWithOffset(roomX, roomY);
        const row = this._visualization.parsedTileMap.parsedTileTypes[y];
        if (row == null)
            return;
        if (row[x] == null)
            return;
        return row[x];
    }
    destroy() {
        super.destroy();
        this.roomObjects.forEach((object) => this.removeRoomObject(object));
        this._visualization.destroy();
    }
    _getObjectPositionWithOffset(roomX, roomY) {
        return {
            x: roomX,
            y: roomY,
        };
    }
    _loadWallTextures() {
        Promise.resolve(this.wallTexture).then((texture) => {
            this._currentWallTexture = texture;
            this._visualization.wallTexture = texture;
        });
    }
    _loadFloorTextures() {
        Promise.resolve(this.floorTexture).then((texture) => {
            this._visualization.floorTexture = texture;
        });
    }
    _updateWallColor() {
        const wallColors = (0, getTileColors_1.getWallColors)(this._getWallColor());
        this._visualization.wallLeftColor = wallColors.rightTint;
        this._visualization.wallRightColor = wallColors.leftTint;
        this._visualization.wallTopColor = wallColors.topTint;
    }
    _updateTileColor() {
        if (this._floorColor != null) {
            const tileColors = (0, getTileColors_1.getTileColors)(this._floorColor);
            this._visualization.tileTopColor = tileColors.tileTint;
            this._visualization.tileLeftColor = tileColors.borderRightTint;
            this._visualization.tileRightColor = tileColors.borderLeftTint;
        }
        else {
            this._visualization.tileTopColor = undefined;
            this._visualization.tileLeftColor = undefined;
            this._visualization.tileRightColor = undefined;
        }
    }
    _getWallColor() {
        var _a;
        if (this.wallColor == null && this._currentWallTexture != null) {
            return "#ffffff";
        }
        if (this.wallColor == null && this._currentWallTexture == null) {
            return "#b6b8c7";
        }
        return (_a = this.wallColor) !== null && _a !== void 0 ? _a : "#ffffff";
    }
}
exports.Room = Room;
