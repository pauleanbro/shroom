import { IAvatarEffectData } from "../data/interfaces/IAvatarEffectData";
import { ParsedLook } from "../util/parseLookString";
import { IAvatarEffectPart } from "./interface/IAvatarEffectPart";
import { AvatarDependencies, AvatarDrawPart } from "../types";
export declare class AvatarDrawDefinition implements IAvatarEffectPart {
    private _options;
    private _figureData;
    private _actionsData;
    private _geometry;
    private _partSetsData;
    private _animationData;
    private _offsetsData;
    private _figureMap;
    private _direction;
    private _directionOffset;
    private _partList;
    private _activeActions;
    private _effectParts;
    private _bodyParts;
    private _drawParts;
    constructor(_options: Options, { figureData, actionsData, geometry, partSetsData, animationData, offsetsData, figureMap, }: AvatarDependencies);
    setDirection(direction: number): void;
    setDirectionOffset(offset: number): void;
    setEffectFrame(effect: IAvatarEffectData, frame: number): void;
    setEffectFrameDefaultIfNotSet(): void;
    getDrawDefinition(): AvatarDrawPart[];
    private _getPartsForLook;
    private _getActiveActions;
}
interface Options {
    look: ParsedLook;
    actions: Set<string>;
    direction: number;
    headDirection?: number;
    frame: number;
    item?: string | number;
    effect?: IAvatarEffectData;
}
export {};
