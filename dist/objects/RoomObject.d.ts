import { IRoomContext } from "../interfaces/IRoomContext";
import { IRoomObject } from "../interfaces/IRoomObject";
export declare abstract class RoomObject implements IRoomObject {
    private _context;
    private _isDestroyed;
    setParent(room: IRoomContext): void;
    destroy(): void;
    protected getRoomContext(): IRoomContext;
    abstract destroyed(): void;
    abstract registered(): void;
    protected get mounted(): boolean;
    protected get room(): import("..").Room;
    protected get configuration(): import("../interfaces/IConfiguration").IConfiguration;
    protected get furnitureLoader(): import("../interfaces/IFurnitureLoader").IFurnitureLoader;
    protected get animationTicker(): import("../interfaces/IAnimationTicker").IAnimationTicker;
    protected get roomVisualization(): import("../interfaces/IRoomVisualization").IRoomVisualization;
    protected get geometry(): import("../interfaces/IRoomGeometry").IRoomGeometry;
    protected get roomObjectContainer(): import("../interfaces/IRoomObjectContainer").IRoomObjectContainer;
    protected get avatarLoader(): import("../interfaces/IAvatarLoader").IAvatarLoader;
    protected get eventManager(): import("./events/interfaces/IEventManager").IEventManager;
    protected get tilemap(): import("../interfaces/ITileMap").ITileMap;
    protected get landscapeContainer(): import("./room/ILandscapeContainer").ILandscapeContainer;
    protected get application(): PIXI.Application;
}
