import { FurnitureIndexJson } from "./FurnitureIndexJson";
export declare class FurnitureIndexData {
    private _visualization;
    private _logic;
    get visualization(): string | undefined;
    get logic(): string | undefined;
    constructor(xml: string);
    static fromUrl(url: string): Promise<FurnitureIndexData>;
    toJson(): FurnitureIndexJson;
    toObject(): {
        visualization: string | undefined;
        logic: string | undefined;
    };
}
