import { XmlData } from "../../../data/XmlData";
import { FurnitureVisualizationJson } from "./FurnitureVisualizationJson";
import { FurnitureAnimationLayer, FurnitureDirectionLayer, IFurnitureVisualizationData, FurnitureLayer, FurnitureAnimation } from "./interfaces/IFurnitureVisualizationData";
export declare class FurnitureVisualizationData extends XmlData implements IFurnitureVisualizationData {
    constructor(xml: string);
    static fromUrl(url: string): Promise<FurnitureVisualizationData>;
    getFrameCountWithoutRepeat(size: number, animationId: number): number | undefined;
    getTransitionForAnimation(size: number, transitionTo: number): FurnitureAnimation | undefined;
    getAnimation(size: number, animationId: number): FurnitureAnimation | undefined;
    getColor(size: number, colorId: number, layerId: number): string | undefined;
    getFrameCount(size: number, animationId: number): number | undefined;
    getAnimationIds(size: number): number[];
    getAnimationLayer(size: number, animationId: number, id: number): FurnitureAnimationLayer | undefined;
    getDirections(size: number): number[];
    getDirectionLayer(size: number, direction: number, layerId: number): FurnitureDirectionLayer | undefined;
    getLayerCount(size: number): number;
    getLayer(size: number, layerId: number): FurnitureLayer | undefined;
    toJson(): FurnitureVisualizationJson;
    private _toJsonMap;
    private _getJsonAnimations;
    private _getJsonColors;
    private _getDirections;
    private _getLayers;
    private _getJsonForSize;
    private _getNumberFromAttributeValue;
}
