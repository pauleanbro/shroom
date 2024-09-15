/// <reference types="node" />
import { IAssetBundle } from "./IAssetBundle";
export declare class ShroomAssetBundle implements IAssetBundle {
    static readonly VERSION = 1;
    private _files;
    private _blobs;
    private _strings;
    constructor(files?: {
        fileName: string;
        buffer: ArrayBuffer | Buffer;
    }[]);
    get files(): [string, ArrayBuffer | Buffer][];
    static fromUrl(url: string): Promise<ShroomAssetBundle>;
    static fromBuffer(buffer: ArrayBuffer | Buffer): ShroomAssetBundle;
    addFile(fileName: string, buffer: ArrayBuffer | Buffer): void;
    toBuffer(): Buffer;
    getBlob(name: string): Promise<Blob>;
    getString(name: string): Promise<string>;
}
