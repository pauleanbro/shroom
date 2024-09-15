import { AvatarFigurePartType } from "../enum/AvatarFigurePartType";
import { IAvatarAnimationData } from "../data/interfaces/IAvatarAnimationData";
import { Bodypart } from "../data/interfaces/IAvatarGeometryData";
import { IAvatarOffsetsData } from "../data/interfaces/IAvatarOffsetsData";
import { IAvatarPartSetsData } from "../data/interfaces/IAvatarPartSetsData";
import { IFigureData } from "../data/interfaces/IFigureData";
import { IFigureMapData } from "../data/interfaces/IFigureMapData";
import { ParsedLook } from "../util/parseLookString";
import { AvatarPart } from "./AvatarPart";
export declare const basePartSet: Set<AvatarFigurePartType>;
export declare class AvatarPartList {
    private _deps;
    private _parts;
    private _hiddenLayers;
    private _partsByType;
    constructor(look: ParsedLook, itemId: string | number | undefined, _deps: AvatarPartListOptions);
    getPartsForBodyBart(bodyPart: Bodypart): AvatarPart[];
    getPartsForType(type: AvatarFigurePartType): AvatarPart[];
    get parts(): AvatarPart[];
    private _addItem;
    private _registerPart;
}
interface AvatarPartListOptions {
    figureData: IFigureData;
    figureMap: IFigureMapData;
    animationData: IAvatarAnimationData;
    offsetsData: IAvatarOffsetsData;
    partSetsData: IAvatarPartSetsData;
}
export {};
