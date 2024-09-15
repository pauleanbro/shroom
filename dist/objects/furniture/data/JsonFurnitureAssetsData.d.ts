import { FurnitureAssetsJson } from "./FurnitureAssetsJson";
import { FurnitureAsset, IFurnitureAssetsData } from "./interfaces/IFurnitureAssetsData";
export declare class JsonFurnitureAssetsData implements IFurnitureAssetsData {
    private _assets;
    constructor(_assets: FurnitureAssetsJson);
    getAsset(name: string): FurnitureAsset | undefined;
    getAssets(): FurnitureAsset[];
}
