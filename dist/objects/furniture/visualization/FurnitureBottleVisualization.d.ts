import { IFurnitureVisualizationView } from "../IFurnitureVisualizationView";
import { FurnitureVisualization } from "./FurnitureVisualization";
export declare class FurnitureBottleVisualization extends FurnitureVisualization {
    private static readonly ANIMATION_ID_OFFSET_SLOW1;
    private static readonly ANIMATION_ID_OFFSET_SLOW2;
    private static readonly ANIMATION_ID_ROLL;
    private _base;
    private _stateQueue;
    private _running;
    isAnimated(): boolean;
    destroy(): void;
    update(): void;
    setView(view: IFurnitureVisualizationView): void;
    updateFrame(frame: number): void;
    updateDirection(direction: number): void;
    updateAnimation(animation: string): void;
}
