import { FurnitureVisualizationJson } from "./FurnitureVisualizationJson";
import { FurnitureAnimation, FurnitureAnimationLayer, FurnitureDirectionLayer, FurnitureLayer, IFurnitureVisualizationData } from "./interfaces/IFurnitureVisualizationData";
export declare class JsonFurnitureVisualizationData implements IFurnitureVisualizationData {
    private _furniture;
    constructor(_furniture: FurnitureVisualizationJson);
    getLayerCount(size: number): number;
    getLayer(size: number, layerId: number): FurnitureLayer | undefined;
    getDirections(size: number): number[];
    getDirectionLayer(size: number, direction: number, layerId: number): FurnitureDirectionLayer | undefined;
    getAnimationLayer(size: number, animationId: number, id: number): FurnitureAnimationLayer | undefined;
    getFrameCountWithoutRepeat(size: number, animationId: number): number | undefined;
    getFrameCount(size: number, animationId: number): number | undefined;
    getColor(size: number, colorId: number, layerId: number): string | undefined;
    getAnimation(size: number, animationId: number): FurnitureAnimation | undefined;
    getTransitionForAnimation(size: number, transitionTo: number): FurnitureAnimation | undefined;
    private _getVisualization;
}
