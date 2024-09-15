import { IEventManagerEvent } from "../events/interfaces/IEventManagerEvent";
import { HitEventHandler } from "./HitSprite";
export declare class ClickHandler {
    private _doubleClickInfo?;
    private _map;
    private _onClick;
    private _onDoubleClick;
    private _onPointerDown;
    private _onPointerUp;
    get onClick(): HitEventHandler | undefined;
    set onClick(value: HitEventHandler | undefined);
    get onDoubleClick(): HitEventHandler | undefined;
    set onDoubleClick(value: HitEventHandler | undefined);
    get onPointerDown(): HitEventHandler | undefined;
    set onPointerDown(value: HitEventHandler | undefined);
    get onPointerUp(): HitEventHandler | undefined;
    set onPointerUp(value: HitEventHandler | undefined);
    handleClick(event: IEventManagerEvent): void;
    handlePointerDown(event: IEventManagerEvent): void;
    handlePointerUp(event: IEventManagerEvent): void;
    private _performDoubleClick;
    private _resetDoubleClick;
    private _startDoubleClick;
}
