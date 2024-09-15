import { FurnitureId, FurnitureInfo, IFurnitureData } from "../../interfaces/IFurnitureData";
import { IFurniture } from "./IFurniture";
export declare class FurnitureData implements IFurnitureData {
    private _getFurniData;
    private _data;
    constructor(_getFurniData: () => Promise<string>);
    static create(resourcePath?: string): FurnitureData;
    getRevisionForType(type: string): Promise<number | undefined>;
    getInfo(type: string): Promise<FurnitureInfo | undefined>;
    getTypeById(id: FurnitureId, placementType: "wall" | "floor"): Promise<string | undefined>;
    getInfoForFurniture(furniture: IFurniture): Promise<FurnitureInfo | undefined>;
    getInfos(): Promise<[string, FurnitureInfo][]>;
    private _prepareData;
}
