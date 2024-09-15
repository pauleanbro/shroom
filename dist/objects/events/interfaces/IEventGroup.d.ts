export interface IEventGroup {
    getEventGroupIdentifier(): EventGroupIdentifier;
}
export type EventGroupIdentifier = typeof FURNITURE | typeof AVATAR | typeof TILE_CURSOR;
export declare const FURNITURE: unique symbol;
export declare const AVATAR: unique symbol;
export declare const TILE_CURSOR: unique symbol;
