import { AvatarEffect, IAvatarEffectMap } from "./interfaces/IAvatarEffectMap";
export declare class AvatarEffectMap implements IAvatarEffectMap {
    private _effects;
    private _effectsArray;
    constructor(string: string);
    getEffects(): AvatarEffect[];
    getEffectInfo(id: string): AvatarEffect | undefined;
    private _getEffectFromElement;
}
