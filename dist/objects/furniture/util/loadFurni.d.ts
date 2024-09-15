import { HitTexture } from "../../hitdetection/HitTexture";
import { IFurnitureVisualizationData } from "../data/interfaces/IFurnitureVisualizationData";
import { FurnitureExtraData } from "../FurnitureExtraData";
import { IFurnitureAssetBundle } from "../IFurnitureAssetBundle";
import { FurniDrawDefinition } from "./DrawDefinition";
export type GetFurniDrawDefinition = (direction: number, animation?: string) => FurniDrawDefinition;
export type Hitmap = (x: number, y: number, transform: {
    x: number;
    y: number;
}) => boolean;
export type LoadFurniResult = {
    getDrawDefinition: GetFurniDrawDefinition;
    getTexture: (name: string) => HitTexture | undefined;
    getExtraData: () => FurnitureExtraData;
    directions: number[];
    visualizationData: IFurnitureVisualizationData;
};
export declare function loadFurni(typeWithColor: string, bundle: IFurnitureAssetBundle): Promise<LoadFurniResult>;
