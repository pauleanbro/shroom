import { IFurnitureVisualization } from "../IFurnitureVisualization";
import { IFurnitureVisualizationView } from "../IFurnitureVisualizationView";
export declare abstract class FurnitureVisualization implements IFurnitureVisualization {
    protected _view: IFurnitureVisualizationView | undefined;
    protected _previousView: IFurnitureVisualizationView | undefined;
    protected get view(): IFurnitureVisualizationView;
    protected get previousView(): IFurnitureVisualizationView | undefined;
    protected get mounted(): boolean;
    setView(view: IFurnitureVisualizationView): void;
    isAnimated(animation?: string): boolean;
    abstract update(): void;
    abstract destroy(): void;
    abstract updateFrame(frame: number): void;
    abstract updateDirection(direction: number): void;
    abstract updateAnimation(animation: string): void;
}
