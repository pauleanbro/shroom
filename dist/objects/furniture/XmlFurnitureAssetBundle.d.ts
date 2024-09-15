import { IAssetBundle } from "../../assets/IAssetBundle";
import { HitTexture } from "../hitdetection/HitTexture";
import { IFurnitureAssetsData } from "./data/interfaces/IFurnitureAssetsData";
import { IFurnitureIndexData } from "./data/interfaces/IFurnitureIndexData";
import { IFurnitureVisualizationData } from "./data/interfaces/IFurnitureVisualizationData";
import { IFurnitureAssetBundle } from "./IFurnitureAssetBundle";
export declare class XmlFurnitureAssetBundle implements IFurnitureAssetBundle {
    private _type;
    private _assetBundle;
    constructor(_type: string, _assetBundle: IAssetBundle);
    getAssets(): Promise<IFurnitureAssetsData>;
    getVisualization(): Promise<IFurnitureVisualizationData>;
    getTexture(name: string): Promise<HitTexture>;
    getIndex(): Promise<IFurnitureIndexData>;
}
