import { AvatarData } from "./AvatarData";
import { IAvatarManifestData, ManifestAlias, ManifestAsset } from "./interfaces/IAvatarManifestData";
export declare class AvatarManifestData extends AvatarData implements IAvatarManifestData {
    private _assets;
    private _assetbyName;
    private _aliases;
    constructor(xml: string);
    getAliases(): ManifestAlias[];
    getAssets(): ManifestAsset[];
    getAssetByName(name: string): ManifestAsset | undefined;
    private _cacheData;
}
