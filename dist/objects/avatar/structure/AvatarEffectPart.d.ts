import { IAvatarActionsData } from "../data/interfaces/IAvatarActionsData";
import { AvatarEffectFrameFXPart, AvatarEffectSprite, IAvatarEffectData } from "../data/interfaces/IAvatarEffectData";
import { IAvatarOffsetsData } from "../data/interfaces/IAvatarOffsetsData";
import { IAvatarEffectPart } from "./interface/IAvatarEffectPart";
import { AvatarEffectDrawPart } from "../types";
export declare class AvatarEffectPart implements IAvatarEffectPart {
    private _sprite;
    private _actionsData;
    private _offsetsData;
    private _effectData;
    private _direction;
    private _directionOffset;
    private _offsets;
    private _customFrames;
    constructor(_sprite: AvatarEffectSprite, _actionsData: IAvatarActionsData, _offsetsData: IAvatarOffsetsData, _effectData: IAvatarEffectData);
    setDirection(direction: number): void;
    setDirectionOffset(offset: number): void;
    getDirection(offset?: number): number | undefined;
    setEffectFrame(effect: IAvatarEffectData, frame: number): void;
    setAvatarOffsets(avatarFrame: AvatarEffectFrameFXPart, frame: number): void;
    setEffectFrameDefaultIfNotSet(): void;
    getDrawDefinition(): AvatarEffectDrawPart | undefined;
    private _getAvatarAsset;
}
export declare const getSpriteId: (member: string, direction: number, frame: number) => string;
