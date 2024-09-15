import { HitTexture } from "../hitdetection/HitTexture";
import { IAvatarOffsetsData } from "./data/interfaces/IAvatarOffsetsData";
import { IManifestLibrary } from "./data/interfaces/IManifestLibrary";
declare const NO_ASSET: unique symbol;
export declare class AvatarAssetLibraryCollection implements IAvatarOffsetsData {
    private _assets;
    private _libraries;
    private _opened;
    private _loadTextures;
    private _textures;
    open(bundle: IManifestLibrary): Promise<void>;
    loadTextures(ids: string[]): Promise<(HitTexture | typeof NO_ASSET)[]>;
    getOffsets(fileName: string): {
        offsetX: number;
        offsetY: number;
    } | undefined;
    getTexture(fileName: string): HitTexture | undefined;
    private _loadTexture;
}
export {};
