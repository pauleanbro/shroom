import { IAvatarActionsData } from "../data/interfaces/IAvatarActionsData";
import { AvatarEffectFrameFXPart, AvatarEffectFXAddition, IAvatarEffectData } from "../data/interfaces/IAvatarEffectData";
import { IAvatarOffsetsData } from "../data/interfaces/IAvatarOffsetsData";
import { IAvatarPartSetsData } from "../data/interfaces/IAvatarPartSetsData";
import { CustomPartFrame } from "./AvatarPart";
import { IAvatarDrawablePart } from "./interface/IAvatarDrawablePart";
import { AvatarDrawPart } from "../types";
export declare class AvatarAdditionPart implements IAvatarDrawablePart {
    private _addition;
    private _actionsData;
    private _offsetsData;
    private _partSetsData;
    private _direction;
    private _directionOffset;
    private _mode;
    private _customFrames;
    private _offsets;
    constructor(_addition: AvatarEffectFXAddition, _actionsData: IAvatarActionsData, _offsetsData: IAvatarOffsetsData, _partSetsData: IAvatarPartSetsData);
    getDirection(offset?: number): number | undefined;
    getDrawDefinition(): AvatarDrawPart | undefined;
    setEffectFrame(effect: IAvatarEffectData, frame: number): void;
    setDirection(direction: number): void;
    setDirectionOffset(offset: number): void;
    setAvatarOffsets(avatarFrame: AvatarEffectFrameFXPart, frame: number): void;
    private _getAsset;
    private _setMode;
    private _handleBodyPart;
    private _handleFxPart;
}
export interface AdditionCustomFramePart extends CustomPartFrame {
    base?: string;
}
