import { IAssetBundle } from "../../assets/IAssetBundle";
import { HitTexture } from "../hitdetection/HitTexture";
import { IAvatarEffectBundle } from "./data/interfaces/IAvatarEffectBundle";
import { IAvatarEffectData } from "./data/interfaces/IAvatarEffectData";
import { IAvatarManifestData } from "./data/interfaces/IAvatarManifestData";
export declare class AvatarEffectBundle implements IAvatarEffectBundle {
    private _bundle;
    private _data;
    private _textures;
    private _manifest;
    constructor(_bundle: IAssetBundle);
    getData(): Promise<IAvatarEffectData>;
    getTexture(name: string): Promise<HitTexture>;
    getManifest(): Promise<IAvatarManifestData>;
}
