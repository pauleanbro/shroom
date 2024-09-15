import { IAssetBundle } from "../../../assets/IAssetBundle";
import { HitTexture } from "../../hitdetection/HitTexture";
import { IAvatarManifestData } from "./interfaces/IAvatarManifestData";
import { IManifestLibrary } from "./interfaces/IManifestLibrary";
export declare class ManifestLibrary implements IManifestLibrary {
    private _bundle;
    private _manifest;
    private _map;
    constructor(_bundle: IAssetBundle);
    getManifest(): Promise<IAvatarManifestData>;
    getTexture(name: string): Promise<HitTexture | undefined>;
}
