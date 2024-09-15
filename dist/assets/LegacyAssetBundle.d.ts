import { IAssetBundle } from "./IAssetBundle";
export declare class LegacyAssetBundle implements IAssetBundle {
    private _folderUrl;
    private _blobs;
    private _strings;
    constructor(_folderUrl: string);
    getBlob(name: string): Promise<Blob>;
    getString(name: string): Promise<string>;
}
