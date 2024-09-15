import { AvatarAnimationFrame } from "../data/interfaces/IAvatarAnimationData";
import { IAvatarOffsetsData } from "../data/interfaces/IAvatarOffsetsData";
import { AvatarActionInfo } from "../data/interfaces/IAvatarActionsData";
import { AvatarFigurePartType } from "../enum/AvatarFigurePartType";
export declare function getAssetForFrame({ animationFrame, actionData, partTypeFlipped, direction, partType, partId, offsetsData, offsetX, offsetY, }: {
    animationFrame?: AvatarAnimationFrame;
    actionData: AvatarActionInfo;
    partTypeFlipped?: AvatarFigurePartType;
    partType: AvatarFigurePartType;
    direction: number;
    partId: string;
    offsetsData: IAvatarOffsetsData;
    offsetX?: number;
    offsetY?: number;
}): {
    fileId: string;
    library: string;
    mirror: boolean;
    x: number;
    y: number;
} | undefined;
