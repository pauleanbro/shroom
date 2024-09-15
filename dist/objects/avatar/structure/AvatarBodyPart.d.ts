import { AvatarActionInfo, IAvatarActionsData } from "../data/interfaces/IAvatarActionsData";
import { AvatarEffectFrameFXPart, IAvatarEffectData } from "../data/interfaces/IAvatarEffectData";
import { Bodypart, IAvatarGeometryData } from "../data/interfaces/IAvatarGeometryData";
import { IAvatarPartSetsData } from "../data/interfaces/IAvatarPartSetsData";
import { AvatarAdditionPart } from "./AvatarAdditionPart";
import { AvatarPart } from "./AvatarPart";
import { IAvatarDrawablePart } from "./interface/IAvatarDrawablePart";
/**
 * A bodypart of the avatar. A bodypart manages multiple `AvatarPart` objects.
 */
export declare class AvatarBodyPart {
    private _bodyPart;
    private _parts;
    private _partSets;
    private _actions;
    private _geometry;
    private _additions;
    constructor(_bodyPart: Bodypart, _parts: AvatarPart[], _partSets: IAvatarPartSetsData, _actions: IAvatarActionsData, _geometry: IAvatarGeometryData);
    get z(): number;
    get id(): string;
    get parts(): AvatarPart[];
    addAddition(addition: AvatarAdditionPart): void;
    getSortedParts(geometry: string): IAvatarDrawablePart[];
    setActiveAction(action: AvatarActionInfo): void;
    setDirection(direction: number): void;
    setDirectionOffset(offset: number): void;
    setFrameRepeat(frameRepeat: number): void;
    setEffectFrame(effect: IAvatarEffectData, frame: number): void;
    setAvatarOffsets(avatarFrame: AvatarEffectFrameFXPart, frame: number): void;
}
