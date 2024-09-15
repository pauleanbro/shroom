import { IFurnitureData } from "../../interfaces/IFurnitureData";
import { FurnitureFetch, IFurnitureLoader } from "../../interfaces/IFurnitureLoader";
import { IFurnitureAssetBundle } from "./IFurnitureAssetBundle";
import { LoadFurniResult } from "./util/loadFurni";
export declare class FurnitureLoader implements IFurnitureLoader {
    private _options;
    private _furnitureCache;
    private _artificalDelay;
    private _assetBundles;
    constructor(_options: Options);
    get delay(): number | undefined;
    set delay(value: number | undefined);
    static create(furnitureData: IFurnitureData, resourcePath?: string): FurnitureLoader;
    static createForJson(furnitureData: IFurnitureData, resourcePath?: string): FurnitureLoader;
    loadFurni(fetch: FurnitureFetch): Promise<LoadFurniResult>;
    private _getAssetBundle;
}
interface Options {
    furnitureData: IFurnitureData;
    getAssetBundle: (type: string, revision?: number) => Promise<IFurnitureAssetBundle>;
}
export {};
