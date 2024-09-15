import { AvatarData } from "./AvatarData";
import { IAvatarPartSetsData } from "./interfaces/IAvatarPartSetsData";
export declare class AvatarPartSetsData extends AvatarData implements IAvatarPartSetsData {
    constructor(xml: string);
    static fromUrl(url: string): Promise<AvatarPartSetsData>;
    static default(): AvatarPartSetsData;
    getPartInfo(id: string): {
        removeSetType?: string | undefined;
        flippedSetType?: string | undefined;
    } | undefined;
    getActivePartSet(id: string): Set<string>;
}
