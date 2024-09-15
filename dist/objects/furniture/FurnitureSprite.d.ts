import { HitSprite } from "../hitdetection/HitSprite";
export declare class FurnitureSprite extends HitSprite {
    private _baseX;
    private _baseY;
    private _baseZIndex;
    private _offsetX;
    private _offsetY;
    private _offsetZIndex;
    private _assetName;
    get offsetX(): number;
    set offsetX(value: number);
    get offsetY(): number;
    set offsetY(value: number);
    get offsetZIndex(): number;
    set offsetZIndex(value: number);
    get baseX(): number;
    set baseX(value: number);
    get baseY(): number;
    set baseY(value: number);
    get baseZIndex(): number;
    set baseZIndex(value: number);
    get assetName(): string | undefined;
    set assetName(value: string | undefined);
    private _update;
}
