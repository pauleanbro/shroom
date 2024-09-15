import { LookServer } from "./util";
import { LookOptions } from "./util/createLookServer";
import { AvatarLoaderResult, IAvatarLoader } from "../../interfaces/IAvatarLoader";
import { IAssetBundle } from "../../assets/IAssetBundle";
import { AvatarEffect, IAvatarEffectMap } from "./data/interfaces/IAvatarEffectMap";
import { IAvatarEffectBundle } from "./data/interfaces/IAvatarEffectBundle";
import { AvatarExternalDependencies } from "./types";
interface Options {
    getAssetBundle: (library: string) => Promise<IAssetBundle>;
    getEffectMap: () => Promise<IAvatarEffectMap>;
    getEffectBundle: (effectData: AvatarEffect) => Promise<IAvatarEffectBundle>;
    createDependencies: () => Promise<AvatarExternalDependencies>;
}
export declare class AvatarLoader implements IAvatarLoader {
    private _options;
    private _lookServer;
    private _effectCache;
    private _lookOptionsCache;
    private _assetBundles;
    private _effectMap;
    private _dependencies;
    private _offsets;
    constructor(_options: Options);
    static create(resourcePath?: string): AvatarLoader;
    static createForAssetBundle(resourcePath?: string): AvatarLoader;
    getAvatarDrawDefinition(options: LookOptions): Promise<AvatarLoaderResult>;
    _getAvatarDrawDefinition(getDrawDefinition: LookServer, options: LookOptions): Promise<AvatarLoaderResult>;
    private _loadEffectCached;
    private _loadEffect;
    private _getAssetBundle;
    private _getDrawDefinitionCached;
}
export {};
