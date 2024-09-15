import { AvatarActionInfo } from "../data/interfaces/IAvatarActionsData";
import { IAvatarAnimationData } from "../data/interfaces/IAvatarAnimationData";
import { AvatarEffectFrameFXPart } from "../data/interfaces/IAvatarEffectData";
import { IAvatarOffsetsData } from "../data/interfaces/IAvatarOffsetsData";
import { IAvatarPartSetsData } from "../data/interfaces/IAvatarPartSetsData";
import { FigureDataPart, IFigureData } from "../data/interfaces/IFigureData";
import { IFigureMapData } from "../data/interfaces/IFigureMapData";
import { DefaultAvatarDrawPart } from "../types";
export declare class AvatarPart {
    private _figureDataPart;
    private _color;
    private _action;
    private _direction;
    private _directionOffset;
    private _animationData;
    private _figureData;
    private _figureMap;
    private _offsetsData;
    private _partSetsData;
    private _assets;
    private _customFrames;
    private _frameRepeat;
    private _offsets;
    constructor(_figureDataPart: FigureDataPart, _color: string | undefined, { animationData, figureData, figureMap, offsetsData, partSetsData, }: {
        animationData: IAvatarAnimationData;
        figureData: IFigureData;
        figureMap: IFigureMapData;
        offsetsData: IAvatarOffsetsData;
        partSetsData: IAvatarPartSetsData;
    });
    get type(): string;
    get index(): number;
    setFrameRepeat(value: number): void;
    setActiveAction(action: AvatarActionInfo): void;
    setDirection(direction: number): void;
    addCustomFrame(customFrame: CustomPartFrame): void;
    setDirectionOffset(offset: number): void;
    setAvatarOffsets(avatarFrame: AvatarEffectFrameFXPart, frame: number): void;
    getDirection(offset?: number): number | undefined;
    /**
     * Gets the draw definition for this specific part.
     * This is a description how this part is drawn on the screen.
     */
    getDrawDefinition(): DefaultAvatarDrawPart | undefined;
    private _getOffsetForFrame;
    private _update;
}
export interface CustomPartFrame {
    action: AvatarActionInfo;
    frame: number;
    dx?: number;
    dy?: number;
    dd?: number;
}
