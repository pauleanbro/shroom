import { Logger } from "./Logger";
export declare class ProgressBar implements Logger {
    private _logger;
    private _elementCount;
    private _getString;
    private _count;
    private _currentItem;
    constructor(_logger: Logger, _elementCount: number, _getString: (current: number, count: number, extra?: string) => string);
    info(...args: string[]): void;
    debug(...args: string[]): void;
    error(...args: string[]): void;
    log(...args: string[]): void;
    increment(item: string): void;
    done(): void;
    private _update;
}
