import { AvatarActionInfo, IAvatarActionsData } from "../data/interfaces/IAvatarActionsData";
import { AvatarEffectFrameFXPart, IAvatarEffectData } from "../data/interfaces/IAvatarEffectData";
import { IAvatarGeometryData } from "../data/interfaces/IAvatarGeometryData";
import { IAvatarOffsetsData } from "../data/interfaces/IAvatarOffsetsData";
import { IAvatarPartSetsData } from "../data/interfaces/IAvatarPartSetsData";
import { AvatarBodyPart } from "./AvatarBodyPart";
import { AvatarPartList } from "./AvatarPartList";
export declare class AvatarBodyPartList {
    private _bodyParts;
    private _bodyPartsById;
    private _additions;
    private _actionsData;
    private _offsetsData;
    private _partSetsData;
    private _additionsArr;
    constructor(_bodyParts: AvatarBodyPart[], { actionsData, offsetsData, partSetsData, }: {
        actionsData: IAvatarActionsData;
        offsetsData: IAvatarOffsetsData;
        partSetsData: IAvatarPartSetsData;
    });
    static create(partList: AvatarPartList, hasItem: boolean, { geometry, partSetsData, actionsData, offsetsData, }: {
        geometry: IAvatarGeometryData;
        partSetsData: IAvatarPartSetsData;
        actionsData: IAvatarActionsData;
        offsetsData: IAvatarOffsetsData;
    }): AvatarBodyPartList;
    applyActions(actions: AvatarActionInfo[]): void;
    applyEffectAdditions(effect: IAvatarEffectData): void;
    setEffectFrame(effect: IAvatarEffectData, frame: number): void;
    setAvatarOffsets(avatarFrameData: AvatarEffectFrameFXPart, frame: number): void;
    setAdditionsDirection(direction: number): void;
    setDirectionOffset(offset: number): void;
    setBodyPartDirection(direction: number, headDirection?: number): void;
    getBodyPartById(id: string): AvatarBodyPart | undefined;
    private _getBodyPartById;
}
