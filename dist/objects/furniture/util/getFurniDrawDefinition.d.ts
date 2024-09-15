import { FurniDrawDefinition } from "./DrawDefinition";
import { IFurnitureVisualizationData } from "../data/interfaces/IFurnitureVisualizationData";
import { IFurnitureAssetsData } from "../data/interfaces/IFurnitureAssetsData";
interface FurniDrawDefinitionOptions {
    type: string;
    direction: number;
    animation?: string;
}
interface FurniDrawDefinitionDependencies {
    visualizationData: IFurnitureVisualizationData;
    assetsData: IFurnitureAssetsData;
}
export declare function getFurniDrawDefinition({ type: typeWithColor, direction, animation }: FurniDrawDefinitionOptions, { visualizationData, assetsData }: FurniDrawDefinitionDependencies): FurniDrawDefinition;
export {};
