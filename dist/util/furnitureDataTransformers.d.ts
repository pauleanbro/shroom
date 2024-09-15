import { FurnitureInfo } from "../interfaces/IFurnitureData";
export declare function transformFirst<T>(transform: (value: string) => T, defaultValue: T): (arr: string[]) => T;
export declare function formatFurnitureData(data: {
    [key: string]: unknown;
}): FurnitureInfo | undefined;
export declare const furnitureDataTransformers: {
    adurl: (arr: string[]) => string | undefined;
    bc: (arr: string[]) => boolean;
    buyout: (arr: string[]) => boolean;
    canlayon: (arr: string[]) => boolean;
    cansiton: (arr: string[]) => boolean;
    canstandon: (arr: string[]) => boolean;
    defaultdir: (arr: string[]) => number;
    description: (arr: string[]) => string | undefined;
    environment: (arr: string[]) => string | undefined;
    excludeddynamic: (arr: string[]) => boolean;
    furniline: (arr: string[]) => string | undefined;
    name: (arr: string[]) => string | undefined;
    offerid: (arr: string[]) => number | undefined;
    rare: (arr: string[]) => boolean;
    rentbuyout: (arr: string[]) => boolean;
    rentofferid: (arr: string[]) => number | undefined;
    revision: (arr: string[]) => number | undefined;
    specialtype: (arr: string[]) => number | undefined;
    xdim: (arr: string[]) => number | undefined;
    ydim: (arr: string[]) => number | undefined;
};
