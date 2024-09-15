import * as PIXI from "pixi.js";
import { LookOptions } from "./util/createLookServer";
import { IAvatarLoader } from "../../interfaces/IAvatarLoader";
import { IAnimationTicker } from "../../interfaces/IAnimationTicker";
import { Shroom } from "../Shroom";
import { IEventManager } from "../events/interfaces/IEventManager";
import { EventGroupIdentifier, IEventGroup } from "../events/interfaces/IEventGroup";
export interface BaseAvatarOptions {
    look: LookOptions;
    position: {
        x: number;
        y: number;
    };
    zIndex: number;
    skipBodyParts?: boolean;
    skipCaching?: boolean;
    headOnly?: boolean;
    onLoad?: () => void;
}
export interface BaseAvatarDependencies {
    eventManager: IEventManager;
    animationTicker: IAnimationTicker;
    avatarLoader: IAvatarLoader;
}
export declare class BaseAvatar extends PIXI.Container implements IEventGroup {
    private _container;
    private _avatarLoaderResult;
    private _avatarDrawDefinition;
    private _avatarDestroyed;
    private _lookOptions;
    private _nextLookOptions;
    private _skipBodyParts;
    private _headOnly;
    private _skipCaching;
    private _currentFrame;
    private _clickHandler;
    private _overOutHandler;
    private _refreshFrame;
    private _refreshLook;
    private _sprites;
    private _updateId;
    private _spritesZIndex;
    private _dependencies?;
    private _onLoad;
    private _cancelTicker;
    /**
     * Sprite Z-Index for hit detection
     */
    get spritesZIndex(): number;
    set spritesZIndex(value: number);
    get dependencies(): BaseAvatarDependencies;
    set dependencies(value: BaseAvatarDependencies);
    private get mounted();
    get onClick(): import("../hitdetection/HitSprite").HitEventHandler | undefined;
    set onClick(value: import("../hitdetection/HitSprite").HitEventHandler | undefined);
    get onDoubleClick(): import("../hitdetection/HitSprite").HitEventHandler | undefined;
    set onDoubleClick(value: import("../hitdetection/HitSprite").HitEventHandler | undefined);
    get onPointerDown(): import("../hitdetection/HitSprite").HitEventHandler | undefined;
    set onPointerDown(value: import("../hitdetection/HitSprite").HitEventHandler | undefined);
    get onPointerUp(): import("../hitdetection/HitSprite").HitEventHandler | undefined;
    set onPointerUp(value: import("../hitdetection/HitSprite").HitEventHandler | undefined);
    get onPointerOut(): ((event: import("../events/interfaces/IEventManagerEvent").IEventManagerEvent) => void) | undefined;
    set onPointerOut(value: ((event: import("../events/interfaces/IEventManagerEvent").IEventManagerEvent) => void) | undefined);
    get onPointerOver(): ((event: import("../events/interfaces/IEventManagerEvent").IEventManagerEvent) => void) | undefined;
    set onPointerOver(value: ((event: import("../events/interfaces/IEventManagerEvent").IEventManagerEvent) => void) | undefined);
    get lookOptions(): LookOptions;
    set lookOptions(lookOptions: LookOptions);
    get currentFrame(): number;
    set currentFrame(value: number);
    constructor(options: BaseAvatarOptions);
    static fromShroom(shroom: Shroom, options: BaseAvatarOptions): BaseAvatar;
    getEventGroupIdentifier(): EventGroupIdentifier;
    destroy(): void;
    private _destroyAssets;
    private _updateSpritesZIndex;
    private _updateLookOptions;
    private _updatePosition;
    private _updateSprites;
    private _updateSpritesWithAvatarDrawDefinition;
    private _createAsset;
    private _reloadLook;
    private _updateFrame;
    private _handleDependenciesSet;
}
