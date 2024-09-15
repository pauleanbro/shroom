import { IFurnitureVisualizationView } from "../IFurnitureVisualizationView";
import { FurnitureVisualization } from "./FurnitureVisualization";
export declare class StaticFurnitureVisualization extends FurnitureVisualization {
    private _sprites;
    private _refreshFurniture;
    private _currentDirection;
    private _animationId;
    setView(view: IFurnitureVisualizationView): void;
    updateDirection(direction: number): void;
    updateAnimation(animation: string): void;
    updateFrame(): void;
    update(): void;
    destroy(): void;
    private _update;
}
/**
 * @deprecated Use `StaticFurnitureVisualization`
 */
export declare const BasicFurnitureVisualization: typeof StaticFurnitureVisualization;
