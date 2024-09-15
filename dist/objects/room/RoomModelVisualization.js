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
exports.RoomModelVisualization = void 0;
const PIXI = __importStar(require("pixi.js"));
const rxjs_1 = require("rxjs");
const getZOrder_1 = require("../../util/getZOrder");
const EventManagerContainer_1 = require("../events/EventManagerContainer");
const Stair_1 = require("./parts/Stair");
const StairCorner_1 = require("./parts/StairCorner");
const Tile_1 = require("./parts/Tile");
const TileCursor_1 = require("./parts/TileCursor");
const WallLeft_1 = require("./parts/WallLeft");
const WallOuterCorner_1 = require("./parts/WallOuterCorner");
const WallRight_1 = require("./parts/WallRight");
const getTileMapBounds_1 = require("./util/getTileMapBounds");
class RoomModelVisualization extends PIXI.Container {
    constructor(_eventManager, _application, parsedTileMap) {
        super();
        this._eventManager = _eventManager;
        this._application = _application;
        this.parsedTileMap = parsedTileMap;
        this._hideTileCursor = false;
        this._hideWalls = false;
        this._hideFloor = false;
        this._positionalContainer = new PIXI.Container();
        this._behindWallLayer = new PIXI.Container();
        this._wallLayer = new PIXI.Container();
        this._tileLayer = new PIXI.Container();
        this._primaryLayer = new PIXI.Container();
        this._landscapeLayer = new PIXI.Container();
        this._wallHitAreaLayer = new PIXI.Container();
        this._masksLayer = new PIXI.Container();
        this._walls = [];
        this._tiles = [];
        this._tileCursors = [];
        this._masks = new Map();
        this._parts = new Set();
        this._borderWidth = 8;
        this._tileHeight = 8;
        this._wallHeight = 116;
        this._onActiveTileChange = new rxjs_1.Subject();
        this._onActiveWallChange = new rxjs_1.Subject();
        this._onTileClick = new rxjs_1.Subject();
        this._refreshRoom = false;
        this._rebuildRoom = false;
        this._handleTick = () => {
            if (this._rebuildRoom) {
                this._updateHeightmap();
                this._rebuildRoom = false;
            }
            if (this._refreshRoom) {
                this._updateParts();
                this._refreshRoom = false;
            }
        };
        this._tileMapBounds = (0, getTileMapBounds_1.getTileMapBounds)(this.parsedTileMap.parsedTileTypes, {
            x: this.parsedTileMap.wallOffsets.x,
            y: this.parsedTileMap.wallOffsets.y,
        });
        this._positionalContainer.addChild(this._behindWallLayer);
        this._positionalContainer.addChild(this._wallLayer);
        this._positionalContainer.addChild(this._wallHitAreaLayer);
        this._positionalContainer.addChild(this._tileLayer);
        this._positionalContainer.addChild(this._landscapeLayer);
        this._positionalContainer.addChild(this._primaryLayer);
        this._positionalContainer.addChild(this._masksLayer);
        this._positionalContainer.x = -this.roomBounds.minX;
        this._positionalContainer.y = -this.roomBounds.minY;
        this._primaryLayer.sortableChildren = true;
        this._tileLayer.sortableChildren = true;
        this.addChild(this._positionalContainer);
        new EventManagerContainer_1.EventManagerContainer(this._application, this._eventManager);
        this._updateHeightmap();
        this._application.ticker.add(this._handleTick);
    }
    addPart(part) {
        this._parts.add(part);
        part.update(this._getCurrentRoomPartData());
        return {
            remove: () => {
                this._parts.delete(part);
            },
        };
    }
    getMaskLevel(roomX, roomY) {
        return {
            roomX,
            roomY,
        };
    }
    get onTileClick() {
        return this._onTileClick;
    }
    get hideFloor() {
        return this._hideFloor;
    }
    set hideFloor(value) {
        this._hideFloor = value;
        this._rebuildRoom = true;
    }
    get hideWalls() {
        return this._hideWalls;
    }
    set hideWalls(value) {
        this._hideWalls = value;
        this._rebuildRoom = true;
    }
    get hideTileCursor() {
        return this._hideTileCursor;
    }
    set hideTileCursor(value) {
        this._hideTileCursor = value;
        this._rebuildRoom = true;
    }
    get wallTexture() {
        return this._wallTexture;
    }
    set wallTexture(value) {
        this._wallTexture = value;
        this._refreshRoom = true;
    }
    get floorTexture() {
        return this._floorTexture;
    }
    set floorTexture(value) {
        this._floorTexture = value;
        this._refreshRoom = true;
    }
    get wallHeight() {
        return this._wallHeight;
    }
    set wallHeight(value) {
        this._wallHeight = value;
        this._refreshRoom = true;
    }
    get tileHeight() {
        return this._tileHeight;
    }
    set tileHeight(value) {
        this._tileHeight = value;
        this._refreshRoom = true;
    }
    get wallDepth() {
        return this._borderWidth;
    }
    set wallDepth(value) {
        this._borderWidth = value;
        this._refreshRoom = true;
    }
    get roomBounds() {
        const hasWalls = this.hideWalls || this.hideFloor;
        const minOffsetY = hasWalls ? 0 : -this._wallHeight - this._borderWidth;
        const minXOffset = hasWalls ? 0 : -this._borderWidth;
        const maxOffsetX = hasWalls ? 0 : this._borderWidth;
        const maxOffsetY = hasWalls ? 0 : this._tileHeight;
        return {
            minX: this._tileMapBounds.minX + minXOffset,
            maxX: this._tileMapBounds.maxX + maxOffsetX,
            minY: this._tileMapBounds.minY + minOffsetY,
            maxY: this._tileMapBounds.maxY + maxOffsetY,
        };
    }
    get rectangle() {
        return {
            x: this.x,
            y: this.y,
            width: this.roomBounds.maxX - this.roomBounds.minX,
            height: this.roomBounds.maxY - this.roomBounds.minY,
        };
    }
    get wallLeftColor() {
        return this._wallLeftColor;
    }
    set wallLeftColor(value) {
        this._wallLeftColor = value;
        this._refreshRoom = true;
    }
    get wallRightColor() {
        return this._wallRightColor;
    }
    set wallRightColor(value) {
        this._wallRightColor = value;
        this._refreshRoom = true;
    }
    get wallTopColor() {
        return this._wallTopColor;
    }
    set wallTopColor(value) {
        this._wallTopColor = value;
        this._refreshRoom = true;
    }
    get tileLeftColor() {
        return this._tileLeftColor;
    }
    set tileLeftColor(value) {
        this._tileLeftColor = value;
        this._refreshRoom = true;
    }
    get tileRightColor() {
        return this._tileRightColor;
    }
    set tileRightColor(value) {
        this._tileRightColor = value;
        this._refreshRoom = true;
    }
    get tileTopColor() {
        return this._tileTopColor;
    }
    set tileTopColor(value) {
        this._tileTopColor = value;
        this._refreshRoom = true;
    }
    get onActiveTileChange() {
        return this._onActiveTileChange.asObservable();
    }
    get onActiveWallChange() {
        return this._onActiveWallChange.asObservable();
    }
    get container() {
        return this._primaryLayer;
    }
    get behindWallContainer() {
        return this._behindWallLayer;
    }
    get landscapeContainer() {
        return this._landscapeLayer;
    }
    get floorContainer() {
        return this._tileLayer;
    }
    get wallContainer() {
        return this._wallLayer;
    }
    destroy() {
        super.destroy();
        this._destroyAllSprites();
    }
    addMask(id, element) {
        /*
        const existing = this._masks.get(id);
        const current =
          this._masks.get(id) ??
          new RoomLandscapeMaskSprite({
            renderer: this._application.renderer,
            roomBounds: this.roomBounds,
          });
    
        current.addSprite(element);
        this._primaryLayer.addChild(current);
    
        if (existing == null) {
          this._masks.set(id, current);
          this._updateParts();
        }
    
        return {
          update: () => current.updateSprite(element),
          remove: () => current.removeSprite(element),
          sprite: element,
        };*/
        return {
            update: () => {
                // Nothing
            },
            remove: () => {
                // Nothing
            },
            sprite: element,
        };
    }
    getScreenPosition(roomX, roomY, roomZ) {
        return this._getPosition(roomX, roomY, roomZ);
    }
    _getCurrentRoomPartData() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return {
            borderWidth: this._borderWidth,
            tileHeight: this._tileHeight,
            wallHeight: this._getLargestWallHeight(),
            wallLeftColor: (_a = this._wallLeftColor) !== null && _a !== void 0 ? _a : 0x91949f,
            wallRightColor: (_b = this._wallRightColor) !== null && _b !== void 0 ? _b : 0xbbbecd,
            wallTopColor: (_c = this._wallTopColor) !== null && _c !== void 0 ? _c : 0x70727b,
            tileLeftColor: (_d = this._tileLeftColor) !== null && _d !== void 0 ? _d : 0x838357,
            tileRightColor: (_e = this._tileRightColor) !== null && _e !== void 0 ? _e : 0x666644,
            tileTopColor: (_f = this._tileTopColor) !== null && _f !== void 0 ? _f : 0x989865,
            tileTexture: (_g = this._floorTexture) !== null && _g !== void 0 ? _g : PIXI.Texture.WHITE,
            wallTexture: (_h = this._wallTexture) !== null && _h !== void 0 ? _h : PIXI.Texture.WHITE,
            masks: this._masks,
        };
    }
    _setCache(cache) {
        [this._tileLayer, this._wallLayer].forEach((container) => (container.cacheAsBitmap = cache));
    }
    _getLargestWallHeight() {
        return this.parsedTileMap.largestDiff * 32 + this._wallHeight;
    }
    _destroyAllSprites() {
        [...this._tileCursors, ...this._tiles, ...this._walls].forEach((part) => part.destroy());
        this._tileCursors = [];
        this._tiles = [];
        this._walls = [];
    }
    _updateHeightmap() {
        this._destroyAllSprites();
        for (let y = 0; y < this.parsedTileMap.parsedTileTypes.length; y++) {
            for (let x = 0; x < this.parsedTileMap.parsedTileTypes[y].length; x++) {
                const cell = this.parsedTileMap.parsedTileTypes[y][x];
                this._createHeightmapElement(cell, x, y);
            }
        }
        this._updateParts();
        this._positionalContainer.x = -this.roomBounds.minX;
        this._positionalContainer.y = -this.roomBounds.minY;
    }
    _updateParts() {
        this._setCache(false);
        [...this._tiles, ...this._walls, ...this._parts].forEach((tile) => tile.update(this._getCurrentRoomPartData()));
        this._setCache(true);
    }
    _createHeightmapElement(element, x, y) {
        switch (element.type) {
            case "wall":
                this._createWallElement(element, x, y, element.height);
                break;
            case "tile":
                this._createTileElement(x, y, element.z);
                break;
            case "door":
                this._createDoor(x, y, element.z);
                break;
            case "stairs":
                this._createStair(x, y, element.z, element.kind);
                break;
            case "stairCorner":
                this._createStairCorner(x, y, element.z, element.kind);
                break;
        }
    }
    _createStairCorner(x, y, z, kind) {
        const stair = new StairCorner_1.StairCorner({ type: kind });
        const position = this._getPosition(x, y, z);
        stair.x = position.x;
        stair.y = position.y;
        this._tiles.push(stair);
        this._tileLayer.addChild(stair);
        this._createTileCursor(x, y, z);
        this._createTileCursor(x, y, z + 1);
    }
    _createStair(x, y, z, direction) {
        const stair = new Stair_1.Stair({
            tileHeight: this._tileHeight,
            direction,
        });
        const position = this._getPosition(x, y, z);
        stair.x = position.x;
        stair.y = position.y;
        this._tiles.push(stair);
        this._tileLayer.addChild(stair);
        this._createTileCursor(x, y, z);
        this._createTileCursor(x, y, z + 1);
    }
    _createDoor(x, y, z) {
        this._createTileElement(x, y, z, this._behindWallLayer);
        this._createLeftWall(x, y, z, { hideBorder: false, cutawayHeight: 90 });
    }
    _createTileElement(x, y, z, container) {
        if (this._hideFloor)
            return;
        const tile = new Tile_1.Tile({ color: "#eeeeee", tileHeight: this._tileHeight });
        const xEven = x % 2 === 0;
        const yEven = y % 2 === 0;
        tile.tilePositions = new PIXI.Point(xEven ? 32 : 0, yEven ? 32 : 0);
        const position = this._getPosition(x, y, z);
        tile.x = position.x;
        tile.y = position.y;
        (container !== null && container !== void 0 ? container : this._tileLayer).addChild(tile);
        this._tiles.push(tile);
        this._createTileCursor(x, y, z, container);
    }
    _createTileCursor(x, y, z, container) {
        if (this._hideTileCursor)
            return;
        const position = { roomX: x, roomY: y, roomZ: z };
        const cursor = new TileCursor_1.TileCursor(this._eventManager, position, () => {
            this._onTileClick.next(position);
        }, () => {
            this._onActiveTileChange.next(position);
        }, () => {
            this._onActiveTileChange.next(undefined);
        });
        const { x: posX, y: posY } = this._getPosition(x, y, z);
        cursor.x = posX;
        cursor.y = posY;
        cursor.zIndex = (0, getZOrder_1.getZOrder)(x, y, z) - 1000;
        this._tileCursors.push(cursor);
        (container !== null && container !== void 0 ? container : this._primaryLayer).addChild(cursor);
    }
    _createRightWall(roomX, roomY, roomZ, options) {
        var _a;
        const wall = new WallRight_1.WallRight({
            hideBorder: (_a = options.hideBorder) !== null && _a !== void 0 ? _a : false,
            onMouseMove: (event) => {
                this._onActiveWallChange.next({
                    roomX,
                    roomY,
                    offsetX: -event.offsetX - 16,
                    offsetY: event.offsetY / 2 +
                        this._wallHeight / 2 -
                        event.offsetX / 4 +
                        roomZ * 16 -
                        8,
                    wall: "r",
                });
            },
            onMouseOut: () => {
                this._onActiveWallChange.next(undefined);
            },
            hitAreaContainer: this._wallHitAreaLayer,
        });
        const { x, y } = this._getPosition(roomX, roomY + 1, roomZ);
        wall.x = x + 32;
        wall.y = y;
        wall.roomZ = roomZ;
        this._wallLayer.addChild(wall);
        this._walls.push(wall);
    }
    _createLeftWall(roomX, roomY, roomZ, { hideBorder = false, cutawayHeight, }) {
        if (this._hideWalls)
            return;
        const wall = new WallLeft_1.WallLeft({
            hideBorder,
            onMouseMove: (event) => {
                this._onActiveWallChange.next({
                    roomX,
                    roomY,
                    offsetX: event.offsetX,
                    offsetY: event.offsetY / 2 +
                        this._wallHeight / 2 -
                        event.offsetX / 4 +
                        roomZ * 16,
                    wall: "l",
                });
            },
            onMouseOut: () => {
                this._onActiveWallChange.next(undefined);
            },
            hitAreaContainer: this._wallHitAreaLayer,
            cutawayHeight: cutawayHeight,
        });
        const { x, y } = this._getPosition(roomX + 1, roomY, roomZ);
        wall.x = x;
        wall.y = y;
        wall.roomZ = roomZ;
        this._wallLayer.addChild(wall);
        this._walls.push(wall);
    }
    _createOuterBorder(roomX, roomY, roomZ) {
        const wall = new WallOuterCorner_1.WallOuterCorner();
        const { x, y } = this._getPosition(roomX + 1, roomY, roomZ);
        wall.x = x;
        wall.y = y;
        wall.roomZ = roomZ;
        this._wallLayer.addChild(wall);
        this._walls.push(wall);
    }
    _createWallElement(element, x, y, z) {
        if (this._hideWalls || this._hideFloor)
            return;
        switch (element.kind) {
            case "colWall":
                this._createRightWall(x, y, z, { hideBorder: element.hideBorder });
                break;
            case "rowWall":
                this._createLeftWall(x, y, z, { hideBorder: element.hideBorder });
                break;
            case "innerCorner":
                this._createRightWall(x, y, z, { hideBorder: false });
                this._createLeftWall(x, y, z, { hideBorder: true });
                break;
            case "outerCorner":
                this._createOuterBorder(x, y, z);
                break;
        }
    }
    _getPosition(roomX, roomY, roomZ) {
        const getBasePosition = () => {
            return { x: roomX, y: roomY };
        };
        const { x, y } = getBasePosition();
        const base = 32;
        // TODO: Right now we are subtracting the tileMapBounds here.
        // This is so the landscapes work correctly. This has something with the mask position being negative for some walls.
        // This fixes it for now.
        const xPos = x * base - y * base;
        const yPos = x * (base / 2) + y * (base / 2);
        return {
            x: xPos,
            y: yPos - roomZ * 32,
        };
    }
}
exports.RoomModelVisualization = RoomModelVisualization;
