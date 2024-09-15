import { XmlData } from "../../../data/XmlData";
import { FurnitureAssetsJson } from "./FurnitureAssetsJson";
import { FurnitureAsset, IFurnitureAssetsData } from "./interfaces/IFurnitureAssetsData";
export declare class FurnitureAssetsData extends XmlData implements IFurnitureAssetsData {
    private _assets;
    constructor(xml: string);
    static fromUrl(url: string): Promise<FurnitureAssetsData>;
    toJson(): FurnitureAssetsJson;
    getAsset(name: string): FurnitureAsset | undefined;
    getAssets(): FurnitureAsset[];
}
