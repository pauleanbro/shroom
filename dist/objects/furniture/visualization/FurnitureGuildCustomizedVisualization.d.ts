import { IFurnitureVisualizationView } from "../IFurnitureVisualizationView";
import { FurnitureVisualization } from "./FurnitureVisualization";
export declare class FurnitureGuildCustomizedVisualization extends FurnitureVisualization {
    private static readonly PRIMARY_COLOR_TAG;
    private static readonly SECONDARY_COLOR_TAG;
    private _base;
    private _primaryColor;
    private _secondaryColor;
    private _refreshModifier;
    constructor(options?: {
        primaryColor?: string;
        secondaryColor?: string;
    });
    get primaryColor(): string | undefined;
    set primaryColor(value: string | undefined);
    get secondaryColor(): string | undefined;
    set secondaryColor(value: string | undefined);
    isAnimated(): boolean;
    update(): void;
    setView(view: IFurnitureVisualizationView): void;
    destroy(): void;
    updateFrame(frame: number): void;
    updateDirection(direction: number): void;
    updateAnimation(animation: string): void;
    private _updateModifier;
    private _normalizeColor;
    private _modifyPart;
}
