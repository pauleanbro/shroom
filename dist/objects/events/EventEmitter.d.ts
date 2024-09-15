export declare class EventEmitter<TMap extends BaseTypeMap<unknown>> {
    private _map;
    addEventListener<K extends keyof TMap>(name: K, callback: EventCallback<K, TMap>): void;
    removeEventListener<K extends keyof TMap>(name: K, callback: EventCallback<K, TMap>): void;
    trigger<K extends keyof TMap>(name: K, value: TMap[K]): void;
}
type EventCallback<K extends keyof TMap, TMap extends BaseTypeMap<unknown>> = (event: TMap[K]) => void;
type BaseTypeMap<T> = {
    [k in keyof T]: unknown;
};
export {};
